const buildUserModal = () => {
  const formAddImage = document.getElementById("formAddImage");
  if (userLoggedIn === false) {
    formAddImage.innerHTML = `
      <div class="modal-body">
        <div class="mb-3">
          <p>
              Debes estar logueado para publicar imágenes.
          </p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <a href="./login.html" type="button" class="btn btn-primary">LOGUEARSE</a>
      </div>
    `;
  } else {
    formAddImage.innerHTML = `
            <div class="modal-body">
                <div class="mb-3">
                    <label for="nputURL" class="form-label">Imagen URL</label>
                    <input type="url" class="form-control" id="inputURLImage" aria-describedby="URLImageHelp" required placeholder="http://images.example.com" />
                    <div id="URLImageHelp" class="form-text">
                        Inserta el URL de tu imagen aquí.
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
                <button type="button" class="btn btn-danger" onclick="publishNewImage()">Publicar</button>
            </div>
    `;
  }
};

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
  $(document).ready(function () {
    $("img").each(function () {
      if ($(this)[0].naturalHeight == 0) {
        $(this).attr("src", "img/imagen-no-disponible.png");
      }
    });
  });
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

  newImages.forEach((item) => {
    const index = items.indexOf(item);
    document.getElementById("carouselChild").innerHTML += `
          <div id="carouselItem${index}" class="carousel-item" data-bs-interval="3000">
            <div id="cardStory" class="card w-100 h-100">
              <div id="progressBarContainer">
                <div id="progressBar"></div>
              </div>
              <img src=${item.url} class="w-100 d-block" alt="Historia de Social Rolling">
            <div id="cardStoryBody" class="card-body bg-dark">
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
                <span id="likes${index}" class="h3 text-white"> ${item.likes}</span>
                </span>
              </div>
              </div>
                <p class="card-text text-end"><small class="text-muted">${item.date}</small></p>
              </div>
            </div>
          </div>
          `;
    if (userLoggedIn === false) {
      document.getElementById(`deleteButton${item.id}`).style.visibility =
        "hidden";
    }
  });
  document.getElementById("carouselItem-1").className += " active";
};

const buildPost = (item, elementId, index) => {
  document.getElementById(elementId).innerHTML += `
    <div id="post${item.id}" class="col-md-4 col-sm-12 mb-4">
      <div class="card roundBorder w-100 postAdded">
        <div id="postImg">
          <img src=${item.url} class="card-img-top bg-dark" alt="Post de Social Rolling" />
        </div>
        <div id="postFooterContainer" class="card-footer bg-dark text-white">
          <div id="postFooter" class="d-flex justify-content-between">
            <span>${item.date}</span>
            <span id="likes${index}"><i class="far fa-heart"></i> ${item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};
