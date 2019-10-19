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
        var openings;
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
                                }
                                else if (inputSessions[p].companies[i].slots[l * 2 + 1] == "") {
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
    var schedule = { sessions : inputSessions };
    return schedule;
}