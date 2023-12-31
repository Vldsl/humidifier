import "../scss/main.scss";
import "bootstrap";
import { sendToTelegramMessage } from "./sendToTelegramMessage";

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");

  setTimeout(function () {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.4s ease-out";
    setTimeout(function () {
      loader.style.display = "none";
      document.body.classList.remove("loader-active");
    }, 400);
  }, 800);
});

const phoneInput = document.querySelector("input[name=phone]");
const phoneMask = IMask(phoneInput, {
  mask: "+{38}(000)-000-00-00",
  lazy: false,
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const intro = document.querySelector(".intro");

  function updateHeader() {
    const headerHeight = header.offsetHeight;

    if (window.scrollY >= headerHeight) {
      if (!header.classList.contains("header--fixed")) {
        header.classList.add("header--fixed");
        intro.style.marginTop = `${headerHeight}px`;
      }
    } else {
      header.classList.remove("header--fixed");
      intro.style.marginTop = "";
    }
  }

  window.addEventListener("scroll", updateHeader);

  updateHeader();
});

if (document.documentElement.offsetWidth <= 1200) {
  const iconMenu = document.querySelector(".icon-menu");
  iconMenu.addEventListener("click", function (e) {
    const menuBody = document.querySelector(".menu__body");
    if (!menuBody) return;
    const header = document.querySelector(".header");
    const headerHeight = window.getComputedStyle(header).height;
    const currentPaddingTop = parseInt(menuBody.style.paddingTop) || 0;
    const newPaddingTop = currentPaddingTop + parseInt(headerHeight);

    iconMenu.classList.toggle("active");
    menuBody.classList.toggle("active");
    if (menuBody.classList.contains("active")) {
      menuBody.style.paddingTop = `${newPaddingTop + 20}px`;
    } else {
      menuBody.style.paddingTop = "";
    }
    window.addEventListener("resize", () => {
      if (menuBody.classList.contains("active")) {
        menuBody.style.paddingTop = `${newPaddingTop + 20}px`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const introImg = document.querySelector(".intro__img");
  const introImgBlock = document.querySelector(".intro__img-block");
  const introContent = document.querySelector(".intro__content");
  if (!introImg) return;
  function replaceImg() {
    if (document.documentElement.offsetWidth <= 575.9) {
      introContent.before(introImg);
    } else {
      introImgBlock.append(introImg);
    }
  }
  window.addEventListener("resize", replaceImg);
  replaceImg();
});

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const menuBody = document.querySelector(".menu__body");
  const header = document.querySelector(".header");
  if (!menuBody) return;
  const replaceMenuBody = () => {
    if (document.documentElement.offsetWidth <= 1200) {
      header.after(menuBody);
    } else {
      menu.append(menuBody);
    }
  };
  window.addEventListener("resize", replaceMenuBody);
  replaceMenuBody();
});

const notice = document.querySelector(".notice");

const modalForm = document.querySelector(".modal-body form");

if (modalForm) {
  const showAndHideNotice = () => {
    notice.style.display = "block";
    notice.classList.add("fade-out");

    setTimeout(function () {
      notice.style.display = "none";
    }, 2000);
  };

  const eror = document.querySelector(".eror");
  const showAndHideEror = () => {
    eror.style.display = "block";
    eror.classList.add("fade-out");

    setTimeout(function () {
      eror.style.display = "none";
    }, 2000);
  };

  const formSelect = document.querySelector(".form-select");

  let optionText;

  formSelect.addEventListener("change", function () {
    const selectedOption = formSelect.options[formSelect.selectedIndex];
    optionText = selectedOption.text;
  });

  const inputName = document.querySelector("input[name='name']");
  const inputPhone = document.querySelector("input[name='phone']");

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputPhone.value.includes("_")) {
      showAndHideEror();
      return;
    }
    sendToTelegramMessage(
      inputPhone.value,
      inputName.value,
      formSelect.value,
      optionText
    );
    showAndHideNotice();
    inputName.value = "";
    inputPhone.value = "";
    formSelect.value = "";
  });
}
