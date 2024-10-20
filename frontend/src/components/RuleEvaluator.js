import React, { useEffect, useState } from "react";
import axios from "axios";

const RuleEvaluator = () => {
    const [rules, setRules] = useState([]); // Store all fetched rules
    const [userData, setUserData] = useState(""); // User data input (JSON format)
    const [ruleAST, setRuleAST] = useState(""); // AST input (JSON format)
    const [result, setResult] = useState(null); // Result of the rule evaluation
    const [error, setError] = useState(""); // Error handling

    // Fetch all rules from the backend on component mount
    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/rules/all");
                setRules(response.data); // Set fetched rules
            } catch (error) {
                setError("Error fetching rules.");
                console.error(error);
            }
        };

        fetchRules();
    }, []);

    // Handle radiokbox selection of rules
    const handleRadioboxChange = (e, rule) => {
        setRuleAST(JSON.stringify(rule.ast, null, 2));
    };

    // Function to handle rule evaluation submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);

        // Parse user data and AST, handle invalid JSON format
        try {
            const parsedUserData = JSON.parse(userData);
            const parsedAST = JSON.parse(ruleAST);

            // Send the user data and rule AST to the backend for evaluation
            const response = await axios.post("http://localhost:5000/api/rules/evaluate", {
                ast: parsedAST,
                userData: parsedUserData,
            });

            
            alert("Evaluation successful and result is: " + response.data.result);
            // Set the result of the evaluation
            setResult(response.data.result);
        } catch (err) {
            setError("Invalid JSON format in user data or rule AST.");
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Evaluate Rule</h2>
            {/* List all rules with checkboxes */}
            {rules.length > 0 ? (
                <div>
                    {rules.map((rule) => (
                        <div key={rule._id}>
                            <input
                                type="radio"
                                name="rule"
                                onChange={(e) => handleRadioboxChange(e, rule)}
                            />
                            {rule.ruleString}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading rules...</p>
            )}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    {/* Rule AST input */}
                    <textarea
                        rows="20"
                        value={ruleAST}
                        onChange={(e) => setRuleAST(e.target.value)}
                        placeholder="Enter AST of the rule (in JSON format)"
                        required
                        style={{ flexGrow: 1 }}
                    />

                    {/* User Data input */}
                    <textarea
                        rows="20"
                        value={userData}
                        onChange={(e) => setUserData(e.target.value)}
                        placeholder='Enter user data (e.g., {"age": 35, "department": "Sales", "salary": 60000})'
                        required
                        style={{ flexGrow: 1 }}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Evaluate Rule</button>
            </form>

            {/* Error Handling */}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {/* Display Result */}
            {result !== null && (
                <div>
                    <h3>Result: {result ? "True" : "False"}</h3>
                </div>
            )}
        </div>
    );
};

export default RuleEvaluator;
