class Student {
    constructor(id, slots = [], school) {
        this.id = id;
        this.slots = slots;
        this.school = school;
    }
}

class Position {
    constructor(id, students = [], openings, slots) {
        this.id = id;
        this.students = students;
        this.openings = openings;
        this.slots = slots;
    }
}

class Company {
    constructor(name, positions = [], slots = []) {
        this.name = name;
        this.positions = positions;
        this.slots = slots;
    }
}

class CompanySchedule {
    constructor(slots = []) {
        this.slots = slots;
    }
}

class Session {
    constructor(companies = [], schools = []) {
        this.companies = companies;
        this.schools = schools;
    }
}

class Schedule {
    constructor(sessions = []) {
        this.sessions = sessions;
    }
}

determineSlots = function (companies = []) {
    var i;
    for (i = 0; i < companies.length; i++) {
        var j;
        var positions = companies[i].positions;
        var openings = 0;
        for (j = 0; j < positions.length; j++) {
            openings = openings + positions[j].openings;
        }
        for (j = 0; j < positions.length; j++) {
            let slots = (positions[j].openings / openings) * 12;
            positions[j].slots = slots; //round down?
            openings = openings - slots;
        }
        if (openings != 0) {
            while (openings != 0) {
                positions[j - 1].slots++;
                openings--;
            }
        }
    }
}

// companies are companies
// inputSessions.companies are companyschedules
schedule = function (companies = [], inputSessions = []) {
    var i;
    for (i = 0; i < companies.length; i++) {
        var j;
        for (j = 0; j < companies[i].positions.length; j++) {
            var k;
            var flag;
            for (k = 0; k < companies[i].positions[j].students.length; k++) {
                // determine session
                var p;
                for (p = 0; p < 3; p++) {
                    if (inputSessions[p].schools.contains(companies[i].positions[j].students[k].school)) {
                        // find first common slot between student and company
                        var l;
                        for (l = 0; l < 6; l++) {
                            // does position have slots left
                            if (companies[i].positions[j].slots == 0) {
                                flag = 1;
                                break;
                            }
                            if (companies[i].positions[j].students[k].slots[l] == "") {
                                if (inputSessions[p].companies[i].slots[l * 2] == "") {
                                    inputSessions[p].companies[i].slots[l * 2] = companies[i].positions[j].students[k].id;
                                    companies[i].positions[j].students[k].slots[l] = companies[i].name;
                                    companies[i].positions[j].slots--;
                                    break;
                                } else if (inputSessions[p].companies[i].slots[l * 2 + 1] == "") {
                                    inputSessions[p].companies[i].slots[l * 2 + 1] = companies[i].positions[j].students[k].id;
                                    companies[i].positions[j].students[k].slots[l] = companies[i].name;
                                    companies[i].positions[j].slots--;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (flag == 1) break;
            }
        }
    }
    var schedule = {sessions: inputSessions};
    return schedule;
}

output = function (schedule, students = []) {
    var i;
    var jsonArray;
    var json2xls = require('json2xls');
    var fs = require('file-system');

    var tabularData;
    for (i = 0; i < 3; i++) {
        var j;
        for (j = 0; j < schedule.sessions[0].companies.length; j++) {
            var tempArray = {
                'Company': schedule.sessions[i].companies[j].name,
                'Slot 1': schedule.sessions[i].companies[j].slots[0],
                'Slot 2': schedule.sessions[i].companies[j].slots[1],
                'Slot 3': schedule.sessions[i].companies[j].slots[2],
                'Slot 4': schedule.sessions[i].companies[j].slots[3],
                'Slot 5': schedule.sessions[i].companies[j].slots[4],
                'Slot 6': schedule.sessions[i].companies[j].slots[5],
                'Slot 7': schedule.sessions[i].companies[j].slots[6],
                'Slot 8': schedule.sessions[i].companies[j].slots[7],
                'Slot 9': schedule.sessions[i].companies[j].slots[8],
                'Slot 10': schedule.sessions[i].companies[j].slots[9],
                'Slot 11': schedule.sessions[i].companies[j].slots[10],
                'Slot 12': schedule.sessions[i].companies[j].slots[11]
            }
            jsonArray.push(tempArray);
        }

        var temp = {
            'sheetName': 'Session ' + i,
            'data': jsonArray
        }
        tabularData.push(temp);
    }

    var xls = json2xls(tabularData);
    // tabularData contains excel set up
    // send to UI to be downloaded with a button
    fs.writeFileSync('../../companySchedule.xlsx', xls, 'binary');

    var session1;
    var session2;
    var session3;
    for (j = 0; j < students.length; j++) {
        if (schedule.sessions[0].contains(students[j].school)) {
            var tempArray = {
                'Student': students[j].id,
                'Slot 1': students.slots[0],
                'Slot 2': students.slots[1],
                'Slot 3': students.slots[2],
                'Slot 4': students.slots[3],
                'Slot 5': students.slots[4]
            }
            session1.push(tempArray);
        }
        if (schedule.sessions[1].contains(students[j].school)) {
            var tempArray = {
                'Student': students[j].id,
                'Slot 1': students.slots[0],
                'Slot 2': students.slots[1],
                'Slot 3': students.slots[2],
                'Slot 4': students.slots[3],
                'Slot 5': students.slots[4]
            }
            session2.push(tempArray);
        }
        if (schedule.sessions[3].contains(students[j].school)) {
            var tempArray = {
                'Student': students[j].id,
                'Slot 1': students.slots[0],
                'Slot 2': students.slots[1],
                'Slot 3': students.slots[2],
                'Slot 4': students.slots[3],
                'Slot 5': students.slots[4]
            }
            session3.push(tempArray);
        }
    }

    var temp = {
        'sheetName': 'Session ' + 1,
        'data': session1
    }
    tabularData.push(temp);
    var temp = {
        'sheetName': 'Session ' + 2,
        'data': session2
    }
    tabularData.push(temp);
    var temp = {
        'sheetName': 'Session ' + 3,
        'data': session3
    }
    tabularData.push(temp);


    xls = json2xls(tabularData);
    // tabularData contains excel set up
    // send to UI to be downloaded with a button
    fs.writeFileSync('../../studentSchedule.xlsx', xls, 'binary');
}