const { request, response } = require("express");
const Location = require("../../models/student/location.model");


const getLocations = async (req = request, res = response) => {
    try {
        const locations = await Location.findAll();

        res.status(200).json({
            locations
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = {
    getLocations,
}