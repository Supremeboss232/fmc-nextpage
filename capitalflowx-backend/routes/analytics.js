const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: 102, revenue: 13450 });
});

module.exports = router; // ✅ important
