const authService = require("../services/auth.service");
const register = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({success:false, message: "Name, email, and password are required" })
        }

        const user = await authService.register(name, email, password);
        return res.status(201).json({ success: true, message: "User registered successfully", data:user });

    }catch(err){
        next(err);
    }
};

const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({success:false, message: "Email and password are required" })
        }

        const data = await authService.login(email, password);
        return res.status(200).json({ success: true, message: "Login successful", data });   
    }catch(err){
        next(err);
    }
}

module.exports = {register, login};