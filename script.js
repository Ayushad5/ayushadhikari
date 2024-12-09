

  
const navbar = document.getElementById("navbar");
const button = document.querySelector('.my-button');
var myImage = document.getElementById("myImage");
button.addEventListener('click', () => {
    navbar.classList.toggle('show');
	navbar.style.transform = "scale(1)";
    button.classList.toggle('moved');

	if (myImage.src.match("image1.png")) {
		myImage.src = "./Images/image2.png";
	  } else {
		myImage.src = "./Images/image1.png";
	  }
});

// Select the <h2> element that you want to update
const topicHeading = document.querySelector('#topic');

// Select all of the sections that you want to track
const sections = document.querySelectorAll('[data-section-name]');

// Listen for the scroll event on the window object
window.addEventListener('scroll', () => {
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Loop through each section and check if it's currently in view
  sections.forEach(section => {
    // Get the section's position and height
    const sectionPosition = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Check if the section is currently in view
    if (scrollPosition >= sectionPosition && scrollPosition < sectionPosition + sectionHeight) {
      // Update the <h2> element with the section's name
      topicHeading.textContent = section.dataset.sectionName;
    }
  });
});

  

document.querySelector('#Ayush').scrollIntoView({
	behavior: 'smooth',
	block: 'start',
	inline: 'nearest',
	
  });
  
  const navbarLinks = document.querySelectorAll('.navbar a');

navbarLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
	navbar.classList.toggle('show');
	navbar.style.transform = "scale(1)";
    button.classList.toggle('moved');

	if (myImage.src.match("image1.png")) {
		myImage.src = "./Images/image2.png";
	  } else {
		myImage.src = "./Images/image1.png";
	  }
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const targetPosition = targetElement.offsetTop + 10;

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const animateScroll = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = easeInOutQuad(progress, startPosition, distance, duration);
      window.scrollTo(0, ease);
      if (progress < duration) window.requestAnimationFrame(animateScroll);
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    window.requestAnimationFrame(animateScroll);
  });
});


// Get the div element
var div = document.querySelector('.contact-c-p-m-1');

// Listen for the scroll event
window.addEventListener('scroll', function() {
// Check if the user has scrolled past a certain point
if (window.scrollY > 200) {
// Add the "active" class to the div
div.classList.add('active');
} else {
// Remove the "active" class from the div
div.classList.remove('active');
}
});

// Listen for the click event on the div
div.addEventListener('click', function() {
// Remove the "active" class from the div
div.classList.remove('active');
});



// // Create an Intersection Observer instance
// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
  const galleryImages = document.querySelectorAll('.gallery-img');

  galleryImages.forEach(function(image) {
    image.addEventListener('click', function() {
      // Add the zoomed class to the clicked image
      this.classList.toggle('zoomed');
    });
  });

  // Reset the zoomed image when scrolling
  window.addEventListener('scroll', function() {
    galleryImages.forEach(function(image) {
      image.classList.remove('zoomed');
    });
  });
});

const texts = [
  "Hello, there!",
  "नमस्ते",
  "¡Hola, ahí!",
  "Bonjour, là-bas!",
  "Hallo, da!",
  "Ciao, là!",
  "Привет, там!",
  "你好，那里！",
  "こんにちは、そこに！",
  "مرحبا، هناك!",
  "Olá, lá!"
];

let textIndex = 0;
let textElement = document.getElementById("text");

function typeText() {
  textElement.innerHTML = texts[textIndex];
  textElement.classList.add("typing");
  
  setTimeout(() => {
      textElement.classList.remove("typing");
      textElement.classList.add("backspace");
      
      setTimeout(() => {
          textElement.classList.remove("backspace");
          textIndex = (textIndex + 1) % texts.length;
          typeText();
      }, 500);
      
  }, 2000);
}

typeText();

