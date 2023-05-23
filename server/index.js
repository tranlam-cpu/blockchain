const sql = require("mssql/msnodesqlv8");
const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/auth')

var config={
	server: "192.168.1.20",
	database:"xacthucnguongoc",
	driver:"msnodesqlv8",
	user: "lam",
	password: "123456",
	option:{
		trustedConnection:true
	}
}

sql.connect(config,function(err){
	if(err) console.log(err);
	else console.log("connect sql");

})


const app=express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter);

const PORT = 5000



app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))