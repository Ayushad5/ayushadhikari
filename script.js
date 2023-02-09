    
$('.profile-photo9').click(function() {
    $('.moreinfo').fadeIn();
    $('body').css('overflow', 'hidden');
  });
  $('.profile-photo10').click(function() {
    $('.moreinfo2').fadeIn();
    $('body').css('overflow', 'hidden');
  });
  $('.profile-photo11').click(function() {
    $('.moreinfo3').fadeIn();
    $('body').css('overflow', 'hidden');
  });
  $('.profile-photo12').click(function() {
    $('.moreinfo4').fadeIn();
    $('body').css('overflow', 'hidden');
  });
  $('.profile-photo13').click(function() {
    $('.moreinfo5').fadeIn();
    $('body').css('overflow', 'hidden');
  });
  $('.profile-photo14').click(function() {
    $('.moreinfo6').fadeIn();
    $('body').css('overflow', 'hidden');
  });
  
  $('.close-btn').click(function() {
    $('.moreinfo').fadeOut();
    $('body').css('overflow', 'auto');
  });
  
  $('.close-btn').click(function() {
    $('.moreinfo2').fadeOut();
    $('body').css('overflow', 'auto');
  });
  $('.close-btn').click(function() {
    $('.moreinfo3').fadeOut();
    $('body').css('overflow', 'auto');
  });
  $('.close-btn').click(function() {
    $('.moreinfo4').fadeOut();
    $('body').css('overflow', 'auto');
  });
  $('.close-btn').click(function() {
    $('.moreinfo5').fadeOut();
    $('body').css('overflow', 'auto');
  });
  $('.close-btn').click(function() {
    $('.moreinfo6').fadeOut();
    $('body').css('overflow', 'auto');
  });
  $('.next-btn').click(function() {
    var currentImg = $('.gameImg img.active');
    var nextImg = currentImg.next();
    
    if (nextImg.length) {
      currentImg.removeClass('active');
      nextImg.addClass('active');
    } else {
      currentImg.removeClass('active');
      $('.gameImg img:first-child').addClass('active');
    }
  });
  
  $('.prev-btn').click(function() {
    var currentImg = $('.gameImg img.active');
    var prevImg = currentImg.prev();
    
    if (prevImg.length) {
      currentImg.removeClass('active');
      prevImg.addClass('active');
    } else {
      currentImg.removeClass('active');
      $('.gameImg img:last-child').addClass('active');
    }
  });
  
   
    
  
      var video = document.getElementById("video");
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // check if the video is in picture-in- picture mode
          if (document.pictureInPictureElement === video) {
            // exit picture-in- picture mode
            document.exitPictureInPicture();
          }
        } else {
          video.requestPictureInPicture();
        }
      });
    });
    observer.observe(video);
      // Select all navigation buttons
      const navLinks = document.querySelectorAll(".navigation a");
  
      // Iterate over navigation buttons
      navLinks.forEach(link => {
        link.addEventListener("click", event => {
          event.preventDefault();
          const target = $(event.target.getAttribute("href"));
          $("html, body").animate({ scrollTop: target.offset().top }, 1000);
        });
      });
      const nav = document.querySelector("nav");
  
  window.addEventListener("scroll", event => {
    if (window.scrollY > 50) {
      setTimeout(() => {
        nav.classList.add("show-nav");
      }, 300);
    } else {
      setTimeout(() => {
        nav.classList.remove("show-nav");
      }, 300);
    }
  });
  $(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    });
  });
  
 
  