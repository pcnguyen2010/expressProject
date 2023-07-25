//const uModel = require('./../models/userModel');
const UserModel = require('./../models/userModel');

const bcrypt = require("bcryptjs");

exports.login_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", {title: 'Login',err: error});
};

exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }

    req.session.isAuth = true;
    req.session.username = user.username;
    res.redirect("/employee");
};

exports.register_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("register", {title: 'Register',err: error});
};

exports.register_post = async (req, res) => {
    const { user_name, email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
        req.session.error = "User already exists";
        return res.redirect("/register");
    }

    const hasdPsw = await bcrypt.hash(password, 12);

    user = new UserModel({
        user_name,
        email,
        password: hasdPsw,
    });

    await user.save();
    res.redirect("/login");
};