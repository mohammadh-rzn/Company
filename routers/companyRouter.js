const express = require("express");
const router = express.Router();
const Company = require('../models/company');
const company = require("../models/company");

router.use(express.static('public'));
router.post("/addCompany", function(req, res) {

    const NEW_COMPANY = new Company({
        name: req.body.name,
        regNumber: req.body.regNumber,
        city: req.body.city,
        state: req.body.state,
        regDate: req.body.regDate,
        phoneNumber: req.body.phoneNumber
    })

    NEW_COMPANY.save(function(err, user) {        
        if (err) return res.status(500).send("Somthing went wrong in adding Company \n!" + err);
        Company.find({}, function(err, data){
            res.render('partials/Companytable', {companies: data})
        })
    })

});
router.get('/all', function(req, res){
    company.find({}, function(err, data){
        res.render('pages/company', {companies : data});
    })
})
router.put("/updateCompany/:id",function (req, res)  {
    

    Company.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("Somthing went wrong in updating company! \n" + err);
        Company.find({}, function(err, data){
            res.render('partials/Companytable', {companies: data})
        })
    })
});




router.delete("/deleteCompany/:id",function (req, res) {
    

    Company.findOneAndDelete({_id: req.params.id}, function (err, user)  {
        if (err) return res.status(500).send("Somthing went wrong in delete user! \n" + err);
        if (!user) return res.status(404).send("User not found");
        Company.find({}, function(err, data){
            res.render('partials/Companytable',{companies: data})
        })
         
    })
});
router.get('/getCompany/lessThanAYear', function(req, res){
    Company.find({}, function(err, users){
        if(err){console.log(err)};
        let a = users;
        let final = [];
        let today = Date.now();
        for(let i = 0; i < a.length; i++){
            let theTime = today - a[i].regDate;
            let diffyears = Math.floor(theTime / (1000 * 60 * 60 * 24* 365))
            if(diffyears < 1){
                final.push(a[i]);
            }
        }
        res.send(final);
    })
})
router.get('/getCompany/updateTehran', function(req, res){
    Company.updateMany({}, {$set: {state: "Tehran", city: "Tehran"}}, {new: true}, function(err, users){
        
    })
    Company.find({}, function(err, users){
        if(err) return res.send('something went wrong\n', err);
        return res.send(users);
    })
})

router.post('/between', function(req, res){
    console.log(req.body.array[0], req.body.array[1]);
    Company.find({regDate:{$gt:req.body.array[0], $lt: req.body.array[1] }},function(err, data){
        if(err){
            console.log(err);
            res.status(500).send('somthing went wrong');
        } 
        else res.render('partials/Companytable', {companies: data });
        
    })
})







module.exports = router;