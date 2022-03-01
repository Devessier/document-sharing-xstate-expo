# document-sharing-xstate-expo

Shows how we can implement document sharing with [XState](https://xstate.js.org/docs/) in a [React Native](https://reactnative.dev/) application powered by [Expo](https://expo.dev/).

[Watch walkthrough on YouTube](https://youtu.be/HkUFHciSyWQ)

## About

[Open code](./App.tsx)

To share a document, we need to download it locally. The main steps of this demonstration are:

- When the application launches, check if the document is already in the cache of the application
- When the user presses the share button, download the document only if it is not in the cache and if it has not been downloaded previously
- Share the document!

To download the document we use [`expo-file-system`](https://docs.expo.dev/versions/latest/sdk/filesystem/) library and to share it, we use [`expo-sharing`](https://docs.expo.dev/versions/latest/sdk/sharing/). These both libraries should be usable in a React Native application that does not use Expo.

The logic is defined in a state machine that uses [XState Typegen](https://xstate.js.org/docs/guides/typescript.html#using-typescript) to improve type safety.

For styling, we use [NativeBase](https://nativebase.io/), which is between Tailwind CSS and a component library such as Material UI. A great discovery!

## Run the demo

1. Clone the repository

```bash
git clone https://github.com/Devessier/document-sharing-xstate-expo.git
cd document-sharing-xstate-expo
```

2. Install dependencies

```bash
yarn install
```

3. Start Expo development server

```bash
yarn start
```

4. Select the platform you want to run the demo on:

    - Android emulator
    - iOS simulator
    - Your device (through Expo Go)

If you have no simulator installed on your computer, the fastest way to launch the demo is to run it on your device through [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and). Otherwise, you can install the [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/) (macOS only) and/or the [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/).

5. You should be able to view the document and to share it! Try to reload the application and to delete the file from cache.
