const { AdherenceRecord, User } = require('../models');

const createPatientAdherence = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      daysMissed,
      primaryBarriers,
      lastClinicVisit,
      nextAppointment,
      monthlyAdherenceRate,
      month,
      notes
    } = req.body;

    // Check if patient exists
    const patient = await User.findByPk(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Create adherence record linked to patient
    const adherenceRecord = await AdherenceRecord.create({
      userId: patient.id,
      month,
      status,
      daysMissed,
      primaryBarriers,
      lastClinicVisit,
      nextAppointment,
      monthlyAdherenceRate,
      notes
    });

    res.status(201).json({ message: 'Adherence record created', adherenceRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getPatientAdherence = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if patient exists
    const patient = await User.findByPk(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Fetch all adherence records for this patient
    const adherenceRecords = await AdherenceRecord.findAll({
      where: { userId: id },
      order: [['createdAt', 'DESC']],
    });

    res.json(adherenceRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createPatientAdherence, getPatientAdherence };


