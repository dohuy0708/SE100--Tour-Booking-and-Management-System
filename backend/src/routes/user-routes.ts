import express from 'express';

const UserRoutes = express.Router();

UserRoutes.get('/getuser/', (req, res) => {
    res.send('aloha test get thu user');
})

export default UserRoutes;
