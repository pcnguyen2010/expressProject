const express = require('express');
const fileUpload = require('express-fileupload');
const mgoose = require('mongoose');
const app = express();
const dbURI = 'mongodb+srv://test:test@node-tuts.2qcrgsh.mongodb.net/node-tuts?retryWrites=true&w=majority';
const PORT = 2000;
const ApptModel = require('./models/appointmentModel');
const AppointmentModel = require('./models/appointmentModel');

mgoose.connect(dbURI)
.then((result) => app.listen(PORT),console.log('connect'))//only listen to request when database connect
.catch((err) => console.log(err));

//Set these folder for public access
app.use(express.static('public'));
app.use(express.static('image'));
app.use(express.static('cssStyle'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//register view engine
app.set('view engine','ejs');
app.set('views','views');

app.get('/practice',(req,res)=>{
    res.render('practice',{title: 'Home'});
});

app.get('/about',(req,res)=>{
    res.render('aboutUs',{title: 'About'});
});

app.get('/contact',(req,res)=>{
    res.render('contactUs',{title: 'Contact'});
});

app.get('/location',(req,res)=>{
    res.render('location',{title: 'Location'});
});

app.get('/appointment',(req,res)=>{
    res.render('appointment',{title: 'Appointment'});
});

app.get('/myappointment',(req,res)=>{
    //res.render('myAppointment',{title: 'My Appointment'});
    AppointmentModel.find()
   .then(function(result){
        res.render('myAppointment',{title: 'My Appointment', apptModels: result})
   })
   .catch(function(err){
        console.log(err);
   })
});

app.post('/appointment',(req,res)=>{
    const apptModel = AppointmentModel(req.body);
    apptModel.save()
    .then(function(result){
        res.redirect('/practice');
    })
    .catch((err)=>{console.log(err)});
   //console.log(req.body);
});

app.get('/employee',(req,res)=>{
    res.render('employee',{title: 'Our Staff'});
});

app.get('/fileupload',(req,res)=>{
    res.render('fileUpload',{title: 'Upload Image'});
});

app.post('/fileupload',(req,res)=>{
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/image/employee/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
        res.redirect('/practice');
    });
});

//test database
app.get('/add-appointment',(req,res)=>{
    const apptVar = new AppointmentModel({
        customer_name: 'Nina Nguyen',
        appointment: 'Wed 07/28/2003',
        employee_name: "thang mam",
        note: 'this is the note'
    });
    apptVar.save()
    .then((result) =>{res.send(result)})
    .catch((err) =>{console.log(err)});
})

//app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

