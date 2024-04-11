// automatic image slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


//scroll-fade
window.onload = function(){
  const fade =document.querySelector("#fade");

  window.addEventListener('scroll', scrollEffect);
  function scrollEffect() {
    if(window.scrollY>=200){
      fade.style.opacity = '0';
      fade.style.transform = 'translaeX(-50px)';
    }
    else{
      fade.style.opacity = '1';
      fade.style.transform = 'transalteX(0px)';
      fade.style.transition = '0.2s ease-in-out';
    }
  }
  scrollEffect()
}
