# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native application built with Expo that showcases AI-generated image cases from Nano Banana. The app demonstrates modern React Native development patterns including file-based routing, state management, and platform-specific adaptations.

## Development Commands

### Core Development
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint to check code quality
- `npm run reset-project` - Reset project to clean state

### TypeScript and Type Checking
- TypeScript is configured with strict mode
- Path aliases: `@/*` maps to project root
- Type definitions are in `types/index.ts`

## Architecture and Structure

### File-Based Routing (Expo Router)
- `app/_layout.tsx` - Root layout with theme and favorites provider
- `app/(tabs)/` - Tab navigation layout with 4 main sections:
  - `index.tsx` - Case listing (home tab)
  - `search.tsx` - Search functionality
  - `favorites.tsx` - Favorited cases
  - `settings.tsx` - App settings
- `app/case/[id]/` - Dynamic case detail pages

### State Management
- **Favorites System**: Context-based state management (`hooks/useFavorites.ts`)
- **Local Storage**: AsyncStorage for persistent favorite data
- **Theme Management**: React Navigation theme integration with custom colors

### Key Components
- `components/CaseList.tsx` - Main case listing component
- `components/ui/` - Reusable UI components with theme support
- `constants/Colors.ts` - Light/dark theme color definitions

### Data Structure
The app works with `Case` objects defined in `types/index.ts`:
- AI-generated image cases with prompts and metadata
- Support for input/output image pairs
- Category and tag-based organization
- Favorite functionality with persistent storage

## Development Guidelines

### Code Style
- Use ESLint configuration (`eslint.config.js`)
- Follow Expo's TypeScript configuration
- Maintain existing component structure and patterns
- Use TypeScript interfaces for type safety

### Theme System
- Colors are defined in `constants/Colors.ts` for light/dark modes
- Components should use `useColorScheme()` hook for theme awareness
- Custom theme extends React Navigation themes

### Navigation Patterns
- File-based routing with Expo Router
- Tab navigation for main sections
- Stack navigation for detail views
- Platform-specific adaptations for iOS/Android

### Data Handling
- Cases are loaded from `data/nano-banana-cases-extracted.json`
- Favorites are stored in AsyncStorage with Context management
- Search and filtering functionality in search tab

## Platform Considerations

### iOS-Specific
- Safe area insets handling in tab layout
- Status bar style adaptation
- Custom header heights with notch compensation

### Cross-Platform
- React Native components work across iOS, Android, and web
- Conditional rendering based on `Platform.OS`
- Responsive design with SafeAreaContext

## Build and Deployment

The project is configured for:
- Expo development builds
- Native compilation for iOS and Android
- Web support through Expo web
- TypeScript compilation with strict type checking

## Current Version Status

- **Expo SDK**: 54.0.2
- **React Native**: 0.81.4
- **React**: 18.3.1
- **Expo Router**: 6.0.1
- **New Architecture**: Enabled (Fabric/TurboModules)
- **iOS Build**: ✅ Working (with fast_float fix)

### Known Issues and Fixes

#### iOS Build Issue - fast_float Version Conflict
React Native 0.81.4 has a known dependency conflict where RCT-Folly requires `fast_float >= 6.1.4` but React Native provides `fast_float 8.0.0`. This has been resolved by manually modifying the dependency specification in `node_modules/react-native/third-party-podspecs/RCT-Folly.podspec`:

```ruby
# Fixed line 27 in RCT-Folly.podspec
spec.dependency "fast_float", ">= 6.1.4"  # Changed from "8.0.0"
```

**Important**: This fix must be reapplied after running `npm install` or any dependency update commands.

#### Upgrade Process
The project was successfully upgraded from Expo SDK 53.0.22 to 54.0.2 and React Native 0.79.5 to 0.81.4. See `upgrade-summary.md` for detailed documentation of the upgrade process.