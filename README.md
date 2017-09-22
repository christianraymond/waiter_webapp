# Waiter web app.
Waiter App is a website that enables a Restaurant or a Hotel owners to get waiters online. Waiters can access the site, input theirs names, and select the days they would preffere to work. Then the Admin side is to allow the employer see the waiters availability for a particular day. It also allow them to clear the list for a new week update.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Prerequisites
Things you need to install and how to install them.
 - NodeJS,
 - ExpressJs,
 - Express-midlewares
 - Npm dependencies
 - MongoDB,
 - Mongoose
 - Heroku,

# Installation
A step by step series of examples that tell you have to get a development env running.
- Step1

Depending on your OS running in your machine,
First in your command prompt, run
`node -v` you should see something like:
`v8.3.0`, depending on your version, if you see nothing [here](https://nodejs.org/en/download/package-manager/) to install nodejs:

Next install(npm dependencies)

- [Express.Js](https://www.npmjs.com/package/express): ```$ npm install --save express```
- [body-parser](https://www.npmjs.com/package/body-parser):```$ npm install body-parser```
- [express-flash](https://www.npmjs.com/package/express-flash): ```npm install git://github.com/RGBboy/express-flash.git```
- [express-handlebars](https://www.npmjs.com/package/express-handlebars):```$ npm install express-handlebars```
- [express-session](https://www.npmjs.com/package/express-session): ```$ npm install express-session```
- [express-flash](https://www.npmjs.com/package/express-flash): ```npm install git://github.com/RGBboy/express-flash.git```
- [session](https://www.npmjs.com/package/express-session): ```$ npm install express-session```
  You also need to store the data in a database using:
- [MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04)

  And the following link explains to you on how to: 'How To Connect Node.js to a MongoDB Database' click [Here](https://www.digitalocean.com/community/tutorials/how-to-connect-node-js-to-a-mongodb-database-on-a-vps)
- [Mongoose](http://mongoosejs.com/), This will help you to store and retrieve data on MongoDB.
You will deploy your Web Application using heroku, it’s a PaaS (Platform as a Service) - it provides a platform as a place (service) where you can easily deploy your web applications using git. click on heroku to follow the steps.
- [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs).

Here is how my package.json looks after doing all the above.
This should look almost the same to yours.

` {
  "name": "waiterapp",
  "version": "1.0.0",
  "description": "Creating a water webapplication",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "ChrisNgu",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.4",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.5",
    "flash": "^1.1.0",
    "flash-express": "^1.0.4",
    "heroku": "^0.2.0",
    "mongoose": "^4.11.10",
    "nodemon": "^1.12.0",
    "session": "^0.1.0"
  },
  "devDependencies": {
    "nodemon": "^1.12.0"
  }
}`

# Running the app locally.
Assume that you already did all the above steps.
Now inside your command prompt(Terminal for Ubuntu user)go inside your root directory and type `cd(current directory)` inside your project directory.
once you are in type `index.js`
The output should like this inside your command prompt:

`App runnig on http://localhost:5000
   Database ready to be used...!`
  Now inside the browser type: `http://localhost:5000`
  your app should be ready and running.(Grap a cap of... and celebrate your success.)
