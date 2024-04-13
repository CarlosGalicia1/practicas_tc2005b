// module that will be imported
const { format } = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//functions
const logEvents = async(message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`; // date from the log
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // current log item composed by date, unique id, and message
    console.log(logItem); // print log item created
    try{

        if(!fs.existsSync(path.join(__dirname,'logs'))){ // create logs directory if it doesnt exist
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        //append to the file the log objects that are being created
        await fsPromises.appendFile(path.join(__dirname,'logs', logName), logItem)
    } catch (err) { // catch and return any error
        console.log(err);
    }
}

module.exports = logEvents; // exporting logEvents function