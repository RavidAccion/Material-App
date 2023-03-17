export class EmployeeData {
  constructor(
    public emp_Id: number,
    public job_Id: number,
    public f_name: string,
    public l_name: string,
    public gender: string,
    public age: number,
    public total_casual_leaves: number,
    public total_wellness_leaves: number,
    public e_mail: string,
    public mobile: number
  ) {}
}
