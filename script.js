var dict = {
    "akuma" : "akuma",
    "aku" : "akuma",
    "gouki" : "akuma",
    "alisa" : "alisa",
    "anna" : "anna",
    "ak" : "armorKing",
    "jin": "jin",
    "kaz": "kazuya",
    "kazuya": "kazuya",
    "josie": "josie",
    "hei" : "heihachi",
    "heihachi" : "heihachi",
}
var input = document.getElementById("moveName");
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


//FUNCTION: Accesses the t7api and returns request results
//PARAMETERS: string (character), string(move name), string/num(frame info of move)
function performSearch(chname, strname, range) {
    return new Promise(resolve => {
        var data;
        var request = new XMLHttpRequest();
        var fetchUrl = 'https://cors-anywhere.herokuapp.com/http://t7api.herokuapp.com/character/' + dict[chname];
        //if there was something included in the string field
        if (strname) { 
             fetchUrl = fetchUrl + '?cmd=' + strname;
        }
        //if there's something in range, we're looking for frame traps
        else if (range != null) {
            fetchUrl = fetchUrl + '?speed=' + range
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
    var searchResult = await performSearch(chname, strname, null);

    console.log(searchResult);
    if (searchResult.length == 0) {
        console.log("No commands found here");
    }
    else { //here, we'll look for frame traps using the move given.
        // console.log(data);
        var firstMove = searchResult[0];
        console.log('-------------------------');
        console.log('Command: ' + firstMove.cmd);
        console.log('OB: ' + firstMove.onBlock);
        console.log(firstMove.onBlock);
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

        /* Here, the move will make a frame trap, so we'll make
        searches in the character's movelist. */
        /* Let's first check for TRUE frame traps,
        meaning the second move is a mid. */
        else {
            var rangeLow = 5; //non-important low bracket
            var rangeHigh = 9;
            
            if (isNaN(firstMove.onBlock)) {
                firstMove.onBlock = convertSpeed(firstMove.onBlock);
                rangeHigh += firstMove.onBlock[0]; //for simplicity, let's just the low end for the general case scenario when finding frame traps
            }
            else {
                rangeHigh += firstMove.onBlock;
            }
            var range = rangeLow + ',' + rangeHigh;
            searchResult = await performSearch(chname, 0, range); //dont want a specific string; want the entire array here
            console.log("Number of all possible moves: " + searchResult.length);
            console.log(searchResult);
            console.log("Range is: " + range);
            console.log("Here's the mid, unavoidable moves: ");
            console.log(buildRcmdMoves(searchResult, "m"));
            console.log("Here's high frame trap moves: ");
            console.log(buildRcmdMoves(searchResult, "h"));
        }


    }

}

//PARAMETERS: array of moves
//OUTPUT: returns the "best" moves to use, what strings create good frame traps
function buildRcmdMoves(arr, hitHeight) {
    var rcmdArr = [];
    console.log(typeof(arr));
    arr.forEach(move => {
        if (move.hit[0] == hitHeight)
            rcmdArr.push(move);
    })
    
    return rcmdArr;
}
//may choose to update later
//PARAMETERS: string
//OUTPUT: number
//FUNCTION: Converts a range of numbers to just one
function convertSpeed(passedSpeed) {
    var speed = passedSpeed;
    speed = speed.replace(/[^\d.-]/g,' ');
    // speed = speed.replace(/[^0-9]/g, ' ');
    // speed = speed.substr(1); //need to do this, dont know why string is producing a leading "9"
    speed = speed.trim();
    console.log("In convert speed")/////
    console.log(speed);
    speed = speed.split(" ");
    speed = speed.filter(Boolean); //stack overflow, removing empty elements from an array
    console.log(speed);
    for (i = 0; i < speed.length; i++)
        speed[i] = parseInt(speed[i]);
    console.log(speed);
    return speed;
}
