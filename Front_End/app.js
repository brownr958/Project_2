var tbody = d3.select('tbody');

// CALLING IN OUR FLASK DATA //
d3.json("http://localhost:5000/allStats").then(function (stats) {
  stats.forEach(function (baseballdata) {
    var row = tbody.append("tr");
    Object.entries(baseballdata).forEach(function ([key, value]) {
      var cell = row.append("td");
      cell.text(value);
    });
  });
  // CREATING FUNCTION FOR JQUERY LIBRARY TO FORMAT DATA TABLE //
  //https://datatables.net/examples/basic_init/alt_pagination.html//
  $(document).ready(function () {
    $('#player-table').DataTable({
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

    row.setAttribute('draggable', 'true')

    row.setAttribute('ondragstart', 'drag(event)')
  }
});

var positions = {}

// SETTING THE DROP FUNCTION FOR DATA TABLE //
function allowDrop(ev) {
  ev.preventDefault();
}

// SETTING THE DRAG FUNCTION FOR DATA TABLE //
var key_stats = []

function drag(ev) {
  var team = $(ev.target).find('td')[2].innerHTML
  td_string = "<p class='" + team + "'><span class='left'>" + $(ev.target).find('td')[3].innerHTML + "</span>-" + $(ev.target).find('td')[0].innerHTML + "-<span class='right'>" + $(ev.target).find('td')[2].innerHTML + "</span><br>-<strong>" + $(ev.target).find('td')[1].innerHTML + "</strong>-"
  key_stats = [$(ev.target).find('td')[4].innerHTML, $(ev.target).find('td')[5].innerHTML, $(ev.target).find('td')[6].innerHTML, $(ev.target).find('td')[8].innerHTML, $(ev.target).find('td')[9].innerHTML, $(ev.target).find('td')[10].innerHTML, $(ev.target).find('td')[12].innerHTML, $(ev.target).find('td')[14].innerHTML]
  ev.dataTransfer.setData("text", td_string, key_stats);
}

var age = []
var hr = []
var ab = []
var sb = []
var hits = []
var avg = []
var obp = []
var ops = []

function sum(input){
  if (toString.call(input) !== "[object Array]")
    return false;
    var total =  0;
    for(var i=0;i<input.length;i++)
      {if(isNaN(input[i])){
        continue;}
          total += Number(input[i]);}
    return total;}

function mean(input){        
  if (toString.call(input) !== "[object Array]")
    return false;
    var total =  0;
    for(var i=0;i<input.length;i++)
      {if(isNaN(input[i])){
        continue;}
          total += Number(input[i]);}
    var mean = total/input.length
    return mean;}

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

  // Pushing individual stats to perform functions and display averages/totals
  age.push(key_stats[0])
  hr.push(key_stats[6])
  ab.push(key_stats[4])
  sb.push(key_stats[7])
  hits.push(key_stats[5])
  avg.push(key_stats[1])
  obp.push(key_stats[2])
  ops.push(key_stats[3])

  var aage = mean(age).toFixed(1)
  var thr = sum(hr)
  var aabhr = (sum(ab)/thr).toFixed(2)
  var tsb = sum(sb)
  var thits = sum(hits)
  var aavg = mean(avg).toFixed(3)
  var aobp = mean(obp).toFixed(3)
  var aops = mean(ops).toFixed(3)

  d3.select(".multi-title").html("Team Totals and Averages")
  d3.select(".age").html("<sub>Average Age:</sub><br><sup>" + aage + "</sup>")
  d3.select(".hr").html("<sub>Total HR:</sub><br><sup>" + thr + "</sup>")
  d3.select(".abhr").html("<sub>AB per HR:</sub><br><sup>" + aabhr + "</sup>")
  d3.select(".sbs").html("<sub>Total SBs:</sub><br><sup>" + tsb + "</sup>")
  d3.select(".hits").html("<sub>Total Hits:</sub><br><sup>" + thits + "</sup>")
  d3.select(".avg").html("<sub>Team Average:</sub><br><sup>" + aavg + "</sup>")
  d3.select(".obp").html("<sub>Team OBP:</sub><br><sup>" + aobp + "</sup>")
  d3.select(".ops").html("<sub>Team OPS:</sub><br><sup>" + aops + "</sup>")
  d3.select(".note").html("*Note Team AVG, OBP, and OPS are all averages and not true calculations.")

  
  // CREATING THE BAR GRAPH //
  d3.json(`http://localhost:5000/playerLineup/${filter_list}`).then((data) => {
    //Put the code to graph the data on warplot
    console.log(data)

    var pos = data.map(x => x.Name);
    var pos2 = data.map(x => x.WAR);
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
      }
    };
    Plotly.newPlot("warplot", bar, layouts);
  })
  new Multiple({
    selector: '.multi.age',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.hr',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.abhr',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.sbs',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.hits',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.avg',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.obp',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '.multi.ops',
    background: 'linear-gradient(#5c9a2a, #5c9a2a)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .ANA',
    background: 'linear-gradient(#13294B, #13294B)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .ARI',
    background: 'linear-gradient(#A71930, #A71930)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .ATL',
    background: 'linear-gradient(#13274F, #13274F)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .BAL',
    background: 'linear-gradient(#DF4601, #DF4601)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .BOS',
    background: 'linear-gradient(#BD3039, #BD3039)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .CAL',
    background: 'linear-gradient(#041C2C, #041C2C)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .CHC',
    background: 'linear-gradient(#0E3386, #0E3386)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .CHW',
    background: 'linear-gradient(#C4CED4, #C4CED4)',
    affectText: '#000'
  });
  new Multiple({
    selector: '#box > .CIN',
    background: 'linear-gradient(#C6011F, #C6011F)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .CLE',
    background: 'linear-gradient(#0C2340, #0C2340)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .COL',
    background: 'linear-gradient(#33006F, #33006F)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .DET',
    background: 'linear-gradient(#0C2340, #0C2340)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .FLA',
    background: 'linear-gradient(#009CA6, #009CA6)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .HOU',
    background: 'linear-gradient(#EB6E1F, #EB6E1F)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .KCR',
    background: 'linear-gradient(#004687, #004687)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .LAA',
    background: 'linear-gradient(#BA0021, #BA0021)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .LAD',
    background: 'linear-gradient(#005A9C, #005A9C)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .MIA',
    background: 'linear-gradient(#00A3E0, #00A3E0)',
    affectText: '#000'
  });
  new Multiple({
    selector: '#box > .MIL',
    background: 'linear-gradient(#12284B, #12284B)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .MIN',
    background: 'linear-gradient(#002B5C, #002B5C)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .MON',
    background: 'linear-gradient(#003087, #003087)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .NYM',
    background: 'linear-gradient(#002D72, #002D72)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .NYY',
    background: 'linear-gradient(#0C2340, #0C2340)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .OAK',
    background: 'linear-gradient(#003831, #003831)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .PHI',
    background: 'linear-gradient(#E81828, #E81828)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .PIT',
    background: 'linear-gradient(#FDB827, #FDB827)',
    affectText: '#000'
  });
  new Multiple({
    selector: '#box > .SDP',
    background: 'linear-gradient(#2F241D, #2F241D)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .SEA',
    background: 'linear-gradient(#005C5C, #005C5C)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .SFG',
    background: 'linear-gradient(#FD5A1E, #FD5A1E)',
    affectText: '#000'
  });
  new Multiple({
    selector: '#box > .STL',
    background: 'linear-gradient(#C41E3A, #C41E3A)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .TBD',
    background: 'linear-gradient(#004637, #004637)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .TBR',
    background: 'linear-gradient(#092C5C, #092C5C)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .TEX',
    background: 'linear-gradient(#003278, #003278)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .TOR',
    background: 'linear-gradient(#134A8E, #134A8E)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .WAS',
    background: 'linear-gradient(#14225A, #14225A)',
    affectText: false
  });
  new Multiple({
    selector: '#box > .WSN',
    background: 'linear-gradient(#AB0003, #AB0003)',
    affectText: false
  });


  jQuery.fn.highlight = function (str, className) {
    var regex = new RegExp(str, "gi");

    return this.each(function () {
      this.innerHTML = this.innerHTML.replace(regex, function (matched) { return "<span class=\"" + className + "\">" + matched + "</span>"; });
    });
  };

  $("p").highlight("-", "hide");
}

// $(".CIN").parents("#box").css("background-color", "#C6011F");
