const jwt = require("jsonwebtoken")

const token = async (req,res) => {
const user_id = req.body.user_id
console.log(user_id)
try{
    const token = jwt.sign({user_id},process.env.JWT_KEY)
    res.status(200).send({
        status:"Success",
        token:token
    })
}catch(err){
    console.log(err)
}
} 

module.exports={token}