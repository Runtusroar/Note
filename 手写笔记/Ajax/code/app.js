const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
//req是请求报文的封装
//res是响应报文的封装
app.get("/user", (req, res) => {
    console.log("succeede")
    // res.setHeader("Access-Control-Allow-Origin", "*")
    res.send("Hello World")
})

app.listen(8000, () => {
    console.log("监听8000端口中")
})