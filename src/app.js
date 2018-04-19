/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
// reading the environment variables from the .env file if not in production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

// bot setup
require('./setup/connectorSetup.js')();
// setup for all the luis models
require('./setup/luisSetup.js')();
// checking language on each message
require('./helper/languageHelper')();
// dialogs
// standard dialogs (greeting, cancel, help)
require('./dialogs/standardDialogs')();
// note dialogs (create, read, delete)
require('./dialogs/note/noteDialogs')();
// contact dialogs (create, read, delete)
require('./dialogs/contact/contactDialogs')();
// shirt dialogs (show, buy)
require('./dialogs/shirt/shirtDialogs')();