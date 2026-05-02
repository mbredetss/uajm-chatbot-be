import AuthenticationError from "../exceptions/authentication-error.js";
import response from "../utils/response.js";

const userAuthentication = (req, res, next) => {
    const password = req.body.password;

    if (!password || password !== process.env.UPLOAD_PASSWORD) throw new AuthenticationError('dokumen gagal diunggah, pastikan password benar');
    return next();
}

export default userAuthentication;