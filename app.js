/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
// reading the environment variables from the .env file if not in production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// bot setup
require('./src/setup/connectorSetup.js')();
// setup for all the luis models
require('./src/setup/luisSetup.js')();
// checking language on each message
require('./src/helper/languageHelper')();

// dialogs

// standard dialogs (greeting, cancel, help)
require('./src/dialogs/standardDialogs')();
// note dialogs (create, read, delete)
require('./src/dialogs/note/noteDialogs')();
// contact dialogs (create, read, delete)
require('./src/dialogs/contact/contactDialogs')();
// shirt dialogs (show, buy)
require('./src/dialogs/shirt/shirtDialogs')();