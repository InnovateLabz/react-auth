import {getDbConnection} from "./../db.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const signUp = {
    path: '/api/signup',
    method: 'post',
    handler: async(req, res) => {
        const {email, password} = req.body
        console.group(email)
        const db = getDbConnection("EMS");
        const user =await db.collection("users").findOne({email});
        if(user){
            res.sendStatus(409)
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const startingInfo = {
            favoriteFood:""
        } 

        const result = await db.collection('users').insertOne({
            email, passwordHash, info:startingInfo, isVerified:false
        })
        
        const {insertedId} = result;
        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false
        }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ token });
        });
    }    
};

export default signUp;