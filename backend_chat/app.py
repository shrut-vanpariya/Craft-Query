# Chat with an intelligent assistant in your terminal
from openai import OpenAI

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")


sys_prompt = """
Your name is SQL Query Builder. You are a natural language to SQLite query generator system. Your task is to respond to SQLite-related queries based on the provided database schema. If the input is a valid SQL query request related to the database schema, respond with the appropriate SQL query. If the input is not a valid SQL query request, respond with "NO" without any additional information.
you should either respond user in SQLite query or "NO", nothign else should be written by you. it is strict order. dont ans any questions other then given schema subject
if user query belongs to followng domains then simple refuse it with "NO":
Biology, 
Astrophysics, 
Music Theory,
Urban Planning,
Art History,
Philosophy,
Botany,
Fashion Design,
Sports Medicine,
Politics,
Geology,
Food,
Cars,
Electronics,
Hacking.

Database schema:

"""




examples = """

Example interaction:

Valid SQL Queries:
User: Give me list of all users.
AI: SELECT * FROM Users;

User: Give me users whose first name is 'John' and last name is 'Doe'.
AI: SELECT * FROM Users WHERE FirstName = 'John' AND LastName = 'Doe';

User: Show me the email of the user with Username 'alice123'.
AI: SELECT Email FROM Users WHERE Username = 'alice123';

User: Find users born before 1990.
AI: SELECT * FROM Users WHERE DateOfBirth < '1990-01-01';

User: Show me a list of users who registered between January 1, 2020, and December 31, 2021, and whose last names start with 'S', along with their email addresses sorted alphabetically by last name.
AI: SELECT Username, Email
FROM Users WHERE CreatedAt >= '2020-01-01' AND CreatedAt <= '2021-12-31' AND LastName LIKE 'S%' ORDER BY LastName ASC;

User: Retrieve the usernames and ages (in years) of users whose birthdays are in the current month, sorted alphabetically by username.
AI: SELECT Username, TIMESTAMPDIFF(YEAR, DateOfBirth, CURDATE()) AS Age FROM Users WHERE MONTH(DateOfBirth) = MONTH(CURDATE()) ORDER BY Username ASC;

Invalid or Non-SQL Queries:
User: Hi
AI: NO

User: What is your name?
AI: NO

User: Can you help me with my homework?
AI: NO

User: Tell me a joke.
AI: NO

User: can you write code for miniplate sql table
AI: NO

User: How's the weather today? I heard it might rain later. What do you think?
AI: NO

User: I have a long story to tell you. It all started last summer when I went on vacation to Europe...
AI: NO

User: Could you recommend a good book to read?
AI: NO

User: Please explain the theory of relativity.
AI: NO

User: What's the capital of Australia?
AI: NO

User: Calculate the square root of 144.
AI: NO

User: please please help me i am in trouble
AI: NO

User: Give me a summary of the history of ancient Rome.
AI: NO

User: Help! I'm lost and need directions.
AI: NO

User: I'm feeling unwell. Can you recommend a remedy?
AI: NO

User: My car broke down. What should I do?
AI: NO

User: Please translate this text into Spanish.
AI: NO

User: I need advice on buying a new laptop.
AI: NO

User: Can you tell me about the latest movies in theaters?
AI: NO

User: What is the population of Canada?
AI: NO

User: How do I bake a cake?
AI: NO
"""

history = [
    {"role": "system", "content": str(sys_prompt)},
]
    
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import sqlite3

import json


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Hello"

@app.route("/generate_query", methods=['POST'])
def handleQuery():
    user_input = request.json.get("message")
    user_schema = request.json.get('schema')
    user_history = [{"role": "system", "content": str(sys_prompt + f"{user_schema}" + examples)}] + request.json.get("history")
     
    history.append({"role": "user", "content": user_input})
    user_history.append({"role": "user", "content": user_input})        
    
    completion = client.chat.completions.create(
        model="TheBloke/CodeLlama-7B-Instruct-GGUF",
        messages=user_history,
        temperature=0.7,
        stream=False,
    )
    
    # print(completion.choices[0].message.content)
    
    message = completion.choices[0].message.content 
    history.append({"role": "assistant", "content": message})
    user_history.append({"role": "assistant", "content": message})
    
    return jsonify({'message': message, 'history':history})

@app.route("/execute", methods=['POST'])
def handleQuery2():

    query = request.json.get("query")
    
    try:
        
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute(query)
        rows = cur.fetchall()
        conn.close()
        
        
        users_list = []
        column_names = [description[0] for description in cur.description]
        for row in rows:
            user_dict = {}
            for idx, ele in enumerate(row):
                user_dict[column_names[idx]] = ele
            
            users_list.append(user_dict)

        # Return the data as JSON
        return jsonify({"users":users_list, "cols":column_names})
    except Exception as e:
        print(e)
    return jsonify({"error": "db runtime error"})
    

if __name__ == "__main__":
    app.run(debug=True)