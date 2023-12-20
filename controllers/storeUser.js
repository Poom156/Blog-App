const { error } = require('console')
const User = require('../models/User.js')
const path = require('path')

module.exports = async (req, res) => {
    await User.create({
        username: String(req.body.username),
        password: String(req.body.password)
    })
    .then(users =>{
        console.log(users)
        res.redirect('/')
    })
    .catch(error => {
        console.error(error)
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data',req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}