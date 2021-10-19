# hatchwaysAPI
backend assessment - blog posts

api written in JavaScript
using node and express

additional dependencies:
node-fetch
nodemon @ port: 3000

testing done with browser with nodemon @ localhost:3000

only two routes are expected
localhost:3000/api/ping
localhost:3000/api/posts

all other routes will return 404 not found page

ping the server
url: localhost:3000/api/ping
expected server response: status 200
expected browser response: json success message

get json from api

the only accepted url:
localhost:3000/api/posts?tags=[]&sortBy=()&direction=()

tag parameter is 
tags parameter can be anything, any combination of letters/numbers/symbols/space etc can be accepted. The api will recognize each part of the string seperated by commas as different cetegories to call on the source api. 

where: 
    locahost:3000/api/posts?tags= 
    is required
    and, any user input there after will be accepted
    but, each search term must be seperated by comma,
    otherwise, non valid search terms will return nothing or ignored
    valid search terms list depends on the source data.

    example urls:
    localhost:3000/api/posts?tags=tech
    expected status: 200
    expected response: json data with all posts having the tech tag, sorted by post id, ascending

    localhost:3000/api/posts?tags=alksdfj
    expected status: 200
    expected respone: []

    localhost:3000/api/posts?tags=123
    expected status: 200
    expected respone: []

    localhost:3000/api/posts?tags=te ch
    expected status: 200
    expected respone: []

    localhost:3000/api/posts?tags=tech,history
    expected status: 200
    expected response: json data with all posts having the tech and history tag, sorted by post id, ascending

    localhost:3000/api/posts?tags=tech,asdf,history
    expected status: 200
    expected response: json data with all posts having the tech AND history tag, sorted by post id, ascending

    localhost:3000/api/posts?tags=tech,asdf,history&sortBy=
    exptect status: 200
    expected response: json data with all tech and history related posts by default id category and ascending
    
    localhost:3000/api/posts?tags=tech,asdf,history&sortBy=bob
    exptect status: 400
    expected response: json body "error" : "invalid sort category" 

    localhost:3000/api/posts?tags=tech,asdf,history&sortBy=likes
    expected status: 200
    expected response: json data with all tech and history related posts sorted by number of likes and ascending

    localhost:3000/api/posts?tags=tech,asdf,history&sortBy=likes&direction=
    expected status: 200
    expected response: json data with all tech and history related posts sorted by number of likes and ascending
    
    localhost:3000/api/posts?tags=tech,asdf,history&sortBy=likes&direction=asdf
    expected status: 400
    expected response: json body "error" : "invalid sort direction"

    localhost:3000/api/posts?tags=tech,asdf,history&sortBy=likes&direction=desc
    expected status: 200
    expected response: json data with all tech and history related posts sorted by number of likes and descending

    localhost:3000/api/posts?tags=tech,asdf,history&direction=desc
    expected status: 200
    expected response: json data with all tech and history related posts sorted by id and descending

    

    

    

    


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