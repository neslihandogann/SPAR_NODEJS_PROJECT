const path=require('path')
const express=require('express')
const { engine } = require('express-handlebars');
const { dirname } = require('path')
const app=express()
const port=3000
const hostname='127.0.0.1'
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload=require('express-fileupload') 
const expressSesion=require('express-session')
const mongoStore = require('connect-mongo');
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1/modules_db',{
  useNewUrlParser:true,
  useUnifiedTopology:true,

})

app.use(expressSesion({
  secret: 'testotesto',
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/modules_db' })

}))

//flash message 

app.use((req,res,next)=>{
  res.locals.sessionFlash=req.session.sessionFlash
  // delete  req.session.sessionFlash
  next()

})
 app.use(fileUpload())
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//display link
app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  }
  else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})

const main=require('./routes/main')
const posts=require('./routes/posts')
const users=require('./routes/users')
const admin=require('./routes/admin/index')
const contact=require('./routes/contact')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)
app.use('/contact',contact)
app.listen(port,hostname,()=>{
    console.log(`server çalışıyor,http://${hostname}:${port}/`)
})
