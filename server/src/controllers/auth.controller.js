import client from "../config/redis.config.js";
import { registerUserService, loginUserService, getUserService ,updateUserService} from "../services/user.service.js";
import { cookieConfig } from "../config/cookie.config.js";
export const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const { user, token, refreshToken } = await loginUserService({ email, password });
    res.cookie("auth_token", token, cookieConfig)
    res.cookie("auth_reffress_token", refreshToken, cookieConfig)
    res.status(200).json({
      message: "Login successful",
      user: {
        token:token,
        refreshToken:refreshToken,
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


export const logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.auth_token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }

    // Decode token just to get expiration time
    const decoded = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    const expiry = decoded.exp ? decoded.exp - Math.floor(Date.now() / 1000) : 3600;

    // Store token in Redis blacklist
    await client.setEx(`blacklist:${token}`, expiry, "blocked");

    // Clear cookie
    console.log("logout route is hited")
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "User logged out & token blacklisted 🚫" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Logout failed" });
  }
};


export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.headers["authorization"]?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // (Optional) check if token is blocked in Redis
    const isBlocked = await client.get(`bl_refresh_${refreshToken}`);
    if (isBlocked) {
      return res.status(403).json({ error: "Refresh token is invalid/blocked" });
    }

    // Generate new access + refresh token
    const accessToken = generateToken({ userId: decoded.userId, email: decoded.email });
    const newRefreshToken = generateRefreshToken({ userId: decoded.userId });

    // Store new refresh token (can overwrite old one in Redis/DB)
    await client.set(`refresh_${decoded.userId}`, newRefreshToken, { EX: 60 * 60 * 24 * 7 }); // 7 days

    // Send as cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error("Error in refreshAccessToken:", err);
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.user;  
    const user = await getUserService(email);
    delete user.password;
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.user; // extracted from JWT in auth middleware
    const updateData = req.body; // fields to update

    const updatedUser = await updateUserService(email, updateData);

    res.json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
