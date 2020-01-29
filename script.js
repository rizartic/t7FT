var dict = {
    "jin": "jin",
    "kaz": "kazuya",
    "kazuya": "kazuya",
    "josie": "josie",

}
var input = document.getElementById("charName");
input.addEventListener("keyup",
    function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();

            document.getElementById("searchBtn").click();
        }
    });

function trySearch() {
    var chname = document.getElementById("charName").value;
    var strname = document.getElementById("moveName").value;
    if (dict[chname]) {
        alert("We're in");
        findFrameTrap(chname, strname);
    }
    else {
        alert("No good");
    }

}

/* Creating some elements on the webpage, for the looks */
const app = document.getElementById('root');
console.log(app);
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

function performSearch(chname, strname) {
    return new Promise(resolve => {
        var data;
        var request = new XMLHttpRequest();
        var fetchUrl = 'https://cors-anywhere.herokuapp.com/http://t7api.herokuapp.com/character/' + dict[chname];
        if (strname) { //if there was something included in the string field
             fetchUrl = fetchUrl + '?cmd=' + strname;
        }
        request.open('GET', fetchUrl, true);
        // **for testing individual console gets
        // request.open('GET', 'https://cors-anywhere.herokuapp.com/http://t7api.herokuapp.com/character/josie', true)
        request.onload = function () {
            //** note in JS, vars can be arrays.
            // In this example, fuzzy searching a command will
            // will return an array of all strings containing that command*/
            data = JSON.parse(this.response); //think its necessary for using data? convert json to object / array of objects
            resolve(data);
        }
        //Send Request
        request.send();
    });
}

async function findFrameTrap(chname, strname) {
    console.log('Now in findFrameTrap...');
    var searchResult = await performSearch(chname, strname);

    console.log(searchResult);
    console.log('And we are back...');
    if (searchResult.length == 0) {
        console.log("No commands found here");
    }
    else { //here, we'll look for frame traps using the move given.
        // console.log(data);
        var firstMove = searchResult[0];
        console.log('-------------------------');
        console.log('Command: ' + firstMove.cmd);
        console.log('OB: ' + firstMove.onBlock);
        console.log('-------------------------');

        /* Here, the move is not plus enough to generate a frame trap,
        so we'll check if we can sidestep */
        if (firstMove.onBlock < 1 && firstMove.onBlock > -9) {
            console.log('No frametrap...');
            if (firstMove.onBlock < -4)
                console.log('...and side stepping is hard. OB: (' + firstMove.onBlock + ')');
            else
                console.log('...but side stepping is possible. OB: (' + firstMove.onBlock + ')');
        }

        /* Here, the move might make a frame trap, so we'll make
        searches in the character's movelist. */
        /* Let's first check for TRUE frame traps,
        meaning the second move is a mid. */
        else {
            searchResult = await performSearch(chname, 0); //dont want a specific string; want the entire array here
            console.log(searchResult);
        }


    }

}
