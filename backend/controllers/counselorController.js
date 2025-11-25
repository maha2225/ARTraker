const { Counselor, User, Prescription } = require('../models');
const bcrypt = require('bcrypt');

const createCounselor = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const counselor = await Counselor.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword
    });

    res.status(201).json(counselor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.findAll({
      where: { role: 'counselor' }  
    });
    res.json(counselors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCounselorById = async (req, res) => {
  try {
    const counselor = await Counselor.findByPk(req.params.id, {
      include: [{ model: User, as: 'patients' }]
    });

    if (!counselor) return res.status(404).json({ message: 'Counselor not found' });

    res.json(counselor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCounselor = async (req, res) => {
  try {
    const counselor = await Counselor.findByPk(req.params.id);
    if (!counselor) return res.status(404).json({ message: 'Counselor not found' });

    const { name, email, phone, role, password } = req.body;

    if (password) {
      counselor.password = await bcrypt.hash(password, 10);
    }

    counselor.name = name || counselor.name;
    counselor.email = email || counselor.email;
    counselor.phone = phone || counselor.phone;
    counselor.role = role || counselor.role;

    await counselor.save();
    res.json(counselor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCounselor = async (req, res) => {
  try {
    const counselor = await Counselor.findByPk(req.params.id);
    if (!counselor) return res.status(404).json({ message: 'Counselor not found' });

    await counselor.destroy();
    res.json({ message: 'Counselor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCounselor,
  getCounselors,
  getCounselorById,
  updateCounselor,
  deleteCounselor,
};
