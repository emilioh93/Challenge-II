function Image(url, likes, date) {
  this.url = url;
  this.likes = likes;
  this.date = date;
}

const images = [];
const formAddImage = document.getElementById("formAddImage");

const getRandomLikes = (min, max) => {
  return Math.random() * (max - min) + min;
};

const updateImages = () => {
  const localStorageImages = JSON.parse(localStorage.getItem("images"));
  localStorageImages?.forEach((item, index) => {
    document.getElementById("addedStoriesContainer").innerHTML += `
                    <button class="story">
                      <div class="profile">
                        <img src=${item.url} alt="Historia ${index}" />
                      </div>
                    </button>
                  `;
    document.getElementById("postsContainer").innerHTML += `
                  <div class="col-md-4 col-sm-12">
                          <div class="card w-100">
                            <img src=${item.url} class="card-img-top" alt="Post ${index}" />
                            <div class="card-body">
                              <div class="d-flex justify-content-between">
                                <span>Date: ${item.date}</span>
                                <span>Likes: ${item.likes}</span>
                              </div>
                            </div>
                          </div>
                      </div>
                  `;
  });
};

const addImage = (image) => {
  images.push(image);
  localStorage.setItem("images", JSON.stringify(images));
  document.getElementById("addedStoriesContainer").innerHTML += `
      <button class="story">
        <div class="profile">
          <img src=${image.url} alt="Historia de Social Rolling" />
        </div>
      </button>
    `;
  document.getElementById("postsContainer").innerHTML += `
    <div class="col-md-4 col-sm-12">
            <div class="card w-100">
              <img src=${image.url} class="card-img-top" alt="Post de Social Rolling" />
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <span>Date: ${image.date}</span>
                  <span>Likes: ${image.likes}</span>
                </div>
              </div>
            </div>
        </div>
    `;
};

// Publish Button
formAddImage.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = document.getElementById("inputURLImage").value;
  const likes = getRandomLikes(0, 20);
  const currentDate = new Date();

  const newImg = new Image(url, parseInt(likes), currentDate);
  addImage(newImg);
  formAddImage.reset();
});

updateImages();
