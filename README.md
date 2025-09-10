# Nano Banana AI Gallery

A modern React Native application built with Expo that showcases AI-generated image cases from Nano Banana. This app demonstrates cutting-edge mobile development patterns including file-based routing, internationalization, and platform-specific adaptations.

## 🚀 Features

- **🖼️ AI Image Gallery**: Browse 47+ AI-generated image transformation cases
- **🔍 Advanced Search**: Real-time search with category and tag filtering
- **⭐ Favorites System**: Save favorite cases with persistent local storage
- **🌍 Multi-language Support**: Chinese, English, Japanese, and Korean
- **🎨 Dark/Light Theme**: Adaptive theme system with native OS integration
- **📱 Cross-Platform**: Optimized for iOS, Android, and Web
- **⚡ Performance**: Smooth animations with React Native Reanimated

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (v0.79.5) - Cross-platform mobile framework
- **Expo** (v53.0.22) - Development platform and SDK
- **TypeScript** (v5.8.3) - Type-safe JavaScript
- **Expo Router** (v5.1.5) - File-based routing system

### UI & Navigation
- **React Navigation** (v7.1.6) - Navigation library
- **React Native Screens** (v4.11.1) - Native screen components
- **React Native Safe Area Context** (v5.4.0) - Safe area handling
- **Expo Vector Icons** (v14.1.0) - Icon library

### State & Data Management
- **React Context** - Global state management
- **AsyncStorage** - Persistent local storage
- **React Native Reanimated** (v3.17.4) - Smooth animations

### Internationalization
- **i18next** (v25.5.2) - Internationalization framework
- **react-i18next** (v15.7.3) - React integration

## 📱 App Architecture

### File-Based Routing
```
app/
├── _layout.tsx                    # Root layout with theme and providers
├── (tabs)/
│   ├── _layout.tsx               # Tab navigation layout
│   ├── index.tsx                 # Home - Case listing
│   ├── search.tsx                # Search functionality
│   ├── favorites.tsx             # Saved favorites
│   └── settings.tsx              # App settings
└── case/[id]/
    └── index.tsx                 # Dynamic case detail pages
```

### Core Components
- **CaseList** (`components/CaseList.tsx`) - Main case listing with performance optimization
- **UI Components** (`components/ui/`) - Reusable themed components
- **Color System** (`constants/Colors.ts`) - Unified color definitions for light/dark themes

### State Management
- **Favorites Context** (`hooks/useFavorites.ts`) - Global favorites state with AsyncStorage persistence
- **Translation Hook** (`hooks/useTranslation.ts`) - Internationalization utilities
- **Theme Integration** - React Navigation theme with custom color schemes

## 🎨 Design System

### Theme System
The app features a comprehensive theme system supporting both light and dark modes:

```typescript
// Colors are defined for both themes
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    primary: '#0a7ea4',
    // ... more colors
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    primary: '#fff',
    // ... more colors
  },
};
```

### Component Library
- Consistent styling across all components
- Platform-specific adaptations for iOS and Android
- Safe area handling for modern devices
- Responsive design patterns

## 🌐 Internationalization

The app supports four languages with full localization:

- **Chinese (zh)** - Simplified Chinese
- **English (en)** - Default language
- **Japanese (ja)** - Japanese support
- **Korean (ko)** - Korean support

### Translation Structure
```typescript
// Localized text interface
interface LocalizedText {
  zh: string;
  en: string;
  ja: string;
  ko: string;
}
```

## 📊 Data Structure

### Case Object
```typescript
interface Case {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  prompt: LocalizedText;
  inputImages: ImageResource[];
  outputImages: ImageResource[];
  author: string;
  category: LocalizedText;
  tags: LocalizedText[];
  isFavorite: boolean;
  createdAt: string;
}
```

### Key Features
- 47+ AI-generated image transformation cases
- Multi-language metadata (titles, descriptions, prompts)
- Image input/output pairs showing transformations
- Category and tag-based organization
- Author attribution and creation timestamps

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lijianfei-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

### Running on Different Platforms

#### iOS Simulator
```bash
npm run ios
```

#### Android Emulator
```bash
npm run android
```

#### Web Browser
```bash
npm run web
```

#### Physical Device
1. Install Expo Go app on your device
2. Scan QR code from Expo development server
3. Or run `npx expo start --tunnel` for remote access

## 📱 Development Workflow

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset to clean project state

### Development Best Practices
- Use TypeScript for type safety
- Follow ESLint configuration for code quality
- Maintain existing component structure and patterns
- Use the established theme system for UI consistency
- Implement proper error handling and loading states

## 🔧 Configuration

### TypeScript Configuration
- Strict mode enabled for maximum type safety
- Path aliases: `@/*` maps to project root
- Type definitions centralized in `types/index.ts`

### ESLint Configuration
- Expo's recommended ESLint configuration
- TypeScript support
- Modern JavaScript/React standards

## 🎯 Performance Optimizations

### Image Loading
- Optimized image loading with Expo Image
- Placeholder images for loading states
- Memory-efficient image caching

### List Performance
- FlatList with virtualization
- Key extraction for efficient re-renders
- Pull-to-refresh functionality
- Loading indicators and empty states

### Animation Performance
- React Native Reanimated for smooth 60fps animations
- Native driver animations where possible
- Optimized gesture handling

## 📱 Platform-Specific Features

### iOS Adaptations
- Safe area inset handling
- Status bar style adaptation
- Custom header heights with notch compensation
- Native iOS components and patterns

### Android Adaptations
- Material Design principles
- Back button handling
- Native Android components
- Hardware acceleration

## 🔒 Security Considerations

- No hardcoded secrets or API keys
- Secure AsyncStorage usage for local data
- Input validation and sanitization
- Safe image loading practices

## 🤝 Contributing

1. Follow the established code style and patterns
2. Use TypeScript for all new features
3. Add appropriate tests for new functionality
4. Update documentation as needed
5. Ensure cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Nano Banana** - For the AI-generated image cases and inspiration
- **Expo Team** - For the amazing development platform
- **React Native Community** - For the robust framework and ecosystem

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React Native and Expo
