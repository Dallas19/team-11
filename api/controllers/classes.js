class Student {
    constructor(studentName, studentID, school, rankings = []) {
        this.studentName = studentName;
        this.studentID = studentID;
        this.school = school;
        this.rankings = rankings;
    }
}

class Job {
    constructor(jobID, rankings=[]) {
        this.jobID = jobID;
        this.rankings = rankings;
    }
}

class Company {
    constructor(companyName, jobs) {
        this.companyName = companyName;
        
    }
}


