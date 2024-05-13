import { getDbConnection } from "./../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Check if email or password is missing
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required." });
            }

            const db = getDbConnection("EMS");
            const user = await db.collection("users").findOne({ email });

            // Check if user exists
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            const { _id: id, isVerified, passwordHash, info } = user;

            // Compare the provided password with the hashed password from the database
            const isCorrect = await bcrypt.compare(password, passwordHash);

            if (isCorrect) {
                // Generate JWT token
                const token = jwt.sign({
                    id, isVerified, email, info
                }, process.env.JWT_SECRET, { expiresIn: '2d' });

                // Send token as a response
                res.status(200).json({ token });
            } else {
                // Incorrect password
                return res.status(401).json({ error: "Invalid email or password." });
            }
        } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({ error: "An error occurred while processing your request." });
        }
    }
};

export default login;
