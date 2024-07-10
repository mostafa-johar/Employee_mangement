import mongoose from "mongoose"

export default defineNitroPlugin(async()=>{
    try{
        const conn = await mongoose.connect(useRuntimeConfig().mongoDb)
        if(conn){
            console.log(`success connecting to dataBase `)
        }
    }catch{
        console.log('Error in connection of db')
    }
})