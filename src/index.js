const ramenMenuDiv = document.getElementById("ramen-menu");
const newRamenForm = document.getElementById("new-ramen");
const editRamenForm = document.getElementById("edit-ramen");
const deleteBtn = document.getElementById("delete");
let newId = 1;
let selectedId = 0;
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
}

function displayPhoto(ramen) {
    let img = document.createElement("img");
    img.src = ramen.image;
    img.id = ramen.id;
    img.addEventListener("click", () => {
        displayDetails(ramen);
        selectedId = img.id;
    })
    newId++;
    return ramenMenuDiv.append(img);
}



fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(ramens => {
        ramens.forEach(ramen => {
            displayPhoto(ramen);
        });
        displayDetails(ramens[0]);
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
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
        .then(() => {
            displayPhoto(newRamen);
            displayDetails(newRamen);
        })
})

editRamenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let rating = e.target.rating.value;
    let newComment = e.target.newcomment.value;
    fetch(`http://localhost:3000/ramens/${selectedId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            rating: rating,
            comment: newComment
        })
    })
        .then(() => {
            //change selected comment and rating
            document.getElementById("rating-display").textContent = rating;
            document.getElementById("comment-display").textContent = newComment;
        })
})

deleteBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/ramens/${selectedId}`, {
        method: "DELETE",
    })
    .then(() => {
        //delete from DOM
    })
})