export class Employee {
        
    _id: String;
    name: String;
    position: String;
    office: String;
    salary: Number;

    constructor(_id = '', name ='', position ='', office ='', salary?){
        this._id = _id;
        this.name = name;
        this.office = office;
        this.position = position;
        this.salary = salary;
    }
}
