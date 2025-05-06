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
                      "support", "attachment", "co-parenting", "infidelity", "quote"]; // Added "quote" as a keyword
    text = text.toLowerCase();
    for (const keyword of keywords) {
        if (text.includes(keyword)) {
            return true;
        }
    }
    return false;
}

function handleRelationshipQuery(query) {
    const encouragingMessages = [
        "It takes courage to explore matters of the heart. You're on the right path.",
        "Every relationship has its ups and downs. Keep nurturing the connection.",
        "Understanding and communication are key. You're thinking about important things.",
        "Relationships thrive on effort and care. Your thoughtfulness is valuable.",
        "Remember to be kind to yourself and your partner as you navigate this.",
        "Reflecting on relationship quotes can offer valuable insights. Keep exploring!",
        "Every quote holds a lesson. Consider how it applies to your situation.",
        "In the realm of relationships, understanding is a continuous journey.",
        "Quotes can inspire reflection and growth in our connections with others.",
        "Take the time to truly understand the message behind the quote."
    ];
    const randomIndex = Math.floor(Math.random() * encouragingMessages.length);
    return encouragingMessages[randomIndex];
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
