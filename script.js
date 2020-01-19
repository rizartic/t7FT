// Event listener when clicking on character card.
document.getElementById('button').addEventListener("click", function(){
    document.querySelector('.character-info-window-overlay').style.display = 'flex';
});

//Event listener when closing the character modal.
document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('.character-info-window-overlay').style.display='none';
});

// const app = document.getElementById('root');
// console.log(app);

// const container = document.createElement('div');
// container.setAttribute('class', 'container');

// app.appendChild(container);

/*THIS CODE MAKES THE REQUEST*/
// var request = new XMLHttpRequest()
// var proxy = 'https://cors-anywhere.herokuapp.com/'

// request.open('GET', proxy+'http://t7api.herokuapp.com/character/list', true)

// request.onload = function() {
//     //Begin accessing JSON data here
//     var data = JSON.parse(this.response)

//     data.forEach(character => {
        
//         const card = document.createElement('div');
//         card.setAttribute('class', 'card');

//         const h1 = document.createElement('h1');
//         h1.textContent = ' '+character.label;

//         container.appendChild(card);
//         card.appendChild(h1);

        
//     });
// }

// //Send Request
// request.send()