
function table_JS() {
    alert("this is table.js!")
}

function build_searchedMove(move) {
    var t = document.getElementById('searchedMove');
    if (t.rows.length!=1) {
        reset_table(t);
    }
    var newRow = t.insertRow(t.rows.length);
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
}
function build_table(rcmdArr) {

    var fdtable = document.getElementById('fdTable');
    var tableSize = fdtable.rows.length;
    console.log("Table rows: " + fdtable.rows.length);
    console.log("rmcdArr size: " + rcmdArr.length);
    if (tableSize != 1) {
        reset_table(fdtable);
    }
    console.log(rcmdArr[0]);
    console.log(typeof (rcmdArr));
    rcmdArr.forEach(move => {

        var newRow = fdtable.insertRow(fdtable.rows.length);
        var cmdcell = newRow.insertCell(0);
        var hitcell = newRow.insertCell(1);
        var spdcell = newRow.insertCell(2);
        var dmgcell = newRow.insertCell(3);

        cmdcell.innerHTML = move.cmd;
        hitcell.innerHTML = move.hit;
        spdcell.innerHTML = move.speed;
        dmgcell.innerHTML = move.dmg;
    });
}


function reset_table(fdt) {

    while (fdt.rows.length > 1) {

        fdt.deleteRow(1);
    }
}

