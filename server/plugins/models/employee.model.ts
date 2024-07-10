import mongoose ,{Schema} from "mongoose"
const useSchema :mongoose.Schema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        salary : {
            type : Number,
            required : true
        },
        birthdate : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        },
    },
    {
        timestamps : true
    }
)

export default mongoose.model('employee',useSchema)