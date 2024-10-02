const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user-address', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    name: String
});

const AddressSchema = new mongoose.Schema({
    address: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', UserSchema);
const Address = mongoose.model('Address', AddressSchema);

app.post('/register', async (req, res) => {
    const { name, address } = req.body;

    try {
        const user = new User({ name });
        await user.save();

        const userAddress = new Address({ userId: user._id, address });
        await userAddress.save();

        res.status(201).send('User and address registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user and address');
    }
});
