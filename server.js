const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON request bodies

let warningCount = 0;
const WARNING_THRESHOLD = 3;

function isRelationshipRelated(text) {
    const keywords = ["relationship", "love", "partner", "friend", "family", "communication",
                      "conflict", "feeling", "connected", "expectations", "breakup", "dating",
                      "marriage", "intimacy", "trust", "jealousy", "insecurity", "forgiveness",
                      "support", "attachment", "co-parenting", "infidelity"];
    text = text.toLowerCase();
    for (const keyword of keywords) {
        if (text.includes(keyword)) {
            return true;
        }
    }
    return false;
}

function handleRelationshipQuery(query) {
    return `Thank you for sharing. We are processing your relationship inquiry: '${query}'`;
    // In the future, this function will generate charts based on the query.
}

app.post('/api/query', (req, res) => {
    const userQuery = req.body.query;
    if (isRelationshipRelated(userQuery)) {
        const response = handleRelationshipQuery(userQuery);
        warningCount = 0; // Reset warnings
        res.json({ response, showDashboard: false });
    } else {
        warningCount++;
        let response = "⚠️ This bot only handles relationship matters. Please focus your inquiries accordingly, or the session will be ended.";
        let showDashboard = false;
        if (warningCount >= WARNING_THRESHOLD) {
            response = "You have exceeded the warning limit. The session is now ending.";
            showDashboard = true;
            warningCount = 0; // Reset warning count after ending
        }
        res.json({ response, showDashboard });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
