const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/crud-routes")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")




const app = express()
dotenv.config()

//Middlewares
app.use(express.json())
app.use(cors())
app.use("/cards",router)  //localhost:5000/cards

// admin1234

mongoose.set('strictQuery',false)
const connect = async()=>{

try {
    
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongodb is connected');

} catch (error) {
    
    console.log("mongodb connection failed")
}

}

// static files

app.use(express.static(path.join(__dirname,'../crud-app/build')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../crud-app/build/index.html'))
})

const port=process.env.PORT || 8000

app.listen(port,()=>{
    connect()
    console.log(`Server is working on http://localhost:${port}`);
})