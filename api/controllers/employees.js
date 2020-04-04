const mongoose = require('mongoose');
const Employee = require('../models/employee');

const baseURL = 'http://localhost:13105';

exports.employees_get_all = (req, res, next) => {
    Employee.find()
    .select('employeeId employeeName employeeDate employeeMonth employeeImage _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            employees: docs.map(doc => {
                return {
                    _id: doc._id,
                    employeeId: doc.employeeId,
                    employeeName: doc.employeeName,
                    employeeDate: doc.employeeDate,
                    employeeMonth: doc.employeeMonth,
                    employeeImage: doc.employeeImage,
                    request: {
                        type: 'GET',
                        url: baseURL+'/employees/' + doc._id
                    }
                }
            })
            
        });
    }).catch(err => {
        res.status(500).json({error:err});
    });
};

exports.employees_create_employee = (req, res, next) => {
    console.log(req.file);
    const employee = new Employee({
        _id: mongoose.Types.ObjectId(),
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        employeeDate: req.body.employeeDate,
        employeeMonth: req.body.employeeMonth,
        employeeImage: req.file.path 
    });
    employee.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'New Employee has been created successfully',
            createdEmployee: {
                _id: result._id,
                employeeId: result.employeeId,
                employeeName: result.employeeName,
                employeeDate: result.employeeDate,
                employeeMonth: result.employeeMonth,
                employeeImage: result.employeeImage
            },
            request: {
                type: 'GET',
                url: baseURL+'/employees/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.employees_get_employee = (req, res, next) => {
    const id = req.params.employeeId;
    Employee.findById({_id: id})
    .exec()
    .then(employee => {
        if(!employee){
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }
        res.status(200).json({
            employee: {
                _id: employee._id,
                employeeId: employee.employeeId,
                employeeName: employee.employeeName,
                employeeDate: employee.employeeDate,
                employeeMonth: employee.employeeMonth,
                employeeImage: employee.employeeImage
            },
            request: {
                type: 'GET',
                url: baseURL+'/employees/'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    });
};

exports.employees_update_employee = (req, res, next) => {    
    const id = req.params.employeeId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Employee.update({_id:id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
};

exports.employees_delete = (req, res, next) => {    
    const id = req.params.employeeId;
    Employee.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Employee removed",
                request: {
                    type: "POST",
                    url: baseURL+'/employees/',
                    body: {
                        employeeId: 'Number',
                        employeeName: 'String',
                        employeeDate: 'Number',
                        employeeMonth: 'Number',
                        employeeImage: 'String'
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
};
