function trySearch() {
    var name = document.getElementById("charName").value;
    document.getElementById("demo").innerHTML = name;
}

const app = document.getElementById('root');
console.log(app);

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);


var request = new XMLHttpRequest()
//hey this is a test
request.open('GET', 'https://cors-anywhere.herokuapp.com/http://t7api.herokuapp.com/character/list', true)

request.onload = function() {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response)

    data.forEach(character => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = ' '+character.label;

        container.appendChild(card);
        card.appendChild(h1);
    });
}

//Send Request
request.send()