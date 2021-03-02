const express = require('express');
const router = express.Router();
const employee = require('../controller/employeeController');

router.get('/employees', employee.getEmployees);
router.get('/:id', employee.getEmployeeById);
router.post('/', employee.createEmployee);
router.put('/:id', employee.editEmployee);
router.delete('/:id', employee.deleteEmployee);

module.exports = router;
