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
                generateCard(data[i].title, data[i].description, data[i].points, data[i].id);
            }
        }).
    catch(e => {
        console.log(e);
    });
}

generateCard = (title, description, points, id) => {
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

    let tocomplete = document.createElement("button");
    tocomplete.className = "btn btn-secondary btn-sm mr-1 mb-2"
    tocomplete.innerHTML = "To Complete";
    tocomplete.onclick = (() => {
        console.log("hello");
    });

    cardText.appendChild(header);
    cardText.appendChild(displayDesc);
    cardText.appendChild(displayPoints);
    cardText.appendChild(linebreak);
    if (localStorage.getItem('token')!==null){ 
        // cardText.appendChild(tocomplete);
        cardText.innerHTML += '<button class="btn btn-secondary btn-sm mr-1 mb-2" data-toggle="modal" data-target="#completeModal" id=>To Complete</button>';
    }
    cardObject.appendChild(overlayDiv);
    cardObject.appendChild(cardText);
    column.appendChild(cardObject);
    document.getElementById("board").appendChild(column);
}




// document.getElementById("manageInventory").onclick = (event)=>{
//     alert("clicked button");
//     event.preventDefault();
// }
console.log(localStorage);
getDbItems();

$(document).ready(function () {
    if (localStorage.getItem('token')!== null)
    {
        $('#logstate').html('<a class="nav-link align-items-center d-flex" href="./index.html"><i id="login-navbar" class="fa fa-fw fa-2x mr-2"></i> LOGOUT</a>');
        $("#logstate").click(() => {
            if (localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
            
        });
    }
    else
    {
        $('#logstate').html('<a class="nav-link align-items-center d-flex" data-toggle="modal" data-target="#loginModal" href="#"><i id="login-navbar" class="fa fa-fw fa-2x mr-2"></i> LOGIN</a>');
    }

    $("#login_submit").click(() => {
        fetch('http://localhost:3000/v1/login', {
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
                console.log(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('location', data.location);
                localStorage.setItem('points', data.points);
                location.href = "./index.html";
                console.log(localStorage);
            }).
            catch(e => alert(e));
        
    });

 
})