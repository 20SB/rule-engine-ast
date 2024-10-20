<body>

  <h1>Full-Stack Rule Engine Application</h1>

  <h2>Project Overview</h2>
  <p>
    This is a full-stack application for a Rule Engine that allows users to define rules using an Abstract Syntax Tree (AST),
    store these rules, and evaluate them against user data. The project consists of a <strong>React</strong> frontend and a 
    <strong>Node.js</strong> backend with <strong>MongoDB</strong> as the database.
  </p>

  <h2>Technologies Used</h2>
  <ul>
    <li>Frontend: React</li>
    <li>Backend: Node.js, Express</li>
    <li>Database: MongoDB</li>
    <li>Other: Axios, Mongoose, React Router</li>
  </ul>

  <h2>Features</h2>
  <ul>
    <li>Create rules using a user-friendly interface in React.</li>
    <li>Store rules in the database in AST format.</li>
    <li>Evaluate rules based on user data to determine eligibility.</li>
  </ul>

  <h2>Getting Started</h2>
  <h3>1. Clone the Repository</h3>
  <pre>
    <code>
      git clone https://github.com/your-username/rule-engine-app.git
      cd rule-engine-app
    </code>
  </pre>

  <h3>2. Setup the Backend (Node.js)</h3>
  <p>Navigate to the backend folder and install dependencies:</p>
  <pre>
    <code>
      cd rule-engine-backend
      npm install
    </code>
  </pre>

  <h3>3. Set up MongoDB</h3>
  <p>
    Make sure you have MongoDB running locally. You can set up MongoDB locally or use a cloud service like MongoDB Atlas. 
    Once MongoDB is running, configure the connection string in the <code>.env</code> file:
  </p>
  <pre>
    <code>
      MONGO_URI=mongodb://localhost:27017/rule-engine
    </code>
  </pre>

  <h3>4. Start the Backend Server</h3>
  <pre>
    <code>
      npm run start
    </code>
  </pre>
  <p>
    The backend server will start on <strong>http://localhost:5000</strong>.
  </p>

  <h3>5. Setup the Frontend (React)</h3>
  <p>Navigate to the frontend folder and install dependencies:</p>
  <pre>
    <code>
      cd rule-engine-frontend
      npm install
    </code>
  </pre>

  <h3>6. Start the Frontend</h3>
  <pre>
    <code>
      npm start
    </code>
  </pre>
  <p>
    The frontend will be running on <strong>http://localhost:3000</strong>.
  </p>

  <h2>Project Structure</h2>
  <p>The project is structured as follows:</p>
  <pre>
    <code>
    rule-engine-app/
    ├── rule-engine-backend/      # Backend code (Node.js + Express + MongoDB)
    │   ├── src/
    │   │   ├── controllers/      # Controller logic for API endpoints
    │   │   ├── models/           # MongoDB models
    │   │   ├── routes/           # API routes
    │   │   ├── ast/              # AST logic for rule creation and evaluation
    │   │   └── app.js            # Express server setup
    │   └── package.json          # Backend dependencies
    │
    ├── rule-engine-frontend/     # Frontend code (React)
    │   ├── src/
    │   │   ├── components/       # React components (RuleForm, RuleEvaluator)
    │   │   └── App.js            # React app setup
    │   └── package.json          # Frontend dependencies
    └── README.html               # This README file
    </code>
  </pre>

  <h2>API Endpoints</h2>
  <ul>
    <li>
      <strong>POST /api/rules/create</strong> - Creates a new rule.
      <pre>
        <code>
          Request Body:
          {
            "ruleString": "(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')"
          }
          Response:
          {
            "ruleString": "(age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')",
            "ast": { ... },
            "_id": "608d1bc8b85e2c0015dff434"
          }
        </code>
      </pre>
    </li>
    <li>
      <strong>POST /api/rules/evaluate</strong> - Evaluates a rule based on user data.
      <pre>
        <code>
          Request Body:
          {
            "ast": { ... },  // AST from the rule creation
            "userData": { "age": 35, "department": "Sales", "salary": 60000 }
          }
          Response:
          {
            "result": true
          }
        </code>
      </pre>
    </li>
  </ul>

  <h2>Frontend Usage</h2>
  <h3>1. Create Rule</h3>
  <p>
    Navigate to the <strong>Home Page</strong> (Create Rule) at <code>http://localhost:3000</code> and enter a rule string
    (e.g., <code>(age > 30 AND department = 'Sales')</code>) in the form. After submitting the rule, you will see a success
    message if the rule was created successfully.
  </p>

  <h3>2. Evaluate Rule</h3>
  <p>
    Navigate to the <strong>Evaluate Rule</strong> page by clicking on the "Evaluate Rule" link. Copy the AST from the 
    backend (or use the example in this README) and provide user data in JSON format (e.g., <code>{"age": 35, "department": "Sales"}</code>).
    Submit the form to evaluate the rule. The result (True/False) will be displayed below the form.
  </p>

  <h2>Sample Input and Output</h2>
  <h3>Rule Creation</h3>
  <pre>
    <code>
    Input:
    (age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')
    Expected Output:
    Rule created successfully!
    </code>
  </pre>

  <h3>Rule Evaluation</h3>
  <pre>
    <code>
    Input (AST):
    {
      "type": "operator",
      "value": "AND",
      "left": {
        "type": "operator",
        "value": "OR",
        "left": {
          "type": "operator",
          "value": "AND",
          "left": { "type": "operand", "value": "age > 30" },
          "right": { "type": "operand", "value": "department = 'Sales'" }
        },
        "right": {
          "type": "operator",
          "value": "AND",
          "left": { "type": "operand", "value": "age < 25" },
          "right": { "type": "operand", "value": "department = 'Marketing'" }
        }
      },
      "right": {
        "type": "operator",
        "value": "OR",
        "left": { "type": "operand", "value": "salary > 50000" },
        "right": { "type": "operand", "value": "experience > 5" }
      }
    }
    Input (User Data):
    { "age": 35, "department": "Sales", "salary": 60000 }
    Expected Output:
    Result: True
    </code>
  </pre>
  <h2>Contact</h2>
  <p>If you have any questions or need further assistance, feel free to contact subhabiswal20@gmail.com.</p>

</body>
