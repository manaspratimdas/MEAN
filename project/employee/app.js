var express =require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');

var app = express();

const port=3000;

mongoose.connect('mongodb://localhost:27017/employee');


mongoose.connection.on('connected',()=>{
	console.log('Connected to database  @27017');
});

mongoose.connection.on('error',(err)=>{
	if(err){
		console.log('connection error: '+err);
	}
});

const route=require('./routes/route');



app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.use('/api',route);

app.get('/',(req,res)=>{
		res.send('testing.....');
});

app.listen(port,()=>{
	console.log("testing server "+port);
});