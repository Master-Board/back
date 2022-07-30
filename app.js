require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT
const io = require('socket.io')(server)
app.use(express.urlencoded({extended: true}))
const api = require('./apis/apis')
app.use("/", api)
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:3000', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));
io.on('connection',(socket) => {
    var room
    var deck
    var score
    
    socket.on('chatting', (data) => {
        let msg_time = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        const {msg_sender, msg_content, room} = data;
        socket.to(room).emit('chatting',{
            msg_sender,
            msg_content,
            msg_time,
        })
    })

    socket.on('joinparade', (data) => {
        room = data.room_id        
        socket.join(room)
    })

    socket.on('leaveparade',(data) => {
    })

    socket.on('joindeception',(data) => {
        room = data.room_id        
        socket.join(room)
    })

    socket.on('leavedeception',(data) => {        
    })

})

server.listen(PORT, () => console.log(`server is runnig ${PORT}`))