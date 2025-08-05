# 🚀 Startup Idea Evaluator

A React Native mobile application that allows users to submit, evaluate, and vote on startup ideas. Built with Expo and powered by a Node.js backend with AI-powered ratings.

## 📱 Features

### Core Features
- ✅ **Idea Submission** - Submit startup ideas with name, tagline, and description
- ✅ **Voting System** - Upvote/downvote ideas with toggle functionality
- ✅ **AI Rating** - Automatic rating generation for each idea (0-100 scale)
- ✅ **Leaderboard** - Top ideas displayed with podium visualization
- ✅ **Sorting** - Sort by newest, most voted, or highest rated
- ✅ **Real-time Updates** - Live vote counts and instant feedback

### UI/UX Features
- ✅ **Vector Icons** - Professional icons using Expo Vector Icons
- ✅ **Pull-to-refresh** - Refresh data on all screens
- ✅ **Loading states** - Proper loading indicators
- ✅ **Responsive Design** - Modern, clean interface with smooth animations
- ✅ **Vote Tracking** - Persistent vote memory using AsyncStorage
- ✅ **Interactive Podium** - Visual trophy/medal system for top 3 ideas

## 🛠 Tech Stack

### Frontend (React Native)
- **React Native** with **Expo** - Cross-platform mobile development
- **React Navigation** - Navigation and routing
- **AsyncStorage** - Local storage for vote tracking
- **Expo Vector Icons** - Professional iconography
- **FlatList** - Efficient list rendering

### Backend (Node.js)
- **Express.js** - Web server framework
- **CORS** - Cross-origin resource sharing
- **In-memory storage** - Simple data persistence (for demo purposes)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/startup-idea-evaluator.git
   cd startup-idea-evaluator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   This will start both the backend server and Expo development server.

   **OR run separately:**
   ```bash
   # Terminal 1 - Start backend server
   npm run server
   
   # Terminal 2 - Start Expo app
   npm start
   ```

5. **Run the app**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app
   - **Web Browser**: Press `w` in the terminal

## 📁 Project Structure

```
StartupEvaluatorApp/
├── App.js                 # Main app component with navigation
├── components/
│   └── IdeaCard.js        # Reusable idea card component
├── screens/
│   ├── SubmissionScreen.js   # Submit new ideas
│   ├── ListingScreen.js      # Browse all ideas
│   └── LeaderboardScreen.js  # Top ideas podium
├── utils/
│   └── api.js             # API client functions
├── server/
│   ├── index.js           # Express server
│   └── package.json       # Server dependencies
├── assets/                # Images and icons
└── package.json          # App dependencies
```

## 🎮 How to Use

1. **Submit Ideas**: Use the "Submit" tab to add your startup idea
2. **Browse Ideas**: View all submitted ideas in the "Ideas" tab
3. **Vote**: Tap the blue "Upvote" button to support an idea
4. **Change Vote**: Tap the red "Remove Vote" button to withdraw your vote
5. **Leaderboard**: Check the "Leaderboard" tab to see top-performing ideas
6. **Sort & Filter**: Use sorting options to find ideas by newest, most voted, or highest rated

## 🔧 API Endpoints

- `GET /ideas` - Fetch all ideas
- `POST /ideas` - Submit a new idea
- `PUT /ideas/:id/vote` - Upvote an idea
- `PUT /ideas/:id/downvote` - Remove vote from an idea
- `GET /leaderboard` - Get top 5 ideas

## 🎨 UI Components

### Voting System
- **Blue Button + ↑**: Upvote (not voted yet)
- **Red Button + ↓**: Remove vote (already voted)
- **Gray Button**: Processing state

### Leaderboard Podium
- **🏆 Gold Trophy**: 1st place
- **🥈 Silver Medal**: 2nd place  
- **🥉 Bronze Medal**: 3rd place

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Categories for ideas
- [ ] Comments system
- [ ] Push notifications
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Advanced AI evaluation
- [ ] Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ for the startup community

---

**⭐ If you found this project helpful, please give it a star on GitHub!**
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (optional, for testing on device)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd StartupEvaluatorApp/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the main app directory:
   ```bash
   cd StartupEvaluatorApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Run the app:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app
   - **Web Browser**: Press `w` in the terminal

### Important Notes
- Make sure the backend server is running before starting the mobile app
- The app is configured to connect to `localhost:3000` - ensure this matches your server configuration
- For testing on a physical device, you may need to update the API_BASE_URL in `utils/api.js` to use your computer's IP address instead of localhost

## 📁 Project Structure

```
StartupEvaluatorApp/
├── components/
│   └── IdeaCard.js          # Reusable card component for displaying ideas
├── screens/
│   ├── SubmissionScreen.js  # Form for submitting new ideas
│   ├── ListingScreen.js     # List of all ideas with sorting
│   └── LeaderboardScreen.js # Top 5 ideas with podium
├── utils/
│   └── api.js              # API utility functions
├── server/
│   ├── index.js            # Express server with API endpoints
│   └── package.json        # Server dependencies
├── App.js                  # Main app component with navigation
├── package.json            # App dependencies
└── README.md              # This file
```

## 🔧 API Endpoints

### Backend API (http://localhost:3000)

- `GET /ideas` - Fetch all submitted ideas
- `POST /ideas` - Submit a new idea
- `PUT /ideas/:id/vote` - Vote for a specific idea
- `GET /leaderboard` - Get top 5 ideas by votes

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface with proper spacing and typography
- **Intuitive Navigation** - Bottom tab navigation with clear icons
- **Visual Feedback** - Loading states, success messages, and error handling
- **Responsive Layout** - Works well on different screen sizes
- **Accessibility** - Proper contrast ratios and readable fonts
- **Smooth Animations** - Subtle animations for better user experience

## 🔮 Future Enhancements

Potential features that could be added:
- User authentication and profiles
- Categories for different types of startups
- Detailed analytics for idea performance
- Comments and discussions on ideas
- Push notifications for new votes
- Dark mode theme
- Toast notifications
- Image uploads for ideas
- Search and filter functionality
- Export ideas to PDF

## 📱 Screenshots

The app includes three main screens:
1. **Submit** - Clean form for idea submission
2. **Ideas** - Comprehensive list with sorting options
3. **Leaderboard** - Visual podium display of top ideas

## 🤝 Contributing

This is a demo project built for evaluation purposes. The codebase is well-structured and documented for easy understanding and potential expansion.

## 📄 License

This project is for demonstration purposes only.

---

**Built with ❤️ using React Native and Node.js**