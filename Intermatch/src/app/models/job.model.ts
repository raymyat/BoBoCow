import { Deserializable } from "./deserialize.model";

export interface job {
    _id:String;
    title: String;
    description: String;
    start_date: Date;
    end_date: Date;
    specialization: String;
    created_date:Date;
    deadline: Date;
    require_skills: String;
    require_trait_needs:Array<String>;
    require_trait_personality:Array<String>; 
    require_trait_values:Array<String>; 

}