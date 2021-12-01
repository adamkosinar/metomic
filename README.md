# Hello

thank you for the lovely assigment. It was really fun to do. 

# The Solution

I made the assuption that we will be searching and displaying only two level pairs - Parent and its children. Though I do undestand that the ideal solution would probably some sort of graph traversing approach ideally using some graph oriented databases such as Neo4J or graphQl or even elastic search. 

I parse and index the file in what I a call a read model, a read optimised hash map that uses parent as a key and an array unique child categories as its value which then used to filter out the results by the search term.


# Note about dependencies

I used [tysiringe](https://github.com/microsoft/tsyringe) as dependency injection container as I am a big fan of SOLID principles.
For exposing the external restful api I used [restify](http://restify.com/), a somewhat light weight but powerful http server. I hope that is not an issue. I am happy to amend the solution using vanila http module and building the routing mechanism from scratch.   

# How to run the solution

everything is done via the npm run sequence. Feel free to checkout the package.json for more

make sure you have all dependencies installed by running `npm i`

To run all tests, jslint and test coverage run `npm run test`

to build and run the program use `npm run start` 
