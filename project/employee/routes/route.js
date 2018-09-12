const express=require('express');
const router=express.Router();

const Employee=require('../model/employee');

router.get('/employees',(req, res,next)=>{
	
	Employee.find(function(err,employee){
		res.json(employee);
	});
});


router.post('/employee',(req,res,next)=>{
	
	console.log('testing post  '+req.body.first_name);
	
	let newEmployee = new Employee({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	});
	
	newEmployee.save((err,employee)=>{
		if(err){
			res.json({msg: 'failed to add employee'});
		}
		else{
			res.json({msg: 'employee added sucessfully'});
		}
	});
	
});



router.delete('/employee/:id',(req,res,next)=>{
	
	
	Employee.remove({_id: req.params.id},function(err,result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
	
});

module.exports=router;
