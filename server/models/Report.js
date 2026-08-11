const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    year: { type: String, required: true }, 
    pdfLink: { type: String, required: true }, 
    thumbnail: { type: String } 
});

module.exports = mongoose.model('Report', ReportSchema);



