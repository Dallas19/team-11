class Job {
    constructor(jobid, ranking=[])
        {
            this.jobid = jobid;
            this.ranking = ranking;
        }
}

class Company{
    constructor(job=[])
    {
        this.job = job;
    }
}

class Student{
    constructor(studentname, studentID, ranking=[])
        {
            this.studentname = studentname;
            this.studentID = studentID;
            this.ranking = ranking;
        }
}