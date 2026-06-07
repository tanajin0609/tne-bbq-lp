/* =============================================================
   SUMMER BBQ 2026 — 共通スクリプト（A案・B案で共有）
   依存ゼロ。スクロール演出は IntersectionObserver で実現。
   ============================================================= */
(function () {
  "use strict";

  /* ---------- 1. スクロールでフェードイン（.reveal → .is-visible） ---------- */
  var revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // 一度表示したら監視解除
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px", // 画面下端の少し手前で発火
      }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // IntersectionObserver 非対応環境ではそのまま表示
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 2. ヘッダーの背景切り替え（ヒーローを抜けたら不透明に） ---------- */
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");

  if (header && hero && "IntersectionObserver" in window) {
    var headerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // ヒーローがほぼ見えなくなったらヘッダーを不透明に
          header.classList.toggle("is-scrolled", entry.intersectionRatio < 0.1);
        });
      },
      { threshold: [0, 0.1] }
    );
    headerObserver.observe(hero);
  } else if (header) {
    // フォールバック：スクロール量で判定
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.8);
      },
      { passive: true }
    );
  }
})();
