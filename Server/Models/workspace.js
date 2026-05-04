const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Workspace', workspaceSchema);
