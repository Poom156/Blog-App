const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = (req, res) => {
    let image = req.files.image
    image.mv(path.join(__dirname, '..', 'public', 'assets', 'img', image.name), async(error) => {     
        await BlogPost.create({
            title: String(req.body.title),
            subHeading: String(req.body.subHeading),
            body: String(req.body.body),
            image: '/img/' + image.name,
            userid: req.session.userid
        })
        .then(blogpost => {
            console.log(blogpost)
            res.redirect('/')
        })
        .catch(error =>{
            console.error(error)
        })
    })
}