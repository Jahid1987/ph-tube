const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
const sortBtn = document.getElementById("sort-btn");

// Fetching categories
const fetchCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;
  //   creating dynamic categories button
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.classList = `btn category-btn  btn-ghost bg-slate-700 text-white text-lg`;
    btn.addEventListener("click", () => {
      fetchVideosByCategory(category.category_id);
      const categoryBtns = document.getElementsByClassName("category-btn");
      for (const btn of categoryBtns) {
        btn.classList.remove("bg-red-600");
      }
      btn.classList.add("bg-red-600");
    });
    btn.textContent = category.category;
    btnContainer.appendChild(btn);
  });
};

// Fetching videos by the categories
let categoryId = 1000;
let isSorted = false;

const fetchVideosByCategory = async (id, isSorted) => {
  categoryId = id;
  
  
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();
    const videos = data.data;
    // sorting videos by views 
    if(isSorted){
      videos.sort((a,b) => {
        return parseFloat(b.others.views.replace('K', '')) - parseFloat(a.others.views.replace('K', ''));
      })
    }
    
    showVideos(videos);

};

// sort videos by view
sortBtn.addEventListener("click", () => {
  isSorted = true;
  fetchVideosByCategory(categoryId, isSorted);
});

// showing videos in ui
const errorElement = document.getElementById("error-element");
const showVideos = (videos) => {
  cardContainer.innerHTML = "";

  if (!videos.length > 0) {
    errorElement.classList.remove("hidden");
  } else {
    errorElement.classList.add("hidden");
    videos.forEach((video) => {
      // console.log(video);
      const card = document.createElement("div");
      card.classList = `card w-full bg-base-100 shadow-xl`;
      // card.addEventListener('click', showDetails(video))
      card.innerHTML = `
      <div onclick="showDetails('${video.title}')">
        <figure class="overflow-hidden h-72">
        <img class="w-full" src="${video.thumbnail}" alt="Shoes" />
        <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
      </figure>
        <div class="card-body">
          <div class="flex space-x-4 justify-start items-start">
            <div>
              <img
                class="w-12 h-12 rounded-full"
                src="${video.authors[0].profile_picture}"
                alt="Shoes"
              />
            </div>
            <div>
              <h2 class="card-title">${video.title}</h2>
              <div class="flex mt-3">
                <p class="">${video.authors[0].profile_name}</p>
                ${
                  video.authors[0].verified
                    ? '<img class="w-6 h-6" src="./images/verify.png" alt="" />'
                    : ""
                }
              </div>
              <p class="mt-3"><span>${video.others.views}</span> Views</p>
            </div>
          </div>
        </div>
      </div>
    `;
      cardContainer.appendChild(card);
    });
  }
};


// fetching categories buttons
fetchCategories();
fetchVideosByCategory(categoryId)
