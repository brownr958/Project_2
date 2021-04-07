var tbody = d3.select('tbody');



console.log(data);

data.forEach(function(baseballdata) {
    console.log(baseballdata);
    var row = tbody.append("tr");
    Object.entries(baseballdata).forEach(function([key, value]) {
      console.log(key, value);
      var cell = row.append("td");
      cell.text(value);
    });
});


$(document).ready(function() {
    $('#player-table').DataTable( {
        "pagingType": "full_numbers"
    } );
} );

// Getting the table element
var rows = document
    .getElementsByTagName("tr");

// Looping over tables
for (var i = 0; i < rows.length; i++) {

    // Get the ith table
    var row = rows[i];

    // Set the id dynamically
    row.setAttribute("id", i + 1);

    row.setAttribute('draggable','true' )

    row.setAttribute('ondragstart','drag(event)')
}
