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

/**
 * Calculates the discounted price.
 *@param {number} price item price
 *@param {integer} discount discount ranges 0-100 
 * 
 * 
 * */
calculateDiscount = (price, discount) => {
    let discountedPrice = (1 - (discount / 100)) * price;
    return discountedPrice.toFixed(2);
}

/**
 * Retrieves data for marketplace/home page. 
 * Dynamically generates cards for store items from database json.
 *
 * 
 * */
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
                    document.getElementById("inventory").appendChild(spacing);
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
    // overlayDiv.className = "view zoom overlay card-body";
    // let img = image;
    // img.className = "card-img-top";
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

    //price calculation
    // let currentPrice = document.createElement("span");
    // currentPrice.className = "text-success mr-1";
    // currentPrice.innerHTML = "$ " + calculateDiscount(price, discount);

    // let previousPrice = document.createElement("span");
    // previousPrice.className = "text-danger mr-1";

    // let addToCart = document.createElement("button");
    // addToCart.className = "btn btn-primary btn-sm mr-1 mb-2"
    // addToCart.innerHTML = "Add to Cart";
    // addToCart.onclick = (() => {
    //     detail = {
    //         "listDate": listDate,
    //         "itemName": itemName,
    //         "price": price,
    //         "discount": discount,
    //         "quantity": quantity,
    //         "itemCategory": category,
    //         "image": image.src
    //     };
    //     shoppingCart.push(detail);
    //     displayCart();
    // });
    cardText.appendChild(header);
    cardText.appendChild(displayDesc);
    cardText.appendChild(displayPoints);
    cardText.appendChild(linebreak);
    // //check to see if discount is invalid
    // if (price <= calculateDiscount(price, discount)) {
    //     previousPrice.className = "text-gray mr-1";
    //     previousPrice.innerHTML = "$ " + price + "</br>";
    //     cardText.appendChild(previousPrice);
    //     let saleOverlay = document.createElement('h4');
    //     saleOverlay.className = "mb-2";
    //     let saleSpan = document.createElement('span');
    //     saleSpan.className = "badge badge-success";
    //     saleSpan.innerHTML = "NEW";
    //     saleOverlay.appendChild(saleSpan);
    //     overlayDiv.appendChild(saleOverlay);
    // } else {
    //     previousPrice.innerHTML = "<s>$ " + price + "</s></br>";
    //     cardText.appendChild(currentPrice);
    //     cardText.appendChild(previousPrice);
    //     let saleOverlay = document.createElement('h4');
    //     saleOverlay.className = "mb-2";
    //     let saleSpan = document.createElement('span');
    //     saleSpan.className = "badge badge-danger";
    //     saleSpan.innerHTML = "SALE";
    //     saleOverlay.appendChild(saleSpan);
    //     overlayDiv.appendChild(saleOverlay);
    // }
    // cardText.appendChild(addToCart);
    cardObject.appendChild(overlayDiv);
    cardObject.appendChild(cardText);
    column.appendChild(cardObject);
    document.getElementById("inventory").appendChild(column);
}

/**
 * Calculates total price of everything within user's cart.
 *
 * 
 * */
calculateCartTotal = () => {
    let object = {};
    let price = 0;
    for (i = 0; i < shoppingCart.length; i++) {
        let discounted = calculateDiscount(shoppingCart[i].price, shoppingCart[i].discount);
        if (discounted >= shoppingCart[i].price) {
            price += parseFloat(shoppingCart[i].price);
        } else {
            price += parseFloat(discounted);
        }
    }
    return price;
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

    $("#checkOut").click(() => {
        let cartDiv = document.getElementById("cartContent");

        for (i = 0; i < shoppingCart.length; i++) {
            console.log([shoppingCart[i]]);
            cartDiv.appendChild(document.createElement("tr"));
            let imageTD = document.createElement("td");
            imageTD.className = "w-25";
            let cart_img = document.createElement("IMG");
            cart_img.src = shoppingCart[i].image;
            cart_img.className = "img-fluid";
            imageTD.appendChild(cart_img);
            let nameTd = document.createElement("td");
            nameTd.innerHTML = shoppingCart[i].itemName;
            let priceTd = document.createElement("td");
            priceTd.innerHTML = calculateDiscount(shoppingCart[i].price, shoppingCart[i].discount);
            let qtyTd = document.createElement("td");
            let input = document.createElement("select");

            let quantity = shoppingCart[i].quantity;
            for (ii = 1; ii <= quantity; ii++) {
                let option = document.createElement("option");
                option.innerHTML = ii;
                input.appendChild(option);
            }
            qtyTd.appendChild(input);
            let categoryTd = document.createElement("td");
            categoryTd.innerHTML = shoppingCart[i].itemCategory.innerHTML;

            cartDiv.appendChild(imageTD);
            cartDiv.appendChild(nameTd);
            cartDiv.appendChild(categoryTd);
            cartDiv.appendChild(priceTd);
            cartDiv.appendChild(qtyTd);

        }
        let total = calculateCartTotal();
        console.log(total);
        document.getElementById("cartTotal").innerHTML = total;
        $('#checkoutModal').modal('toggle');

    })

    $("#submitCart").click(() => {
        console.log("submit");
        location.href="./thankyou.html";
    })

})