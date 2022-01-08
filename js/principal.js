function Image(id, url, likes, date) {
  this.id = id;
  this.url = url;
  this.likes = likes;
  this.date = date;
}

let images = [];
const formAddImage = document.getElementById("formAddImage");

const getRandomLikes = (min, max) => {
  return Math.random() * (max - min) + min;
};

const updateImages = () => {
  const localStorageImages = JSON.parse(localStorage.getItem("images"));
  localStorageImages?.forEach((item) => {
    buildStory(item);
    buildPost(item);
    buildStoryModal(item);
  });
};

const addImage = (image) => {
  images.push(image);
  buildStory(image);
  buildPost(image);
  buildStoryModal(image);
  addToLocalStorage();
};

// Publish Button
formAddImage.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = document.getElementById("inputURLImage").value;
  const likes = getRandomLikes(0, 20);
  const currentDate = moment().format("l");
  const id = Date.now();

  const newImg = new Image(id, url, parseInt(likes), currentDate);
  addImage(newImg);
  formAddImage.reset();
});

const addToLocalStorage = () => {
  localStorage.setItem("images", JSON.stringify(images));
};

window.onload = () => {
  const storage = JSON.parse(localStorage.getItem("images"));
  if (storage) {
    images = storage;
    updateImages();
  }
};

// Increment likes
const addLike = (id) => {
  // Buscar objeto de Local Storage
};
