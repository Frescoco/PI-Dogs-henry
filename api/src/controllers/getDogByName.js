require("dotenv").config();
const { URL, API_KEY } = process.env;
const axios = require("axios");
const { Dog } = require("../db");
const { Op } = require("sequelize");

const getDogByName = async (req, res) => {
  try {
    const dogName = req.query.name;
    const dataDB = await Dog.findOne({ where: { name: { [Op.iLike]: `%${dogName}%`} } });

    const response = await axios.get(`${URL}/search?q=${dogName}`);
    const dataApi = response.data

    const combinedResults = dataDB ? [...dataApi, dataDB] : dataApi;


    if(combinedResults.length > 0){
      return res.status(200).json(combinedResults)
    } else {
      return res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getDogByName;
