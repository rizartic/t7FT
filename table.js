
function table_JS() {
    alert("this is table.js!")
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

