
export class company {
    user_type: String;
    company_name: String;
    bio: String;
    address: String;
    phone_no: String;
    company_type: String;
    potential_employee: potential_employee;
    matched_employee: matched_employee;
}
export interface potential_employee {
    matched_date: String;
    employee_id: String;
    job_id: String;

}
export interface matched_employee {
    matched_date: String;
    employee_id: String;
    job_id: String;
}
