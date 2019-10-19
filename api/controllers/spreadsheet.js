const xlsx = require('xlsx');
const path = require('path');

var student_ranking = [];
var company_ranking = [];

exports.upload_student_ss = function(req, res) {
    var student_data = xlsx.readFile(path.resolve('../Sample Data/CFG - Student Data.xlsx'));
    var sheet = student_data.Sheets['Students'];

    var student_json = xlsx.utils.sheet_to_json(sheet);
    
    for (var i = 0; i < student_json.length; i++) {
        var student = student_json[i];
        var column_length = Object.keys(student).length;
        var student_id = student['Student ID'].toString();
        for (var j = 1; j <= (column_length-3); j++) {
            var job_id = student['Rank ' + j];
            var obj = {
                "student_id": student_id,
                "job_id": job_id,
                "rank": j
            };
            student_ranking.push(obj);
        };
    }
    console.log(student_ranking);

    var company_data = xlsx.readFile(path.resolve('../Sample Data/CFG - Company Data.xlsx'));
    var company_sheet = company_data.Sheets['Companies'];

    var company_json = xlsx.utils.sheet_to_json(company_sheet);

    for (var i = 0; i < company_json.length; i++) {
        var company = company_json[i];
        var column_length = Object.keys(company).length;
        var job_id = company['Job ID'].toString();
        for (var j = 1; j <= (column_length-4); j++) {
            var student_id = company['Rank ' + j];
            var obj = {
                "job_id": job_id,
                "student_id": student_id,
                "rank": j
            };
            company_ranking.push(obj);
        };
    }
    console.log(company_ranking);
    matching_algorithm();
    res.send('<pre>' + JSON.stringify(student_ranking, null, 2) + '</pre>' + '<pre>' + JSON.stringify(company_ranking, null, 2) + '</pre>');
}

matching_algorithm = function() {
    // for (var i=0; i<student.length(); i++) {
    //     for (var j=0; j<student[i][1].length(); j++) {

    //     } 
    // } 
}