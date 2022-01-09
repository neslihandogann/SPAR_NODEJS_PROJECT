const mongoose = require('mongoose');
const post=require('./models/post')

mongoose.connect('mongodb://127.0.0.1/modules_test_db',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

post.create({
    title:'benim ilk post başlığım',
    content:'post içeriği,lorem ipsum text'
},(error,post)=>{
 console.log(error,post)
})