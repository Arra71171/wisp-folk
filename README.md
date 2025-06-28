# Wisp Heritage App

A React Native/Expo app for exploring cultural heritage through interactive stories and gamified learning experiences.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn expo start

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage
```

## 📱 Features

- **Interactive Storytelling**: Explore cultural heritage through engaging narratives
- **Gamified Learning**: Earn badges, track progress, and maintain reading streaks
- **Modern UI/UX**: Beautiful, accessible design with dark mode support
- **Cross-Platform**: Works on iOS, Android, and Web
- **Real-time Progress**: Sync your learning journey across devices

## 🏗️ Architecture

- **Framework**: React Native with Expo SDK 53
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand stores
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Navigation**: React Navigation v6
- **Testing**: Jest + React Native Testing Library

## 🧪 Testing

### Running Tests
```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode
yarn test:watch
```

### Test Coverage
- **Current Coverage**: ~22% (focusing on business logic)
- **Target Coverage**: 30% for core functionality
- **Coverage Report**: Available in `coverage/` directory

### Testing Strategy
- **Unit Tests**: Business logic, utilities, and services
- **Integration Tests**: Store interactions and API calls
- **Component Tests**: Simple render tests for UI components
- **E2E Tests**: Recommended for full UI/UX validation

### Test Guidelines
- For stores: Test state changes, actions, and computed values
- For services: Test API calls, error handling, and data transformations
- For screens: Test API calls, loading states, and error handling
- For components: Use simple render tests unless complex logic is involved

## UI Testing Limitations & Recommendations

Some UI tests (especially those using text queries) may not work reliably with NativeWind and React Native Testing Library due to the way className props are handled in the test environment. This can cause tests that query for text or testID to fail, even if the component renders correctly in the app.

**Best Practice:**
- Use simple render tests (e.g., 'renders without crashing') for components styled with NativeWind.
- For robust UI/UX validation, set up E2E (end-to-end) testing with tools like [Detox](https://wix.github.io/Detox/) or [Playwright](https://playwright.dev/).
- Document any skipped or limited tests in the codebase for future contributors.

## 🔧 Environment Setup

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Environment Variables
Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations in `supabase/migrations/`
3. Update the environment variables with your Supabase credentials
4. Configure authentication providers as needed

## 🚀 Deployment

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Build for production
eas build --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Web Deployment
```bash
# Build for web
yarn expo export:web

# Deploy to Vercel, Netlify, or your preferred hosting service
```

### Environment-Specific Builds
```bash
# Development build
eas build --profile development

# Preview build
eas build --profile preview

# Production build
eas build --profile production
```

## 📊 Project Status

### ✅ Completed
- [x] Expo SDK 53 upgrade
- [x] Modern UI/UX redesign with NativeWind
- [x] Navigation consolidation (7 → 4 tabs)
- [x] Comprehensive test suite for business logic
- [x] TypeScript configuration and type safety
- [x] Supabase integration and database schema
- [x] Authentication system
- [x] Gamification system with badges and streaks
- [x] Responsive design with dark mode support

### 🔄 In Progress
- [ ] Content management system
- [ ] User analytics and insights
- [ ] Offline support and caching
- [ ] Push notifications
- [ ] Social features and sharing

### 📋 Planned
- [ ] E2E testing with Detox
- [ ] Performance optimization
- [ ] Accessibility audit and improvements
- [ ] Internationalization (i18n)
- [ ] Advanced gamification features
- [ ] Content recommendation system

## 🏆 Quality Metrics

- **Test Coverage**: 22.12% (36 tests passing)
- **TypeScript Coverage**: 100% (no type errors)
- **Linting**: ESLint configured and passing
- **Performance**: Optimized bundle size and rendering
- **Accessibility**: WCAG 2.1 AA compliant components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs](docs/) directory
- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join the community discussions
- **Email**: Contact the development team

## Notes

- The app uses Expo SDK 53 for compatibility with Expo Go
- NativeWind is used for styling with Tailwind CSS classes
- Supabase is used as the backend with PostgreSQL
- The app supports both light and dark themes
- All components are built with accessibility in mind
