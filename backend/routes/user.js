const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');

const app = express();

router.put('/edit_profile' , authmiddleware , async(req , res) => {
    try{
        const { firstname, lastname } = req.body;
        const userId = req.userid;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstname: firstname || user.firstname,
                lastname: lastname || user.lastname
            },
        });

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                role: updatedUser.role,
            },
        });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

router.get('/userdata', authmiddleware, async (req, res) => {
    try {
        const userid = req.userid

        const user = await prisma.user.findUnique({
            where: { id : userid},
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ user });
        
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: 'Failed to fetch user data.' });
    }
});


router.get('/notices', async (req, res) => {
    try {
        const notices = await prisma.notice.findMany({
            select: {
                id: true,
                createdAt: true,
                title: true,
                content: true,
                userId: true,
            },
        });

        res.status(200).json({
            message: 'Notices retrieved successfully',
            notices,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





module.exports = router;
