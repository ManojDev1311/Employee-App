const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const signup = async (req,res) => {
 try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
}

const logIn = async (req,res) => {
 try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(403).json({ message: "Invalid email Please correct it." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Invalid email or password Please correct it." });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json(
        { message: "User registered successfully", 
          success: true,
          token,
          email,
          name:user.name 
        }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
    signup, logIn
}