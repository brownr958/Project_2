var tbody = d3.select('tbody');

console.log("I am inside app.js")

d3.json("http://localhost:5000/allStats").then(function(stats){
    stats.forEach(function(baseballdata) {
        var row = tbody.append("tr");
        Object.entries(baseballdata).forEach(function([key, value]) {
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
});

d3.json("all_data.json").then((data)=>{
    var ids = data.map(x => x.Season);
    var season =  data.map(x => x.WAR);
    var trace1 = {
        x: ids,
        y: season,
        type: "bar"
};
    var nfo = [trace1];
    var layout = {
        title: "'Bar' Chart"
};
    Plotly.newPlot("plot", nfo, layout);
});



