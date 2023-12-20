const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')

mongoose.connect('mongodb://localhost:27017/my-database')

BlogPost.create({
    title: 'The mythbuster',
    body: 'fhfhsjdsjlfsorharsougbadsuo'
})
.then(blogpost => {
    console.log(blogpost)
})
.catch(error => {
    console.error(error)
})