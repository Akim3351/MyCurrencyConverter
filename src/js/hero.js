import fetchRateNationalBank from "./fetch-nbu";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { v4 as uuidv4 } from 'uuid';

const refs = {
  leftSideInput: document.getElementById("leftSideInput"),
  rightSideInput: document.getElementById("rightSideInput"),
  leftSideSelect: document.getElementById("leftSideSelect"),
  rightSideSelect: document.getElementById("rightSideSelect"),
};

const rates = setRateValues();

refs.leftSideInput.addEventListener("input", handleLeftSideValueChange);
refs.rightSideInput.addEventListener("input", handleRightSideValueChange);
refs.leftSideSelect.addEventListener("change", handleLeftSideCurrencyChange);
refs.rightSideSelect.addEventListener("change", handleRightSideCurrencyChange);

async function setRateValues() {
  try{
    const rates = await fetchRateNationalBank();
    setOptionsMarkup(rates);
    return rates;
  } catch (error) {
    console.log(error);
  }
};

function setOptionsMarkup(rates) { 
  const markup = rates.map(item => `<option
    key = ${uuidv4()}
   value=${item.rate}
  >
    ${item.cc} - ${item.txt}
  </option>`
).join("");
  refs.leftSideSelect.innerHTML = markup;
  refs.rightSideSelect.innerHTML = markup;
};

function incorrectNumberAlert() {
  Report.failure(
    'Incorrect value! / Невірне значення!',
    'Please enter a value greater than zero / Введіть значення більше нуля'
  );
};

function format(number) {
  return number.toFixed(2);
}
    
function handleLeftSideValueChange(event) {
  const leftSideValue = event.target.value;
  const leftSideRate = refs.leftSideSelect.value;
  const rightSideRate = refs.rightSideSelect.value;
  if (leftSideValue < 0) {
    incorrectNumberAlert();
    refs.leftSideInput.value = 0;
    return;
  }
  refs.rightSideInput.value = (format(leftSideValue * leftSideRate / rightSideRate));
}
    
function handleLeftSideCurrencyChange(event) {
  const leftSideRate = event.target.value;
  const leftSideValue = refs.leftSideInput.value;
  const rightSideRate = refs.rightSideSelect.value;
  refs.rightSideInput.value = (format(leftSideValue * leftSideRate / rightSideRate));
}
    
function handleRightSideValueChange(event) {
  const rightSideValue = event.target.value;
  const leftSideRate = refs.leftSideSelect.value;
  const rightSideRate = refs.rightSideSelect.value;
  if (rightSideValue < 0) {
    incorrectNumberAlert();
    refs.rightSideInput.value = 0;
    return;
  }
  refs.leftSideInput.value = (format(rightSideValue * rightSideRate / leftSideRate));
};
    
function handleRightSideCurrencyChange(event) {
  const rightSideRate = event.target.value;
  const rightSideValue = refs.rightSideInput.value;
  const leftSideRate = refs.leftSideSelect.value;

  refs.leftSideInput.value = (format(rightSideValue * rightSideRate / leftSideRate));
};