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

        const token = serverClient.createUserToke(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPasswaord, phoneNumber });

    } catch (error) {
        console.log(error);

        resizeBy.status(500).json({ message: error });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username});

        if(!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypto.compare(password, users[0].hashedPasswaord);

        const token = serverClient.createUserToke(users[0].id);

        if(success){
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password'});
        }
    } catch (error) {
        console.log(error);

        resizeBy.status(500).json({ message: error });
    }
};

module.exports = { signup, login }

