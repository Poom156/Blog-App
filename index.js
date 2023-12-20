const express = require('express')
const dotenv = require('dotenv')
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const { error } = require('console')
const validateMiddleWare = require('./middleware/validationMiddleware.js')
const authMiddleware = require('./middleware/authMiddleware.js')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js')
const expressSession = require('express-session')
const flash = require('connect-flash')

//Imports for controllers
const newPostController = require('./controllers/newPost.js')
const homeController = require('./controllers/home.js')
const storePostController = require('./controllers/storePost.js')
const getPostController = require('./controllers/getPost.js')
const newUserController = require('./controllers/newUser.js')
const storeUserController = require('./controllers/storeUser.js')
const loginController = require('./controllers/login.js')
const loginUserController = require('./controllers/loginUser.js')
const logoutController = require('./controllers/logout.js')

const app = new express()
const port = process.env.PORT
app.listen(port, ()=> {
    console.log(`The app is running on port: ${port}`)
})

dotenv.config()
mongoose.connect(process.env.BLOGAPP_DB_URI)

app.set('view engine','ejs')

//Middlewares
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload()) 
app.use('/posts/store', validateMiddleWare)
app.use(expressSession({secret: 'keyboard cat'}))
app.use(flash())

global.loggedIn = null

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})


//Routes
app.get('/', homeController)
app.get('/auth/register', newUserController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', storePostController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController)
app.post('/users/login', loginUserController)
app.get('/post/new', authMiddleware, newPostController)
app.post('/post/new', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/auth/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/auth/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)