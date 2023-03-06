let submit_btn = document.getElementById("submit_btn");
submit_btn.addEventListener("click", add_product);

function add_product() {
  let name = document.getElementById("fname").value;
  let brand = document.getElementById("brand").value;
  let price = document.getElementById("price").value;

  let data = new FormData();
  data.append("name", name);
  data.append("brand", brand);
  data.append("price", price);

  axios({
    method: "post",
    url: "http://localhost/ecommerce-backend/add_product.php",
    data: data,
  })
    .then((result) => {
      if (result.data.status == "success") {
        alert("Product Added!");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
