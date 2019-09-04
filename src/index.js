import "./sass/main.scss";
import "@babel/polyfill";

const btnPaliviolet = document.querySelector(".div-btn__btn--paliviolet");
const answerOrange = document.querySelector(".form--orange-red>.div-btn");
const continueOrange = document.querySelector(
  ".div-btn__btn--continue-orange-red"
);
const answerYellow = document.querySelector(".form--yellow>.div-btn");
const continueYellow = document.querySelector(".div-btn__btn--continue-yellow");
const divBtnGender = document.querySelector(".registration__button");
const validate = document.querySelector(".registration");
const btnSubmit = document.querySelector(".registration__submit");

divBtnGender.addEventListener("click", handleBtnClick);

btnPaliviolet.addEventListener(
  "click",
  handleChangeSection.bind(this, "paliviolet", "orange-red")
);

answerOrange.addEventListener("click", handleOrangeAnswerClick);

continueOrange.addEventListener(
  "click",
  handleChangeSection.bind(this, "orange-red", "yellow")
);

answerYellow.addEventListener("click", handleYellowAnswerClick);

continueYellow.addEventListener(
  "click",
  handleChangeSection.bind(this, "yellow", "blue")
);

validate.addEventListener("submit", validateForm);
btnSubmit.addEventListener("click", validateForm);

function handleBtnClick({ target }) {
  const btnFirst = document.querySelector(".registration__btn-first");
  const btnSecond = document.querySelector(".registration__btn-second");

  btnSecond.classList.remove("registration__btn--active-second");
  btnFirst.classList.remove("registration__btn--active-first");

  if (target === btnFirst) {
    target.classList.add("registration__btn--active-first");
  } else {
    target.classList.add("registration__btn--active-second");
  }
  activeForm();
}

function activeForm() {
  const btnSubmit = document.querySelector(".registration__submit");
  const checkBox = document.querySelector(".registration__license");
  if (btnSubmit.disabled == true && checkBox.checked) {
    btnSubmit.disabled = false;
    btnSubmit.classList.add("registration__submit--active");
  }
}

function handleChangeSection(previous, next) {
  const container = document.querySelector(`.container--${previous}`);
  const foto = document.querySelector(`.foto--${previous}`);

  container.classList.remove(`container--${previous}`);
  foto.classList.remove(`foto--${previous}`);

  container.classList.add(`container--${next}`);
  foto.classList.add(`foto--${next}`);

  document.querySelector(`.form--${previous}`).classList.add("display--none");
  document.querySelector(`.form--${next}`).classList.remove("display--none");

  const answerBlock = document.querySelector(".answer");

  if (answerBlock) {
    answerBlock.classList.remove(`answer--${previous}`);
    document.querySelector(".answer__title").textContent = "";
    document.querySelector(".answer__subtitle").textContent = "";
  }
}

function processAnswer(title, subtitle, color) {
  document
    .querySelector(`.div-btn__btn--continue-${color}`)
    .classList.remove("div-btn__btn--none");
  const answerTitle = document.querySelector(".answer__title");
  const answerSubtitle = document.querySelector(".answer__subtitle");

  answerTitle.textContent = title;
  answerSubtitle.textContent = subtitle;

  answerTitle.classList.add(`answer__title--${color}`);
  answerSubtitle.classList.add(`answer__subtitle--${color}`);

  const answer = document.querySelector(".answer");
  answer.classList.add(`answer--${color}`);
}

function handleYellowAnswerClick({ target }) {
  switch (target.textContent.trim()) {
    case "Вариант А":
      processAnswer("47,5%", "Пользователей - Вариант A.", "yellow");
      break;
    case "Вариант Б":
      processAnswer("52,5%", "Пользователей - Вариант Б.", "yellow");
      break;
  }
}

function handleOrangeAnswerClick({ target }) {
  switch (target.textContent.trim()) {
    case "Вариант А":
      processAnswer("50%", "людей обращают внимание на A.", "orange-red");
      break;
    case "Вариант Б":
      processAnswer("20%", "людей обращают внимание на Б.", "orange-red");
      break;
    case "Вариант В":
      processAnswer("30%", "людей обращают внимание на В.", "orange-red");
      break;
  }
}

function validateForm(event) {
  event.preventDefault();
  let inputs = validate.querySelectorAll("input:not([type=checkbox])");
  let isFormValid = true;

  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];

    element.addEventListener("blur", validateForm);
    let isValid = true;

    let listValidation = element.parentNode.querySelectorAll(
      ".registration__error"
    );
    let validationP = listValidation[index];

    isValid = validateRequired(element, validationP);

    if (isValid) {
      switch (element.dataset.type) {
        case "text":
          let reg = new RegExp(element.dataset.valRegex);
          if (!reg.test(element.value)) {
            element.style.cssText = "border: 1px solid #f50e0e;";
            validationP.innerHTML = element.dataset.valInvalid;
            isValid = false;
          }
          break;
        case "email":
          reg = new RegExp(element.dataset.valRegex);
          if (!reg.test(element.value)) {
            element.style.cssText = "border: 1px solid #f50e0e;";
            validationP.innerHTML = element.dataset.valInvalid;
            isValid = false;
          }
          break;
      }
    }
    if (isValid) {
      element.style.cssText = "border: 1px solid green;";
      validationP.innerHTML = "";
    } else {
      isFormValid = false;
    }
  }

  if (
    isFormValid &&
    event.target.classList.contains("registration__submit--active")
  ) {
    validate.submit();
  }
}

function validateRequired(element, validationP) {
  if (element.dataset.required == "true") {
    let valRec = element.dataset.valRequired;
    if (!element.value) {
      element.style.cssText = "border: 1px solid #f50e0e;";
      validationP.innerHTML = valRec;
      return false;
    }
  }
  return true;
}
