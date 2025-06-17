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
- Expo Go app on your phone (for testing on physical devices)

### Installation

1. Clone the repository:

```bash
git clone https://blockforgesolutions/victoria-expo-react-native
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


## Customization

### Adding New Questions

Edit the `data.ts` file to modify the sample quiz data or add new question blocks.

### Styling

All components use StyleSheet for styling. Modify the styles in each component file to customize the appearance.

### API Integration

The app stores the test results in JSON format for easy integration to a backend API. 

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

## Authors
Blockforge Solutions Developer Team

> > > > > > > f9420fb (Entrance)
