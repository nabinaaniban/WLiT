var mongoose = require('mongoose');
const NotesSchema =mongoose.Schema({
  subject: String,
  title: String,

  createdDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Notes' , NotesSchema)
