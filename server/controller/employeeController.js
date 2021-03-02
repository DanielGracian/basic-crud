const EmployeeModel = require('../models/employee');

exports.getEmployees = async (req, res) =>{
    const employees = await EmployeeModel.find()
    res.json(employees);     
};

exports.getEmployeeById = async(req, res, next) =>{
    try {
        const employee = await EmployeeModel.findById(req.params.id);      
        res.json({employee}) 
    } catch (error) {
        const err = '';
        err.statusCode = 400;
        err.message = 'Something is wrong!';
        next(err);
    }
};

exports.editEmployee = async(req, res, next) =>{
    try {
        const newData = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };                                                                          
        await EmployeeModel.findByIdAndUpdate(req.params.id, {$set: newData});
        res.json({status: 'Employee updated'});    

    } catch (error) {
        const err = '';
        err.statusCode = 409;
        err.message = 'Something is wrong!';
        next(err);
    } 
};

exports.createEmployee = async (req, res, next)=>{
    try {
        const employee = new EmployeeModel({        
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        });        
        await employee.save();
        res.json({
            'status': 'Employee saved'
        });
    } catch (error) {
        const err = '';
        err.statusCode = 409;
        err.message = 'Something is wrong!';
        next(err);
    }
};

exports.deleteEmployee = async(req, res, next) =>{
    try {
       await EmployeeModel.findByIdAndDelete(req.params.id);   
       res.json({status:'Employee deleted'}); 
    } catch (error) {
        const err = '';
        err.statusCode = 400;
        err.message = 'Something is wrong!';
        next(err);
    }
};
