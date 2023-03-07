const display_full_name = document.getElementById("display_full_name");
const all_categories = document.getElementById("all_categories");
const all_products = document.getElementById("all_products");
let prods = [];
let fav_btn;
let cart_btn;

const baseURL = "http://localhost";

const request_body = new FormData();

request_body.append("user_id", localStorage.getItem("user_id"));

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
            <img src="./assets/images/categories/${category.type}.svg" alt="" />
         </div>
        <div class="category-text flex column jc-se">
            <p class="category-title">${category.type}</p>
        </div>
    </div>
    `;
  });
});

axios({
  method: "get",
  url: `${baseURL}/ecommerce-backend/get_products.php`,
}).then(async (res) => {
  const products = res.data.products;
  console.log(products);
  prods = products;
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
                <button class="fav_btn unfaved-btn" value="${product.product_id}">
                  <img src="./assets/images/like-icon.svg" alt="" />
                </button>
                <button class="cart-btn" value="${product.product_id}">
                  <img src="./assets/images/cart-icon.svg" alt="" />
                </button>
              </div>
            </div>
          </div>`;
  });

  fav_btn = document.querySelectorAll(".fav_btn");
  cart_btn = document.querySelectorAll(".cart-btn");
  console.log(cart_btn);

  fav_btn.forEach((button) => {
    button.addEventListener("click", async () => {
      const body = new FormData();
      body.append("product_id", button.value);
      body.append("user_id", localStorage.getItem("user_id"));
      const response = await axios({
        method: "post",
        url: `${baseURL}/ecommerce-backend/add_favourite.php`,
        data: body,
      });

      console.log(response);
      if (response.data.status === "Added") {
        button.classList.add("faved-btn");
        button.classList.remove("unfaved-btn");
      } else {
        button.classList.remove("faved-btn");
        button.classList.add("unfaved-btn");
      }
    });
  });

  cart_btn.forEach((button) => {
    button.addEventListener("click", () => {
      const clicked = button.value;
      const product = prods.filter((prod) => prod.product_id == clicked)[0];

      const stringifiedSavedCart = localStorage.getItem("selectedProducts");
      let savedCart;

      if (stringifiedSavedCart) {
        savedCart = JSON.parse(stringifiedSavedCart);
        const check = savedCart.filter((prod) => prod.product_id == clicked);

        if (check.length === 0) {
          savedCart.push(product);
        } else {
          savedCart = savedCart.filter((prod) => prod.product_id != clicked);
        }
      } else {
        savedCart = [product];
      }

      const stringifiedNew = JSON.stringify(savedCart);
      localStorage.setItem("selectedProducts", stringifiedNew);
    });
  });
});
