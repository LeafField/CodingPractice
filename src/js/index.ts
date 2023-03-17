import "ress";
import "../styles/style.scss";

// ハンバーガーメニューの実装
// 必要な要素の取得
const header = document.querySelector(".header") as HTMLHeadElement;
const hamburger = document.querySelector(".hamburger") as HTMLDivElement;
const nav = document.querySelector(".header__nav") as HTMLElement;
const hamburgerLinks = document.querySelectorAll(
  ".header__nav ul li a"
) as NodeListOf<HTMLLinkElement>;

// アクティブ時に付与するクラス名の定義
const active = "js-active";

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle(active);
  nav.classList.toggle(active);
});

// ハンバーガーメニューを閉じる関数
const closeHamburger = () => {
  if (!hamburger.classList.contains(active)) return;
  hamburger.classList.remove(active);
  nav.classList.remove(active);
};

// 画面リサイズ時にハンバーガーメニューを閉じる
window.addEventListener("resize", closeHamburger);

// ハンバーガーメニュークリック時のアクション
const scrollAnimation = (e: MouseEvent) => {
  e.preventDefault();
  closeHamburger();

  const eventElement = e.target as HTMLLinkElement;
  const target = eventElement.getAttribute("href")!.replace("#", "");
  const headerHight = header.clientHeight;

  if (target) {
    const targetTop = document
      .getElementById(target)!
      .getBoundingClientRect().top;
    const rect = targetTop - headerHight;
    scrollBy(0, rect);
  } else {
    scrollTo(0, 0);
  }
};

// ハンバーガーメニュークリック時のアクションを登録
hamburgerLinks.forEach((link) => {
  link.addEventListener("click", (e) => scrollAnimation(e));
});
