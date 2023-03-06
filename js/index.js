const display_full_name = document.getElementById("display_full_name");
const all_categories = document.getElementById("all_categories");
const all_products = document.getElementById("all_products");
const baseURL = "http://localhost";

const request_body = new FormData();

request_body.append("user_id", 1);

axios({
  method: "post",
  url: `${baseURL}/ecommerce-backend/signin.php`,
  data: request_body,
}).then((res) => {
  const user = res.data.user;
  display_full_name.innerText = `${user.first_name} ${user.last_name}`;
});

axios({
  method: "get",
  url: `${baseURL}/ecommerce-backend/get_categories.php`,
}).then((res) => {
  const categories = res.data.categories;
  console.log(categories);
  categories.forEach((category) => {
    all_categories.innerHTML += `
    <div class="category-card">
        <div class="category-img">
            <img src="./assets/images/diary-category.svg" alt="" />
         </div>
        <div class="category-text flex column jc-se">
            <p class="category-title"></p>
            <p class="category-sub">items</p>
        </div>
    </div>
    `;
  });
});
