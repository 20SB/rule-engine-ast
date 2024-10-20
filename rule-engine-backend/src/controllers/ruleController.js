const Rule = require("../models/Rule");
const RuleEngine = require("../ast/RuleEngine");

const ruleEngine = new RuleEngine();

// Create Rule API
exports.createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;
        const ast = ruleEngine.createRule(ruleString);
        const newRule = new Rule({ ruleString, ast });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Combine Rules API
exports.combineRules = (req, res) => {
    try {
        const { ruleStrings } = req.body;
        const combinedAST = ruleEngine.combineRules(ruleStrings);
        res.status(200).json({ combinedAST });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Evaluate Rule API
exports.evaluateRule = (req, res) => {
    try {
        const { ast, userData } = req.body;
        const result = ruleEngine.evaluateRule(ast, userData);
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
