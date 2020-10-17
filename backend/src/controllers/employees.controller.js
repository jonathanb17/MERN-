//const { router } = require("../app")

const employeeCtrl ={}

const Employee = require('../models/Employee');

employeeCtrl.getEmployees = async(req,res)=>{
    
    const employees = await Employee.find(); // mostra,e todo los empleados
    res.json(employees); 
}


employeeCtrl.createEmployee = async(req,res)=>{ 
   const newEmployees = await new Employee(req.body);
         await newEmployees.save();
         res.send({message:'Employee created'});
}


employeeCtrl.getEmployee = async(req,res)=>{
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

employeeCtrl.editEmployee = async(req,res)=>{
    await Employee.findByIdAndUpdate(req.params.id,req.body);
    res.send({message: 'edit employees'});
}


employeeCtrl.deleteEmployees = async(req,res)=>{
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.send({message :'employee deleted'});
}


module.exports = employeeCtrl;

