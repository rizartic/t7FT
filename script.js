// Event listener when clicking on character card.
// document.querySelector('.card').addEventListener("click", function(){
//     window.alert('Hit');
// });

//Event listener when closing the character modal.
// document.querySelector('.close').addEventListener('click', function(){
//     document.querySelector('.character-info-window-overlay').style.display='none';
// });

const app = document.getElementById('character-select');
// console.log(app);

// const container = document.createElement('div');
// container.setAttribute('class', 'container');

// app.appendChild(container);

/*THIS CODE MAKES THE REQUEST*/
var request = new XMLHttpRequest()
var proxy = 'https://cors-anywhere.herokuapp.com/'

request.open('GET', proxy+'http://t7api.herokuapp.com/character/list', true)

request.onload = function() {
    var data = JSON.parse(this.response)
    let charactersUnsorted = data.map (character => character.name)
    characters = charactersUnsorted.sort();
 
    characters.forEach(name => {
        
        //Create div element for card
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', 'card-'+name);

        //Create image element for card
        const thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', 'images/thumbnails/'+name+'-thumbnail.jpg');

        //create div element for name
        const characterName = document.createElement('div');
        characterName.setAttribute('class', 'card-name');
        characterName.setAttribute('id', 'card-'+name);
        characterName.textContent = (name);

        app.appendChild(card);
        card.appendChild(thumbnail);
        card.appendChild(characterName);
        console.log(name);
    });
}

//Send Request
request.send()