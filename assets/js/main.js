/**
* 最大幅に基づいてviewport設定を切り替える関数。
* @function
* @param {number} maxWidth - viewportを固定する際の最大幅
*/
const switchViewport = (maxWidth) => {
  const viewport = document.querySelector('meta[name="viewport"]');
  const value =
    window.outerWidth > maxWidth
      ? "width=device-width,initial-scale=1"
      : `width=${maxWidth}`;
  if (viewport.getAttribute("content") !== value) {
    viewport.setAttribute("content", value);
  }
};
addEventListener("resize", () => switchViewport(375));
switchViewport(375);



// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  //定義
  const drawerIcon = document.querySelector('.p-drawer__icon');
  const drawer = document.querySelector('.p-drawer');
  const drawerNavItem = document.querySelectorAll('.p-drawer__body a[href^="#"]');
  const headerHeight = document.querySelector('.p-header').offsetHeight;
  const breakpoint = 768;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  //メニューを開くアニメーション
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
    }
  }

  //メニューを閉じるアニメーション
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      isMenuOpen = false;
    }
  }

  //メニューの開閉動作
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  //リサイズ処理
  const handleResize = () => {
    const bp = breakpoint;
    const windowWidth = window.innerWidth;
    if (windowWidth > bp && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= bp && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };

  //メニュー外クリック処理
  const clickOuter = (event) => {
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  }

  //該当箇所までスクロール
  const linkScroll = (target) => {
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  //ヘッダーアイコン クリック時
  drawerIcon.addEventListener("click", toggleMenu);
  //画面幅リサイズ時
  window.addEventListener("resize", handleResize);
  //メニュー外クリック時
  document.addEventListener("click", clickOuter);
  //ページ内リンクナビメニュー クリック時
  drawerNavItem.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});

// 背景固定＋奥行き感スクロール
document.addEventListener('DOMContentLoaded', function () {
  const orImg = document.getElementById('or-img');
  const cpontan = document.getElementById('cpontan');

  // 2秒後: モノクロ化
  setTimeout(() => {
    orImg.classList.add('gray');

    // さらに2秒後: フェードアウト
    setTimeout(() => {
      orImg.classList.add('fadeout');

      // さらに2秒後: C-PONTAN スライドイン
      setTimeout(() => {
        cpontan.classList.add('animate');
      }, 2000);

    }, 2000);
  }, 2000);
});



// scroll animation
document.querySelectorAll(".scroll_wrap").forEach((wrap) => {
  const triggers = wrap.querySelectorAll(".scroll_trigger");
  const items = wrap.querySelectorAll(".scroll_item");

  triggers.forEach((trigger, index) => {
    const background = trigger.querySelector(".scroll_background");
    const item = items[index];

    if (index === 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
        defaults: { ease: "none" },
      });

      tl.fromTo(
        item,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
      );
    } else if (index === items.length - 1) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
        },
        defaults: {
          ease: "none"
        },
      });

      tl.fromTo(
        item,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
      );
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
        defaults: {
          ease: "none"
        },
      });

      tl.fromTo(
        item,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
      );
      tl.to(
        item, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });
    }

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      defaults: {
        ease: "none"
      }
    });
    tl2.to(background, { yPercent: 50 });
  });
});


//swiper01
// Swiper インスタンスを保持
const swiperInstances = {};

// カスタムプログレスバー更新関数
function updateRecommendProgress(swiper) {
  const container = document.querySelector(".p-recommend-slider__custom-progress");
  if (!container) return;

  const fill = container.querySelector(".p-recommend-slider__custom-progress__fill");
  const current = container.querySelector(".p-recommend-slider__custom-progress__current");
  const total = container.querySelector(".p-recommend-slider__custom-progress__total");

  if (current && total) {
    current.textContent = swiper.realIndex + 1;
    total.textContent = swiper.slides.length - swiper.loopedSlides * 2;
  }

  if (fill) {
    fill.style.transition = "none";
    fill.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = "width 3s linear";
        fill.style.width = "100%";
      });
    });
  }
}

// recommend スライダー初期化
function initRecommendSwiper() {
  const selector = ".js-swiper-recommend";
  const container = document.querySelector(selector);
  if (!container) return;

  // すでに初期化済みならスキップ
  if (swiperInstances["recommend"]) return;

  const swiper = new Swiper(selector, {
    speed: 1000,
    effect: "slide",
    allowTouchMove: true,
    loop: true,
    centeredSlides: false,
    slidesPerView: "auto",
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".p-recommend-slider__swiper-button-prev",
      nextEl: ".p-recommend-slider__swiper-button-next",
    },
    on: {
      init: (swiper) => updateRecommendProgress(swiper),
      slideChange: (swiper) => updateRecommendProgress(swiper),
    },
  });

  container.swiper = swiper;
  swiperInstances["recommend"] = swiper;
}

// ページロードで初期化
window.addEventListener("load", () => {
  initRecommendSwiper();
});

