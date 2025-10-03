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
        "img": ["imgs/6n.png", "imgs/6o.png", "imgs/6m.png"],
        "description": "Re-designed book covers."
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
        "img": ["imgs/9l.png", "imgs/9m.png", "imgs/9d.png", "imgs/9e.png", "imgs/9g.mp4","imgs/9f.png","imgs/9h.png","imgs/9i.png", "imgs/9j.png", "imgs/9n.png"],
        "description": "Assorted works including woodcut relief printmaking and hand-made books."
      }
  ];
  

  
  const imageDisplay = document.getElementById('image-display');
  const workItems = document.querySelectorAll('.work');
  let currentImgIndex = 0;
  let currentProject = null;

  function updateCursorForImageCount() {
    if (!currentProject) {
      imageDisplay.classList.add('one-image');
      return;
    }
    if (currentProject.img.length === 1) {
      imageDisplay.classList.add('one-image');
    } else {
      imageDisplay.classList.remove('one-image');
    }
  }
  
  
  workItems.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const project = work.find(w => w.id === id);
        console.log("click on project:", project);
    
        if (project) {
          // Set active project and image
          currentProject = project;
          currentImgIndex = 0;
  
          // <-- CALL HERE to update cursor based on image count
          updateCursorForImageCount();
  
          showImage(currentProject.img);
    
          // REMOVE underline from all items
          workItems.forEach(w => w.classList.remove('work-und'));
    
          // ADD underline to the clicked one
          item.classList.add('work-und');
        }
      });
    });
  
  imageDisplay.onclick = (e) => {
    if (!currentProject) return;
  
    const bounds = imageDisplay.getBoundingClientRect();
    const clickX = e.clientX - bounds.left; // X coordinate inside the imageDisplay
    const middle = bounds.width / 2;
  
    if (clickX > middle) {
      // Clicked on right half — go forward
      currentImgIndex = (currentImgIndex + 1) % currentProject.img.length;
    } else {
      // Clicked on left half — go backward
      currentImgIndex = (currentImgIndex - 1 + currentProject.img.length) % currentProject.img.length;
    }
  
    showImage(currentProject.img);
    imageDisplay.scrollIntoView({ behavior: 'smooth' });
  };
  
  function showImage(images) {
    const currentFile = images[currentImgIndex];
    const isVideo = currentFile.match(/\.(mp4|webm|mov)$/i);
    const description = currentProject.description || "";
  
    imageDisplay.innerHTML = `
      ${isVideo 
        ? `<video src="${currentFile}" autoplay loop muted playsinline></video>`
        : `<img src="${currentFile}" alt="project image">`
      }
      <div class="image-info-bar">
        <div class="image-description">${description}</div>
        <div class="image-counter">${currentImgIndex + 1} / ${images.length}</div>
      </div>
    `;

  updateCursorForImageCount();

  }

  