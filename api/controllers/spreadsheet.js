const xlsx = require('xlsx');
const path = require('path');

exports.upload_student_ss = function(req, res) {
    var student_data = xlsx.readFile(path.resolve('../Sample Data/CFG - Student Data.xlsx'));
    var sheet = student_data.Sheets['Students'];

    var student_json = xlsx.utils.sheet_to_json(sheet);
    var student_ranking = [];
    
    for (var i = 0; i < student_json.length; i++) {
        var student = student_json[i];
        var student_id = student['Student ID'].toString();
        var student_rankings = [student['Rank 1'], student['Rank 2'], student['Rank 3'], student['Rank 4'], student['Rank 5']];
        var obj = {
            student_id: student_id,
            student_rankings: student_rankings
        }
        student_ranking.push(obj);
    }
    console.log(student_ranking);

    var company_data = xlsx.readFile(path.resolve('../Sample Data/CFG - Company Data.xlsx'));
    var company_sheet = student_data.Sheets['Students'];

    var company_json = xlsx.utils.sheet_to_json(sheet);
    var company_ranking = [];

    for (var i = 0; i < company_json.length; i++) {
        var company = company_json[i];
        var job_id = student['Job ID'].toString();
        var job_rankings = [];
        var obj = {
            job_id: job_id,
            job_rankings: job_rankings
        }
        student_ranking.push(obj);
    }
    console.log(student_ranking);

    res.send('<pre>' + JSON.stringify(student_json, null, 2) + '</pre>');
}