var throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  textArea: document.querySelector('[name="message"]'),
  mailArea: document.querySelector('[name="email"]'),
};

refs.form.addEventListener('input', throttle(formInfo, 500));
refs.form.addEventListener('submit', onSubmitForm);

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

pageReloadInfoSave();

function formInfo(e) {
  // if (evt.target.name == 'email') {
  //   formData.email = evt.target.value;
  // }
  // if (evt.target.name == 'message') {
  //   formData.message = evt.target.value;
  // }

  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

  // let persistedFilters = localStorage.getItem(STORAGE_KEY);
  // persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
  // persistedFilters[e.target.name] = e.target.value;
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedFilters)); // need to get an object from here on submit
}

function pageReloadInfoSave() {
  const storageInfo = localStorage.getItem(STORAGE_KEY);
  if (storageInfo) {
    const storageValueToObj = JSON.parse(storageInfo);
    Object.entries(storageValueToObj).forEach(([name, value]) => {
      formData[name] = value;
      refs.form.elements[name].value = value;
    });
    // refs.mailArea.value = storageValueToObj.email;
    // refs.textArea.value = storageValueToObj.message;

    // formData.email = storageValueToObj.email;
    // formData.message = storageValueToObj.message;
  }
}

function onSubmitForm(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData = {};

  // formData.email = '';
  // formData.message = '';
}
