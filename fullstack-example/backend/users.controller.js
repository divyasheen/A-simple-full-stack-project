import User from "./users.model.js";


export const registerUser = async(req, res, next) => {
    try {

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            profilepic: req.myFileName
        });
        newUser.profilepic = `http://localhost:3000/uploads/${newUser.profilepic}`
        await newUser.save();
        res.json({msg: 'register success', newUser});

    } catch (error) {
        res.status(400).json({ error: error.msg });
    }
};


export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({error: error.msg})
    }
}