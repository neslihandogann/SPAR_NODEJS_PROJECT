const express=require('express')
const user = require('../models/user')
const router=express.Router()


router.get('/register',(req,res)=>{
    res.render('site/register')
})

router.post('/register',(req,res)=>{
    user.create(req.body,(error,user)=>{
   
        req.session.sessionFlash={
            type:'alert alert-warning',
            message:'kullanıcı  başarılı bir şekilde oluşturuldu'
        }

        res.redirect('/users/login')
    })
})


router.get('/login',(req,res)=>{
    res.render('site/login')
               })


 router.post('/login',(req,res)=>{
     const {email,password}=req.body
     user.findOne({email},(error,user)=>
     {
         if(user){
             if(user.password==password){
                 req.session.userId=user._id
                
                 //user session
                 res.redirect('/')
             }else{
                 res.redirect('/users/login')
             }
            }
            else{
                 res.redirect('/users/register')
             }
     })
 })
            
 router.get('/logout',(req,res)=>{
     req.session.destroy(()=>{
        res.redirect('/')
     })
   
               })
module.exports=router