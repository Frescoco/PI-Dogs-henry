const { Dog, Temperament } = require("../db");

const postDog = async (req, res) => {
  try {
    const { image, name, weight, height, life_span, temperaments } = req.body;

    if (!image || !name || !weight || !height || !life_span || !temperaments) {
      return res.status(401).send("Not Found");
    }

    const createDog = await Dog.create({
      image,
      name,
      weight,
      height,
      life_span,
    });

    let temperamentDb = await Temperament.findAll({
      where: { name: temperaments },
    });

    createDog.addTemperaments(temperamentDb);

    return res.status(200).json("Dog create");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postDog;
