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
  localStorageImages?.forEach((item, index) => {
    document.getElementById("addedStoriesContainer").innerHTML += `
                    <button class="story" data-bs-toggle="modal" data-bs-target="#storyModal${item.id}">
                      <div class="profile">
                        <img src=${item.url} alt="Historia ${index}" />
                      </div>
                    </button>
                  `;
    document.getElementById("postsContainer").innerHTML += `
                  <div class="col-md-4 col-sm-12 postAdded">
                          <div class="card w-100">
                            <img src=${item.url} class="card-img-top" alt="Posteo ${index}" />
                            <div class="card-body">
                              <div class="d-flex justify-content-between">
                                <span>${item.date}</span>
                                <span><i class="far fa-heart"></i> ${item.likes}</span>
                              </div>
                            </div>
                          </div>
                      </div>
                  `;
    document.getElementById("storiesModalsContainer").innerHTML += `
      <article class="modal fade" id="storyModal${item.id}" tabindex="-1" aria-labelledby="storyModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-body text-center">
              <img src=${item.url} alt="Historia ${index}" />
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <div class="h3 text-warning"><i class="fas fa-minus-circle"></i></div>
              <div class="d-flex flex-column">
                <span class="h3"><i class="far fa-heart text-danger"></i> ${item.likes}</span>
                <span class="text-secondary">${item.date}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  });
};

const addImage = (image) => {
  images.push(image);
  document.getElementById("addedStoriesContainer").innerHTML += `
    <button class="story" data-bs-toggle="modal" data-bs-target="#storyModal${image.id}">
      <div class="profile">
        <img src=${image.url} alt="Historia de Social Rolling" />
      </div>
    </button>
  `;
  document.getElementById("postsContainer").innerHTML += `
    <div class="col-md-4 col-sm-12 postAdded">
      <div class="card w-100">
        <img src=${image.url} class="card-img-top" alt="Post de Social Rolling" />
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span>${image.date}</span>
            <span><i class="far fa-heart"></i> ${image.likes}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("storiesModalsContainer").innerHTML += `
      <article class="modal fade" id="storyModal${image.id}" tabindex="-1" aria-labelledby="storyModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-body text-center">
              <img src=${image.url} alt="Historia de Rolling Social" />
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <div class="h3 text-warning"><i class="fas fa-minus-circle"></i></div>
              <div class="d-flex flex-column">
                <span class="h3"><i class="far fa-heart text-danger"></i> ${image.likes}</span>
                <span class="text-secondary">${image.date}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
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
