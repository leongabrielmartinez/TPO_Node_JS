import User from "../models/mongoDB/User.js";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'
const saltRounds = 10

export const authController = {
    
    async login(req, res) {
        const response = await User.find().where({ email: req.body.email })
        if (!response.length){
            res.status(401).json({ success: false, message: "Invalide Email or Password" })}
        
        const isSamePassword = await compare(req.body.password, response[0].password)
        if (!isSamePassword){
            res.status(401).json({ success: false, message: "Invalide Password" })}
        const userForToken = {
            userName: response[0].fullName,
            userEmail: response[0].email,
            sub: response[0].id
        }
        const accessToken = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '8h'})
        res.status(200).json({ sucess: true, message:"User authenticated", data: accessToken })
        
    },

    async registerUser(req, res) {
        try{
            const {fullName, email} = req.body
            const password = await hash(req.body.password, saltRounds)
            const newUser = new User({ fullName, email, password })  
            const response = await newUser.save()                        
            res.status(200).json({ success:true, message: "New user Registered", data: response })            
        }catch(err){
            res.status(500).json({ success: false, message: `Internal server error ${err}` })
        }
    }
}