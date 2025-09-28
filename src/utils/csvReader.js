/**
 * Utility functions for reading and parsing CSV data
 */

/**
 * Parse CSV string into array of objects
 * @param {string} csvText - CSV content as string
 * @returns {Array} Array of objects with keys from header row
 */
export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(header => header.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    const row = {};
    
    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Convert numeric values
      if (!isNaN(value) && value !== '') {
        value = Number(value);
      }
      
      // Handle boolean values
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      row[header] = value;
    });
    
    data.push(row);
  }
  
  return data;
};

/**
 * Fetch and parse CSV file
 * @param {string} filePath - Path to CSV file
 * @returns {Promise<Array>} Parsed CSV data
 */
export const fetchCSVData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error(`Error fetching CSV data from ${filePath}:`, error);
    return [];
  }
};

/**
 * Parse steps string (semicolon separated) into array
 * @param {string} stepsString - Semicolon separated steps
 * @returns {Array} Array of steps
 */
export const parseSteps = (stepsString) => {
  if (!stepsString) return [];
  return stepsString.split(';').map(step => step.trim()).filter(step => step.length > 0);
};

/**
 * Process spending patterns data
 * @param {Array} spendingData - Raw spending data from CSV
 * @returns {Object} Processed spending patterns
 */
const processSpendingPatterns = (spendingData) => {
  const monthly = [];
  const categories = [];
  
  spendingData.forEach(item => {
    if (item.type === 'monthly') {
      monthly.push({
        month: item.month,
        amount: item.amount
      });
    } else if (item.type === 'category') {
      categories.push({
        name: item.name,
        amount: item.amount,
        color: item.color
      });
    }
  });
  
  return { monthly, categories };
};

/**
 * Load all credit score related CSV data
 * @returns {Promise<Object>} Object containing all parsed CSV data
 */
export const loadCreditScoreData = async () => {
  try {
    const [
      scoreData,
      scoreFactors,
      trendData,
      recommendations,
      behaviorData,
      goals,
      achievements,
      spendingPatternsData
    ] = await Promise.all([
      fetchCSVData('/credit_score_data.csv'),
      fetchCSVData('/score_factors.csv'),
      fetchCSVData('/score_trends.csv'),
      fetchCSVData('/credit_recommendations.csv'),
      fetchCSVData('/credit_behavior.csv'),
      fetchCSVData('/credit_goals.csv'),
      fetchCSVData('/credit_achievements.csv'),
      fetchCSVData('/spending_patterns.csv')
    ]);

    // Process recommendations to parse steps
    const processedRecommendations = recommendations.map(rec => ({
      ...rec,
      steps: parseSteps(rec.steps)
    }));

    // Process spending patterns
    const spendingPatterns = processSpendingPatterns(spendingPatternsData);

    return {
      scoreData: scoreData[0] || {}, // First row of score data
      scoreFactors,
      trendData,
      recommendations: processedRecommendations,
      behaviorData,
      goals,
      achievements,
      spendingPatterns
    };
  } catch (error) {
    console.error('Error loading credit score data:', error);
    return {
      scoreData: {},
      scoreFactors: [],
      trendData: [],
      recommendations: [],
      behaviorData: [],
      goals: [],
      achievements: [],
      spendingPatterns: { monthly: [], categories: [] }
    };
  }
};
