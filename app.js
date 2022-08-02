require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT
const io = require('socket.io')(server)
app.use(express.urlencoded({extended: true}))

// const api = require('./apis/apis')
// app.use("/", api)
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:3000', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));
function init_deck(){
    let clue_deck = {}
    clue_deck[0] = '에어컨'
    clue_deck[1] = '개미'
    clue_deck[2] = '골동품'
    clue_deck[3] = '사과'
    clue_deck[4] = '반창고'
    clue_deck[5] = '브로치'
    clue_deck[6] = '지폐'
    clue_deck[7] = '종'
    clue_deck[8] = '베팅 칩'
    clue_deck[9] = '혈액'
    clue_deck[10] = '뼈'
    clue_deck[11] = '책'
    clue_deck[12] = '팔찌'
    clue_deck[13] = '빵'
    clue_deck[14] = '팬티'
    clue_deck[15] = '빗자루'
    clue_deck[16] = '총알'
    clue_deck[17] = '버튼'
    clue_deck[18] = '케이크'
    clue_deck[19] = '달력'
    clue_deck[20] = '사탕'
}
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
        room = data.room_id
        socket.leave(room)
    })

    socket.on('joindeception',(data) => {
        room = data.room_id        
        socket.join(room)
    })

    socket.on('leavedeception',(data) => {        
    })

    socket.on('initdeck',(data) => {
    })

    socket.on('drawdeck',(data) => {
    })

    socket.on('shuffledeck',(data) => {
    })

})

server.listen(PORT, () => console.log(`server is runnig ${PORT}`))
