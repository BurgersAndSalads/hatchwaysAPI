# hatchwaysAPI

summary of feedback gotten after the assessment:
and some thoughts for later for myself

## CORRECTNESS

Passes some test cases (validation errors, or one tag given). Fails main test cases like multiple tags given.

-- while testing, i think i only bothered to test using two tags: tech,history, and thought the code didnt return duplicates, although the code have some form of sorting for duplicates, its not extensive enough.

We noticed that your return JSON was an array of the posts, as opposed to this format: {'posts': [...]}.

-- simpliest soution would be just put then entire array behind a post object key manually, not sure if thats good practice for this case

We expected the responses to contain unique posts. Your responses contained duplicate posts when querying by two or more tags.


## ORGANIZATION

Code is easy to read, and good naming of variables. There is still a poor separation of concerns and some traces of repeated code.

-- i realized the code was not cleaned up properly and didnt have comments after submission. not sure what does separation of concerns mean，but will look it up

Try to avoid including template files that are not actually used in your solution - it's a general bad practice.

-- will not use template files in actual production, did not treat the assessment with the same attitude

The organization of your application could have been improved. It would have been cleaner to break up the logic into classes/functions.

## PERFORMANCE

We cannot fully evaluate the efficiency of your solution due to incompleteness.

You could improve your code by using asynchronous requests (i.e. using Promise.all).

We noticed that you didn't add caching to your assessment.

## QUALITY

Good programming practices in general, but lacks language or framework-specific practices. Major anti-patterns are avoided, but minimal to no tests were written.

It would have been nice to see some unit tests for your submission.

You could improve your code by handling potential errors when fetching data from our 3rd party API.

## SPEED

In the 0-40% percentile for the completion time of a working solution or if the solution does not work.

-- assuming higher precentile means better performance, then a simultaneous API call to the source should improve the speed

------------------------------------------

backend assessment - blog posts

api written in JavaScript
using node and express

additional dependencies:
node-fetch
nodemon @ port: 3000

<a href="https://github.com/BurgersAndSalads/hatchwaysAPI/blob/master/controllers/testing.md">instructions and testing</a>

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
