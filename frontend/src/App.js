import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RuleForm from "./components/RuleForm";
import RuleEvaluator from "./components/RuleEvaluator";
import CombineRules from "./components/CombineRules";

const App = () => {
    return (
        <Router>
            <div>
                <h1>Rule Engine</h1>

                {/* Navigation Links */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Create Rule</Link>
                        </li>
                        <li>
                            <Link to="/combine">Combine Rules</Link>
                        </li>
                        <li>
                            <Link to="/evaluate">Evaluate Rule</Link>
                        </li>
                    </ul>
                </nav>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<RuleForm />} />
                    <Route path="/combine" element={<CombineRules />} />
                    <Route path="/evaluate" element={<RuleEvaluator />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
