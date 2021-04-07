from flask import Flask, render_template, jsonify, make_response

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = "mongodb+srv://thebaseballers:password@cluster0.6hxjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.Baseball

# Creates a collection in the database and inserts two documents

all_data = db.all_data


# Set route
@app.route('/')
def index():
    # Store the entire team collection in a list
    data = list(all_data.find())
    

    # Return the template with the teams list passed in
    return render_template('baseball.html', data=data)



if __name__ == "__main__":
    app.run(debug=True)