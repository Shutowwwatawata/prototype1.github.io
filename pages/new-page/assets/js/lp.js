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

  $slider.slick({
    infinite: false,
    arrows: false,
    dots: false,
    autoplay: needsScroll,
    autoplaySpeed: 2000,
    speed: 600,
    slidesToShow: baseSlidesToShow,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: false,
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

