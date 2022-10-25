const express = require("express")
const router = express.Router()

router.get("/user", (req, res) => {
    console.log("你成功了")
    res.send("你成功了")
})

module.exports = router