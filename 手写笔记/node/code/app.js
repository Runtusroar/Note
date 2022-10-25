const express = require("express")
const app = express()

//导入cors中间件
const cors = require("cors")
app.use(cors())

//路由
app.get("/user", (req, res) => {
    console.log("Hello World")
    res.send({
        "name": "蛮吉"
    })
})

app.listen(8000, () => {
    console.log("running at 8000")
})