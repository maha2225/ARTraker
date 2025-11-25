const { User, Counselor, AdherenceRecord } = require('../models');
const bcrypt = require('bcrypt');
const { get } = require('../routes');

const createUser = async (req, res) => {
  try {
    const { name, phone, gender, age } = req.body;

    if (req.user.role !== 'counselor') {
      return res.status(403).json({ message: 'Only counselors can register patients' });
    }
    const newUser = await User.create({
      name,
      phone,
      gender,
      age,
      counselorId: req.user.id // Associate patient with the logged-in counselor
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let patients;
    if (req.user.role === 'counselor') {
      patients = await User.findAll({ where: { counselorId: req.user.id } });
    } else if (req.user.role === 'admin') {
      
      patients = await User.findAll({
        include: [{ model: Counselor, attributes: ['id', 'name'] }],
      });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }


    res.json(patients);
  }
     catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user including related counselor and adherence records
    const patient = await User.findByPk(id, {
      include: [
        { model: Counselor, attributes: ['id', 'name'] },
        { model: AdherenceRecord } // include all adherence records
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById };


