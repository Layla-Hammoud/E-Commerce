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
