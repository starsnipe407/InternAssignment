# 🚀 Startup Idea Evaluator

A React Native mobile application that allows users to submit, evaluate, and vote on startup ideas. Built with Expo and powered by a Node.js backend with AI-powered ratings.

## 📱 Features

### Core
- **Idea Submission:** Submit startup ideas with name, tagline, and description
- **Voting System:** Upvote/downvote ideas with toggle functionality
- **AI Rating:** Automatic rating generation for each idea (0-100 scale)
- **Leaderboard:** Top ideas displayed with podium visualization
- **Sorting:** Sort by newest, most voted, or highest rated
- **Real-time Updates:** Live vote counts and instant feedback

### UI/UX
- **Vector Icons:** Professional icons using Expo Vector Icons
- **Pull-to-refresh:** Refresh data on all screens
- **Loading States:** Proper loading indicators
- **Responsive Design:** Modern, clean interface with smooth animations
- **Vote Tracking:** Persistent vote memory using AsyncStorage
- **Interactive Podium:** Visual trophy/medal system for top 3 ideas

## 🛠 Tech Stack

- **Frontend:** React Native (Expo), React Navigation, AsyncStorage, Expo Vector Icons, FlatList
- **Backend:** Node.js, Express.js, CORS, In-memory storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (optional)

### Installation & Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/starsnipe407/InternAssignment.git
    cd InternAssignment
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
    This starts both the backend and Expo development servers.

    **Or run separately:**
    ```bash
    # Terminal 1 - Backend
    npm run server

    # Terminal 2 - Expo app
    npm start
    ```

5. **Run the app**
    - **iOS Simulator:** Press `i` in the terminal
    - **Android Emulator:** Press `a`
    - **Physical Device:** Scan QR code with Expo Go
    - **Web Browser:** Press `w`

> **Note:** For physical devices, update the API base URL in `utils/api.js` to your machine's IP.

## 📁 Project Structure

```
StartupEvaluatorApp/
├── App.js
├── components/
│   └── IdeaCard.js
├── screens/
│   ├── SubmissionScreen.js
│   ├── ListingScreen.js
│   └── LeaderboardScreen.js
├── utils/
│   └── api.js
├── server/
│   ├── index.js
│   └── package.json
├── assets/
└── package.json
```

## 🔧 API Endpoints

- `GET /ideas` - Fetch all ideas
- `POST /ideas` - Submit a new idea
- `PUT /ideas/:id/vote` - Upvote an idea
- `PUT /ideas/:id/downvote` - Remove vote
- `GET /leaderboard` - Get top 5 ideas

## 🎨 UI Components

- **Voting System:** Blue (Upvote), Red (Remove vote), Gray (Processing)
- **Leaderboard Podium:** 🏆 Gold (1st), 🥈 Silver (2nd), 🥉 Bronze (3rd)

## 🎮 How to Use

1. **Submit Ideas:** Use the "Submit" tab to add your startup idea
2. **Browse Ideas:** View all submitted ideas in the "Ideas" tab
3. **Vote:** Tap the blue "Upvote" button to support an idea
4. **Change Vote:** Tap the red "Remove Vote" button to withdraw your vote
5. **Leaderboard:** Check the "Leaderboard" tab to see top ideas
6. **Sort & Filter:** Use sorting options to find ideas by newest, most voted, or highest rated

## 🚧 Future Enhancements

- User authentication & profiles
- Categories for ideas
- Comments system
- Push notifications
- Database integration (MongoDB/PostgreSQL)
- Advanced AI evaluation
- Social sharing features
- Dark mode
- Image uploads for ideas
- Search/filter functionality
- Export ideas to PDF

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

**Built with ❤️ using React Native and Node.js**
