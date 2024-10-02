app.post('/register', async (req, res) => {
    const { name, address } = req.body;

    try {
        const user = await User.create({ name });
        await Address.create({ userId: user.id, address });
        res.status(201).send('User and address registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user and address');
    }
});
