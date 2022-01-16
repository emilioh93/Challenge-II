const buildStory = (item, elementId) => {
  document.getElementById(elementId).innerHTML += `
      <button id="story${item.id}" class="story" data-bs-toggle="modal"
      data-bs-target="#storiesModalsContainer" onclick="generateCarouselItems(${item.id})">
        <div class="profile">
          <img src=${item.url} alt="Historia Social Rolling" />
        </div>
      </button>
    `;
};

const buildItemsForModal = (items) => {
  // Al abrir el modal, deben eliminarse los elementos anteriormente creados para evitar duplicados
  const carouselInner = document.getElementById("carouselInner");
  const carouselChild = document.getElementById("carouselChild");

  carouselInner.removeChild(carouselChild);
  const firstItem = items.shift();
  images.unshift(firstItem);
  const newImages = [...new Set(images)];
  localStorage.setItem("images", JSON.stringify(newImages));

  document.getElementById("carouselInner").innerHTML += `
    <div id="carouselChild"></div>
  `;

  // Se crean el resto de los elementos sin el active
  newImages.forEach((item) => {
    const index = items.indexOf(item);
    document.getElementById("carouselChild").innerHTML += `
          <div id="carouselItem${index}" class="carousel-item" data-bs-interval="3000">
            <div class="card w-100 h-100">
              <img src=${item.url} class="w-100 d-block" alt="Historia de Social Rolling">
            <div class="card-body bg-dark">
            <div class="d-flex justify-content-between">
              <div id="deleteButtonContainer" class="h3">
                <button id="deleteButton${item.id}" onclick="deleteImage(${item.id})" class="likesButton">
                  <i class="fas fa-minus-circle text-warning" ></i>
                </button>
              </div>
              <div class="d-flex flex-column">
                <span id="likes${item.id}" class="h3">
                <button onclick="addLike(${index})" class="likesButton">
                  <i class="far fa-heart text-danger"></i>
                </button>
                <span id="likes" class="h3 text-white"> ${item.likes}</span>
                </span>
              </div>
              </div>
                <p class="card-text text-end"><small class="text-muted">${item.date}</small></p>
              </div>
            </div>
          </div>
          `;
    if (userLoggedIn === false) {
      console.log("Se ejecutó");
      document.getElementById(`deleteButton${item.id}`).style.visibility =
        "hidden";
    }
  });
  document.getElementById("carouselItem-1").className += " active";
};

const buildPost = (item, elementId) => {
  document.getElementById(elementId).innerHTML += `
    <div id="post${item.id}" class="col-md-4 col-sm-12 mb-4">
      <div class="card roundBorder w-100 postAdded">
        <div id="postImg">
          <img src=${item.url} class="card-img-top bg-dark" alt="Post de Social Rolling" />
        </div>
        <div class="card-footer bg-dark text-white">
          <div id="postFooter" class="d-flex justify-content-between">
            <span>${item.date}</span>
            <span><i class="far fa-heart"></i> ${item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};
