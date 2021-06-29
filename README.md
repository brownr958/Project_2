# Baseball Dream Team

Welcome to our 2nd major project for the UNC Data Science Boot Camp. The requirements for the project were to provide a visualization of data and to include a Python Flask-powered API, an HTML with CSS and JavaScript, and at least one database. When it came to the visualization itself, there was more freedom as to what the project could cover. Some additional requirements were to include at least one JS library that wasn't covered in class, have a dataset with at least 100 records, include some form of user-driven interaction, and have the visualization include at least three views.

With our project, our group with members Ryan Brown, Austin Williams, Micah West, and Greg Parker decided to make a visualization that allows a user to build their own baseball lineup composed of different players' seasons dating from 1969 to 2020.

### How We Did It

To begin, we gathered data from a popular MLB data website, Fangraphs. The specific table we used for the data can be found here: 
https://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=all&qual=y&type=c,3,23,37,38,39,5,7,12,11,13,21,203,58&season=2020&month=0&season1=1969&ind=1&team=0&rost=0&age=0&filter=&players=0&startdate=1969-01-01&enddate=2020-12-31

In order to get the positions of each player into the dataset, the table associated with each position had to be exported as a CSV and then compiled all together into one table. As a result of compiling multiple tables, some player's seasons are in the dataset twice due to them playing enough of at least two positions in one season. After all the data in the main data table was cleaned up, it was then added into a MongoDB collection to be used as our database requirement for the project and to load our data into the HTML. 

The HTML itself was built using CSS, Bootstrap, Paginate, Multiple.js, D3, JQuery, and Plotly. As the page loads, the Paginate table is populated using Flask and PyMongo, which is connected to our MongoDB collection. Roughly 7500 different players' seasons are loaded in and are able to be sorted and filtered. A glossary to the right of table is there to desribe acronyms and variables for the ones that aren't too familiar with baseball. 

![Baseball1](https://user-images.githubusercontent.com/74078757/123756560-0b812980-d88b-11eb-9906-e5f2769a98ec.jpg)

Below those you'll find a field with empty boxes, which is the beginning to the pride of this project whose creators had been coding for only a couple months at the time of its creation. Using drag and drop functions, a user can select a player from the table and drag that player to any position in the field, no mattter what position they actually played. Once dropped, the player is then slotted into that position on the field where their basic info of that season is displayed along with the color of the team they played for. Alongside the field, once the first player is dropped, is a graph and some boxes that provide statistics of the team that is on the field. As more players are added, the graph and boxes update using D3 for the boxes and Flask and Plotly for the graph.

![Baseball2](https://user-images.githubusercontent.com/74078757/123756720-353a5080-d88b-11eb-818f-607374f9c351.jpg)

### How We Ran It

In order to run our project, after cloning the repository, please direct 2 windows of your terminal of choice to the Front_End folder while also having PythonData activated. Once there in both windows, in one window run "python -m http.server 8000" and "python baseball.py" in the other. As both of those are running, open your browser (Chrome was used for this project) and enter http://localhost:8000/baseball.html as the url. You should then be taken to the latest version of our HTML with the freedom to make your own baseball team. Note that it is currently designed to only have one player in a position and not have a player replace another. Doing this currently adds both players to the team totals and averages calculations. If you wish to start over, please refresh the page.

Thank you for visiting our project and we hope you enjoy making your dream team!
