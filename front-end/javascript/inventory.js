/**
 * If user is not logged in, it will redirect them back to index.html.
 */
const session = localStorage.getItem("session");
// if (!session) {
//     console.log('invalid session');
//     location.href = "./index.html";
// }

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
 * Retrieves data for inventory management. 
 * Items are retrieved based on user_id which is stored in the user session.
 *
 * 
 * */
getUserItems = () => {
    user_id = localStorage.getItem('session');
    fetch('https://shopify-challenge-db.herokuapp.com/v1/items/' + user_id, {
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
            for (i = 0; i < data.length; i++) {
                if (i % 2 == 0) {
                    let spacing = document.createElement("div");
                    spacing.className = "w-100";
                    document.getElementById("inventory").appendChild(spacing);
                }
                let listDate = data[i].list_date.split('T')[0];
                let img = document.createElement("img");
                img.src = data[i].image;
                generateCard(listDate, data[i].item_name, data[i].price, data[i].discount, data[i].quantity, data[i].item_category, img, data[i].private, data[i].img_id);
            }
        }).
    catch(e => {
        console.log(e);
    });
}

/**
 * Deletes a specific item from the user's listings.
 *
 * 
 * */
deleteItem = () => {
    fetch('https://shopify-challenge-db.herokuapp.com/v1/items', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('session'),
            img_id: localStorage.getItem('imgID')
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                console.log("Item Saved");
                // location.reload();

            } else if (res.status == 404) {
                throw new Error('User not in database.');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            $('#item_submit').className = 'data-toggle="popover" title="Edit Submitted" data-content="' + data + '"';
        }).
    catch(e => {
        alert(e);
    });
}

/**
 * Deletes a specific item based on imgID and userID from the database.
 *
 * 
 * */
deleteCurrentItem = () => {
    fetch('https://shopify-challenge-db.herokuapp.com/v1/items', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('session'),
            img_id: localStorage.getItem('imgID')
        }),
    }).
    then(res => {
            console.log(res.json);
            if (res.status == 200) {
                console.log("Item Saved");
                location.reload();

            } else if (res.status == 404) {
                throw new Error('Login again.');
            } else {
                console.log(res.json);
            }
        })
        .then(data => {
            $('#item_submit').className = 'data-toggle="popover" title="Edit Submitted" data-content="' + data + '"';
        }).
    catch(e => {
        alert(e);
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
 * @param {boolean} image if the listing is private
 * @param {integer} imgID id of the current image being generated
 * */
generateCard = (listDate, itemName, price, discount, quantity, itemCategory, image, private, imgID) => {
    let column = document.createElement("div");
    column.className = "col";
    let cardObject = document.createElement("div");
    cardObject.className = "card";
    let overlayDiv = document.createElement("div");
    overlayDiv.className = "view zoom overlay card-body";
    let img = image;
    img.className = "card-img-top";
    let cardText = document.createElement("div");
    cardText.className = "card-body text-center";
    let header = document.createElement("h5");
    header.innerHTML = itemName;
    let category = document.createElement("p");
    let listingDate = document.createElement("p");
    listingDate.innerHTML = "Listed: " + listDate;
    let storeQuantity = document.createElement("p");
    storeQuantity.innerHTML = "Quantity: " + quantity;
    let linebreak = document.createElement("h6");
    linebreak.className = "mb-3";
    category.innerHTML = itemCategory;
    category.className = "small text-muted text-uppercase mb-2";
    listingDate.className = "small text-muted text-uppercase mb-2";
    storeQuantity.className = "small text-muted text-uppercase mb-2";

    //price calculation
    let currentPrice = document.createElement("span");
    currentPrice.className = "text-success mr-1";
    currentPrice.innerHTML = "$ " + calculateDiscount(price, discount);

    let previousPrice = document.createElement("span");
    previousPrice.className = "text-danger mr-1";


    let editItem = document.createElement("button");
    editItem.id = "editButton";
    editItem.className = "btn btn-secondary btn-sm mr-1 mb-2"
    editItem.innerHTML = "Edit";
    editItem.onclick = (() => {
        $('#editModal').modal('toggle');
        localStorage.setItem('imgID', imgID);
        document.getElementById("edit_item").value = itemName;
        document.getElementById("edit_category").value = itemCategory;
        document.getElementById("edit_quantity").value = quantity;
        document.getElementById("edit_price").value = price;
        document.getElementById("edit_discount").value = discount;
        document.getElementById("output").value = image;
        document.getElementById("edit_private").value = private;
        document.getElementById("edit_output").src = image.src;
    });



    deleteItem = document.createElement("button");
    deleteItem.onclick = (() => {
        let confirmation = confirm("Delete Item?");
        if (confirmation == true) {
            localStorage.setItem('imgID', imgID);
            deleteCurrentItem();
        } else {
            console.log("Cancelled");
        }

    });
    deleteItem.className = "btn btn-secondary btn-sm mr-1 mb-2";
    deleteItem.innerHTML = 'Delete';

    cardText.appendChild(header);
    cardText.appendChild(category);
    cardText.appendChild(listingDate);
    cardText.appendChild(storeQuantity);
    cardText.appendChild(linebreak);

    //check to see if discount is invalid
    if (!private) {
        let saleOverlay = document.createElement('h4');
        saleOverlay.className = "mb-2";
        let privateSpan = document.createElement('span');
        privateSpan.className = "badge badge-success";
        privateSpan.innerHTML = "Published";
        saleOverlay.appendChild(privateSpan);
        overlayDiv.appendChild(saleOverlay);
    } else {
        let saleOverlay = document.createElement('h4');
        saleOverlay.className = "mb-2";
        let privateSpan = document.createElement('span');
        privateSpan.className = "badge badge-danger";
        privateSpan.innerHTML = "Unpublished";
        saleOverlay.appendChild(privateSpan);
        overlayDiv.appendChild(saleOverlay);
    }

    cardText.appendChild(editItem);
    cardText.appendChild(deleteItem);
    cardObject.appendChild(overlayDiv);
    overlayDiv.appendChild(img);
    cardObject.appendChild(cardText);
    column.appendChild(cardObject);
    document.getElementById("inventory").appendChild(column);


}

/**
 * When images are opened/loaded into the html form, it is converted to a data uri.
 */
var openFile = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById('output');
        output.src = dataURL;
        let editOutput = document.getElementById('edit_output');
        editOutput.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
};



getUserItems();

$(document).ready(function () {
    $("#home").click(() => {
        localStorage.clear();
        location.href = "./index.html";
    })

    $("#item_submit").click(() => {
        fetch('https://shopify-challenge-db.herokuapp.com/v1/items', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'CrossDomain': true
            },
            body: JSON.stringify({
                item_name: document.getElementById('input_item').value,
                item_category: document.getElementById('input_category').value,
                quantity: document.getElementById('input_quantity').value,
                price: document.getElementById('input_price').value,
                discount: document.getElementById('input_discount').value,
                private: document.getElementById('input_private').value,
                user_id: localStorage.getItem('session'),
                image: document.getElementById('edit_output').src
            }),
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Item Deleted");
                    location.reload();

                } else if (res.status == 404) {
                    throw new Error('User not in database.');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                $('#item_submit').className = 'data-toggle="popover" title="Query Submitted" data-content="' + data + '"';
            }).
        catch(e => {
            alert(e);
        });
    });

    $("#edit_submit").click(() => {
        // alert(document.getElementById('edit_output').src);
        fetch('https://shopify-challenge-db.herokuapp.com/v1/items', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                item_name: document.getElementById('edit_item').value,
                item_category: document.getElementById('edit_category').value,
                quantity: document.getElementById('edit_quantity').value,
                price: document.getElementById('edit_price').value,
                discount: document.getElementById('edit_discount').value,
                private: document.getElementById('edit_private').value,
                user_id: localStorage.getItem('session'),
                image: document.getElementById('edit_output').src,
                img_id: localStorage.getItem('imgID')
            }),
        }).
        then(res => {
                console.log(res.json);
                if (res.status == 200) {
                    console.log("Your items have been cleared");
                    location.reload();

                } else if (res.status == 404) {
                    throw new Error('Unauthorized');
                } else {
                    console.log(res.json);
                }
            })
            .then(data => {
                $('#item_submit').className = 'data-toggle="popover" title="Edit Submitted" data-content="' + data + '"';
            }).
        catch(e => {
            alert(e);
        });
    });
    // $("#editItem").on("click", function(){
    //     console.log('edit clicked');
    //     $($(this).attr("#editModal")).modal("show");
    //   });
    $("#deleteAll").click(() => {
        let userConfirmation = confirm("This will delete all of your listings, are you sure?");
        if (!userConfirmation) {
            console.log("Delete cancelled");
        } else {
            fetch('https://shopify-challenge-db.herokuapp.com/v1/items/' + localStorage.getItem("session"), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).
            then(res => {
                    console.log(res.json);
                    if (res.status == 200) {
                        console.log("Item Saved");
                        location.reload();

                    } else if (res.status == 404) {
                        throw new Error('User not in database.');
                    } else {
                        console.log(res.json);
                    }
                })
                .then(data => {
                    $('#item_submit').className = 'data-toggle="popover" title="Edit Submitted" data-content="' + data + '"';
                }).
            catch(e => {
                alert(e);
            });
        }
    });

})