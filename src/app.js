/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

require('./setup/connectorSetup.js')();
require('./setup/luisSetup.js')();
require('./helper/languageHelper')();
require('./dialogs/standardDialogs')();
require('./dialogs/note/noteDialogs')();
require('./dialogs/contact/contactDialogs')();
require('./dialogs/shirt/shirtDialogs')();