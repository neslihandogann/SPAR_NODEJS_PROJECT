const express=require('express')
const router=express.Router()
const categori=require('../../models/categori')

router.get('/',(req,res)=>{

    res.render('admin/index')

})

router.get('/kategori',(req,res)=>{

   categori.find({}).lean().then(kategori=>{
       res.render('admin/kategori',{kategori:kategori})
   })


})

router.post('/kategori',(req,res)=>{

   categori.create(req.body,(error,categori)=>{
       if(!error){
           res.redirect('kategori')
       }
   })

})

router.delete('/kategori/:id',(req,res)=>{
    categori.remove({_id:req.params.id}).then(()=>{
        res.redirect('/admin/kategori')
    })
})

module.exports=router