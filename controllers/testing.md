testing done with browser with nodemon @ localhost:3000

cd hatchwaysAPI
npm i
npm install nodemon
nodemon
open browser, go to localhost:3000, shows a landing page

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

tags parameter is required, otherwise return a json body "error" : "the tag parameter is required"

tags parameter can be anything, any combination of letters/numbers/symbols/space etc can be accepted. The api will recognize each part of the string seperated by commas as different cetegories to call on the source api.

the api will call the source with each tag, and only collect posts from the source. all responses that doesnt contain a post will be ignored/discarded. therefore, if any tag provide does not yield anything from the source, the api will return an empty array. 

the api will only recognize tags, sortBy, and direction as query parameters. anything other than the three will be ignored.

the sortBy parameter will only recognize from the following list:
['id', 'reads', 'likes', 'popularity', null, undefined, '']
the defaul sort category is 'id', if the parameter does not exist in the url, or if the user does not input anything
all other scenarios will result in sever status 400 and response with a json body "error" : "sortBy parameter is invalid"

the direction parameter will only recognize from the follow list:
['asc', 'desc', null, undefined, '']
the default sort order is ascending, if the paramter does not exist in the url, or if the user does not input anything
all other scenarios will result in sever status 400 and response with a json body "error" : "direction for sorting is invalid"

if the user includes a sort direction but not sort category in the url, the category will defaul to id, and sort by the desired directon



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

    localhost:3000/api/posts?tags=te ch,history
    expected status: 200
    expected response: json data with all posts having the history tag, sorted by post id, ascending

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
