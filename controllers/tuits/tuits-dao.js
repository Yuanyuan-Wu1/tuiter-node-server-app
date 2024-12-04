import tuitsModel from './tuits-model.js';

export const findTuits = async () => {
    try {
        const tuits = await tuitsModel.find();
        console.log('Found tuits in DAO:', tuits.length);
        return tuits;
    } catch (error) {
        console.error('Error in findTuits DAO:', error);
        throw error;
    }
};
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({_id: tid});
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({_id: tid},
    {$set: tuit})