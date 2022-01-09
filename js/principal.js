// Constructor de Imagen
function Image(id, url, likes, date) {
    this.id = id;
    this.url = url;
    this.likes = likes;
    this.date = date;
}

const additionalImages = [{
        date: "12/1/2021",
        id: 123,
        likes: 80,
        url: "https://cdn.pixabay.com/photo/2017/04/05/10/45/girl-2204622_960_720.jpg",
    },
    {
        date: "11/4/2021",
        id: 234,
        likes: 34,
        url: "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg",
    },
    {
        date: "1/1/2022",
        id: 345,
        likes: 22,
        url: "https://cdn.pixabay.com/photo/2020/06/24/10/04/man-5335547_960_720.jpg",
    },
];
let images = [];
const formAddImage = document.getElementById("formAddImage");
const localStorageImages = JSON.parse(localStorage.getItem("images"));

// Función para generar likes de manera aleatoria
const getRandomLikes = (min, max) => {
    return Math.random() * (max - min) + min;
};

// Actualizar Local Storage
const updateImages = () => {
    const idStoriesContainer = "addedStoriesContainer";
    const idPostsContainer = "postsContainer";
    const idStoriesModalsContainer = "storiesModalsContainer";
    localStorageImages.forEach((item) => {
        buildStory(item, idStoriesContainer);
        buildPost(item, idPostsContainer);
        buildStoryModal(item, idStoriesModalsContainer);
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
};

// Evento disparado al presionar botón Publicar
formAddImage.addEventListener("submit", function(e) {
    e.preventDefault();
    if (localStorageImages.length === 3) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Alcanzaste el número máximos de publicaciones posibles",
            footer: "Elimina alguna publicación si quieres agregar una nueva.",
        });
    } else {
        const url = document.getElementById("inputURLImage").value;
        const likes = getRandomLikes(0, 20);
        const currentDate = moment().format("l");
        const id = Date.now();

        const newImg = new Image(id, url, parseInt(likes), currentDate);
        addImage(newImg);
        formAddImage.reset();
        Swal.fire(
            "Imagen publicada",
            "La imagen ha sido publicada exitosamente",
            "success"
        );
    }
});

// Eliminar imagen del Local Storage
const deleteImage = (id) => {
    Swal.fire({
        title: "¿Estás seguro que quieres eliminarla?",
        text: "Al eliminarla, la publicación se borrará permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
    }).then((result) => {
        if (result.isConfirmed) {
            const newLocalStorage = localStorageImages.filter((e) => e.id !== id);
            localStorage.setItem("images", JSON.stringify(newLocalStorage));
            Swal.fire(
                "Publicación eliminada",
                "Tu publicación ha sido eliminada exitosamente.",
                "success"
            );
        }
    });
};

// Incrementar likes
const addLike = (index) => {
    if (localStorageImages != null) {
        localStorageImages[index].likes = localStorageImages[index].likes + 1;
        localStorage.setItem("images", JSON.stringify(localStorageImages));
    }
};

// Renderizar Local Storage al cargar página y cargar imágenes adicionales
window.onload = () => {
    if (localStorageImages) {
        images = localStorageImages;
        updateImages();
    }
    const idAdditionalStoriesContainer = "additionalStoriesContainer";
    const idAdditionalStoriesModalContainer = "additionalStoriesModalsContainer";
    const idAdditionalPostsContainer = "additionalPostsContainer";
    additionalImages.forEach((image) => {
        buildStory(image, idAdditionalStoriesContainer);
        buildStoryModal(image, idAdditionalStoriesModalContainer);
        buildPost(image, idAdditionalPostsContainer);
    });
};