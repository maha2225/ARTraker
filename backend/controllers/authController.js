const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Counselor } = require('../models');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Counselor.findOne({ where: { email } });
    let role = null;

    if (user) {
      role = user.role; 
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Sign JWT with detected role
    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role } });
  } catch (err) {
    console.log("THE ERROR ID", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { login };
