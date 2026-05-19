const videoItems = [
  {
    title: 'October 7th, Two Years Later',
    description: 'A video I made while studying abroad in Israel, documenting my expereince on the second anniversary of the October 7th attack. The video was co-published by the Jerusalem Post.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/p/DPhCJ0pCuLM/embed',
  },
  {
    title: 'First Steps',
    description: 'My first experience solo-backpacking, documenting my hike from the Mediterranean coast to the Sea of Galilee.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/reel/DSvFRAfD4Lp/embed',
  },
  {
    title: 'Skis on Sale',
    description: 'Video I scripted, shot, and edited for the ski shop where I work to promote our end of season sale.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/p/DWRYbs-kUgB/embed'
  },
  {
    title: 'bootcap Giveaway',
    description: 'Collaboration between Crystal Ski Shop and bootcap to promote their product.',
    type: 'embed',
    embedUrl: 'https://www.instagram.com/reel/DVyl922EV1l/embed'
  }
];

const writingItems = [
    {
    title: 'AI Negotiation Brief',
    description: 'A concise exploration of AI-driven negotiation strategies and their real-world applications.',
    link: 'assets/writing/ai.html',
    },
    {
    title: 'Sudan Blog Post',
    description: 'A narrative-driven piece covering the social and cultural impact of current events in Sudan.',
    link: 'assets/writing/sudan.html',
  },
  {
    title: 'Armenia-Azerbaijan Analysis',
    description: 'An in-depth examination of the regional dynamics and conflict between Armenia and Azerbaijan.',
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
    wrapper.innerHTML = `
      <iframe
        src="${item.embedUrl}"
        title="${item.title}"
        loading="lazy"
        width="560"
        height="315"
        frameborder="0"
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
  link.href = item.link;
  link.textContent = 'Read full piece';
  card.appendChild(link);

  return card;
}

function renderPortfolio() {
  const videoGrid = document.getElementById('video-grid');
  const writingGrid = document.getElementById('writing-grid');

  videoGrid.innerHTML = '';
  writingGrid.innerHTML = '';

  if (videoItems.length === 0) {
    videoGrid.innerHTML = '<div class="card"><p>No videos added yet. Add items to the <code>videoItems</code> array in <code>script.js</code>.</p></div>';
  } else {
    videoItems.forEach((item) => videoGrid.appendChild(createVideoCard(item)));
  }

  if (writingItems.length === 0) {
    writingGrid.innerHTML = '<div class="card"><p>No writing pieces added yet. Add items to the <code>writingItems</code> array in <code>script.js</code>.</p></div>';
  } else {
    writingItems.forEach((item) => writingGrid.appendChild(createWritingCard(item)));
  }
}

window.addEventListener('DOMContentLoaded', renderPortfolio);
