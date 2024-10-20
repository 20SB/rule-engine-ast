<body>

<h1>Rule Engine Backend Design</h1>

<h2>High-Level Design (HLD)</h2>

<h3>1. System Overview:</h3>
<p>The backend of the <strong>Rule Engine</strong> is built using <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>. It offers the following main functionalities:</p>
<ul>
    <li>Create a rule and store it as an Abstract Syntax Tree (AST) in MongoDB.</li>
    <li>Combine multiple rules into a single AST and store the combined rule.</li>
    <li>Evaluate rules against user data to determine if a user meets the rule criteria.</li>
    <li>Retrieve all stored rules from MongoDB.</li>
</ul>

<h3>2. Key Components:</h3>
<ul>
    <li><strong>API Layer (Express):</strong>
        <ul>
            <li>Provides RESTful API endpoints for interacting with the backend (e.g., creating, combining, evaluating rules).</li>
            <li>APIs are exposed via HTTP and handle request processing, invoking business logic, and returning JSON responses.</li>
        </ul>
    </li>
    <li><strong>Rule Engine (AST Processing):</strong>
        <ul>
            <li>The core logic for converting rule strings into ASTs, combining rules, and evaluating them.</li>
            <li>Processes logic through recursive parsing, building the AST, and evaluating the user data against the AST.</li>
        </ul>
    </li>
    <li><strong>Database Layer (MongoDB):</strong>
        <ul>
            <li>Stores rules and their corresponding ASTs for persistence.</li>
            <li>Utilizes MongoDB to store both individual and combined rules with a Mongoose schema.</li>
        </ul>
    </li>
</ul>

<h3>3. High-Level Component Diagram:</h3>
<pre>
+-----------------------------------------+
|                                         |
|         Client (Frontend)               |
|                                         |
+---------------------+-------------------+
                      |
                      | REST API Calls (HTTP)
                      v
+---------------------+-------------------+
|     API Layer (Express)                  |
|                                         |
|  Endpoints:                             |
|  /api/rules/create                      |
|  /api/rules/combine                     |
|  /api/rules/evaluate                    |
|  /api/rules/all                         |
+---------------------+-------------------+
                      |
                      v
+---------------------+-------------------+
|    Rule Engine (AST Processing)         |
|                                         |
|  - createRule(ruleString)               |
|  - combineRules(ruleStrings)            |
|  - evaluateRule(ast, userData)          |
+---------------------+-------------------+
                      |
                      v
+---------------------+-------------------+
|    Database Layer (MongoDB)             |
|                                         |
|  - Stores ruleString and AST            |
|  - Retrieves rules for evaluation       |
|                                         |
+-----------------------------------------+
</pre>

<h3>4. Data Flow:</h3>
<ol>
    <li><strong>Create Rule:</strong> Client sends a POST request with a rule string to the <code>/api/rules/create</code> endpoint. The rule string is processed into an AST and stored in MongoDB.</li>
    <li><strong>Combine Rules:</strong> Client sends a POST request with multiple rule strings to <code>/api/rules/combine</code>. The Rule Engine combines them into one AST and stores it in MongoDB.</li>
    <li><strong>Evaluate Rule:</strong> Client sends a POST request with the AST and user data to <code>/api/rules/evaluate</code>. The Rule Engine evaluates the data and returns the result.</li>
    <li><strong>Get All Rules:</strong> Client sends a GET request to <code>/api/rules/all</code> to fetch all stored rules from MongoDB.</li>
</ol>

<hr>

<h2>Low-Level Design (LLD)</h2>

<h3>1. API Layer (Express)</h3>
<ul>
    <li><strong>Endpoints:</strong>
        <ul>
            <li><code>POST /api/rules/create</code>: Request: <code>{ "ruleString": "(age > 30 AND department = 'Sales')" }</code>. Response: <code>{ "_id": "123", "ruleString": "(age > 30 AND department = 'Sales')", "ast": { ... } }</code></li>
            <li><code>POST /api/rules/combine</code>: Request: <code>{ "ruleStrings": ["(age > 30 AND department = 'Sales')", "(salary > 50000 OR experience > 5)"] }</code>. Response: <code>{ "_id": "124", "ruleString": "(age > 30 AND ...", "ast": { ... } }</code></li>
            <li><code>POST /api/rules/evaluate</code>: Request: <code>{ "ast": { ... }, "userData": { "age": 35, "department": "Sales", "salary": 60000 } }</code>. Response: <code>{ "result": true }</code></li>
            <li><code>GET /api/rules/all</code>: Response: <code>[ { "_id": "123", "ruleString": "(age > 30 AND department = 'Sales')", "ast": { ... } }, ... ]</code></li>
        </ul>
    </li>
</ul>

<h3>2. Rule Engine (AST Processing)</h3>
<ul>
    <li><strong>Classes/Functions:</strong>
        <ul>
            <li><strong>Node:</strong> Represents each node of the AST.</li>
            <li><strong>RuleEngine:</strong>
                <ul>
                    <li><code>createRule(ruleString)</code>: Converts a rule string into an AST.</li>
                    <li><code>combineRules(ruleStrings)</code>: Combines multiple rule strings into a single AST.</li>
                    <li><code>evaluateRule(ast, userData)</code>: Evaluates the AST with user data and returns a boolean result.</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<pre>
class Node {
  constructor(type, value = null) {
    this.type = type;
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class RuleEngine {
  createRule(ruleString) {
    // Tokenize the rule string, parse it into an AST and return the root node
  }

  combineRules(ruleStrings) {
    // Combine multiple ASTs into one and return the combined AST
  }

  evaluateRule(ast, userData) {
    // Recursively evaluate the AST with userData
    // Returns true/false
  }
}
</pre>

<h3>3. Database Layer (MongoDB)</h3>
<p><strong>Schema (Mongoose Model):</strong></p>

<pre>
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  ruleString: { type: String, required: true },
  ast: { type: Object, required: true }
});

module.exports = mongoose.model('Rule', ruleSchema);
</pre>

<h3>4. Detailed Flow for Each Operation:</h3>
<ol>
    <li><strong>Create Rule:</strong> Client sends a rule string, and the API calls <code>createRule</code> to generate the AST, which is then stored in MongoDB.</li>
    <li><strong>Combine Rules:</strong> The API calls <code>combineRules</code> to combine rule strings into one AST and store it in MongoDB.</li>
    <li><strong>Evaluate Rule:</strong> The API calls <code>evaluateRule</code> to check if the user data satisfies the rule's AST.</li>
    <li><strong>Get All Rules:</strong> API fetches all rules from MongoDB using <code>Rule.find()</code>.</li>
</ol>

<h3>Error Handling:</h3>
<ul>
    <li><strong>Invalid Rule Format:</strong> Return <code>400 Bad Request</code> if the rule string cannot be parsed.</li>
    <li><strong>Database Connectivity Issues:</strong> Return <code>500 Internal Server Error</code> if MongoDB fails to connect or retrieve data.</li>
</ul>

<h2>Conclusion</h2>
<p>The <strong>HLD</strong> provides an overview of the architecture, key components, and data flow, while the <strong>LLD</strong> delves into API structure, AST processing, and MongoDB interaction. This ensures flexibility for rule creation, combination, and evaluation with persistence in MongoDB.</p>

</body>
