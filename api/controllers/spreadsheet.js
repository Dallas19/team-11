const xlsx = require('xlsx');
const path = require('path');

exports.upload_student_ss = function(req, res) {
    var student_data = xlsx.readFile(path.resolve('../Sample Data/CFG - Student Data.xlsx'));
    var sheet = student_data.Sheets['Students'];

    var student_json = xlsx.utils.sheet_to_json(sheet);
    res.send('<pre>' + JSON.stringify(student_json, null, 2) + '</pre>');
}