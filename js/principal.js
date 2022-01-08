function Image(url, likes, date) {
  this.url = url;
  this.likes = likes;
  this.date = date;
}

const images = [];

const getRandomLikes = (min, max) => {
  return Math.random() * (max - min) + min;
};

const addImage = (image) => {
  images.push(image);
  localStorage.setItem("images", JSON.stringify(images));
};

// Publish Button
document
  .getElementById("formAddImage")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const url = document.getElementById("inputURLImage").value;
    const likes = getRandomLikes(0, 20);
    const currentDate = new Date();

    const newImg = new Image(url, parseInt(likes), currentDate);
    addImage(newImg);
    document.getElementById("formAddImage").reset();
  });
