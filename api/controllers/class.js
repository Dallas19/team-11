/*Class Hierachy
could be for another solution
*/
class Job {
    constructor(jobid, ranking=[])
        {
            this.jobid = jobid;
            this.ranking = ranking;
        }
}

class Company{
    constructor(jobid, posname, job=[])
    {
        this.posname = posname;
        this.jobid = jobid;
        this.job = job;
    }
}

class Student{
    constructor(studentname, school,studentID, ranking=[])
        {
            this.studentname = studentname;
            this.school = school;
            this.studentID = studentID;
            this.ranking = ranking;
        }
}