const Node = require("./Node");
const { tokenize } = require("../utils/tokenizer");

class RuleEngine {
    createRule(ruleString) {
        const tokens = tokenize(ruleString);
        let position = 0;

        const parseExpression = () => {
            let node = parseTerm();
            while (tokens[position] === "AND" || tokens[position] === "OR") {
                const operator = tokens[position++];
                const rightNode = parseTerm();
                const operatorNode = new Node("operator", operator);
                operatorNode.left = node;
                operatorNode.right = rightNode;
                node = operatorNode;
            }
            return node;
        };

        const parseTerm = () => {
            if (tokens[position] === "(") {
                position++;
                const node = parseExpression();
                position++;
                return node;
            }
            const condition =
                tokens[position++] + " " + tokens[position++] + " " + tokens[position++];
            return new Node("operand", condition);
        };

        return parseExpression();
    }

    combineRules(rules) {
        const asts = rules.map((rule) => this.createRule(rule)); // Parse each rule string to AST

        // Track frequency of AND/OR operators
        let andCount = 0;
        let orCount = 0;

        rules.forEach((rule) => {
            const tokens = rule.split(" ");
            tokens.forEach((token) => {
                if (token === "AND") andCount++;
                if (token === "OR") orCount++;
            });
        });

        // Determine the most frequent operator for combining
        const rootOperator = andCount > orCount ? "AND" : "OR";

        // Start combining ASTs
        let combinedAST = asts[0]; // Initialize with the first AST

        for (let i = 1; i < asts.length; i++) {
            const nextAST = asts[i];

            // Create an operator node using the most frequent operator
            const operatorNode = new Node("operator", rootOperator);
            operatorNode.left = combinedAST;
            operatorNode.right = nextAST;
            combinedAST = operatorNode;
        }

        return combinedAST; // Return the combined root node of the AST
    }

    evaluateRule(ast, data) {
        if (ast.type === "operand") {
            const [attribute, operator, value] = ast.value.split(" ");
            // Remove quotes from string values (like 'Sales' becomes Sales)
            const parsedValue = isNaN(value) ? value.replace(/['"]+/g, "") : parseFloat(value);

            console.log(
                `Evaluating: ${attribute} ${operator} ${parsedValue} with data[${attribute}] = ${data[attribute]}`
            );

            switch (operator) {
                case ">":
                    return data[attribute] > parsedValue;
                case "<":
                    return data[attribute] < parsedValue;
                case "=":
                    return data[attribute] == parsedValue;
                default:
                    throw new Error(`Unsupported operator: ${operator}`);
            }
        }

        if (ast.type === "operator") {
            if (ast.value === "AND") {
                return this.evaluateRule(ast.left, data) && this.evaluateRule(ast.right, data);
            } else if (ast.value === "OR") {
                return this.evaluateRule(ast.left, data) || this.evaluateRule(ast.right, data);
            }
        }

        throw new Error(`Unknown node type: ${ast.type}`);
    }
}

module.exports = RuleEngine;
