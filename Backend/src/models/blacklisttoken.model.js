const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required"]
    }
},{
    timestamps:true
})

const blackListModel = mongoose.model('blacklisttokens',blacklistTokenSchema)

module.exports = blackListModel