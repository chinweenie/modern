# Modern
Modern is a Medium clone, a publishing platform that contains a hybrid
collection of amateur and professional publications.
You can view the original website here:
[Medium](https://medium.com)


## Background and Overview
Modern taps into the brains of the world's most insightful writers, thinkers
and storytellers to bring you the smartest takes on topics that matter. So 
whatever your interest is, you can always find fresh thinking and unique 
perspectives.

We will need to:

* Make a MERN stack web app that allows users to login, signup and logout
* Build a Mongo database that store data of users, stories, comments, follows and claps, followers and followees
* Build responsive frontend components using React
* Make sure the communication between backend and frontend is instantaneous


## Functionality and MVP

* Users can sign up as company or individual
* User authorization such as sign in and out
* Actions such as creating publications and updating publications for logged in users only
* Interactive and responsive UI such as modal session form
* Search functionality for articles, authors and companies
* Production README


## Technologies and Technical Challenges

* Backend: MongoDB
* Frontend: React-redux, Node.js

Technical challenges:

* Reading data from MongoDB and reorganize the data for frontend use
* Building a modal for signin and signup
* Implementing the logic for search functionality on users and publications
* Implementing joined table such as claps 


## Group Members and Work Breakdown
Team members:

* [Roger](https://github.com/yuichiu416)
* [Stan](https://github.com/stanbond)
* [Winnie](https://github.com/chinweenie)
* [Senyo](https://github.com/sdkag)

## Usage:
`npm install` in the root directory **AND** in the frontend directory

For debugging with VS Code, `npm run frontend` to run on port 3000 and leave port 5000 for the debugger.

For debugging with Chrome, `npm run dev:debug` to run both server but enables chrome debugging tool for backend.

For regular development purpose, `npm run dev` will run two ports at the same time


Current available page: http://localhost:3000/#/register only.