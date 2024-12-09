class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.connections = [];
    this.hue = Math.random() * 60 + 200; // Blue-ish colors
  }

  update(particles, mouseX, mouseY) {
    // Movement
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;

    // Find nearby particles to connect
    this.connections = [];
    particles.forEach(particle => {
      if (particle !== this) {
        const dx = this.x - particle.x;
        const dy = this.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.connections.push({
            particle,
            distance
          });
        }
      }
    });

    // Mouse interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      this.x -= dx * 0.02;
      this.y -= dy * 0.02;
    }
  }

  draw() {
    // Draw particle
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
    this.ctx.fill();

    // Draw connections
    this.connections.forEach(connection => {
      const opacity = 1 - connection.distance / 100;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(connection.particle.x, connection.particle.y);
      this.ctx.strokeStyle = `hsla(${this.hue}, 70%, 60%, ${opacity * 0.5})`;
      this.ctx.lineWidth = opacity;
      this.ctx.stroke();

      // Draw electric effect
      if (Math.random() < 0.03) { // Occasional electric spark
        this.drawElectricEffect(connection.particle);
      }
    });
  }

  drawElectricEffect(targetParticle) {
    const points = this.generateLightningPoints(this.x, this.y, targetParticle.x, targetParticle.y);
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    
    points.forEach(point => {
      this.ctx.lineTo(point.x, point.y);
    });
    
    this.ctx.lineTo(targetParticle.x, targetParticle.y);
    this.ctx.strokeStyle = `hsla(${this.hue + 180}, 100%, 70%, 0.3)`;
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
  }

  generateLightningPoints(x1, y1, x2, y2) {
    const points = [];
    const segments = 5;
    const deviation = 20;
    
    for (let i = 1; i < segments; i++) {
      const x = x1 + (x2 - x1) * (i / segments);
      const y = y1 + (y2 - y1) * (i / segments);
      points.push({
        x: x + (Math.random() - 0.5) * deviation,
        y: y + (Math.random() - 0.5) * deviation
      });
    }
    
    return points;
  }
}

class MouseTrailParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.life = 1; // Full life
    this.color = `hsla(${Math.random() * 60 + 200}, 70%, 60%`; // Blue-ish colors
    this.decay = 0.03; // How fast particle fades
  }

  update(deltaTime) {
    this.life -= this.decay * (deltaTime / 16); // Adjust decay by frame rate
    return this.life > 0;
  }

  draw(ctx) {
    ctx.fillStyle = `${this.color}, ${this.life})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class ClickParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI * 2;
    this.velocity = Math.random() * 4 + 2;
    this.life = 1;
    this.decay = 0.02;
    this.color = `hsla(${Math.random() * 60 + 200}, 70%, 60%`;
  }

  update(deltaTime) {
    this.velocity *= 0.98;
    this.x += Math.cos(this.angle) * this.velocity * (deltaTime / 16);
    this.y += Math.sin(this.angle) * this.velocity * (deltaTime / 16);
    this.life -= this.decay * (deltaTime / 16);
    return this.life > 0;
  }

  draw(ctx) {
    ctx.fillStyle = `${this.color}, ${this.life})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Modify ParticleSystem class to handle only background particles
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.canvas.style.display = 'block';
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });

    // Create particles
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.canvas));
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.fillStyle = 'rgba(6, 11, 25, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.update(this.particles, this.mouseX, this.mouseY);
      particle.draw();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Add new MouseEffectsSystem class
class MouseEffectsSystem {
  constructor() {
    this.canvas = document.getElementById('mouse-effects-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.trailParticles = [];
    this.clickParticles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.lastTime = 0;
    this.lastTrailTime = 0;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
    
    window.addEventListener('click', (e) => {
      for (let i = 0; i < 12; i++) {
        this.clickParticles.push(new ClickParticle(e.x, e.y));
      }
    });

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime || 0;
    this.lastTime = timestamp;
    
    // Clear canvas with full transparency
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Create trail particles
    if (timestamp - this.lastTrailTime > 20) {
      const dx = this.mouseX - this.lastMouseX;
      const dy = this.mouseY - this.lastMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 1) {
        this.trailParticles.push(new MouseTrailParticle(this.mouseX, this.mouseY));
        this.lastTrailTime = timestamp;
      }
      
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
    }

    // Update and draw trail particles
    this.trailParticles = this.trailParticles.filter(particle => {
      const isAlive = particle.update(deltaTime);
      if (isAlive) particle.draw(this.ctx);
      return isAlive;
    });

    // Update and draw click particles
    this.clickParticles = this.clickParticles.filter(particle => {
      const isAlive = particle.update(deltaTime);
      if (isAlive) particle.draw(this.ctx);
      return isAlive;
    });

    requestAnimationFrame((timestamp) => this.animate(timestamp));
  }
}

// Desktop gallery initialization
document.addEventListener('DOMContentLoaded', () => {
  let galleryInitialized = false;
  let lightbox, lightboxImage, prevButton, nextButton, closeButton;
  let currentImageIndex = 0;
  
  // Check if viewport is desktop
  const isDesktop = () => window.innerWidth >= 768;

  // Initialize desktop gallery
  const initDesktopGallery = () => {
    if (galleryInitialized || !isDesktop()) return;

    const gallery = document.querySelector('#gallery');
    const images = document.querySelectorAll('.gallery-img');

    // Create lightbox elements
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-prev lightbox-nav">❮</div>
        <div class="lightbox-next lightbox-nav">❯</div>
        <div class="lightbox-close">×</div>
      </div>
    `;
    document.body.appendChild(lightbox);

    lightboxImage = lightbox.querySelector('.lightbox-image');
    prevButton = lightbox.querySelector('.lightbox-prev');
    nextButton = lightbox.querySelector('.lightbox-next');
    closeButton = lightbox.querySelector('.lightbox-close');

    // Handle image loading and clicks
    images.forEach((img, index) => {
      img.classList.add('loading');
      
      img.addEventListener('load', () => {
        img.classList.remove('loading');
      });

      img.addEventListener('click', () => {
        if (!isDesktop()) return;
        currentImageIndex = index;
        showImage(currentImageIndex);
      });
    });

    // Navigation functions
    function showImage(index) {
      lightboxImage.src = images[index].src;
      lightbox.classList.add('active');
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    }

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage(currentImageIndex);
    }

    // Event listeners
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
    closeButton.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    // Keyboard navigation
    const keyboardHandler = (e) => {
      if (!lightbox.classList.contains('active') || !isDesktop()) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          lightbox.classList.remove('active');
          break;
      }
    };

    document.addEventListener('keydown', keyboardHandler);
    galleryInitialized = true;
  };

  // Cleanup function for mobile
  const cleanupDesktopGallery = () => {
    if (!galleryInitialized) return;
    
    lightbox?.remove();
    galleryInitialized = false;
  };

  // Initialize on load if desktop
  if (isDesktop()) {
    initDesktopGallery();
  }

  // Handle resize events
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isDesktop()) {
        initDesktopGallery();
      } else {
        cleanupDesktopGallery();
      }
    }, 250);
  });
});

// Initialize both systems
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth >= 768) {
    new ParticleSystem(); // Background particles
    new MouseEffectsSystem(); // Mouse effects
  }
});


// Add this to your scriptpc.js file

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('div[data-section-name]');
  const navLinks = document.querySelectorAll('.navbar a');

  // Add active class to navbar links
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for navbar height
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // Add scroll event listener
  window.addEventListener('scroll', updateActiveSection);
  
  // Initial check for active section
  updateActiveSection();
});
