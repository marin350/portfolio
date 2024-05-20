function navigateToPage(pageURL) {
    window.location.href = pageURL; 
  }

var row = document.querySelector("tr")

var images = document.querySelectorAll(".images")

var p1 = document.querySelector(".p1")
var p2 = document.querySelector(".p2")
var p3 = document.querySelector(".p3")
var p4 = document.querySelector(".p4")
var p5 = document.querySelector(".p5")
var p6 = document.querySelector(".p6")
var p7 = document.querySelector(".p7")
var p8 = document.querySelector(".p8")

var r1 = document.getElementById("r1")
var r2 = document.getElementById("r2")
var r3 = document.getElementById("r3")
var r4 = document.getElementById("r4")
var r5 = document.getElementById("r5")
var r6 = document.getElementById("r6")
var r7 = document.getElementById("r7")
var r8 = document.getElementById("r8")



r1.addEventListener("mouseover", image =>{
    p1.style.opacity = "100%"
})
r1.addEventListener("mouseout", image=>{
    p1.style.opacity = "0%"
})

r2.addEventListener("mouseover", image =>{
    p2.style.opacity = "100%"
})
r2.addEventListener("mouseout", image=>{
    p2.style.opacity = "0%"
})

r3.addEventListener("mouseover", image =>{
    p3.style.opacity = "100%"
})
r3.addEventListener("mouseout", image=>{
    p3.style.opacity = "0%"
})

r4.addEventListener("mouseover", image =>{
    p4.style.opacity = "100%"
})
r4.addEventListener("mouseout", image=>{
    p4.style.opacity = "0%"
})

r5.addEventListener("mouseover", image =>{
    p5.style.opacity = "100%"
})
r5.addEventListener("mouseout", image=>{
    p5.style.opacity = "0%"
})

r6.addEventListener("mouseover", image =>{
    p6.style.opacity = "100%"
})
r6.addEventListener("mouseout", image=>{
    p6.style.opacity = "0%"
})

r7.addEventListener("mouseover", image =>{
    p7.style.opacity = "100%"
})
r7.addEventListener("mouseout", image=>{
    p7.style.opacity = "0%"
})

r8.addEventListener("mouseover", image =>{
    p8.style.opacity = "100%"
})
r8.addEventListener("mouseout", image=>{
    p8.style.opacity = "0%"
})

document.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    document.querySelector('.scrolling-section').style.transform = `translateY(${-scrollPosition * 0.5}px)`;
});




//draggable
// Get all draggable images
const draggableImages = document.querySelectorAll('.draggable-img');

// Add event listeners for each draggable image
draggableImages.forEach(image => {
  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  image.addEventListener('mousedown', dragStart, false);
  image.addEventListener('mouseup', dragEnd, false);
  image.addEventListener('mousemove', drag, false);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === image) {
      active = true;
    }
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, image);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
});
