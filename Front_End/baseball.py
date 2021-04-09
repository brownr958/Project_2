from flask import Flask, render_template, jsonify, make_response
from flask_cors import CORS, cross_origin

# Create an instance of Flask
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

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
def allStats():
    # Store the entire team collection in a list
    data = list(all_data.find())
    data_json = []
    for item in data:
        row = {}
        row['Season'] = item['Season']
        row['Name'] = item['Name']
        row['Team'] = item['Team']
        row['Position'] = item['Position']
        row['Age'] = item['Age']                   
        row['AVG'] = item['AVG']
        row['OBP'] = item['OBP']
        row['SLG'] = item['SLG']
        row['OPS'] = item['OPS']                
        row['AB'] = item['AB']
        row['H'] = item['H']
        row['R'] = item['R']        
        row['HR'] = item['HR']
        row['RBI'] = item['RBI']
        row['SB'] = item['SB']                
        row['Off'] = item['Off']
        row['WAR'] = item['WAR']
        
        data_json.append(row)
    
    # Return the template with the teams list passed in
    return jsonify(data_json)

@app.route('/WAR')
def WARbySeason():
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