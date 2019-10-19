//import {Student, Job, Company} from '/classes'

exports.parsing = function()  {

    const fs = require('fs')
    console.log("test")

    fs.readFile('/Users/mallikajain/Desktop/team-11/api/controllers/assets/studentData.json', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        try {
            const student = JSON.parse(jsonString)
            console.log("Student's name is:", student.StudentName)
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
        
    })
};