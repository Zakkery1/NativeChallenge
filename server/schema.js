const mongoose = require('mongoose');
// const objectId = Schema.objectId

const nba_Data = new mongoose.Schema({
    name:{
        type: String
    },
    wins:{
        type: Number
    },
    losses:{
        type: Number
    }
})

const newDataModel = new mongoose.model('nba_Teams', nba_Data);
module.exports = newDataModel;


