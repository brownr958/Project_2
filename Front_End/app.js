var tbody = d3.select('tbody');

// CALLING IN OUR FLASK DATA //
d3.json("http://localhost:5000/allStats").then(function(stats){
    stats.forEach(function(baseballdata) {
        var row = tbody.append("tr");
        Object.entries(baseballdata).forEach(function([key, value]) {
          var cell = row.append("td");
          cell.text(value);
        });
    });
// CREATING FUNCTION FOR JQUERY LIBRARY TO FORMAT DATA TABLE //
    //https://datatables.net/examples/basic_init/alt_pagination.html//
    $(document).ready(function() {
        $('#player-table').DataTable( {
            "pagingType": "full_numbers"
        });
    });
// SETTING THE ID OF EACH TABLE ELEMENT TO USE LATER //
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
    }});

var positions = {}

// SETTING THE DROP FUNCTION FOR DATA TABLE //
function allowDrop(ev) {
  ev.preventDefault();}

// SETTING THE DRAG FUNCTION FOR DATA TABLE //
var player_data = []

function drag(ev) {
  td_string = $(ev.target).find('td')[1].innerHTML + "-" + $(ev.target).find('td')[0].innerHTML + "-" + $(ev.target).find('td')[3].innerHTML
  var key_stats = [$(ev.target).find('td')[4].innerHTML, $(ev.target).find('td')[5].innerHTML, $(ev.target).find('td')[6].innerHTML, $(ev.target).find('td')[7].innerHTML, $(ev.target).find('td')[8].innerHTML, $(ev.target).find('td')[9].innerHTML, $(ev.target).find('td')[10].innerHTML, $(ev.target).find('td')[11].innerHTML, $(ev.target).find('td')[12].innerHTML, $(ev.target).find('td')[13].innerHTML, $(ev.target).find('td')[14].innerHTML]
  player_data.push(key_stats)
  console.log(player_data)
  ev.dataTransfer.setData("text", td_string, player_data);}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  target = $(ev.target)
  target.empty()
  target.append(data)
  // Creating targets based on what positions or "boxes" on the field //
  positions['cf'] = d3.select(".cf").text()
  positions['c'] = d3.select(".c").text()
  positions['fb'] = d3.select(".fb").text()
  positions['sb'] = d3.select(".sb").text()
  positions['tb'] = d3.select(".tb").text()
  positions['ss'] = d3.select(".ss").text()
  positions['lf'] = d3.select(".lf").text()
  positions['rf'] = d3.select(".rf").text()
  positions['dh'] = d3.select(".dh").text()
  
  filter_list = Object.values(positions).filter(item => item.length > 1)

// CREATING THE BAR GRAPH //
d3.json(`http://localhost:5000/playerLineup/${filter_list}`).then((data) => {
      //Put the code to graph the data on warplot
      console.log(data)
     
      var pos =  data.map(x => x.Name);
      var pos2 =  data.map(x => x.WAR);
      var trace = {
        x: pos,
        y: pos2,
        type: 'bar',
        marker: {
            color: 'rgb(92,154,42)'
        },
};
      var bar = [trace];
      var layouts = {
    title: "WAR Statistics by Player",
    height: 375,
    width: 715,
    font: {
        color: 'rgb(199,225,181)'
    }};
 Plotly.newPlot("warplot", bar, layouts);
   })
  new Multiple({
    selector: '.multi.age',
    background: 'linear-gradient(#5B992B, #375B1A)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.hr',
    background: 'linear-gradient(rgb(70, 106, 177), #32A668)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.abhr',
    background: 'linear-gradient(#5B992B, #375B1A)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.sbs',
    background: 'linear-gradient(rgb(70, 106, 177), #32A668)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.avg',
    background: 'linear-gradient(#5B992B, #375B1A)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.obp',
    background: 'linear-gradient(rgb(70, 106, 177), #32A668)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.slg',
    background: 'linear-gradient(#5B992B, #375B1A)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.ops',
    background: 'linear-gradient(rgb(70, 106, 177), #32A668)',
    affectText: false
  });
}

