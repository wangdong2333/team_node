const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    oldTeam: String,
    newTeam: String,
    status: String,
    time: String
});

mongoose.model('TransferList', typeSchema);