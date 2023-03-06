let pages = document.getElementsByClassName("page");

document.getElementById("forgot_password").onclick = () => {
  pages[0].style.display = "none";
  pages[1].style.display = "none";
  pages[2].style.display = "flex";
};
document.getElementById("SignIn").onclick = () => {
  pages[0].style.display = "flex";
  pages[1].style.display = "none";
  pages[2].style.display = "none";
};
document.getElementById("have_account").onclick = () => {
  pages[0].style.display = "none";
  pages[1].style.display = "flex";
  pages[2].style.display = "none";
};

const signin_btn = document.getElementById("signin_btn");

console.log(signin_btn);

signin_btn.addEventListener("click", async () => {
  console.log("clicked");
  const sign_email_input = document.getElementById("sign_email_input");
  const sign_password_input = document.getElementById("sign_password_input");

  const requestBody = new FormData();
  requestBody.append("credentials", sign_email_input.value);
  requestBody.append("password", sign_password_input.value);

  const response = await axios({
    method: "post",
    url: "http://localhost/ecommerce-backend/signin.php",
    data: requestBody,
  });
  console.log(response.data);

  if (response.data.id) {
    window.location.href = "../index.html";
    localStorage.setItem("user_id", response.data.id);
  }
});
