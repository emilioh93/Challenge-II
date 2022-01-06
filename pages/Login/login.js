const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')
let user;

const regex = {
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#%&*]).{0,8}$/
}

const campos = {
    email: false,
    password: false,
}

const setUser = (e) => {
    user = e;
}

const validateForm = e => {
    switch (e.target.name) {
        case 'email':
            validateInput(regex.email, e.target, 'email')
            setUser(e.target.value)
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
        console.log("Entró")
        document.getElementById('alertMessage').classList.remove('alertMessage-active');
        form.reset();
        document.getElementById('emailContainer').classList.remove('success')
        document.getElementById('passwordContainer').classList.remove('success')
        localStorage.setItem("user", user);
        location.href = "../Principal/principal.html"

    } else {
        document.getElementById('alertMessage').classList.add('alertMessage-active');
    }
}

// TODO: Al cargar la página, revisar si el usuario está en el LS
// Si lo está, redirigir a la página principal del usuario logueado
// Si no lo está, mantener en Login