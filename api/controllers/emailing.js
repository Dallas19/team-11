import {Student, Company, Schedule} from './scheduler.js'

function emailCompanies(companies = [], schedule) {
    // each session
    // each company
    // write schedule to email
    var j;
    for (j = 0; j < companies.length; j++) {
        var message = "Hello! \n";
        var i;
        var email = companies[j].email;
        for (i = 0; i < 3; i++) {
            message = message + "For Session " + i + ", your interviewers have been scheduled as follows.\n";
            var k;
            for (k = 0; k < 11; k++) {
                message = message + "Slot " + k + ": " + schedule.sessions[i].companies[j].slots[k] + "\n";
            }
        }
        // send email
    }
}

function emailStudents(students = []) {
    // each student
    // write schedule to email
    var i;
    for (i = 0; i < students.length; i++) {
        var email = students[i].email;
        var message = "";
        message = message + "Hello, " + students[i].name + "! You have been scheduled for the following interviews:\n";
        var j;
        for (j = 0; j < students[i].slots.length; j++) {
            message = message + "Slot " + j + ": " + students[i].slots[j] + "\n";
        }
        // send email
    }
}