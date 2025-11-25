const { Prescription, User, Medication, Counselor } = require('../models');

const createPrescription = async (req, res) => {
  try {
    const { userId, counselorId, medicationId, startDate, endDate, dosage } = req.body;

    const prescription = await Prescription.create({
      userId,
      counselorId,
      medicationId,
      startDate,
      endDate,
      dosage
    });

    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      include: [User, Counselor, Medication]
    });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findByPk(id, {
      include: [User, Counselor, Medication]
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPrescription, getPrescriptions, getPrescriptionById };
