const { contact } = require('getstream');
const bcrypto = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);
        
        const hashedPasswaord = await bcrypto.hash(password, 10);

    } catch (error) {
        console.log(error);

        resizeBy.status(500).json({ message: error });
    }
};
const login = (req, res) => {
    try {

    } catch (error) {
        console.log(error);

        resizeBy.status(500).json({ message: error });
    }
};

module.exports = { signup, login }

