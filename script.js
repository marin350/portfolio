const work = [
    {
      "id": "1",
      "title": "Whitney Museum of American Art",
      "img": ["imgs/1a.png", "imgs/1b.png", "imgs/1d.png", "imgs/1c.gif"],
      "description" : "Work created during summer internship at the Whitney Museum of American Art."
    },
    {
      "id": "2",
      "title": "The Juggernaut",
      "img": ["imgs/2a.jpg", "imgs/2b.JPG", "imgs/2c.JPG", "imgs/2d.JPG", "imgs/2e.gif", "imgs/2f.gif", "imgs/2k.mp4"],
      "description": "Visual Identity for the Juggernaut Summit + Merchandise Collection. Summit images by Krista Schlueter"
    },
    {
      "id": "10",
      "title": "Parallels and Patterns",
      "img": ["imgs/10c.jpg", "imgs/10b.jpg", "imgs/10a.mp4", "imgs/10d.jpg"],
      "description": "Reflecing on multi-generational family photos, Indian artworks and what patterns are present within them."
    },
    {
        "id": "3",
        "title": "Quill Typeface",
        "img": ["imgs/3a.png", "imgs/3b.png", "imgs/3c.png", "imgs/3d.gif", "imgs/3e.mp4"],
        "description": "Typeface + Specimen inspired by woodcut type and German playing cards."
      },
      {
        "id": "4",
        "title": "A_Guide_To_Morse_Code",
        "img": ["imgs/4a.png", "imgs/4b.png", "imgs/4c.png", "imgs/4d.png", "imgs/4e.png", "imgs/4f.png", "imgs/4g.png", "imgs/4h.png", "imgs/4i.png", "imgs/4j.png", "imgs/4k.png", "imgs/4l.png", "imgs/4m.png", "imgs/4n.png", "imgs/4o.png"],
        "description": "Pocket-sized coptic stitched guide to understanding and communicating in Morse Code."
      },
      {
        "id": "6",
        "title": "Book Covers",
        "img": ["imgs/6n.png", "imgs/6o.png", "imgs/6m.png", "imgs/6s.png", "imgs/6t.png"],
        "description": "Re-designed and original book covers."
      },
      {
        "id": "5",
        "title": "Poster Designs",
        "img": ["imgs/5a.png", "imgs/11.png", "imgs/10.png", "imgs/6a.jpg"],
        "description": "Posters created for songs, musicians, and art."
      },
      {
        "id": "7",
        "title": "New York City Wiki Book",
        "img": ["imgs/6a.png", "imgs/6b.png", "imgs/6c.png", "imgs/6d.png", "imgs/6e.png", "imgs/6f.png", "imgs/6g.png", "imgs/6h.png", "imgs/6i.png", "imgs/6j.png"],
        "description": "Book design using the New York City Wikipedia page." 
      },
      {
        "id": "8",
        "title": "Timepiece Archive",
        "img": ["imgs/8a.mp4"],
        "description": "Website designed as an archive/collection of personal watches. <a href='https://marin350.github.io/timepiece-archive/' target='_blank'>Visit site →</a>"
      },
      {
        "id": "9",
        "title": "Printmaking + Artists' Books",
        "img": ["imgs/9o.JPG","imgs/9l.png", "imgs/9m.png", "imgs/9n.png", "imgs/9d.png", "imgs/9e.png", "imgs/9g.mp4","imgs/9f.png","imgs/9h.png","imgs/9i.png", "imgs/9j.png"],
        "description": "Assorted works including relief printmaking, mixed-media collographs, letterpress and hand-made books."
      }
  ];
  

let currentImgIndex = 0;
let currentProject = null;
const imageDisplay = document.getElementById('image-display');
const workItems = document.querySelectorAll('.work');

function updateCursorForImageCount() {
  if (!currentProject) return;
  if (currentProject.img.length === 1) {
    imageDisplay.classList.add('one-image');
  } else {
    imageDisplay.classList.remove('one-image');
  }
}

function showImage(direction = 'right') {
  if (!currentProject) return;

  const images = currentProject.img;
  const currentFile = images[currentImgIndex];
  const isVideo = currentFile.match(/\.(mp4|webm|mov)$/i);
  const description = currentProject.description || "";

  // Create new media element
  const newMedia = document.createElement(isVideo ? 'video' : 'img');
  newMedia.src = currentFile;
  newMedia.classList.add('slide-item');
  if (isVideo) {
    newMedia.autoplay = true;
    newMedia.loop = true;
    newMedia.muted = true;
    newMedia.playsInline = true;
  }

  // Add new media to display
  imageDisplay.appendChild(newMedia);

  // Animate new media in
  newMedia.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
  requestAnimationFrame(() => {
    newMedia.classList.remove(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
    newMedia.classList.add('active');
  });

  // Animate out previous media
  const prevMedia = imageDisplay.querySelectorAll('.slide-item.active');
  prevMedia.forEach(el => {
    if (el !== newMedia) {
      el.classList.remove('active');
      el.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');
      el.addEventListener('transitionend', () => el.remove());
    }
  });

  // Info bar
  let infoBar = imageDisplay.querySelector('.image-info-bar');
  if (!infoBar) {
    infoBar = document.createElement('div');
    infoBar.classList.add('image-info-bar');
    imageDisplay.appendChild(infoBar);
  }
  infoBar.innerHTML = `
    <div class="image-description">${description}</div>
    <div class="image-counter">${currentImgIndex + 1} / ${images.length}</div>
  `;

  updateCursorForImageCount();
}

workItems.forEach(item => {
  item.addEventListener('click', () => {
    const id = item.getAttribute('data-id');
    const project = work.find(w => w.id === id);
    if (project) {
      currentProject = project;
      currentImgIndex = 0;

      const oldSlides = imageDisplay.querySelectorAll('.slide-item, img'); 
      oldSlides.forEach(el => el.remove());

      showImage('right');

      workItems.forEach(w => w.classList.remove('work-und'));
      item.classList.add('work-und');
    }
  });
});



imageDisplay.onclick = (e) => {
  if (!currentProject) return;

  if (currentProject.img.length === 1) return;

  const bounds = imageDisplay.getBoundingClientRect();
  const clickX = e.clientX - bounds.left;
  const middle = bounds.width / 2;

  let direction;
  if (clickX > middle) {
    direction = 'right';
    currentImgIndex = (currentImgIndex + 1) % currentProject.img.length;
  } else {
    direction = 'left';
    currentImgIndex = (currentImgIndex - 1 + currentProject.img.length) % currentProject.img.length;

  }

  showImage(direction);
};

imageDisplay.addEventListener('mousemove', (e) => {
  if (!currentProject || currentProject.img.length === 1) {
    imageDisplay.style.cursor = 'url("imgs/circle-cursor.png"), auto';
    return;
  }

  const bounds = imageDisplay.getBoundingClientRect();
  const mouseX = e.clientX - bounds.left;
  const middle = bounds.width / 2;

  if (mouseX > middle) {
    imageDisplay.style.cursor = 'url("imgs/right-arrow.png"), auto';
  } else {
    imageDisplay.style.cursor = 'url("imgs/left-arrow.png"), auto';
  }
});

imageDisplay.addEventListener('mouseleave', () => {
  // Reset cursor when leaving the image display
  imageDisplay.style.cursor = 'url("imgs/circle-cursor.png"), auto';
});

