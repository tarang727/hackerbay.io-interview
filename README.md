# hackerbay.io-interview

Hackerbay interview test for both backend and frontend.

## Structure

`/backend` - This is the backend test. It implements a rest api that can login user, authorize user, perform json patching functionalities and perform image resize that becomes a thumbnail.

`/maze-gamer` - This is the frontend test. It is implemented in `typescript` due to the logic required. It uses react.js and redux plus bootstrap for ui.

## About Backend 

This is a REST Api that is used to login a user, patch a json object and also access a thumbnail image. It was to be built using node.js. Test and code coverage stats included.

### How to Setup

You must have node.js >=8.0.0 installed plus `mocha` - `npm i -g mocha` and `typescript` - `npm i -g typescript`

1. git clone the repository https://github.com/trendy-weshy/hackerbay.io-interview.git
2. go to backend folder `$ cd backend`
3. install dependencies `$ npm install`
4. `$ npm start` to run code in production environment. `$ npm run dev` to run code in development environment
5. to run test use the command `$ npm test`

- Code coverage stats is accessible via the route `http://localhost:8080/coverage`

## About Frontend

This is a maze game that is able to keep count of the number of moves a heo does. It involves a hero character whose intent is to rescue the queen by destroying the enemies. All this is done on a game board inside a web app. The application was to be created by React.

### How to Get Started

You must have node.js >=8.0.0 installed plus `typescript` - `npm i -g typescript`

1. git clone the repository https://github.com/trendy-weshy/hackerbay.io-interview.git
2. go to frontend folder `$ cd maze-gamer`
3. install dependencies `$ npm install`
4. `$ npm start` to start frontend server. Go to `http://localhost:3000/` to check out the game.

## Author

John Waweru [Email Me](mailto:waweruj00@gmail.com)

## LICENCE

MIT

## Disclaimer

This repo was started with the intent of hosting the codebase for review by Hackerbay personnel.