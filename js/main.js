(function () {

  'use strict';

  // smooth scroll
  $("a").on("click", function (event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate({

        scrollTop: $(hash).offset().top - 50

      }, 850);

    }

  });

  // gallery lightbox
  $(document).ready(function () {
    $('.gallery-grid').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true },
      image: { titleSrc: 'title' }
    });
  });

  // navbar hide on click
  $(".navbar li a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // navbar on scroll
  $(window).on("scroll", function () {

    var onScroll = $(this).scrollTop();

    if (onScroll > 50) {
      $(".navbar").addClass("navbar-fixed");
    }
    else {
      $(".navbar").removeClass("navbar-fixed");
    }

  });

  // Load reviews from JSON file
  $.getJSON('reviews.json', function (data) {
    const reviews = data.reviews;

    // Divide reviews into 3 balanced rows
    const third = Math.ceil(reviews.length / 3);
    const row1 = reviews.slice(0, third);
    const row2 = reviews.slice(third, third * 2);
    const row3 = reviews.slice(third * 2);

    // Generate review cards HTML
    function createReviewCard(review) {
      const stars = '★'.repeat(review.rating);
      const cleanText = review.review_text.replace(/\n\n/g, ' ').replace(/\n/g, ' ');

      return `
        <div class="review-card">
          <div class="review-header">
            <div class="name-stars">
              <h5>${review.reviewer_name}</h5>
              <div class="stars">${stars}</div>
            </div>
            <div class="customer-type">${review.customer_type}</div>
          </div>
          <p>"${cleanText}"</p>
        </div>
      `;
    }

    // Populate each row with duplicated content for seamless scrolling
    function populateRow(selector, reviews) {
      const track = $(selector).find('.reviews-track');
      let html = '';

      // Add original reviews twice for perfect seamless loop
      reviews.forEach(review => {
        html += createReviewCard(review);
      });
      
      reviews.forEach(review => {
        html += createReviewCard(review);
      });

      track.html(html);
    }

    // On phones: one swipeable row with every review once, no marquee
    if (window.matchMedia('(max-width: 767px)').matches) {
      let html = '';
      reviews.forEach(review => {
        html += createReviewCard(review);
      });
      $('.reviews-row:first').find('.reviews-track').html(html);
      $('.reviews-row').slice(1).hide();
      $('#reviews').addClass('reviews-swipe');
    } else {
      // Populate all rows
      populateRow('.reviews-row[data-direction="left"]:first', row1);
      populateRow('.reviews-row[data-direction="right"]', row2);
      populateRow('.reviews-row[data-direction="left"]:last', row3);
    }

    // Initialize hover effects after content is loaded
    initializeReviewsHover();
  }).fail(function () {
    $('#reviews').hide();
  });

  // Initialize animation controls
  function initializeReviewsHover() {
    // Add staggered animation delays
    $('.reviews-row').each(function (index) {
      $(this).find('.reviews-track').css('animation-delay', (index * 3) + 's');
    });

    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        $('.reviews-track').css('animation-play-state', 'paused');
      } else {
        $('.reviews-track').css('animation-play-state', 'running');
      }
    });
  }

})();

// Email encryption to prevent spam
function decryptEmail() {
  var encoded = "vasb@fxljbex.va"; // ROT13 encoded email
  var decoded = "";
  for (var i = 0; i < encoded.length; i++) {
    var c = encoded.charCodeAt(i);
    if (c >= 97 && c <= 122) { // a-z
      decoded += String.fromCharCode((c - 97 + 13) % 26 + 97);
    } else if (c >= 65 && c <= 90) { // A-Z
      decoded += String.fromCharCode((c - 65 + 13) % 26 + 65);
    } else {
      decoded += encoded.charAt(i);
    }
  }
  window.location.href = "mailto:" + decoded;
}

// Phone encryption to prevent spam
function decryptPhone() {
  var encoded = "+91 9029208698".split('').map(function (c) {
    if (c >= '0' && c <= '9') {
      return String.fromCharCode(((c.charCodeAt(0) - 48 + 5) % 10) + 48);
    }
    return c;
  }).join('');
  var decoded = "+91 9029208698";
  window.location.href = "tel:" + decoded.replace(/\s/g, '');
}
