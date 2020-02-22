var dict = { //dictionaries
    "akuma" : "akuma", "aku" : "akuma", "gouki" : "akuma", //akuma
    "alisa" : "alisa", "ali" : "alisa", //alisa
    "anna" : "anna", "ana" : "anna", //anna
    "ak" : "armorking", "armorking" : "armorking","amk" : "armorking",
     "armor_king" : "armorking", "armor-king" : "armorking", //armorking
    "asuka" : "asuka", "asu" : "asuka", //asuka
    "bob" : "bob", //bob
    "bryan" : "bryan", "bry" : "bryan", //bryan
    "claudio" : "claudio", "cld" : "claudio", //claudio
    "deviljin" : "deviljin", "devil-jin" : "deviljin", 
    "devil_jin" : "deviljin", "dvj" : "deviljin", //devil jin 
    "dragunov" : "dragunov", "drag" : "dragunov", "dra" : "dragunov", //dragunov
    "eddy" : "eddy", "edy" : "eddy", //eddy
    "eliza" : "eliza", "elz" : "eliza", //eliza
    "feng" : "feng", "fen" : "feng", //feng
    "geese" : "geese", "ges" : "geese", //geese
    "gigas" : "ggs", //gigas
    "hei" : "heihachi", "heihachi" : "heihachi", //heihachi
    "hwoarang" : "hwoarang", "hwo" : "hwoarang", //hwoarang
    "jack" : "jack7", "jck" : "jack7", "jack-7" : "jack7", "jack 7" : "jack7", "jack_7" : "jack7", //jack-7
    "jin": "jin", //jin
    "josie": "josie", "jos": "josie", //josie
    "julia" : "julia", "jul" : "julia", //julia
    "katarina" : "katarina", "kat" : "katarina", //katarina
    "kazumi" : "kazumi", //kazumi
    "kaz": "kazuya", "kazuya": "kazuya", //kazuya
    "kuma" : "kuma", "kum" : "kuma", "panda" : "kuma", "pan" : "kuma", //kuma
    "lars" : "lars", "lar" : "lars", //lars
    "law" : "law", //law    
    "lee": "lee", //lee
    "lei":"lei", //lei
    "leo":"leo", //leo
    "lili":"lili", "lil":"lili", //lili
    "luckychloe":"luckychloe", "dnc":"luckychloe", "lck" : "luckychloe", 
    "chloe" : "luckychloe", "lucky-chloe" : "luckychloe",
    "lucky_chloe" : "luckychloe", "lucky" : "luckychloe", //luckychloe
    "marduk" : "marduk", "mar" : "marduk", "mdk" : "marduk", //marduk
    "masterraven" : "masterraven", "raven" : "masterraven", "mrv" : "masterraven", //master raven
    "master-raven" : "masteraven", "master_raven" : "masterraven",
    "miguel" : "miguel", "mig" : "miguel", //miguel
    "negan" : "negan", "neg" : "negan", "ngn" : "negan", //negan
    "nina" : "nina", "nin" : "nina", //nina
    "noctis" : "noctis", "noc" : "noctis", //noctis
    "paul" : "paul", "pau" : "paul", //paul
    "shaheen" : "shaheen", "shn" : "shaheen", //shaheen
    "steve" : "steve", "ste" : "steve", //steve
    "xiaoyu" : "xiaoyu", "xiao" : "xiaoyu", "ling" : "xiaoyu", //xiaoyu
    "yoshimitsu" : "yoshimitsu", "yoshi" : "yoshimitsu", "yos" : "yoshimitsu", //yoshitmitsu
}

/////////////////EVENT LISTERNERS
var input = document.getElementById("moveName");
input.addEventListener("keyup",
    function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();

            document.getElementById("searchBtn").click();
        }
    });


// document.addEventListener('click', function(event) {
//     if (!event.target.matches('.card'))
//         return;
//     event.preventDefault();
//     alert("Woah I just got clicked!");
// }
///////////////// END EVENT LISTERNERS
function trySearch() {
    var chname = document.getElementById("charName").value.toLowerCase();
    var strname = document.getElementById("moveName").value;
    if (dict[chname]) {
        findFrameTrap(chname, strname);
    }
    else {
        build_searchedMove("Character not found");
    }

}

/* Creating some elements on the webpage, for the looks */
const app = document.getElementById('root');
console.log(app);
const logo = document.createElement('img');
logo.src = 'logo.png';

// const app = document.getElementById('root');
// console.log(app);

// const container = document.createElement('div');
// container.setAttribute('class', 'container');


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

//when user presses enter,
//this function triggers
//Finds frame data onblock
async function findFrameTrap(chname, strname) {
    reset_table();
    var searchResult = await performSearch(chname, strname, null);

    console.log(searchResult);
    if (searchResult.length == 0) {
        build_searchedMove("No moves found...");
    }
    else { //here, we'll look for frame traps using the move given.
        //currently, we're only working with OB.

        var firstMove = searchResult[0];
        build_searchedMove(firstMove);  //print the searched move to the website
        if (isNaN(firstMove.onBlock)) {
            firstMove.onBlock = convertSpeed(firstMove.onBlock);
            firstMove.onBlock = firstMove.onBlock[0]; //just use the lowest possible value of OB
        }
        console.log('-------------------------');
        console.log('Command: ' + firstMove.cmd);
        console.log('OB: ' + firstMove.onBlock);
        console.log(firstMove.onBlock);
        console.log('-------------------------');

        //--------------------------------------------------------------------------------------- should be its own function, so we do OB and OH
        /* Here, the move is not plus enough to generate a frame trap,
        so we'll check if we can sidestep */
        if (firstMove.onBlock < 1 && firstMove.onBlock > -9) {
            console.log('No frametrap...');
            if (firstMove.onBlock < -4)
                console.log('...and side stepping is hard. OB: (' + firstMove.onBlock + ')');
            else
                console.log('...but side stepping is possible. OB: (' + firstMove.onBlock + ')');
        }
        //---------------------------------------------------------------------------------------
        /* Here, the move will make a frame trap, so we'll make
        searches in the character's movelist. */
        /* Let's first check for TRUE frame traps,
        meaning the second move is a mid. */
        else {
            var rangeLow = 5; //non-important low bracket
            var rangeHigh = 9;
            rangeHigh += firstMove.onBlock;
            
            var range = rangeLow + ',' + rangeHigh;
            searchResultArr = await performSearch(chname, 0, range); //dont want a specific string; want an array of moves with startup within range
            console.log("Number of all possible moves: " + searchResult.length);
            console.log(searchResultArr);
            console.log("Range is: " + range);
            
            console.log("Here's ALL the mid, unavoidable moves: ");
            var midMoves = buildRcmdMoves(searchResultArr, "m");
            console.log(midMoves);

            console.log("Here's ALL high frame trap moves: ");
            var highMoves = buildRcmdMoves(searchResultArr, "h");
            console.log(highMoves);

            console.log("Trying to find the 'best' mids...")
            var bestMids = findBestStrings(midMoves, "m");
            console.log(bestMids);

            console.log("Trying to find 'best' highs...")
            var bestHighs = findBestStrings(highMoves, "h");
            console.log(bestHighs);


            //*/*//*/*//*/*//*/*//*/*//*/*
            //Building the table
            build_table(bestMids, bestHighs);
            

            //
            //*/*//*/*//*/*//*/*//*/*//*/*
        }


    }

}

//PARAMETERS: array of moves
//OUTPUT: returns the "best" moves to use, what strings create good frame traps
function buildRcmdMoves(arr, hitHeight) {
    var rcmdArr = [];
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
    speed = speed.trim();
    console.log(speed);
    speed = speed.split(" ");
    speed = speed.filter(Boolean); //stack overflow, removing empty elements from an array
    for (i = 0; i < speed.length; i++)
        speed[i] = parseInt(speed[i]);
    return speed;
}

//PARAMETERS: arr (strings make ft), char (hit level of first move)
//FUNCTION: searches passed array for the four "best" and "possible" moves to perform
//RETURNS: arr with best moves

//best highs and mids 1) launch 2) knd 3) plus frames
//may need to add more to generate all these cases as well

function findBestStrings(moveArr, level) {

    var i = 0
    var bestArr = [];

    moveArr.forEach(move => {
        if (move.hit[0] == level)
            if (move.onCounter == "KND" || convertSpeed(move.onHit)[0] >= 10)
                bestArr.push(move);
    });
    
    return bestArr;
}