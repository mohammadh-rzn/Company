const express = require("express");
const router = express.Router();
const Employee = require('../models/employee');
const Company = require('../models/company');

router.use( express.static('public'));

router.post("/addEmployee", function(req, res) {

    const NEW_EMPLOYEE = new Employee({
        nationalCode: req.body.nationalCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        manager: req.body.manager,
        male: req.body.male,
        birthDate: req.body.birthDate,
        companyId: req.body.companyId
    })

    NEW_EMPLOYEE.save(function(err, user) {        
        if (err) return res.status(500).send("Somthing went wrong in adding Employee \n!" + err);
        else Employee.find({companyId: user.companyId}, function(err, data){
            res.render('partials/employeeTable',{employees:data} );
        })
    })

});
router.put("/updateEmployee/:id",function (req, res) {
    

    Employee.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, user)  {
        if (err) return res.status(500).send("Somthing went wrong in updating employee! \n" + err);
        Employee.find({companyId: user.companyId},function(err, data){
            return res.render('partials/employeeTable',{employees: data});
        })
        
    })
});




router.delete("/deleteEmployee/:id",function (req, res)  {
    

    Employee.findOneAndDelete({_id: req.params.id},function (err, user) {
        if (err) return res.status(500).send("Somthing went wrong in deleting employee! \n" + err);
        if (!user) return res.status(404).send("User not found");
        Employee.find({companyId: user.companyId},function(err, data){
            return res.render('partials/employeeTable',{employees: data});
        })
        
    })
});

router.get('/companyEmployees/:companyId', function (req, res){
    Company.findById(req.params.companyId, function(err, data){
        Employee.find({companyId: req.params.companyId}, function(err, users){
            if(err)  res.status(500).send("Somthing went wrong! \n"+ err);
            if(!users)  res.status(404).send("No empolyees");
            let cid = req.params.companyId;
             res.render('pages/employee', {employees: users , companyName: data.name, id: cid });
        })
    })

})
router.get('/companyManager/:companyId', function(req, res){
    Employee.find({companyId: req.params.companyId, manager: true}, function(err, user){
        if(err) return res.send('something went wrong\n',err );
        return res.send(user);
    })
})
router.get('/getEmployee/fullInfo', function(req, res){
    Employee.find({}, {_id: 0}).populate('companyId').exec(function (err, users){
        if(err) return res.send('something went wrong\n', err);
        let a = users;
        let final = [];
        let today = Date.now();
        for(let i = 0; i < a.length; i++){
            let theTime = today - a[i].birthDate;
            let diffyears = Math.floor(theTime / (1000 * 60 * 60 * 24* 365))
            if(diffyears >= 20 && diffyears <= 30){
                final.push(a[i]);
            }
        }
        return res.send(final);
    })
})
router.get('/getEmployee/managers', function(req, res){
    Employee.find({manager: true}, function(err, users){
        if(err) return res.send('somthing went wrong\n', err);
        return res.send(users);
    })
})
router.get('/getEmployee/getCompanies', function(req, res){
    Employee.find({manager: true}).populate('companyId').exec(function(err, users){
        if(err) return res.send('something went wrong\n', err);
        let s = "";
        for(let i = 0; i < users.length; i++){
            s+= users[i].companyId.name + " ------> " + users[i].firstName + " " + users[i].lastName + '\n';
        }
        return res.send(s);
    })
})
module.exports = router;