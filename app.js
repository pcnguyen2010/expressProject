const exp = require('express');
const mgoose = require('mongoose');
const Blog = require('./models/blog');

//create instance of express
const app = exp();

const dbURI = 'mongodb+srv://executioner:executioner@node-tuts.2qcrgsh.mongodb.net/node-tuts?retryWrites=true&w=majority';
mgoose.connect(dbURI)
.then((result) => app.listen(3000),console.log('connect'))//only listen to request when database connect
.catch((err) => console.log(err));

//request listen
//app.listen(3000);

app.use(exp.static('public'));
app.use(exp.urlencoded({ extended: true }));

//register view engine
app.set('view engine','ejs');
app.set('views','views');

app.get('/add-blog',(req,res)=>{
    const blogVar = new Blog({
        title: 'this is Ninja title',
        snippet: 'this is snippet',
        body: 'this is body'
    });
    blogVar.save()
    .then((result) =>{res.send(result)})
    .catch((err) =>{console.log(err)});
})

app.get('/get-blog',(req,res) =>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{console.log(err)})
});

app.get('/',(req,res)=>{
    /*
    const blogsContent = [
        {title: 'Yesterday',snippet: 'it is cold and windy.'},
        {title: 'Today',snippet: 'it is mild and no wind at all.'},
        {title: 'Tomorrow',snippet: 'beautiful day, better than yesterday.'},
    ];
    
    res.render('index',{title: 'Home',blogs:blogsContent});
    */
   Blog.find()
   .then(function(result){
        res.render('index',{title: 'Home', blogs: result})
   })
   .catch(function(err){
        console.log(err);
   })
    
});

app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create'});
});

//redirect
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

app.get('/blogs/:blogId',(req,res) =>{
    const blogID = req.params.blogId;
    
    Blog.findById(blogID)
    .then(function(result){
        res.render('detail',{title: 'Detail',blog:result});
    })
    .catch(function(err){
        console.log(err)
    });
});

app.post('/blogs',(req,res)=>{
    
    const blogModel = Blog(req.body);
    blogModel.save()
    .then(function(result){
        res.redirect('/');
    })
    .catch((err)=>{console.log(err)});
    
   //console.log(req.body);
});


//Error 404,work like finally in java try catch
app.use((req,res)=>{
    res.render('404',{title: '404'});
})