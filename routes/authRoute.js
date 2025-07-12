import express from 'express';

const authRoute = express.Router();
authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.delete('/delete', logout);

export default authRoute;
