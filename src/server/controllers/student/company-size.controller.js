const { request, response } = require("express");
const CompanySize = require("../../models/student/company-size.model");


const getCompanySizes = async(req = request, res = response) => {
    
    try {
        const companySize = await CompanySize.findAll();

        res.json({companySize});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

const getCompanySize = async(req = request, res = response) => {
    
    try {

        const {id} = req.params

        const companySize = await CompanySize.findByPk(id);

        res.json({companySize});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = {
    getCompanySizes,
    getCompanySize
}