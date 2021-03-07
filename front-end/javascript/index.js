// dbItem = (itemName, itemPrice, itemDiscount, itemCategory, itemDate, image) => {
//     this.itemName = itemName;
//     this.itemPrice = itemPrice;
//     this.discountedPrice = calculateDiscount(itemPrice, itemDiscount);
//     this.listDate = itemDate;
//     this.itemCategory = itemCategory;
//     this.image = image;
// }
var shoppingCart = [];

/**
 * Displays items within shopping cart and updates shopping cart icon's number.
 *
 * 
 * */
displayCart = () => {
    console.log(shoppingCart.length);
    cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = shoppingCart.length;
    localStorage.setItem("cart", shoppingCart);
}



getDbItems = () => {
    fetch('http://localhost:3000/v1/items/', {
        method: 'GET', // likewise we have DELETE, PUT, PATCH
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).
    then(res => {
            if (res.status == 200) {
                return res.json();
            } else if (res.status == 500) {
                throw new Error('Internal Server Error');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                if (i % 2 == 0) {
                    let spacing = document.createElement("div");
                    spacing.className = "w-100";
                    document.getElementById("board").appendChild(spacing);
                }
                generateCard(data[i].title, data[i].description, data[i].points);
            }
        }).
    catch(e => {
        console.log(e);
    });
}

/**
 * Generates card objects using DOM. Should be broken down to smaller functions.
 * 
 * @param {date} listDate intended date of item listing
 * @param {string} itemName name of item
 * @param {integer} price price of item
 * @param {integer} quantity stock of item
 * @param {integer} discount discount for item, ranges 0-100
 * @param {string} itemCategory category of item 
 * @param {string} image datauri for item image
 * */
generateCard = (title, description, points) => {
    let column = document.createElement("div");
    column.className = "col";
    let cardObject = document.createElement("div");
    cardObject.className = "card";
    let overlayDiv = document.createElement("div");
    let cardText = document.createElement("div");
    cardText.className = "card-body text-center";
    let header = document.createElement("h5");
    header.innerHTML = title;
    let displayDesc = document.createElement("p");
    let displayPoints = document.createElement("p");
    displayPoints.innerHTML = "Earn " + points + " Points!";
    let linebreak = document.createElement("h6");
    linebreak.className = "mb-3";
    displayDesc.innerHTML = description;
    displayDesc.className = "small text-muted mb-2";
    displayPoints.className = "small text-uppercase mb-2";
    cardText.appendChild(header);
    cardText.appendChild(displayDesc);
    cardText.appendChild(displayPoints);
    cardText.appendChild(linebreak);
    cardObject.appendChild(overlayDiv);board
    cardObject.appendChild(cardText);
    column.appendChild(cardObject);
    document.getElementById("board").appendChild(column);
}




getDbItems();

// document.getElementById("manageInventory").onclick = (event)=>{
//     alert("clicked button");
//     event.preventDefault();
// }

$(document).ready(function () {
    $("#login_submit").click(() => {
        fetch('https://shopify-challenge-db.herokuapp.com/v1/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('userName').value,
                password: document.getElementById('userPassword').value
            }),
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Login Success");
                    return res.json();

                } else if (res.status == 404) {
                    throw new Error('Invalid Login.');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                localStorage.setItem('session', data[0].user_id);
                location.href = "./inventory.html";
            }).
        catch(e => {
            alert(e);
        });
    });

 
})