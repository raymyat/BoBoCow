import { Deserializable } from "./deserialize.model";

export class job {
    title: String;
    description: String;
    start_date: String;
    end_date: String;
    specialization: String;
    created_date:String;
    deadline: String;
    require_skills: Array<String>;
    // require_trait_needs:Array<String>;
    // require_trait_personality:Array<String>; 
    // require_trait_values:Array<String>; 

}