import * as tuitsDao from './tuits-dao.js'

const createTuit = async (req, res) => {
    try {
        const { _id, ...tuitData } = req.body;
        const newTuit = {
            ...tuitData,
            time: "Now"
        };
        const insertedTuit = await tuitsDao.createTuit(newTuit);
        res.json(insertedTuit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findAllTuits = async (req, res) => {
    try {
        const tuits = await tuitsDao.findTuits();
        res.json(tuits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
}

const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findAllTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
