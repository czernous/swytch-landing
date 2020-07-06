
//Navbar
//Hamburger button animation/controls
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".animate-nav");
  const sideMenu = document.getElementById("side-menu");
  const sideMenuNav = document.getElementById("side-menu-nav");
  const projects = document.querySelector(".main-content.projects-section");
  const overlay = document.querySelector(".overlay");
  const menuControl = function menuAnimate() {
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("slide-from-top");
    sideMenu.classList.toggle("side-menu-visible");
    // overlay.classList.toggle("overlay-on");
    // projects.classList.toggle("send-back");
    sideMenuNav.style.display = 'block';
  };
  hamburger.addEventListener("click", menuControl);
  sideMenuNav.addEventListener("click", menuControl);
//Slide Navbar UP/Down on Scroll
let scrollPos = 50;
const nav = document.getElementById('header');
const navBg = document.querySelector(".header-bg");
function checkPosition() {
  let windowY = window.scrollY;
  if ((windowY < scrollPos) && (windowY > 20)) {
    // Scrolling UP
    nav.style.display = "flex";
    navBg.classList.add("header-bg-slide-down");
  } else if ((scrollPos = windowY) && (windowY > 20)){
    // Scrolling DOWN
  nav.style.display = "none";
  navBg.classList.remove("header-bg-slide-down");
  navBg.classList.remove("header-bg-slide-up");
  } else {
    navBg.classList.add("header-bg-slide-up");
    //hide nav background at the top of the screen
  }
  scrollPos = windowY;
}
window.addEventListener('scroll', checkPosition);
//Main content slider
const contentSlides = document.querySelectorAll('.content-slide');
const slides = Array.from(contentSlides);
const nextBtn = document.getElementById('right-arrow');
const prevBtn = document.getElementById('left-arrow');
//Hide and show slides
function activeOnOff(){
    let i;
    for (i = 0; i >= 0 && i < slides.length; i++) {
    if (i != counter) {
      slides[i].classList.remove("active");
    }
    slides[counter].classList.add("active");    
  }
}
//stop and resume the video
function stopVideo(element) {
    const iframe = element.querySelector('iframe');
    let iframeSrc = "https://www.youtube.com/embed/RGCNW2KOtIE"
    const autoplay = "?autoplay=1;rel=0";
    if (counter === 1 && counter != null) {
      iframeSrc += autoplay;
    }      
    else if (counter !== 1) {
        iframe.src = null;
    }
      iframe.src = iframeSrc;
}
// Carousel
let counter = 0;
nextBtn.addEventListener('click', () =>{
  counter++;
  carousel();
});
prevBtn.addEventListener('click', () =>{
  counter--;
  carousel();
});
//Show and hide prev/next buttons on slide change
function btnShowHide() {
  if(counter < slides.length -2){
    nextBtn.style.display = "flex";
  }
  else {
    nextBtn.style.display = "none";
  }
  if (counter > 0){
    prevBtn.style.display = "flex";
  }
  else {
    prevBtn.style.display = "none";
  }
}
//Navigate to slide 
function currentSlide(n) {
  activeOnOff(counter = n);
  stopVideo(slides[1]);
  btnShowHide();
}
//carousel control
function carousel(){
  btnShowHide();
  activeOnOff();
  stopVideo(slides[1]);
}
prevBtn.style.display = "none";
//Product image slider
let currentItem = 0;
const productContainer = document.querySelector(".product-container");
const productSlides = document.querySelectorAll(".product-slide");
const items = Array.from(productSlides);
function productCarousel(){
  let r = Math.floor(Math.random() * items.length);
  let i;
  for (i = 0; i >= 0 && i < items.length; i++) {
    if (i != r) {
      items[i].classList.remove("active");
    }
    items[r].classList.add("active");
  }
}
let observer = new IntersectionObserver((entries, observer) => { 
  entries.forEach(entry => {
    if(entry.isIntersecting){
      setInterval(productCarousel, 10000); 
    }
    clearInterval(productCarousel);
  });
}, {threshold: 1});
observer.observe(productContainer);
//prevent video from playing on load/refresh
document.addEventListener('DOMContentLoaded', stopVideo(slides[1]));
//Reviews
// local reviews data
const reviews = [
  {
    id: 1,
    name: "Craig Skelton",
    kit: "KIT-BROMPTON",
    img:
      "https://s3-eu-west-1.amazonaws.com/reviewscouk/assets/upload-e2909bc7237cfa54c625f809802c045b-1579803385.jpg",
    text:
      "My Brompton kit arrived 2 months early, so am very pleased. I was expecting it to arrive in March. It fit easily to my Brompton B75 and I had a great first commute into London today with it. Thanks Swytch!",
  },
  {
    id: 2,
    name: "Bill Liebling",
    kit: "KIT-250W",
    img:
      "https://s3-eu-west-1.amazonaws.com/reviewscouk/assets/upload-33a16c8d2ef86b5647ec37314d3d76be-1570538593.jpeg",
    text:
      "I’ve been pretty happy with my swytch so far. When it works it is great, but it can be a bit finicky. I’m glad I got the throttle, as that works every time! The pedal assist can be a bit spotty. I recently did two 55 mile days over some fairly hilly country and the switch really helped! The battery lasted almost the whole time!",
  },
  {
    id: 3,
    name: "Greg Barjielski",
    kit: "KIT-250W",
    img:
      "https://s3-eu-west-1.amazonaws.com/reviewscouk/assets/upload-a378d768f02d6b48d4175187278e181e-1579805696.jpg",
    text:
      "The new Swytch kit is very nice and small, but the power is pretty nice and it has good range for such a small pack. We are trialling it for our fleet of sharing bikes.",
  },
  {
    id: 4,
    name: "Jaime",
    kit: "KIT-250W",
    img:
      "https://s3-eu-west-1.amazonaws.com/reviewscouk/assets/upload-481061/94b20c71c06bf45c381eba7d65fea3991579190512.jpg",
    text:
      "This kit has transformed my commute, 7.5 miles each way along canal paths with very steep lock bridges, no sweat!",
  },
];
// select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const kit = document.getElementById("kit");
const info = document.getElementById("info");

const prevReview = document.querySelector(".prev-btn");
const nextReview = document.querySelector(".next-btn");

// set starting item
let currentReview = 0;

// load initial item
window.addEventListener("DOMContentLoaded", () => {
  const item = reviews[currentReview];
  img.src = item.img;
  author.textContent = item.name;
  kit.textContent = item.kit;
  info.textContent = item.text;
});

// show person based on item
function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  kit.textContent = item.kit;
  info.textContent = item.text;
}
// show next person
nextReview.addEventListener("click",  () => {
  currentReview++;
  if (currentReview > reviews.length - 1) {
    currentReview = 0;
  }
  showPerson(currentReview);
});
// show prev person
prevReview.addEventListener("click",  () => {
  currentReview--;
  if (currentReview < 0) {
    currentReview = reviews.length - 1;
  }
  showPerson(currentReview);
});

//Payment page modal
const payBtn = document.querySelector('#pay-btn');
const closeBtn = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');
function openModal() {
  modalOverlay.classList.add('open-modal');
  return false;
}

closeBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('open-modal');
  currentSlide(0);
  stopVideo(slides[1]);
});


//countdown timer
const deadline = document.querySelector('.deadline');
const item = document.querySelector('.hours');

let today = new Date().getTime();

const futureDate = new Date("Jul 10, 2020 00:00:00");

const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  let hours = t/oneHour;
  hours = Math.floor(hours);
  // let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);
  item.textContent = hours;
  if (futureTime < today) {
    item.textContent = "0";
  }

}
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();