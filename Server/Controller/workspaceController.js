const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res) => {
  const workspace = await Workspace.create({
    name: req.body.name,
    members: [req.user]
  });

  res.json(workspace);
};

exports.getWorkspaces = async (req, res) => {
  const workspaces = await Workspace.find({
    members: req.user
  });

  res.json(workspaces);
};
