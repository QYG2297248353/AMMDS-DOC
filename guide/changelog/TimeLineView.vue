<template>
  <div class="changelog-container">
    <a-spin :loading="loading" style="width: 100%">
      <template #empty>
        <a-empty v-if="error" description="获取更新日志失败" />
        <a-empty v-else-if="!changelogData.length" description="暂无更新日志" />
      </template>
      <a-timeline>
        <a-timeline-item v-for="item in changelogData" :key="item.version">
          <a-card
            :style="{ marginBottom: '24px' }"
            class="changelog-card"
            :bordered="false"
          >
            <div class="version-header">
              <h2 class="version-title">
                <a :href="item.html_url" target="_blank" class="version-link">
                  <span class="emoji">🚀</span>
                  发布 {{ item.version }}
                </a>
              </h2>
              <div class="version-meta">
                <a-tag color="arcoblue" size="medium" class="version-tag">{{
                  item.version
                }}</a-tag>
                <span class="date">{{ item.date }}</span>
              </div>
            </div>

            <a-divider style="margin: 16px 0" />

            <div class="changelog-content">
              <div
                v-html="renderMarkdown(item.body)"
                class="markdown-content"
              ></div>
            </div>
          </a-card>
        </a-timeline-item>
      </a-timeline>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useData } from "vitepress";

const changelogData = ref([]);
const loading = ref(false);
const error = ref(false);
const { site } = useData();

const CACHE_KEY = "github_releases_cache";
const CACHE_EXPIRY = 1000 * 60 * 30;

const renderMarkdown = (content) => {
  return site.value.markdown?.render(content) || content;
};

const fetchReleases = async () => {
  loading.value = true;
  error.value = false;
  
  try {
    // 检查缓存
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        changelogData.value = formatReleaseData(data);
        return;
      }
    }

    const response = await axios.get(
      "https://api.github.com/repos/QYG2297248353/AMMDS-Docker/releases"
    );
    const releases = response.data;

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: releases,
        timestamp: Date.now(),
      })
    );

    changelogData.value = formatReleaseData(releases);
  } catch (error) {
    console.error("获取更新日志失败:", error);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const formatReleaseData = (releases) => {
  return releases.map((release) => {
    const releaseDate = new Date(release.published_at);
    const dateStr = releaseDate.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      version: release.tag_name,
      date: dateStr,
      body: release.body,
      html_url: release.html_url,
    };
  });
};

onMounted(() => {
  fetchReleases();
});
</script>

<style scoped>
.changelog-container {
  padding: 20px 0;
}

.changelog-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.changelog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.version-header {
  padding: 0 16px;
}

.version-title {
  font-size: 1.5em;
  margin: 0;
}

.version-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
}

.version-link:hover {
  color: var(--vp-c-brand);
}

.version-tag {
  font-size: 0.7em;
}

.version-meta {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.date {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.changelog-content {
  padding: 0 16px;
}

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.2em;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  color: var(--vp-c-text-1);
}

.section-icon {
  margin-right: 8px;
  color: rgb(var(--primary-6));
}

.markdown-content {
  border-radius: 8px;
  padding: 12px 16px;
}

.markdown-content :deep(p) {
  margin: 0;
  line-height: 1.6;
}

.markdown-content :deep(code) {
  background-color: var(--vp-c-mute);
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
