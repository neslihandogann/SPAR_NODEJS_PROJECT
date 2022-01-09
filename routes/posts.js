
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { route } = require('./main')
const path = require('path')

router.get('/new', (req, res) => {
    console.log('post eklemek için  kayıdınız varsa giriş yapın yoksa kayıt olup giriş yapın lütfen.')
    if (req.session.userId) {

        return res.render('site/addpost')
    }

    res.redirect('/users/login')
})


router.get('/post/test', (req, res) => {

    Post.find({}).lean().then(post => {
        res.render('site/post', { post: post })
    })

})





router.post('/test', (req, res) => {

    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))

    Post.create({
        ...req.body,
        post_image: `/img/postimages/${post_image.name}`
    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'postunuz başarılı bir şekilde oluşturuldu'
    }
    res.redirect('/blog')
})

module.exports = router