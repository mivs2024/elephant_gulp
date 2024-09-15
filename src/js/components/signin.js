import isEmail from 'validator/lib/isEmail';
import { saveCookies } from './utils';


if (window.location.pathname.includes('signin')) {
    const $passwordInput = document.querySelector('.auth__password input');
    const $email = document.querySelector('.auth__email');
    const $emailInput = document.querySelector('.auth__email input');
    const $passwordIcon = document.querySelector('.auth__password .font-icon');
    const $btn = document.querySelector('.auth__form .btn');


    $passwordIcon.addEventListener('click', (e) => {
        if ($passwordIcon.classList.contains('fa-eye')) {
            $passwordIcon.classList.remove('fa-eye')
            $passwordIcon.classList.add('fa-eye-slash')
            $passwordInput.setAttribute('type', 'text')
        } else {
            $passwordIcon.classList.add('fa-eye')
            $passwordIcon.classList.remove('fa-eye-slash')
            $passwordInput.setAttribute('type', 'password')
        }

    })

    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red"
    const errorContent = document.createTextNode("неверный почтовый адрес");
    errorDiv.appendChild(errorContent);


    $btn.addEventListener('click', (e) => {
        if (!isEmail($emailInput.value)) {
            $email.insertAdjacentElement('beforeend', errorDiv);
            $email.insertAdjacentElement('beforeend', errorDiv);
            $emailInput.classList.add('error')
            $emailInput.focus()
        }else{
            saveCookies($emailInput.value)
            window.location = document.referrer
        }
    })



    $passwordInput.addEventListener('input', (e) => {
        if ($emailInput.value !== "" && e.target.value !== "") {
            $btn.removeAttribute('disabled')
        } else {
            $btn.setAttribute('disabled', '')
        };

    })

    $emailInput.addEventListener('input', (e) => {
        if ($passwordInput.value !== "" && e.target.value !== "") {
            $btn.removeAttribute('disabled')
        } else {
            $btn.setAttribute('disabled', '')
        };

        errorDiv.remove()
        $emailInput.classList.remove('error')

    })






}
