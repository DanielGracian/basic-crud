const express = require('express');
const router = express.Router();
const employee = require('../controller/employeeController');

router.get('/employee', employee.getEmployees);
router.get('/employee/:id', employee.getEmployeeById);
router.post('/employee', employee.createEmployee);
router.put('/employee/:id', employee.editEmployee);
router.delete('/employee/:id', employee.deleteEmployee);

module.exports = router;
