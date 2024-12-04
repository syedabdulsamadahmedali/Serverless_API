const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');
const createError = require('http-errors');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {

        const reqBody = req.body;

        if (!reqBody || !reqBody.sentence) {
            throw createError(400, 'Please pass a sentence in the request body');
        }

        const endpoint = process.env.LANGUAGE_ENDPOINT;
        const apiKey = process.env.LANGUAGE_KEY;
        const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

        const documents = [reqBody.sentence];
        const [result] = await client.analyzeSentiment(documents);

        const response = {
            document_sentiment: result.sentiment,
            confidence_scores: {
                positive: result.confidenceScores.positive,
                neutral: result.confidenceScores.neutral,
                negative: result.confidenceScores.negative
            },
            sentences: result.sentences.map((sentence, idx) => ({
                sentence_number: idx + 1,
                sentiment: sentence.sentiment,
                confidence_scores: {
                    positive: sentence.confidenceScores.positive,
                    neutral: sentence.confidenceScores.neutral,
                    negative: sentence.confidenceScores.negative
                }
            }))
        };

        context.res = {
            body: response,
            status: 200
        };

    } catch (error) {
        context.log.error('Error processing request:', error);
        context.res = {
            body: error.message,
            status: error.status || 500
        };
    }
};