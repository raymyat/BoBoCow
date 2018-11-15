export class employee{
    id: String;
    user_type: String;
    full_name: String;
    birthdate: String;
    description: description;
    specialization: String;
    matched_jobs: matched_jobs;

}
export interface description{
    id: String;
    content: String;
    created: String;
}
export interface matched_jobs{
    id: String;
    company_id: String;
    matched_date: String;
    job_id: String;
}