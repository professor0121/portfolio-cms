import { registerUserService,loginUserService } from "../services/user.service.js";
import { cookieConfig } from "../config/cookie.config.js";
export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const { user, token } = await loginUserService({ email, password });
    res.cookie("auth_token", token,cookieConfig)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logoutUser = (req, res) => {
    // Logic for user logout
    res.send('User logged out');
}

export const refreshToken = (req, res) => {
    // Logic for refreshing token
    res.send('Token refreshed');
}

export const getUserProfile = (req, res) => {
    // Logic for getting user profile
    res.send('User profile');
}
export const updateUserProfile = (req, res) => {
    // Logic for updating user profile
    res.send('User profile updated');
}