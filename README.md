# hatchwaysAPI
backend assessment - blog posts

api written in JavaScript
using node and express

additional dependencies:
node-fetch
nodemon @ port: 3000

instructions and testing

--------------------------------------

data source https://api.hatchways.io/assessment/blog/posts
note: can only take one query parameter for each api call

example: https://api.hatchways.io/assessment/blog/posts?tag=tech

assessment requirements: construct an api that uses the resource and serve a json according to user inputs.

goals
1. ping the api, with route /api/ping
    the api should respond with a json containing the success message
    and status code 200

2. route /api/posts description
    a) the route should be able to get data from the source
    b) preferrrably cache the data on local storage, both reduce          number of api calls and increase responsiveness
    c) the user of the api will indicate the content they want to get
    by indicating 
        "tags" : the type of content, required paramter, user can use multiple tags at the same time for this api
        "sortBy": how the content is sorted, likes, popularity, etc.
        "direction": either by ascending order or descending, default ascending
    the api will then serve the sorted data from the source according to user input

3. the api should have successful responses, which are the desire content, and unsuccessful responses. 
    if "tags" parameter is missing, users will be served an error message and status of 400
    if sortBy or direction is not of an expected value, there will be an error message and status of 400

4. testing

5. bonus, cache api calls to local server