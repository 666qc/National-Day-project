const express = require("express")
const mysql = require('mysql')
const axios = require('axios')
const path = require('path')
const cors = require('cors')


const app = express()




const connection = require('./mode/model')
const {
    query
} = require("express")

app.use(cors())

//接收post请求
app.use(express.json()) //
app.use(express.urlencoded({
    extended: true
}))

// 允许跨域
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
})


app.get('/index', async (req, res) => {
        var sql = `select * from commodity`
        result = await connection(sql)
        res.json(result)
        // res.sendFile(path.join(__dirname,'./views/index.html'))     

    }),


app.get('/edit', async (req, res) => {
    let {
        index
    } = req.query;
    let sql = `select * from commodity where idList = ${index}`
    let result = await connection(sql)
    res.json(result)
})


app.post('/update', async (req, res) => {
    // { clothes: 'M4', quantity: '66', Price: '999' }
    let {
        clothes,
        quantity,
        Price,
        idList
    } = req.body.goodsInfo
    let sql = `update commodity set  clothes ="${clothes}", quantity="${quantity}",Price= "${Price}" where idList = ${idList}`
    let result = await connection(sql)
    if(result.affectedRows){
        res.json({
            message: '更新成功',
            code: 20000
        })
    }
    
})
    app.get('/dele', async (req,res)=>{
        let { index }  = req.query
        console.log(req.query);
        let sql = `delete from commodity where idList =${index}`
        let result = await connection(sql)
        // console.log(result);
        if(result.affectedRows){
            res.json({
                message: '删除成功',
                code: 20002
            })
        }
    })

    app.post("/Add", async(req,res)=>{
        let {
            clothes,
            quantity,
            Price,
            idList
        } = req.body.goodsInfo
        let sql = `insert into commodity(clothes,quantity,Price,idList)value("${clothes}","${quantity}","${Price}","${idList}")`
        let  result = await connection(sql)
        if(result.affectedRows){
            res.json({
                message: '添加成功',
                code: 20003
            })
        }

    })

app.listen(4000, () => {
    console.log('Start the server')
})