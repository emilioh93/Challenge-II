// Constructor de Imagen
function Image(id, url, likes, date) {
    this.id = id;
    this.url = url;
    this.likes = likes;
    this.date = date;
}

let images = [];
const formAddImage = document.getElementById("formAddImage");
const localStorageImages = JSON.parse(localStorage.getItem("images"));

// Función para generar likes de manera aleatoria
const getRandomLikes = (min, max) => {
    return Math.random() * (max - min) + min;
};

// Actualizar Local Storage
const updateImages = () => {
    localStorageImages.forEach((item) => {
        buildStory(item);
        buildPost(item);
        buildStoryModal(item);
    });
};

// Agregar imagen a Local Storage
const addToLocalStorage = () => {
    localStorage.setItem("images", JSON.stringify(images));
};

// Agregar nueva imagen
const addImage = (image) => {
    images.push(image);
    addToLocalStorage();
    location.reload();
};

// Evento disparado al presionar botón Publicar
formAddImage.addEventListener("submit", function(e) {
    e.preventDefault();
    if ((localStorageImages.length === 3)) {
        alert("No se puede publicar mas imagenes");
    } else {
        const url = document.getElementById("inputURLImage").value;
        const likes = getRandomLikes(0, 20);
        const currentDate = moment().format("l");
        const id = Date.now();

        const newImg = new Image(id, url, parseInt(likes), currentDate);
        addImage(newImg);
        formAddImage.reset();
    }
});

// Eliminar imagen del Local Storage
const deleteImage = (id) => {
    const newLocalStorage = localStorageImages.filter((e) => e.id !== id);
    localStorage.setItem("images", JSON.stringify(newLocalStorage));
    location.reload();
};

// Incrementar likes
const addLike = (index) => {
    if (localStorageImages != null) {
        localStorageImages[index].likes = localStorageImages[index].likes + 1;
        localStorage.setItem("images", JSON.stringify(localStorageImages));
    }
};

// Renderizar Local Storage al cargar página
window.onload = () => {
    console.log("🚀 ~ localStorageImages", localStorageImages);
    if (localStorageImages) {
        images = localStorageImages;
        updateImages();
    }
};