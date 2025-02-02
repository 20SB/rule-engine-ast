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

// Combine Rules API (Modified to store combined rule)
exports.combineRules = async (req, res) => {
    try {
        const { ruleStrings } = req.body;

        // Combine the rule strings into a single AST
        const combinedAST = ruleEngine.combineRules(ruleStrings);

        // Analyze operator frequency to dynamically build the combined rule string
        let andCount = 0;
        let orCount = 0;

        ruleStrings.forEach((rule) => {
            const tokens = rule.split(" ");
            tokens.forEach((token) => {
                if (token === "AND") andCount++;
                if (token === "OR") orCount++;
            });
        });

        // Choose the most frequent operator for combining the rules
        const mostFrequentOperator = andCount > orCount ? "AND" : "OR";

        // Convert the array of rule strings into a single combined rule string using the most frequent operator
        const combinedRuleString = ruleStrings.join(` ${mostFrequentOperator} `);

        // Store the combined rule in the database
        const combinedRule = new Rule({
            ruleString: combinedRuleString,
            ast: combinedAST,
        });
        await combinedRule.save();

        // Return the saved combined rule and AST
        res.status(201).json(combinedRule);
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

// Get All Rules API (New)
exports.getAllRules = async (req, res) => {
    try {
        const rules = await Rule.find(); // Fetch all rules from the database
        res.status(200).json(rules); // Return the list of rules
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
