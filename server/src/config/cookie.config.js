export const cookieConfig = {
    httpOnly: true,   // JS in browser can't access the cookie
    secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
    sameSite: "strict",  // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}