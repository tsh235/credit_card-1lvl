import {el, setChildren} from 'redom';
import CreditCardInputMask from 'credit-card-input-mask';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';


const creditCard = () => {
  const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
  const cardPersonal = el('.card__personal', [
    el('span.card__name', 'John Doe'),
    el('span.card__date', '04/24'),
  ]);

  return el('.credit-card', cardNumber, cardPersonal);
};

const creditForm = () => {
  const inputWrapHolder = el('.form__input-wrap.form__input-wrap_holder', [
    el('label.form__label.form__holder-label', 'Card Holder'),
    el('input.input input__holder', {type: 'text'}),
  ]);

  const inputWrapNumber = el('.form__input-wrap.form__input-wrap_number', [
    el('label.form__label.form__number-label', 'Card Number'),
    el('input.#cardNumber.input.input__number'),
  ]);

  const inputWrapDate = el('.form__input-wrap.form__input-wrap_date', [
    el('label.form__label.form__date-label', 'Card Expiry'),
    el('input.input.input__date', {type: 'text'}),
  ]);

  const inputWrapCvv = el('.form__input-wrap.form__input-wrap_cvv', [
    el('label.form__label.form__cvv-label', 'CVV'),
    el('input.input.input__cvv', {type: 'text'}),
  ]);

  const formButton = el('button.form__button', 'CHECK OUT');

  return el('form.form#form', inputWrapHolder, inputWrapNumber, inputWrapDate, inputWrapCvv, formButton);
};

const cardWrapper = () => {
  const card = el('.card', [el('p.secure', 'Secure Checkout')]);

  setChildren(card, creditCard(), creditForm());

  return el('.wrapper', card);
};

setChildren(document.body, cardWrapper());

const inputHolder = document.querySelector('.input__holder');
const inputNumber = document.querySelector('#cardNumber');
const inputCvv = document.querySelector('.input__cvv');
const cardName = document.querySelector('.card__name');
const cardNumber = document.querySelector('.card__number');
const cardDate = document.querySelector('.card__date');

const regExpHolder = /[^A-Za-z\s]+$/;
inputHolder.addEventListener('input', () => {
  inputHolder.value = inputHolder.value.replace(regExpHolder, '');
  cardName.textContent = inputHolder.value;
});

inputCvv.addEventListener('input', () => {
  inputCvv.value = inputCvv.value.replace(/\D/g,'').substr(0,4);
});

new CreditCardInputMask({
  element: inputNumber,
  pattern: "{{9999}} {{9999}} {{9999}} {{9999}}",
});

new AirDatepicker('.input__date', {
  autoClose: true,
  dateFormat: 'MM/yy',
  onSelect({date}) {
    const newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    const year = newDate.getFullYear() % 100;
  
    if (month < 10) {
      month = `0${month}`;
    }
    cardDate.textContent = `${month}/${year}`;
  }
});


inputNumber.addEventListener('input', () => {
  cardNumber.textContent = inputNumber.value ? inputNumber.value : 'xxxx xxxx xxxx xxxx';
});


