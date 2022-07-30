const connection = require('../config/dbconfig')
const express = require("express")
const router = express.Router()
const moment = require("moment")
const cors = require("cors")
const corsOption = {
    "Access-Control-Allow_Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT",
    "Access-Control-Max-Age":"3600",
    "Access-Control-Allow-Headers":"Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization"
}
router.use(cors({
    origin: 'http://localhost:3000', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

router.post("/regist", (req,res) => {
    res.header(corsOption)
    const { id, pw, name} = req.body
    let query = "select count(*)'dup' from user where id=?"
    let param = [id]
    connection.query(query,param,function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{
            if(result[0].dup ==0) {
                const query = "insert into user (id, username, password, isLogin) values (?,?,?,0)"
                param = [id,name,pw]
                connection.query(query,param,function(err, result, fields) {
                    if (err) {
                        res.status(401).send({
                            message: err
                        })
                    }
                    else{
                        res.status(200).send({
                            message: '회원가입 완료.'
                        })
                    }
                })
            }
            else{
                res.status(400).send({
                    message: '아이디 중복.'
                })
            }
        }
    })
})

router.get("/dupid", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {id} = req.query
    let query = "select count(*)'dup' from user where id=?"
    let param = [id]
    connection.query(query,param,function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{
            if(result[0].dup ==0) {                
                res.status(200).send({
                    message: '아이디 중복 안됨.'
                })
            }
            else{
                res.status(400).send({
                    message: '아이디 중복.'
                })
            }
        }
    })
})

router.put("/login-logout", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {id,pw} = req.body
    let query = "select count(*)'valid' from user where id=? and password=?;"    
    let param = [id,pw]
    connection.query(query, param, function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{
            if(result[0].valid ==0) {
                res.status(400).send({
                    message: '없는 회원이거나 회원정보가 틀렸습니다.'
                })
            }
            else{
                query = "select isLogin from user where id=? and password=?"
                connection.query(query, param, function(err, result, fields) {
                    if (err) {
                        res.status(401).send({
                            message: err
                        })
                    }
                    else{
                        if (result[0].isLogin==0) {
                            query = "update user set isLogin=1 where id=? and password=?"
                            connection.query(query, param, function(err, result, fields) {
                                if (err) {
                                    res.status(401).send({
                                        message: err
                                    })
                                }
                                else{
                                    res.status(200).send({
                                        message: '로그인 완료!'
                                    })
                                }
                            })
                        }
                        else{
                            query = "update user set isLogin=0 where id=? and password=?"
                            connection.query(query, param, function(err, result, fields) {
                                if (err) {
                                    res.status(401).send({
                                        message: err
                                    })
                                }
                                else{
                                    res.status(200).send({
                                        message: '로그아웃 완료!'
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})

router.post("/makeparade", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {} = req.query
    let query = "insert into ~~"
    let param = [id]
    connection.query(query,param,function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{                           
            res.status(200).send({
                message: 'good'
            })
        }
    })
})

router.post("/deleteparade", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {} = req.query
    let query = "delete from ~~"
    let param = [id]
    connection.query(query,param,function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{                           
            res.status(200).send({
                message: 'good'
            })
        }
    })
})

router.post("/makedeception", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {} = req.query
    let query = "insert into ~~"
    let param = [id]
    connection.query(query,param,function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{                           
            res.status(200).send({
                message: 'good'
            })
        }
    })
})

router.post("/deletedeception", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {} = req.query
    let query = "delete from ~~"
    let param = [id]
    connection.query(query,param,function(err, result, fields) {
        if (err) {
            res.status(401).send({
                message: err
            })
        }
        else{                           
            res.status(200).send({
                message: 'good'
            })
        }
    })
})