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

  document.getElementById("carouselInner").innerHTML += `
    <div id="carouselChild"></div>
  `;

  // Se crea el elemento active para el primer objeto
  document.getElementById("carouselChild").innerHTML += `
      <div class="carousel-item active" data-bs-interval="2000">
        <div class="card w-100 h-100">
          <img src=${firstItem.url} class="w-100 d-block" alt="Historia de Social Rolling">
          <div class="card-body bg-dark">
            <div class="d-flex justify-content-between">
              <div class="h3">
                  <button onclick="deleteImage(${firstItem.id})" class="likesButton">
                      <i class="fas fa-minus-circle text-warning" ></i>
                  </button>
              </div>
              <div class="d-flex flex-column">
                <span id="likes${firstItem.id}" class="h3">
                  <button onclick="addLike()" class="likesButton">
                      <i class="far fa-heart text-danger"></i>
                  </button>
                  <span class="h3 text-white"> ${firstItem.likes}</span>
                </span>
              </div>
            </div>
            <p class="card-text text-end"><small class="text-muted">${firstItem.date}</small></p>
          </div>
        </div>
      </div>
    `;

  // Se crean el resto de los elementos sin el active
  items.forEach(
    (item) =>
      (document.getElementById("carouselChild").innerHTML += `
      <div class="carousel-item" data-bs-interval="2000">
      <div class="card w-100 h-100">
        <img src=${item.url} class="w-100 d-block" alt="Historia de Social Rolling">
        <div class="card-body bg-dark">
          <div class="d-flex justify-content-between">
            <div class="h3">
                <button onclick="deleteImage(${item.id})" class="likesButton">
                    <i class="fas fa-minus-circle text-warning" ></i>
                </button>
            </div>
            <div class="d-flex flex-column">
              <span id="likes${item.id}" class="h3">
                <button onclick="addLike()" class="likesButton">
                    <i class="far fa-heart text-danger"></i>
                </button>
                <span class="h3 text-white"> ${item.likes}</span>
              </span>
            </div>
          </div>
          <p class="card-text text-end"><small class="text-muted">${item.date}</small></p>
        </div>
      </div>
    </div>
  `)
  );
};

const buildStoryModal = (item, elementId) => {
  const dataStorage = JSON.parse(localStorage.getItem("images"));
  const index = dataStorage.findIndex((element) => element.id === item.id);

  document.getElementById(elementId).innerHTML += `
        <article class="modal fade" id="storyModal${item.id}" tabindex="-1" aria-labelledby="storyModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div class="modal-content">
              <div class="modal-header bg-dark text-white">
                <span class="h5">${item.date}</span>
                <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body bg-dark text-center">
                <img class="w-100" src=${item.url} alt="Historia Social Rolling" />
              </div>
              <div class="modal-footer bg-dark d-flex justify-content-between">
                <div class="h3">
                    <button onclick="deleteImage(${item.id})" class="likesButton">
                        <i class="fas fa-minus-circle text-warning" ></i>
                    </button>
                </div>
                <div class="d-flex flex-column">
                  <span id="likes${item.id}" class="h3">
                    <button onclick="addLike(${index})" class="likesButton">
                        <i class="far fa-heart text-danger"></i>
                    </button>
                    <span class="h3 text-white"> ${item.likes}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
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
