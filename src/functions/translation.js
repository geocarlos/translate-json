const db = require('../database/db');
const Translation = require('../models/translation')(db.sequelize, db.Sequelize);

const addTranslation = async (source, target) => {
    try {
        return await Translation.create({
            source,
            target
        });
    } catch (error) {
        throw error;
    }
}

const getTranslations = async () => {
    try{
        return await Translation.findAll();
    } catch (error) {
        throw error;
    }
}

const getTranslation = async id => {
    try {
        const translation = await Translation.findOne({
            where: {
                id
            }
        })
        if (!translation) {
            throw { status: 404, message: "No product found with key " + id};
        }
        return translation;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addTranslation,
    getTranslations,
    getTranslation
}