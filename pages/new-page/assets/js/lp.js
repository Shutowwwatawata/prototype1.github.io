// スクロール表示時にクラス付与
// $("header").on("inview", function (event, isInView) {
//   if (isInView) {
//     $(this).stop().addClass("is-show");
//   }
// });

// 企業ロゴスライダー
if ($('.slider-company').length) {
  var $slider = $('.slider-company');
  var columnCount = $slider.find('.logo-column').length;
  var baseSlidesToShow = Math.min(5, columnCount);
  var tabletSlidesToShow = Math.min(4, baseSlidesToShow);
  var mobileSlidesToShow = Math.min(2, baseSlidesToShow);
  var needsScroll = columnCount > baseSlidesToShow;
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var autoplayEnabled = needsScroll && !prefersReducedMotion;

  $slider.slick({
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: autoplayEnabled,
    autoplaySpeed: 2400,
    speed: 650,
    cssEase: 'ease-out',
    slidesToShow: baseSlidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: tabletSlidesToShow,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: mobileSlidesToShow,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: mobileSlidesToShow,
        }
      }
    ]
  });

  // Enable trackpad horizontal scroll to navigate the slider smoothly.
  var wheelDelta = 0;
  var wheelLocked = false;
  var wheelUnlockTimer = null;
  var wheelThreshold = 40;

  $slider.on('wheel', '.slick-list', function (event) {
    var originalEvent = event.originalEvent;
    if (!originalEvent) {
      return;
    }

    var deltaX = originalEvent.deltaX || 0;
    var deltaY = originalEvent.deltaY || 0;
    var useDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : 0;

    if (!useDelta) {
      return;
    }

    event.preventDefault();
    wheelDelta += useDelta;

    if (Math.abs(wheelDelta) < wheelThreshold || wheelLocked) {
      return;
    }

    wheelLocked = true;
    if (wheelDelta > 0) {
      $slider.slick('slickNext');
    } else {
      $slider.slick('slickPrev');
    }

    wheelDelta = 0;
    clearTimeout(wheelUnlockTimer);
    wheelUnlockTimer = setTimeout(function () {
      wheelLocked = false;
    }, 250);
  });
}

$(window).on('load', function () {
  var $hero = $('.csp-hero');

  if ($hero.length) {
    $('#project-detail').height($hero.outerHeight());
  }
});

$('.more-btn').on('click', function() {
  $(this).fadeToggle();
  $(this).parents('#project-detail').addClass('slide-down');
  // if( $(this).children().is('.open') ) {
  //   // $(this).html('<p class="close">閉じる</p>').addClass('close-btn');
  // } else {
  //   // $(this).html('<p class="open">もっと見る</p>').removeClass('close-btn');
  //   $(this).parent().removeClass('slide-down').addClass('slide-up');
  // }
});

document.addEventListener("DOMContentLoaded", function () {
  const donationButtons = document.querySelectorAll("[data-donation-button]");
  const modal = document.getElementById("donation-modal");
  const closeBtn = document.getElementById("donation-modal-close");
  if (!modal || donationButtons.length === 0) return;

  modal.hidden = true;
  modal.style.display = "none";
  document.body.classList.remove("modal-open");

  const openModal = () => {
    modal.hidden = false;
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
    const focusTarget = modal.querySelector(".donation-modal");
    if (focusTarget) {
      focusTarget.focus();
    }
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  };

  donationButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
});

