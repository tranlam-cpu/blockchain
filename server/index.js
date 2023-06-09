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

const multer = require('multer');
const path = require('path');
// Set the destination folder to save the uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No image file provided' });
    return;
  }

  // Access the uploaded file details
  const filename = req.file.filename;
  const filePath = req.file.path;

  // You can perform any additional logic here, such as saving the file path to a database

  res.json({ filename, filePath });
});

// Handle image retrieval
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', filename);

  res.sendFile(imagePath);
});


app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))