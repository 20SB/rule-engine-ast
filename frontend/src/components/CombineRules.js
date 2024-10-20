import React, { useState, useEffect } from "react";
import axios from "axios";

const CombineRules = () => {
    const [rules, setRules] = useState([]); // Store all fetched rules
    const [selectedRules, setSelectedRules] = useState([]); // Store selected rules
    const [combinedAst, setCombinedAst] = useState(""); // Store combined AST
    const [error, setError] = useState(""); // Handle errors

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

    // Handle checkbox selection of rules
    const handleCheckboxChange = (e, ruleString) => {
        if (e.target.checked) {
            // Add rule to selectedRules
            setSelectedRules([...selectedRules, ruleString]);
        } else {
            // Remove rule from selectedRules
            setSelectedRules(selectedRules.filter((rule) => rule !== ruleString));
        }
    };

    // Handle combining rules
    const handleCombineRules = async () => {
        if (selectedRules.length < 2) {
            setError("Please select at least two rules to combine.");
            return;
        }

        try {
            // Send the selected rules to the backend for combination
            const response = await axios.post("http://localhost:5000/api/rules/combine", {
                ruleStrings: selectedRules,
            });

            alert("Rules combined successfully!");
            // Display the combined AST
            setCombinedAst(JSON.stringify(response.data.ast, null, 2)); // Pretty print AST
            setError(""); // Clear any errors
        } catch (error) {
            setError("Error combining rules.");
            console.error(error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
            <div style={{ flex: 1, paddingRight: "20px" }}>
                <h2>Select Rules to Combine</h2>

                {/* Error Display */}
                {error && <div style={{ color: "red" }}>{error}</div>}

                {/* List all rules with checkboxes */}
                {rules.length > 0 ? (
                    <ul>
                        {rules.map((rule) => (
                            <li key={rule._id}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, rule.ruleString)}
                                />
                                {rule.ruleString}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading rules...</p>
                )}

                {/* Combine Rules Button */}
                <button onClick={handleCombineRules} style={{ marginTop: "20px" }}>
                    Combine Selected Rules
                </button>
            </div>

            {/* Textarea to display the combined AST */}
            <div style={{ flex: 1 }}>
                <h2>Combined Rule AST</h2>
                <textarea
                    rows="20"
                    value={combinedAst}
                    placeholder="Output: Combined AST of the selected rules (in JSON format)"
                    style={{ flexGrow: 1, width: "100%" }}
                    disabled
                />
            </div>
        </div>
    );
};

export default CombineRules;
