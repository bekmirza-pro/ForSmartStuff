require('dotenv').config()
const express = require('express')
const sequelize = require('../lib/db')
const models = require('./models/model')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const router = require('./routes/index')
const path = require('path')
const authMiddleware = require('./middleware/authMiddleware')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve('public')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.get('/', function(req, res) {
    res.render('pages/index');
});


io.on('connection', function(socket) {
    socket.on('newUser', function(username) {
        socket.broadcast.emit('update', username + ' joined the conversation')
    })
    socket.on('exitUser', function(username) {
        socket.broadcast.emit('update', username + ' left the conversation')
    })
    socket.on('chat', function(message) {
        socket.broadcast.emit('chat', message)
    })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()