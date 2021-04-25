const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    timeName: String,
    win: String,
    kill: String,
    count: String,
    death: String,
    putEye: String,
    removeEye: String,
    money: String,
    video: String
});

mongoose.model('LadGameList', typeSchema);