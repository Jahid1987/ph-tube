const btnContainer = document.getElementById("btn-container");

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
    btn.classList = `btn  btn-ghost bg-slate-700 text-white text-lg`;
    btn.addEventListener("click", () => filterByCategory(category.category_id));
    btn.textContent = category.category;
    btnContainer.appendChild(btn);
  });
};

// Fetching videos by the categories
const filterByCategory = async (id = 'all') => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await response.json();
    const videos = data.data;
    if (videos.length < 1) {
      throw "Data not found";
    }
    showVideos(videos);
  } catch (error) {
    const errorElement = document.getElementById('error-element');
    errorElement.classList.remove('hidden');
    console.error(error);
  }
};

// showing videos in ui
const showVideos = (videos) => {

    console.log(videos)
    
};

fetchCategories();
