require("dotenv").config();
const { URL, API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getRace = async (req, res) => {
  try {
    const dataDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })

    const response = await axios.get(`${URL}?api_key=${API_KEY}`);
    const data = response.data;

    const formattedDataDb = dataDb.map(dog => ({
        ...dog.toJSON(),
        temperament: dog.Temperaments.map(temp => temp.name).join(', '),
      }));

    const combinedData = [...data, ...formattedDataDb];

    combinedData.forEach(dog => {
        if (dog.Temperaments) {
          delete dog.Temperaments;
        }
      });
  
    if (combinedData) {
      return res.status(200).json(combinedData);
    } else {
      return res.status(400).send("Not Found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getRace;
