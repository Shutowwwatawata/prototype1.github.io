// スクロール表示時にクラス付与
// $("header").on("inview", function (event, isInView) {
//   if (isInView) {
//     $(this).stop().addClass("is-show");
//   }
// });

// FVスライダー
$('.slider-fv').slick({
  infinite: false,
  arrows: false,
  // lazyLoad: 'progressive', //LazyLoad使う場合
  dots:true,
  customPaging: function(slick,index) {
    // スライダーのインデックス番号に対応した画像のsrcを取得
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    // slick-dots > li　の中に上記で取得した画像を設定
    return '<img src=" ' + targetImage + ' "/>';
  }
  // asNavFor: '.slider-nav',
  // slidesToShow: 1,
  // slidesToScroll: 1,
  // variableWidth: true,
  // responsive: [
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       slidesToShow: 1,
  //     }
  //   }
  // ]
});
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
$('.slider-nav').slick({
  infinite: false,
  arrows: false,
  focusOnSelect: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.slider-fv',
});

$(window).on('load', function () {
  var $hero = $('.csp-hero');
  var $legacyBlock = $('.sec-01 .block-01');
  var projectHeight = $hero.length ? $hero.outerHeight() : $legacyBlock.height();

  if (projectHeight) {
    $('#project-detail').height(projectHeight);
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

// よくある質問
$('.faq-item dt').click(function () {
  $(this).next('dd').slideToggle();
  $(this).toggleClass('open');
});

