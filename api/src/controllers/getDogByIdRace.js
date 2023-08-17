require("dotenv").config();
const { URL, API_KEY } = process.env;
const axios = require("axios");
const { Dog } = require('../db')

async function getDogByIdRace(req, res) {
  try {
    const { idRace } = req.params;

    const response = await axios(`${URL}?api_key=${API_KEY}`);
    const data = response.data;
    const dogFromApi = data.filter((dog) => dog.id === Number(idRace));

    const responseDB = await Dog.findAll();
    const dogFromDB = responseDB.filter((dog) => dog.id === idRace);

    console.log(dogFromDB);

    const combinedResults = [...dogFromApi, ...dogFromDB];

    console.log(combinedResults);

    if (combinedResults.length > 0) {
      return res.status(200).json(combinedResults);
    } else {
      return res.status(400).send("Not Found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = getDogByIdRace;
