var throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  textArea: document.querySelector('[name="message"]'),
  mailArea: document.querySelector('[name="email"]'),
};

refs.form.addEventListener('input', throttle(formInfo, 500));
refs.form.addEventListener('submit', onSubmitForm);

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

pageReloadInfoSave();

function formInfo(e) {
  // if (evt.target.name == 'email') {
  //   formData.email = evt.target.value;
  // }

  // if (evt.target.name == 'message') {
  //   formData.message = evt.target.value;
  // }
  formData[e.target.name] = e.target.value;
  const formToString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formToString);
}

function pageReloadInfoSave() {
  const storageInfo = localStorage.getItem(STORAGE_KEY);
  const storageValueToObj = JSON.parse(storageInfo);
  if (storageInfo) {
    refs.mailArea.value = storageValueToObj.email;
    refs.textArea.value = storageValueToObj.message;

    formData.email = storageValueToObj.email;
    formData.message = storageValueToObj.message;
  }
}

function onSubmitForm(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
}
