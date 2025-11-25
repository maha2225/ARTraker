const { Medication } = require('../models');

const getMedications = async (req, res) => {
  try {
    const medications = await Medication.findAll({
      order: [['name', 'ASC']], 
    });

    res.status(200).json(medications);
  } catch (error) {
    console.error("Error fetching medications:", error);
    res.status(500).json({ message: "Failed to fetch medications" });
  }
};

module.exports = {  getMedications };
