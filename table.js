function build_searchedMove(move) {


    var t = document.getElementById('searchedMove');
    if (t.rows.length!=1) {
        reset_table(t);
    }

    var newRow = t.insertRow(t.rows.length);
    var cmdcell = newRow.insertCell(0);

    //errorchecking: if we get a string, print the message
    //and dont continue building the table
    if (typeof(move) != "object") {
        cmdcell.innerHTML = move;
        return;
    }
    var hitcell = newRow.insertCell(1);
    var spdcell = newRow.insertCell(2);
    var dmgcell = newRow.insertCell(3);
    var obcell  = newRow.insertCell(4);
    var ohcell = newRow.insertCell(5);
    var cohcell = newRow.insertCell(6);

    cmdcell.innerHTML = move.cmd;
    hitcell.innerHTML = move.hit;
    spdcell.innerHTML = move.speed;
    dmgcell.innerHTML = move.dmg;
    obcell.innerHTML = move.onBlock;
    ohcell.innerHTML = move.onHit;
    cohcell.innerHTML = move.onCounter;
}

//passed an array with ALL strings generating frame traps

function build_table(mdarr, hiarr) {

    var mdt = document.getElementById('midFdTable');
    var hdt = document.getElementById('hiFdTable');

    mdarr.forEach(move => {

        var newRow = mdt.insertRow(mdt.rows.length);
        var cmdcell = newRow.insertCell(0);
        var hitcell = newRow.insertCell(1);
        var spdcell = newRow.insertCell(2);
        var dmgcell = newRow.insertCell(3);
        var obcell  = newRow.insertCell(4);
        var ohcell = newRow.insertCell(5);
        var cohcell = newRow.insertCell(6);

        cmdcell.innerHTML = move.cmd;
        hitcell.innerHTML = move.hit;
        spdcell.innerHTML = move.speed;
        dmgcell.innerHTML = move.dmg;
        obcell.innerHTML = move.onBlock;
        ohcell.innerHTML = move.onHit;
        cohcell.innerHTML = move.onCounter;
    });
    hiarr.forEach(move => {

        var newRow = hdt.insertRow(hdt.rows.length);
        var cmdcell = newRow.insertCell(0);
        var hitcell = newRow.insertCell(1);
        var spdcell = newRow.insertCell(2);
        var dmgcell = newRow.insertCell(3);
        var obcell  = newRow.insertCell(4);
        var ohcell = newRow.insertCell(5);
        var cohcell = newRow.insertCell(6);

        cmdcell.innerHTML = move.cmd;
        hitcell.innerHTML = move.hit;
        spdcell.innerHTML = move.speed;
        dmgcell.innerHTML = move.dmg;
        obcell.innerHTML = move.onBlock;
        ohcell.innerHTML = move.onHit;
        cohcell.innerHTML = move.onCounter;
    });
}


function reset_table() {

    var mfdt = document.getElementById('midFdTable');
    var hfdt = document.getElementById('hiFdTable');
    var st = document.getElementById('searchedMove');
    if (st.rows.length > 0)
        st.deleteRow(1);
    while (mfdt.rows.length > 1) {
        mfdt.deleteRow(1);
    }
    while (hfdt.rows.length > 1) {
        hfdt.deleteRow(1);
    }
}

