const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

let formData = {};

const fillFeedbackFormFields = () => {
  const formDataFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (formDataFromLS === null) {
    return;
  }

  formData = formDataFromLS;

  const formDataFromLSKeys = Object.keys(formDataFromLS);

  formDataFromLSKeys.forEach(key => {
    refs.feedbackForm.elements[key].value = formDataFromLS[key];
  });
};

fillFeedbackFormFields();

const onFeedbackFormFieldChange = ({ target: formField }) => {
  const formFieldName = formField.name;
  const formFieldValue = formField.value.trim();

  formData[formFieldName] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const formElements = refs.feedbackForm.elements;
  const formFields = Array.from(formElements).filter(
    el => el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
  );

  const isFormValid = formFields.every(field => field.value.trim() !== '');

  if (!isFormValid) {
    return alert('Fill please all fields');
  }

  const { target: feedbackForm } = event;

  feedbackForm.reset();
  localStorage.removeItem('feedback-form-state');
};

refs.feedbackForm.addEventListener('change', onFeedbackFormFieldChange);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
