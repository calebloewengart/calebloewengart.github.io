let content = { writing: [], videos: [] };
let activeFilter = 'all';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function createFeaturedPost(post) {
  const article = document.createElement('article');
  article.className = 'featured-post';

  article.innerHTML = `
    <a class="featured-post-link" href="${post.link}">
      <div class="featured-post-media">
        <img src="${post.cover}" alt="" loading="eager" />
      </div>
      <div class="featured-post-body">
        <span class="post-tag">${post.category}</span>
        <h2>${post.title}</h2>
        <p>${post.description}</p>
        <span class="post-meta">${formatDate(post.date)} · ${post.readTime}</span>
        <span class="read-cta">Read article →</span>
      </div>
    </a>
  `;

  return article;
}

function createPostCard(post) {
  const card = document.createElement('article');
  card.className = 'post-card';
  card.dataset.type = post.type;

  card.innerHTML = `
    <a class="post-card-link" href="${post.link}">
      <div class="post-card-media">
        <img src="${post.cover}" alt="" loading="lazy" />
      </div>
      <div class="post-card-body">
        <span class="post-tag">${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <span class="post-meta">${formatDate(post.date)} · ${post.readTime}</span>
      </div>
    </a>
  `;

  return card;
}

function createVideoReelCard(video) {
  const card = document.createElement('article');
  card.className = 'reel-card';

  card.innerHTML = `
    <button class="reel-card-btn" type="button" aria-label="Play ${video.title}">
      <img src="${video.cover}" alt="" loading="lazy" />
      <span class="play-badge" aria-hidden="true">▶</span>
      <div class="reel-card-caption">
        <span class="post-tag">${video.category}</span>
        <h3>${video.title}</h3>
      </div>
    </button>
  `;

  card.querySelector('.reel-card-btn').addEventListener('click', () => openVideoModal(video));
  return card;
}

function openVideoModal(video) {
  let modal = document.getElementById('video-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-backdrop" data-close></div>
      <div class="video-modal-panel" role="dialog" aria-modal="true" aria-label="Video player">
        <button class="video-modal-close" type="button" aria-label="Close video">×</button>
        <h3 class="video-modal-title"></h3>
        <div class="video-modal-embed"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('[data-close]').addEventListener('click', closeVideoModal);
    modal.querySelector('.video-modal-close').addEventListener('click', closeVideoModal);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeVideoModal();
    });
  }

  modal.querySelector('.video-modal-title').textContent = video.title;
  modal.querySelector('.video-modal-embed').innerHTML = `
    <iframe
      src="${video.embedUrl}"
      title="${video.title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.querySelector('.video-modal-embed').innerHTML = '';
  document.body.style.overflow = '';
}

function getFeedPosts() {
  const writing = content.writing
    .filter((item) => !item.featured)
    .map((item) => ({ ...item, type: 'writing' }));

  if (activeFilter === 'video') return [];
  return writing;
}

function renderFeatured() {
  const featured = content.writing.find((item) => item.featured) || content.writing[0];
  const section = document.getElementById('featured');
  const container = document.getElementById('featured-post');

  if (!featured) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  container.innerHTML = '';
  container.appendChild(createFeaturedPost(featured));
}

function renderFeed() {
  const feed = document.getElementById('post-feed');
  const posts = getFeedPosts();

  feed.innerHTML = '';

  if (activeFilter === 'video') {
    feed.innerHTML = '<p class="empty-state">Browse video work in the reel below.</p>';
    return;
  }

  if (posts.length === 0) {
    feed.innerHTML = '<p class="empty-state">No posts yet. Add an entry to <code>content.json</code>.</p>';
    return;
  }

  posts.forEach((post) => feed.appendChild(createPostCard(post)));
}

function renderVideoReel() {
  const reel = document.getElementById('video-reel');
  reel.innerHTML = '';

  if (content.videos.length === 0) {
    reel.innerHTML = '<p class="empty-state">No videos added yet.</p>';
    return;
  }

  content.videos.forEach((video) => reel.appendChild(createVideoReelCard(video)));
}

function setupFilters() {
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeFilter = tab.dataset.filter;
      renderFeed();

      if (activeFilter === 'video') {
        document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

async function loadContent() {
  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error('Failed to load content');
    content = await response.json();
  } catch {
    content = {
      writing: [
        {
          title: 'AI Negotiation Brief',
          description: 'How machine learning can inform mediation strategy.',
          link: 'assets/writing/ai.html',
          category: 'Technology & Policy',
          date: '2025-10-12',
          readTime: '8 min read',
          cover: 'assets/images/covers/ai.svg',
          featured: true,
        },
      ],
      videos: [],
    };
  }
}

async function init() {
  await loadContent();
  renderFeatured();
  renderFeed();
  renderVideoReel();
  setupFilters();
}

window.addEventListener('DOMContentLoaded', init);
