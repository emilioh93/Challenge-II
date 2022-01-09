const buildStory = (item) => {
    document.getElementById("addedStoriesContainer").innerHTML += `
      <button class="story" data-bs-toggle="modal" data-bs-target="#storyModal${item.id}">
        <div class="profile">
          <img src=${item.url} alt="Historia Social Rolling" />
        </div>
      </button>
    `;
};

const buildStoryModal = (item) => {
    const dataStorage = JSON.parse(localStorage.getItem("images"));
    const index = dataStorage.findIndex((element) => element.id === item.id);

    document.getElementById("storiesModalsContainer").innerHTML += `
        <article class="modal fade" id="storyModal${item.id}" tabindex="-1" aria-labelledby="storyModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen-sm-down">
            <div class="modal-content">
              <div class="modal-body text-center">
                <img class="w-100" src=${item.url} alt="Historia Social Rolling" />
              </div>
              <div class="modal-footer d-flex justify-content-between">
                <div class="h3">
                    <button onclick="deleteImage(${item.id})" class="likesButton">
                        <i class="fas fa-minus-circle text-warning" ></i>
                    </button>
                </div>
                <div class="d-flex flex-column">
                  <span id="likes${item.id}" class="h3">
                    <button onclick="addLike(${index})" class="likesButton">
                        <i class="far fa-heart text-danger"></i>
                    </button> ${item.likes}
                  </span>
                  <span class="text-secondary">${item.date}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
};

const buildPost = (item) => {
    document.getElementById("postsContainer").innerHTML += `
    <div class="col-md-4 col-sm-12 postAdded">
      <div class="card w-100">
        <img src=${item.url} class="card-img-top" alt="Post de Social Rolling" />
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span>${item.date}</span>
            <span><i class="far fa-heart"></i> ${item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};