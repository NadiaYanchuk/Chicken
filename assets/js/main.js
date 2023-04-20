//Загрузка страницы, анимация курочки
function removeLoading() {
  setTimeout(function () {
    let loading = document.querySelector(".loading");
    loading.style.display = "none";
    let content = document.querySelector("#content");
    content.style.display = "block";
  }, 3000);
}

//Анимация лапок
document.addEventListener("click", function (event) {
  var svg = document.getElementById("footprint");
  var clone = svg.cloneNode(true);
  // устанавливаем позицию клонированного элемента на место клика мыши
  clone.style.position = "absolute";
  clone.style.left = event.pageX - 60 + "px";
  clone.style.top = event.pageY - 60 + "px";
  // добавляем случайный поворот для клонированного элемента
  var angle = Math.floor(Math.random() * 360);
  clone.style.transform = "rotate(" + angle + "deg)";

  document.body.appendChild(clone);

  setTimeout(function () {
    clone.parentNode.removeChild(clone);
  }, 3000);
});

//Анимация для изображениЙ
const aboutImg = document.querySelector(".about__img");
aboutImg.addEventListener("mouseenter", () => {
  aboutImg.style.transform = "scale(1.05)";
  aboutImg.style.transition = "transform 0.5s ease-in-out";
});

aboutImg.addEventListener("mouseleave", () => {
  aboutImg.style.transform = "scale(1)";
  aboutImg.style.transition = "transform 0.5s ease-in-out";
});

// Параллакс эффект
const imgParallax = document.querySelector('.home__img-parallax');
const imgParallaxRect = imgParallax.getBoundingClientRect(); // получаем размеры и позицию элемента .home__img-parallax

document.addEventListener('mousemove', (e) => {
  const x = e.clientX; // получаем координаты курсора мыши по оси X
  const y = e.clientY; // получаем координаты курсора мыши по оси Y

  const newX = (imgParallaxRect.width / 2 - x) / 30; // вычисляем новое положение по оси X
  const newY = (imgParallaxRect.height / 2 - y) / 30; // вычисляем новое положение по оси Y

  imgParallax.style.transform = `translate(${newX}px, ${newY}px)`; // задаем новое положение элемента .home__img-parallax
});

/*=============== ПОКАЗАТЬ МЕНЮ ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== СКРЫТЬ МЕНЮ =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== СКРЫТЬ МОБИЛЬНОЕ МЕНЮ ===============*/
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));


/*=============== ПРОКРУТКА ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== АККОРДИОНЫ ВОПРОС-ОТВЕТ ===============*/
const accordionItems = document.querySelectorAll(".questions__item");

accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector(".questions__header");

  accordionHeader.addEventListener("click", () => {
    const openItem = document.querySelector(".accordion-open");

    toggleItem(item);

    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector(".questions__content");

  if (item.classList.contains("accordion-open")) {
    accordionContent.removeAttribute("style");
    item.classList.remove("accordion-open");
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + "px";
    item.classList.add("accordion-open");
  }
};

/*=============== СКРОЛ СЕКЦИЙ ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== СКРОЛЛ ВВЕРХ ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 400) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== ТЕМНАЯ ТЕМА ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Ранее выбранная тема (если выбрана пользователем)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// Мы проверяем, выбрал ли пользователь ранее тему
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  // Добавить или удалить темную тему + иконку
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // Сохраняем тему и текущую иконку, которую выбрал пользователь
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== ПРОКРУТКА ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.home__data`);
sr.reveal(`.home__img`, { delay: 500 });
sr.reveal(`.home__social`, { delay: 600 });
sr.reveal(`.about__img, .contact__box`, { origin: "left" });
sr.reveal(`.about__data, .contact__form`, { origin: "right" });
sr.reveal(`.steps__card, .product__card, .questions__group, .footer`, {
  interval: 100,
});
