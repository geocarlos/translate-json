const db = require('../database/db');
const Language = require('../models/language')(db.sequelize, db.Sequelize);

const addLanguage = async (code, name) => {
    try {
        return await Language.create({
            code,
            name
        });
    } catch (error) {
        throw error;
    }
}

const getLanguages = async () => {
    try{
        return await Language.findAll();
    } catch (error) {
        throw error;
    }
}

const getLanguage = async code => {
    try {
        const language = await Language.findOne({
            where: {
                code
            }
        })
        if (!language) {
            throw { status: 404, message: "No product found with id " + code};
        }
        return language;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addLanguage,
    getLanguages,
    getLanguage
}