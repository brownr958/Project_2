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


  