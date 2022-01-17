const today = new Date();
const year = today.getFullYear();

document.getElementById('footer').innerHTML += `
    <span>Social Rolling &copy; ${year}</span>
`