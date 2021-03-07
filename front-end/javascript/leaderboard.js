
getRanking = () => {
    fetch('http://localhost:3000/v1/scores', {
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
                console.log( i+1, data[i].city_name, data[i].points);
                   generateLeaderBoard(i+1, data[i].city_name, data[i].points);
            }
        }).
    catch(e => {
        console.log(e);
    });
}

generateLeaderBoard = (rank, city, score)=>{
    let column = document.createElement("div");
    column.className = "col";
    let cardObject = document.createElement("div");
    cardObject.className = "card";
    let overlayDiv = document.createElement("div");
    let cardText = document.createElement("div");
    cardText.className = "card-body text-left";
    let cardText2 = document.createElement("div");
    cardText2.className = "card-body text-left";
    let ranking = document.createElement("h5");
    ranking.innerHTML = '#' + rank;
    let cityname = document.createElement("p");
    cityname.innerHTML =  city;
    let cityScore = document.createElement("p");
    cityScore.innerHTML = "Score: " + score;
    let linebreak = document.createElement("h6");
    linebreak.className = "mb-3";
    

    cardText2.appendChild(ranking);
    cardText.appendChild(cityname);
    cardText.appendChild(cityScore);
    cardText.appendChild(linebreak);
  
    cardObject.appendChild(overlayDiv);
    cardObject.appendChild(cardText2);
    cardObject.appendChild(cardText);
    
    column.appendChild(cardObject);
    document.getElementById("rankings").appendChild(column);

}
getRanking();

