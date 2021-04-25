const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    introduction: String,
});

mongoose.model('IntroductionList', typeSchema);