const express = require("express")
const app = express();
const rootRouter = require('./routes/index')
const cors = require('cors')

app.use(cors()); // Enables CORS for all origins
app.use(express.json());

app.use("/api/v1" , rootRouter)

app.listen(3000,()=>{
    console.log(`Backend is running`)
})