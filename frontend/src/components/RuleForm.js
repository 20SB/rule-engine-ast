import React, { useState } from "react";
import axios from "axios";

const RuleForm = () => {
    const [rule, setRule] = useState("");
    const [ruleAst, setRuleAst] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/rules/create", {
                ruleString: rule,
            });
            alert("Rule created successfully!");
            setRuleAst(JSON.stringify(response.data.ast, null, 2));
        } catch (error) {
            console.error("Error creating rule:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Create Rule</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    width: "100%",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    {/* Rule AST input */}
                    <textarea
                        type="text"
                        value={rule}
                        onChange={(e) => setRule(e.target.value)}
                        placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
                        rows={10}
                        style={{ flexGrow: 1 }}
                    />

                    {/* User Data input */}
                    <textarea
                        rows="20"
                        value={ruleAst}
                        placeholder="Output: AST of the rule (in JSON format)"
                        style={{ flexGrow: 1 }}
                        disabled
                    />
                </div>
                {/* <textarea
                    type="text"
                    value={rule}
                    onChange={(e) => setRule(e.target.value)}
                    placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
                    rows={10}
                    style={{
                        width: "100%",
                    }}
                /> */}
                <button type="submit">Create Rule</button>
            </form>
        </div>
    );
};

export default RuleForm;
