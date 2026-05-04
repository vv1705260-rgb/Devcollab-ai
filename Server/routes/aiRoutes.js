const router = require('express').Router();
const { suggestTasks, chatAI } = require('../controllers/aiController');

router.post('/suggest', suggestTasks);
router.post('/chat', chatAI);

module.exports = router;
