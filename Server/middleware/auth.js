// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../Model/urlModel.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: 'User not found' });

    req.user = user; // this fixes the undefined issue
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
