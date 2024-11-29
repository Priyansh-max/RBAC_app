const express = require('express')
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middleware/authmiddleware');
const router = express.Router();

const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/create-notice' , authmiddleware , async(req , res) => {
    try{
        const { title , content } = req.body;

        const userid = req.userid;

        const user = await prisma.user.findUnique({
            where : {id : userid}
        })

        if(user.role != "ADMIN"){
            return res.status(404).json({ error: 'unauthorised'});
        }

        const newNotice = await prisma.notice.create({
            data: {
                title,
                content,
                userId : userid
            },
        })

        res.status(201).json({
            message : "Notice created successfully",
            Notice : {
                id: newNotice.id,
                title: newNotice.title,
                content: newNotice.content,
            }   
        });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

router.put('/edit-moderator' , authmiddleware , async(req , res) => {
    try{   
        const {email , role } = req.body

        const userid = req.userid;

        const Normaluser = await prisma.user.findUnique({
            where : {email : email}
        })

        const user = await prisma.user.findUnique({
            where : {id : userid}
        })

        if(!Normaluser){
            return res.status(404).json({ error: 'The email you entered does not exist'});
        }

        if(user.role != "ADMIN"){
            return res.status(404).json({ error: 'unauthorised'});
        }

        const newRole = await prisma.user.update({
            where : {email : email},
            data : {
                role : role,
            }
        })


        res.status(201).json({
            message : 'User role updated successfully.',
            user : newRole,
        });

    }catch(error){
        res.status(500).json({ error: 'An error occurred while updating the user role.' });

    }
})

router.get("/user-data", authmiddleware, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });


        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch user data." });
    }
});

module.exports = router;
