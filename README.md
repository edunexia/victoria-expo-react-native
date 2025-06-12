# Quiz App - React Native Expo

A modern, cross-platform quiz application built with React Native and Expo that can run on both iOS and Android devices.

## Features

- 📱 **Cross-Platform**: Runs on both iOS and Android devices
- 🎯 **Dynamic Quiz System**: Takes JSON question blocks and renders interactive quizzes
- ✅ **Answer Validation**: Ensures all questions are answered before submission
- 📊 **Results Display**: Shows completed quiz results in a beautiful interface
- 🔄 **Restart Functionality**: Allows users to retake the quiz
- 🚀 **API Ready**: Results are formatted and ready to be sent to a backend API
- 🎨 **Modern UI**: Clean, intuitive design following mobile UI best practices

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your phone (for testing on physical devices)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Scan the QR code with your phone's camera or the Expo Go app to run on your device

## Running on Physical Devices

### iOS

- Install the Expo Go app from the App Store
- Scan the QR code from the terminal with your phone's camera
- The app will open in Expo Go

### Android

- Install the Expo Go app from Google Play Store
- Scan the QR code from the terminal using the Expo Go app
- The app will load automatically

## Project Structure

```
QuizApp/
├── components/
│   ├── Quiz.tsx           # Main quiz component
│   ├── QuestionItem.tsx   # Individual question renderer
│   ├── QuizResults.tsx    # Results display component
│   └── index.ts          # Component exports
├── data.ts               # Sample quiz data
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main app component
└── README.md
```

## JSON Structure

The app expects quiz data in the following format:

```json
{
  "id": 6,
  "title": "Money primarily allows me to:",
  "imageUrl": null,
  "description": "Rate each of the following statements in terms of their truth for you (0 = not at all like me; 1 = a little like me; 2 = a lot like me; 3 = exactly like me)",
  "questions": [
    {
      "id": 1,
      "index": 0,
      "text": "Not worry.",
      "answerType": "radio-button-0-3"
    }
  ]
}
```

## Customization

### Adding New Questions

Edit the `data.ts` file to modify the sample quiz data or add new question blocks.

### Styling

All components use StyleSheet for styling. Modify the styles in each component file to customize the appearance.

### API Integration

The app is set up to easily integrate with a backend API. Results are formatted as:

```json
{
  "blockId": 6,
  "answers": [
    { "questionId": 1, "value": 2 },
    { "questionId": 2, "value": 1 }
  ],
  "completedAt": "2024-01-15T10:30:00.000Z"
}
```

## Building for Production

### Build for iOS:

```bash
npx expo build:ios
```

### Build for Android:

```bash
npx expo build:android
```

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type safety and better development experience
- **React Hooks**: Modern React state management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

> > > > > > > f9420fb (Entrance)
