import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.niceavelo',
  appName: 'Nice a velo',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,  // Duration of the splash screen in milliseconds
      launchAutoHide: true,     // Automatically hide the splash screen
      backgroundColor: '#ffffffff', // White background
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: "#999999"
    },
  },
};

export default config;
