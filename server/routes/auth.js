const express = require('express');
const router = express.Router()
const jwt= require('jsonwebtoken')


var config={
	server: "192.168.1.20",
	database:"xacthucnguongoc",
	driver:"msnodesqlv8",
	user: "lam",
	password: "123456",
};
var sql = require('mssql/msnodesqlv8')
const conn = new sql.ConnectionPool(config).connect().then(pool=>{
	return pool;
})
// route api/auth/login
router.post('/login',async(req,res)=>{
	const {user,password}=req.body
	if(!user || !password){
		return res
		.status(400)
		.json({success: false, message: 'Missing username and password'})
	}


	try{		
		var p = await conn;
		var sqlString = `select * from users where username = '${user}' and password = '${password}'`;
		return await p.request().query(sqlString,function(err,data){
		
			if(data.recordsets[0]==0){
				return res.status(400).json({success: false, message: 'Incorrect user name and password'})
			}

			const accessToken = jwt.sign({userId: data.recordset[0].id},"lam")
		
			const type = data.recordset[0].type;
			res.json({success:true, message: 'logged inn successfully',accessToken,type })
		})		
		

	}catch (error){
		console.log(error);
		res.status(500).json({success:false, message: 'error'})
	}
})

module.exports = router