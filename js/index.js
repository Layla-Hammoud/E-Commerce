const display_full_name = document.getElementById("display_full_name");
const all_categories = document.getElementById("all_categories");
const all_products = document.getElementById("all_products");
let fav_btn;

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
            <p class="category-title">${category.type}</p>
            <p class="category-sub">${categories.length} items</p>
        </div>
    </div>
    `;
  });
});

axios({
  method: "get",
  url: `${baseURL}/ecommerce-backend/get_products.php`,
}).then((res) => {
  const products = res.data.products;
  console.log(products);
  products.forEach((product) => {
    all_products.innerHTML += `
    <div class="product-card flex column jc-center ai-center">
            <div class="product-img">
              <img src="./assets/images/products/${product.name}.svg" alt="" />
            </div>
            <div class="product-text flex column jc-sa">
              <div class="product-info flex column jc-sb">
                <p class="product-category">${product.type}</p>
                <p class="product-name">${product.name}</p>
                <p class="price">$ ${product.price}</p>
              </div>
              <div class="buttons flex jc-sa ai-center">
                <button class="fav_btn" value="${product.product_id}">
                  <img src="./assets/images/like-icon.svg" alt="" />
                </button>
                <button>
                  <img src="./assets/images/cart-icon.svg" alt="" />
                </button>
              </div>
            </div>
          </div>`;
    fav_btn = document.querySelectorAll(".fav_btn");
  });
  console.log(fav_btn);
});
