'use strict';
// const mongoose = require('mongoose');
// const Book = mongoose.model('Books');

exports.getBooks = async (req, res) => {
  try {
    const users = await User.find( {} , '_id name email last_name age telefon img role ');
    if (users) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error loading users'
      });
    }
    return res.status(200).json({
        ok: true,
        users: users,
    });
  } catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
};
