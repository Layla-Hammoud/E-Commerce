document.addEventListener("DOMContentLoaded", function(event) {
// var cardItems = [
// {Id:1,Name:'Product1',Price:'10$'},
// {Id:2,Name:'Product2',Price:'15$'},
// {Id:3,Name:'Product3',Price:'5$'}];
axios({
  method:"post",
  url:"http://localhost/ecommerce-backend/displayFavourites",
  body:{
    user_id : localStorage.getItem("user_id")
  }
}).then((res) => {
  const favs = res.data
  console.log(favs);
})

const stringifiedSavedCart = localStorage.getItem("selectedProducts");
var cardItems = JSON.parse(stringifiedSavedCart);

for(var i=0;i<cardItems.length;i++){
  var rows ="<tr><td>"+cardItems[i].name+"</td><td> $ "+cardItems[i].price+"</td></tr>";
  document.getElementById('cardItemsTable').getElementsByTagName('tbody')[0].insertRow().innerHTML = rows;
}

});


function removeCard(){
  document.getElementById('cardItemsTable').getElementsByTagName('tbody')[0].remove();
  localStorage.setItem("selectedProducts","");

}
function CheckOut(){
  removeCard();
}