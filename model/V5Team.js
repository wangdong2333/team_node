const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    age: String,
    position: String,
    lev: String,
    tel: String,
    time: String,
    imgUrl: String,
    oldTeam: String,
    gameName: String,
});

mongoose.model('V5Team', typeSchema);