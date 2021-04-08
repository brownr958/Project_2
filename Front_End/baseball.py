from flask import Flask, render_template, jsonify, make_response

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = "mongodb+srv://thebaseballers:project2@cluster0.6hxjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.Baseball

# Creates a collection in the database and inserts two documents

all_data = db.all_data


# Set route
@app.route('/allStats')
def index():
    # Store the entire team collection in a list
    data = list(all_data.find())
    data_json = []
    for item in data:
        row = {}
        row['AB'] = item['AB']
        row['AVG'] = item['AVG']
        row['Age'] = item['Age']
        row['H'] = item['H']
        row['HR'] = item['HR']
        row['Name'] = item['Name']
        row['OBP'] = item['OBP']
        row['OPS'] = item['OPS']
        row['Off'] = item['Off']
        row['Position'] = item['Position']
        row['R'] = item['R']
        row['RBI'] = item['RBI']
        row['SB'] = item['SB']
        row['SLG'] = item['SLG']
        row['Season'] = item['Season']
        row['Team'] = item['Team']
        row['WAR'] = item['WAR']
        row['playerid'] = item['playerid']
        
        data_json.append(row)
    
    # Return the template with the teams list passed in
    return jsonify(data_json)

@app.route('/WAR')
def index():
    # Store the entire team collection in a list
    data = list(all_data.find())
    data_json = []
    for item in data:
        row = {}
        row['Season'] = item['Season']
        row['WAR'] = item['WAR']
        
        data_json.append(row)
    
    # Return the template with the teams list passed in
    return jsonify(data_json)



if __name__ == "__main__":
    app.run(debug=True)