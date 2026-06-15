const videoItems = [
  {
    title: 'October 7th, Two Years Later',
    description: 'Documentary from Israel on the second anniversary of the October 7th attack. Co-published by the Jerusalem Post.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/p/DPhCJ0pCuLM/embed',
  },
  {
    title: 'First Steps',
    description: 'Solo backpacking from the Mediterranean coast to the Sea of Galilee.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/reel/DSvFRAfD4Lp/embed',
  },
  {
    title: 'Skis on Sale',
    description: 'Scripted, shot, and edited for Crystal Ski Shop to promote an end-of-season sale.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/p/DWRYbs-kUgB/embed',
  },
  {
    title: 'Bootcap Giveaway',
    description: 'Brand collaboration between Crystal Ski Shop and Bootcap.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/reel/DVyl922EV1l/embed',
  },
];

const writingItems = [
  {
    title: 'AI Negotiation Brief',
    description: 'How machine learning can inform mediation strategy — and where its limits lie.',
    link: 'assets/writing/ai.html',
  },
  {
    title: 'Sudan Blog Post',
    description: 'A narrative-driven look at the social and cultural impact of current events in Sudan.',
    link: 'assets/writing/sudan.html',
  },
  {
    title: 'Armenia-Azerbaijan Analysis',
    description: 'Regional dynamics and conflict between Armenia and Azerbaijan.',
    link: 'assets/writing/armenia.html',
  },
];

function createVideoCard(item) {
  const card = document.createElement('article');
  card.className = 'card video-card';

  const title = document.createElement('h3');
  title.textContent = item.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.textContent = item.description;
  card.appendChild(description);

  if (item.type === 'embed' && item.embedUrl) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-embed';
    wrapper.innerHTML = `
      <iframe
        src="${item.embedUrl}"
        title="${item.title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
    card.appendChild(wrapper);
  }

  if (item.type === 'file' && item.src) {
    const video = document.createElement('video');
    video.controls = true;
    video.src = item.src;
    video.textContent = 'Your browser does not support the video tag.';
    card.appendChild(video);
  }

  return card;
}

function createWritingCard(item) {
  const card = document.createElement('article');
  card.className = 'card writing-card';

  const title = document.createElement('h3');
  title.textContent = item.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.textContent = item.description;
  card.appendChild(description);

  const link = document.createElement('a');
  link.className = 'card-link';
  link.href = item.link;
  link.textContent = 'Read piece →';
  card.appendChild(link);

  return card;
}

function renderPortfolio() {
  const videoGrid = document.getElementById('video-grid');
  const writingGrid = document.getElementById('writing-grid');

  videoGrid.innerHTML = '';
  writingGrid.innerHTML = '';

  if (videoItems.length === 0) {
    videoGrid.innerHTML = '<div class="card"><p>No videos added yet.</p></div>';
  } else {
    videoItems.forEach((item) => videoGrid.appendChild(createVideoCard(item)));
  }

  if (writingItems.length === 0) {
    writingGrid.innerHTML = '<div class="card"><p>No writing pieces added yet.</p></div>';
  } else {
    writingItems.forEach((item) => writingGrid.appendChild(createWritingCard(item)));
  }
}

window.addEventListener('DOMContentLoaded', renderPortfolio);
