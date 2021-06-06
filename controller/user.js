const getUser = (req, res) => {
    const {q, name = "No name", page} = req.query;
    
    res.json({
        message: 'get API - controller',
        q,
        name,
        page
    });
};

const putUser = (req, res) => {
    const { id } = req.params;

    res.json({
        message: 'put API - controller',
        id
    });
};

const postUser = (req, res) => {
    const { name, age } = req.body;

    res.json({
        message: 'post API - controller',
        name,
        age
    });
};

const deleteUser = (req, res) => {
    res.json({
        message: 'delete API - controller'
    });
};

module.exports = { getUser, putUser, postUser, deleteUser }