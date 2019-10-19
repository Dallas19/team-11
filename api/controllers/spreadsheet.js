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

function get_index_of_candidate(id)
    {
        return student_ranking.student_id[id];
    }


matching_algorithm = function() {
    // for (var i=0; i<student.length(); i++) {
    //     for (var j=0; j<student[i][1].length(); j++) {

    //     } 
    // } 
    //for the company's ranking
    for (var i=0; i<company_ranking.length(); i++)
        {
            //each array of ranking
            var tempsorted_ranking = [];
            //var visited_ranking = [];

                for (var j=0; j<company_ranking[i].length(); j++)
                {
                    var value = company_ranking[i].rank[j];
                  //  if (visited_ranking[value]==-1) { break;}
                    var index_of_candidate = get_index_of_candidate(company_ranking[i].rank[j]);
                    var candpos = student_ranking[index_of_candidate][value];
                    var diff = Math.abs(candpos-j);
                    tempsorted_ranking.push(diff+j);
                }
                /* Sort the tempsorted ranking */
                //tempsorted_ranking.sort();
                //doing insertion sort  
                        var key1,key2, j;  
                        for (x = 1; x < n; i++) 
                            {  
                                key1 = arr[x];
                                key2 = company_ranking[i].rank[x];
                                j = x - 1;  
                            /* Move elements of arr[0..i-1], that are  
                        greater than key, to one position ahead  
                        of their current position */
                        while (j >= 0 && arr[j] > key) 
                            {  
                                arr[j + 1] = arr[j];
                                company_ranking[i].rank[j+1] = company_ranking[i].rank[j];
                                j = j - 1;  
                            }  
                    arr[j + 1] = key1;
                    company_ranking[i].rank[j+1] = key2;
                    }
    }  
}