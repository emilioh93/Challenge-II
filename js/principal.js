// Constructor de Imagen
function Image(id, url, likes, date) {
  this.id = id;
  this.url = url;
  this.likes = likes;
  this.date = date;
}

const storiesModalsCarousel = document.getElementById("storiesModalsContainer");
const formAddImage = document.getElementById("formAddImage");
let userLoggedIn = false;
let localStorageImages = JSON.parse(localStorage.getItem("images"));

let images = [
  {
    date: "12/1/2022",
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
    date: "11/12/2022",
    id: 345,
    likes: 22,
    url: "https://cdn.pixabay.com/photo/2020/06/24/10/04/man-5335547_960_720.jpg",
  },
];

// Detectar logueo de usuario
if (localStorage.getItem("user")) {
  userLoggedIn = true;

  // Cerrar modal al finalizar carousel
  storiesModalsCarousel.addEventListener("slid.bs.carousel", function (e) {
    if (e.to === images.length - 2) {
      setTimeout(function () {
        $("#storiesModalsContainer").modal("hide");
        location.reload();
      }, 3000);
    }
  });
} else {
  storiesModalsCarousel.addEventListener("slid.bs.carousel", function (e) {
    if (e.to === images.length - 2) {
      setTimeout(function () {
        location.href = "./register.html";
      }, 3000);
    }
  });
}

// Función para generar likes de manera aleatoria
const getRandomLikes = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Actualizar Local Storage
const updateImages = () => {
  const idStoriesContainer = "addedStoriesContainer";
  const idPostsContainer = "postsContainer";

  localStorageImages.forEach((item, index) => {
    buildStory(item, idStoriesContainer);
    buildPost(item, idPostsContainer, index);
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
  // Mostrar HTML
  const idAddedStoriesContainer = "addedStoriesContainer";
  const idPostsContainer = "postsContainer";

  buildPost(image, idPostsContainer);
  buildStory(image, idAddedStoriesContainer);
};

// Evento disparado al presionar botón Publicar
const publishNewImage = () => {
  if (localStorageImages.length >= 6) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alcanzaste el número máximos de publicaciones posibles",
      footer: "Elimina alguna publicación si quieres agregar una nueva.",
    });
    formAddImage.reset();
    $("#userModal").modal("hide");
  } else {
    const url = document.getElementById("inputURLImage").value;
    const likes = getRandomLikes(0, 20);
    moment.locale("es");
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
    $("#userModal").modal("hide");
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
};

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
      $(`#storyModal${id}`).modal("hide");
      const parentNodePosts = document.getElementById("postsContainer");
      const parentNodeStories = document.getElementById(
        "addedStoriesContainer"
      );
      const childNodePost = document.getElementById(`post${id}`);
      const childNodeStory = document.getElementById(`story${id}`);
      parentNodePosts.removeChild(childNodePost);
      parentNodeStories.removeChild(childNodeStory);
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });
};

// Incrementar likes
const addLike = (index) => {
  const preventDuplicates = [...new Set(localStorageImages)];

  // Imprimir en HTML
  document.getElementById(`likes${index}`).innerHTML =
    preventDuplicates[index + 1].likes + 1;

  // Sumar al local storage
  preventDuplicates[index + 1].likes = preventDuplicates[index + 1].likes + 1;
  localStorage.setItem("images", JSON.stringify(preventDuplicates));

  // Mostrar alert
  document
    .getElementById("updateChanges")
    .classList.replace("d-none", "d-block");
};

// Generar imágenes para el carrusel
const generateCarouselItems = (id) => {
  let carouselImages = images;
  const firstItem = carouselImages.find((img) => img.id === id);
  const filterFirstItem = carouselImages.filter((img) => img.id !== id);
  carouselImages = filterFirstItem;
  carouselImages.unshift(firstItem);
  buildItemsForModal(carouselImages);
};

// Renderizar Local Storage al cargar página y cargar imágenes adicionales
window.onload = () => {
  if (localStorageImages) {
    images = localStorageImages;
    updateImages();
  } else {
    localStorage.setItem("images", JSON.stringify(images));
    localStorageImages = images;
    updateImages();
  }
};

buildUserModal();
