var dict = {
    "jin" : "jin",
    "kaz" : "kazuya",
    "kazuya" : "kazuya",

}
var input = document.getElementById("charName");
input.addEventListener("keyup", 
function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        document.getElementById("searchBtn").click();
    }
});

function trySearch() {
    var name = document.getElementById("charName").value;
    if(dict[name]) {
       alert("We're in");
    }
    else {
        alert("No good");
    }

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
request.open('GET', 'https://cors-anywhere.herokuapp.com/http://t7api.herokuapp.com/character/josie?cmd=df2', true)


//Send Request
request.send()


// **for testing individual console gets
request.onload = function() {
    //** note in JS, vars can be arrays.
    // In this example, fuzzy searching a command will
    // will return an array of all strings containing that command*/
    
    
    var data = JSON.parse(this.response) //think its necessary for using data? convert json to object / array of objects
    // console.log(JSON.stringify(data))
    // console.log(data.length) //return length of array
    // console.log(data[0].speed) //return the speed of the first move in array
    
    // data.forEach(function(element) { //return all strings the search found
    //     console.log(element.cmd)

    // })
    // console.log(data)
}

// // 
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
