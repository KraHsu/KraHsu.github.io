import { onMounted, reactive } from "vue";

const CACHE_MS = 60 * 60 * 1000;

function readCache(repo) {
  try {
    const cached = JSON.parse(sessionStorage.getItem(`stars:${repo}`));
    return cached && Date.now() - cached.at < CACHE_MS ? cached.count : null;
  } catch {
    return null;
  }
}

function writeCache(repo, count) {
  try {
    sessionStorage.setItem(`stars:${repo}`, JSON.stringify({ count, at: Date.now() }));
  } catch {
    // Caching is best-effort.
  }
}

export function formatStars(count) {
  return count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k` : String(count);
}

// Fetches star counts client-side; the unauthenticated API allows 60 requests/hour, hence the cache.
// Failures leave the entry empty so the UI simply omits the badge.
export function useRepoStars(repos) {
  const stars = reactive({});

  onMounted(() => {
    repos.forEach(async (repo) => {
      const cached = readCache(repo);
      if (cached !== null) {
        stars[repo] = cached;
        return;
      }
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) return;
        const { stargazers_count: count } = await response.json();
        stars[repo] = count;
        writeCache(repo, count);
      } catch {
        // Offline or rate-limited.
      }
    });
  });

  return stars;
}
