const ramenMenuDiv = document.getElementById("ramen-menu");
const newRamenForm = document.getElementById("new-ramen");
let newId = 1;
// write your code here
// new code
//core challenge 1


function displayDetails(ramen) {
    const name = document.querySelector(".name");
    const restaurant = document.querySelector(".restaurant");
    const rating = document.querySelector("#rating-display");
    const comment = document.querySelector("#comment-display");
    const image = document.querySelector(".detail-image");
    image.src = ramen.image;
    name.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
    newId++;
}

function displayPhoto(ramen) {
    let img = document.createElement("img");
    img.src = ramen.image;
    img.id = ramen.id;
    img.addEventListener("click", () => {
        displayDetails(ramen);
    })
    return ramenMenuDiv.append(img);
}



fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(ramens => {
        ramens.forEach(ramen => {
            displayPhoto(ramen);
        });
    })

newRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newRamen = {
        id: newId,
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.comment.value
    }
    displayPhoto(newRamen);
    displayDetails(newRamen);
})