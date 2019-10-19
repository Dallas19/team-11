class Student {
    constructor(studentName, studentID, rankings = []) {
        this.studentName = studentName;
        this.studentID = studentID;
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


