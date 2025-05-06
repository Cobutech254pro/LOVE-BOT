const express = require('express');
const path = require('path');
const OpenAI = require('openai'); // Import the OpenAI library

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI with your API key
const openai = new OpenAI({ apiKey: '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' });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let warningCount = 0;
const WARNING_THRESHOLD = 3;

function isRelationshipRelated(text) {
    if (!text || typeof text !== 'string') {
        return false;
    }
    const trimmedText = text.toLowerCase().trim();
    if (!trimmedText) {
        return false;
    }

    const keywords = ["relationship", "love", "partner", "friend", "family", "communication",
                      "conflict", "feeling", "connected", "expectations", "breakup", "dating",
                      "marriage", "intimacy", "trust", "jealousy", "insecurity", "forgiveness",
                      "support", "attachment", "co-parenting", "infidelity", "quote"];

    const relatedPhrases = [
        "about my relationship",
        "in my relationship",
        "my partner",
        "my friend",
        "my family",
        "communication issues",
        "dealing with conflict",
        "feeling disconnected",
        "relationship advice",
        "a relationship quote",
        "love quote",
        "marriage advice",
        "dating tips",
        "breakup advice",
        "how to connect with",
        "problems with my",
        "advice on my",
        "thoughts on relationships",
        "exploring my feelings about",
        "navigating expectations in"
    ];

    for (const keyword of keywords) {
        if (trimmedText.includes(keyword)) {
            return true;
        }
    }

    for (const phrase of relatedPhrases) {
        if (trimmedText.includes(phrase)) {
            return true;
        }
    }

    return false;
}

async function handleRelationshipQuery(query) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // You can experiment with other models like "gpt-4"
            messages: [
                { role: "system", content: "You are a helpful and empathetic relationship advisor. Please provide thoughtful and encouraging responses to the user's input." },
                { role: "user", content: query },
            ],
        });

        if (completion.choices && completion.choices.length > 0) {
            return completion.choices[0].message.content;
        } else {
            return "I'm sorry, I couldn't generate a helpful response at this time.";
        }
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        return "There was an error communicating with the AI. Please try again later.";
    }
}

app.post('/api/query', async (req, res) => { // Make the route handler async
    const userQuery = req.body.query;
    if (isRelationshipRelated(userQuery)) {
        const response = await handleRelationshipQuery(userQuery); // Await the AI's response
        warningCount = 0;
        res.json({ response, showDashboard: false });
    } else {
        warningCount++;
        let response = "⚠️ This bot only handles relationship matters. Please focus your inquiries accordingly, or the session will be ended.";
        let showDashboard = false;
        if (warningCount >= WARNING_THRESHOLD) {
            response = "You have exceeded the warning limit. The session is now ending.";
            showDashboard = true;
            warningCount = 0;
        }
        res.json({ response, showDashboard });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
