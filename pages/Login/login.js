const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')

const regex = {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
}

const campos = {
    email: false,
    password: false,
}

const validateForm = e => {
    switch (e.target.name) {
        case 'email':
            validateInput(regex.email, e.target, 'email')
            break

        case 'password':
            validateInput(regex.password, e.target, 'password')
            break
    }
}

const validateInput = (expression, input, campo) => {
    if (expression.test(input.value)) {
        document.getElementById(`${campo}Container`).classList.remove('error')
        document.getElementById(`${campo}Container`).classList.add('success')
        document.querySelector(`#${campo}Container .helpMessage`).classList.remove('helpMessage-active')
        campos[campo] = true
        document.getElementById('alertMessage').classList.remove('alertMessage-active');
    } else {
        document.getElementById(`${campo}Container`).classList.remove('success')
        document.getElementById(`${campo}Container`).classList.add('error')
        document.querySelector(`#${campo}Container .helpMessage`).classList.add('helpMessage-active')
        campos[campo] = false
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validateForm)
    input.addEventListener('blur', validateForm)
})

const login = () => {
    if (campos.email && campos.password) {
        document.getElementById('alertMessage').classList.remove('alertMessage-active');
        form.reset();
    } else {
        document.getElementById('alertMessage').classList.add('alertMessage-active');
    }
}