import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Button from '../ui/Button';
import { Feather } from '@expo/vector-icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView className="flex-1 bg-red-50">
          <View className="flex-1 items-center justify-center p-8">
            <Feather name="alert-octagon" size={48} color="#b91c1c" />
            <Text className="mt-6 text-2xl font-bold text-red-900 text-center">
              Oops! Something went wrong.
            </Text>
            <Text className="mt-2 text-base text-red-700 text-center">
              We've encountered an unexpected error. Please try again.
            </Text>
            <View className="mt-8 w-full">
              <Button title="Try Again" onPress={this.handleReset} variant="destructive" />
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
