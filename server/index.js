const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let ideas = []; // In-memory database
let currentId = 1;

// Get all ideas
app.get('/ideas', (req, res) => {
  res.json(ideas);
});

// Submit a new idea
app.post('/ideas', (req, res) => {
  const { name, tagline, description } = req.body;
  
  if (!name || !tagline || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const newIdea = {
    id: currentId++,
    name,
    tagline,
    description,
    rating: Math.floor(Math.random() * 101), // Fake AI rating
    votes: 0,
    createdAt: new Date().toISOString(),
  };
  ideas.push(newIdea);
  res.status(201).json(newIdea);
});

// Upvote an idea
app.put('/ideas/:id/vote', (req, res) => {
  const ideaId = parseInt(req.params.id, 10);
  const idea = ideas.find(i => i.id === ideaId);
  if (idea) {
    idea.votes++;
    res.json(idea);
  } else {
    res.status(404).json({ error: 'Idea not found' });
  }
});

// Downvote an idea (remove vote)
app.put('/ideas/:id/downvote', (req, res) => {
  const ideaId = parseInt(req.params.id, 10);
  const idea = ideas.find(i => i.id === ideaId);
  if (idea) {
    idea.votes = Math.max(0, idea.votes - 1); // Ensure votes don't go below 0
    res.json(idea);
  } else {
    res.status(404).json({ error: 'Idea not found' });
  }
});

// Get leaderboard (top 5 ideas by votes)
app.get('/leaderboard', (req, res) => {
  const topIdeas = [...ideas]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);
  res.json(topIdeas);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock API server listening on port ${PORT}`);
});