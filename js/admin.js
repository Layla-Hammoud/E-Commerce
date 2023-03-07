// let submit_btn = document.getElementById("submit_btn");
// submit_btn.onclick = (e) => {
//   //   e.preventDefault();
//   add_product();
// };
// function add_product() {
//   let name = document.getElementById("fname").value;
//   let brand = document.getElementById("brand").value;
//   let price = document.getElementById("price").value;

//   let data = new FormData();
//   data.append("name", name);
//   data.append("brand", brand);
//   data.append("price", price);

//   axios({
//     method: "post",
//     url: "http://localhost/ecommerce-backend/add_product.php",
//     data: data,
//   })
//     .then((result) => {
//       if (result.data.status == "success") {
//         alert("Product Added!");
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

let productContainer = document.getElementById("productListing");
axios({
  method: "get",
  url: `http://localhost/ecommerce-backend/get_products.php`,
}).then(async (res) => {
  const products = res.data.products;
  console.log(products);
  prods = products;
  products.forEach((product) => {
    productContainer.innerHTML += `
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
              <button class="edit" value="${product.product_id}">
                  edit
              </button>
              <button class="remove" value="${product.product_id}">
                  remove
              </button>
          </div>
      </div>
      </div>
      `;
  });
});
productContainer.onclick = (e) => {
  if (e.target.classList.contains("remove")) {
    let data = new FormData();
    data.append("Id", e.target.value);

    axios({
      method: "post",
      url: "http://localhost/ecommerce-backend/deleteProduct.php",
      data: data,
    })
      .then((result) => {
        if (result.data.status == "success") {
          alert("Product Deleted!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
