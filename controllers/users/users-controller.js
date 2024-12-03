import people from './users.js'

let users = people

const ALLOWED_AVATARS = [
    'nasa.png',
    'default-avatar.png',
    'user1.png',
    'user2.png',
    'profile1.jpg',
    'profile2.jpg'
];

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);

    // 获取用户头像
    app.get('/api/users/:uid/avatar', (req, res) => {
        const userId = req.params.uid;
        const user = users.find(u => u._id === userId);
        res.json({ 
            avatarImage: user?.avatarImage || 'default-avatar.png' 
        });
    });

    // 获取可用头像列表
    app.get('/api/avatars', (req, res) => {
        res.json(ALLOWED_AVATARS);
    });

    // 更新用户头像
    app.put('/api/users/:uid/avatar', (req, res) => {
        const userId = req.params.uid;
        const { avatarImage } = req.body;
        
        if (!ALLOWED_AVATARS.includes(avatarImage)) {
            return res.status(400).json({ message: 'Invalid avatar' });
        }

        users = users.map(user => 
            user._id === userId 
                ? { ...user, avatarImage } 
                : user
        );
        
        const updatedUser = users.find(u => u._id === userId);
        res.json(updatedUser);
    });
}

const createUser = (req, res) => {
    const newUser = {
        ...req.body,
        avatarImage: ALLOWED_AVATARS.includes(req.body.avatarImage) 
            ? req.body.avatarImage 
            : 'default-avatar.png'
    };
    users.push(newUser);
    res.json(newUser);
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id === userId);
    res.json(user);
}

const findUsers = (req, res) => {
    const type = req.query.type
    if(type) {
        const usersOfType = users
            .filter(u => u.type === type)
        res.json(usersOfType)
        return
    }
    res.json(users)
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr =>
        usr._id !== userId);
    res.sendStatus(200);
}
const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((usr) =>
        usr._id === userId ?
            {...usr, ...updates} :
            usr
    );
    res.sendStatus(200);
}



export default UserController

