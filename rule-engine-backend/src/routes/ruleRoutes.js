const express = require("express");
const { createRule, combineRules, evaluateRule, getAllRules } = require("../controllers/ruleController");
const router = express.Router();

router.post("/create", createRule);
router.post("/combine", combineRules);
router.post("/evaluate", evaluateRule);
router.get("/all", getAllRules);

module.exports = router;
