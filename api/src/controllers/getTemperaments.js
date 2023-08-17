require("dotenv").config();
const { URL, API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  try {

    const temperamentDB = await Temperament.findAll();

    if (temperamentDB.length > 0) {
      return res.status(200).json(temperamentDB);
    }

    const response = await axios.get(`${URL}?api_key=${API_KEY}`);
    const data = response.data;

    const temperamentArray = data.map((data) => data.temperament).join(", ");

    const allWords = temperamentArray
      .split(", ")
      .map((word) => word.trim())
      .filter((word) => word !== "");

    const temperamentSet = new Set(allWords);
    const filteredTemperaments = [...temperamentSet];

    for (const temperament of filteredTemperaments) {
      await Temperament.findOrCreate({ where: { name: temperament } });
    }

    const AllTemperaments = await Temperament.findAll();
    return res.status(200).json(AllTemperaments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getTemperaments;
