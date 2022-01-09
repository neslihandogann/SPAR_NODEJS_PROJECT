const mongoose = require('mongoose');

const categorischema=new mongoose.Schema({
    
    name:{type:String,required:true}

    
})

module.exports=mongoose.model('categori',categorischema)
