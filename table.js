
function table_JS() {
    alert("this is table.js!")
}

function build_table(rcmdArr) {

    var fdtable = document.getElementById('fdTable');
    var tableSize = fdtable.rows.length;
    console.log("Table rows: " + fdtable.rows.length);
    if (tableSize != 1) {
        reset_table(fdTable);
    }
}


function reset_table(fdt) {

    while (fdt.rows.length > 1) {

        fdt.deleteRow(1);
    }
}

