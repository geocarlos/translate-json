const db = require('../database/db');
const Entry = require('../models/entry')(db.sequelize, db.Sequelize);

const addEntry = async (key, language, content, description) => {
    try {
        return await Entry.create({
            key,
            language,
            content,
            description
        });
    } catch (error) {
        throw error;
    }
}

const getEntries = async () => {
    try{
        return await Entry.findAll();
    } catch (error) {
        throw error;
    }
}

const getEntry = async code => {
    try {
        const entry = await Entry.findOne({
            where: {
                key
            }
        })
        if (!entry) {
            throw { status: 404, message: "No product found with key " + key};
        }
        return entry;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addEntry,
    getEntries,
    getEntry
}