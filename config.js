const mongoose = require('mongoose')

const connect = async () =>{
     try {
        await mongoose.connect('mongodb+srv://emekaewelike:' + process.env.MONGO_ATLAS_PW + '@node-rest-api.d9zqiax.mongodb.net/?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
     } catch (error) {
        console.log(error)
     }
}

module.exports = {connect};