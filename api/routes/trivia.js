// Import required dependencies
const router = require('express').Router();
const axios = require('axios');
// Define a route to fetch trivia data from the Trivia API
router.get('/', async (req, res) => {
  try {
    // Make a GET request to the Trivia API
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 1, // Number of questions to retrieve
        type: 'multiple' // Type of questions to retrieve (e.g. multiple choice)
      }
    });

    // Extract the trivia data from the API response
    const triviaData = response.data.results;

    // Send the extracted data as the response
    res.json(triviaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
