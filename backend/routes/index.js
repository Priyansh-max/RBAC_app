//necessary imports
const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userRouter = require("./user");
const adminRouter = require("./admin")

const { PrismaClient } = require('@prisma/client');

router.use('/users' , userRouter)
router.use('/admin' , adminRouter)

router.post('login' , async(req , res) => {
    try{

    }catch(error){

    }
})

router.post('/signup' , async(req , res) => {
    try{

    }catch(error){
        
    }
})

module.exports = router;