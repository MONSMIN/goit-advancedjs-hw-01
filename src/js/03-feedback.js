import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;


const saveToLocalStorage = throttle(() => {
    const formData = { email: emailInput.value, message: messageInput.value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

function loadFromLocalStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        emailInput.value = email || '';
        messageInput.value = message || '';
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const formData = { email: emailInput.value, message: messageInput.value };
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
}


document.addEventListener('DOMContentLoaded', loadFromLocalStorage);


form.addEventListener('input', saveToLocalStorage);

form.addEventListener('submit', handleSubmit);
