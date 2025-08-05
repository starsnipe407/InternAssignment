const API_BASE_URL = 'http://192.168.166.44:3000';

export const api = {
  // Get all ideas
  getAllIdeas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas`);
      if (!response.ok) throw new Error('Failed to fetch ideas');
      return await response.json();
    } catch (error) {
      console.error('Error fetching ideas:', error);
      throw error;
    }
  },

  // Submit a new idea
  submitIdea: async (ideaData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaData),
      });
      if (!response.ok) throw new Error('Failed to submit idea');
      return await response.json();
    } catch (error) {
      console.error('Error submitting idea:', error);
      throw error;
    }
  },

  // Vote for an idea
  voteForIdea: async (ideaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/vote`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to vote for idea');
      return await response.json();
    } catch (error) {
      console.error('Error voting for idea:', error);
      throw error;
    }
  },

  // Downvote an idea (remove vote)
  downvoteIdea: async (ideaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/downvote`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to downvote idea');
      return await response.json();
    } catch (error) {
      console.error('Error downvoting idea:', error);
      throw error;
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return await response.json();
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },
};