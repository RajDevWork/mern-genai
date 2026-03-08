const mongoose = require("mongoose")


/**Other schema those format are array begins */
const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,'Technical question is required']
    },
    intention:{
        type:String,
        required:[true,'Intention is required']
    },
    answer:{
        type:String,
        required:[true,'Answer is required']
    }
},{
    _id:false
})


const behaviorQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,'Technical question is required']
    },
    intention:{
        type:String,
        required:[true,'Intention is required']
    },
    answer:{
        type:String,
        required:[true,'Answer is required']
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,'Skill is required']
    },
    severity:{
        type:String,
        required:[true,'Severity is required'],
        enum:['low','medium','high']
    }

},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,'Day is required']
    },
    focus:{
        type:String,
        required:[true,'Focus is required']
    },
    tasks:[{
        type:String,
        required:[true,'Task is required']

    }]
})


/**Other schema those format are array endsup */






const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,'Job Description is required']
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behaviouralQuestion:[behaviorQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

const interviewReportModel = mongoose.model('interviewreports',interviewReportSchema)


module.exports = interviewReportModel