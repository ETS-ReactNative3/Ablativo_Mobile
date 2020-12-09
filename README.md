# Ablativo Mobile

The mobile application of Ablativo built using React Native, [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) and [react-native-becon-manager](https://github.com/MacKentoch/react-native-beacons-manager)

![App screenshots](/images/Snapshots.png)

## Features

- Authentication and Mentor Choice.
- Find nearby beacons.
- Chat with the artworks in a room.
- Upvote system for both artwork and room.
- Collect device sensors data during a visit.
- Listen music in the profile screen.

## Requirements

- NodeJS

## Setup instructions

### 1. Install dependencies

```
git clone https://github.com/Ablativo/Ablativo_Mobile

cd Ablativo_Mobile

npm install
```

### 2. Start up the [backend](https://github.com/Ablativo/Ablativo_Backend)
```
git clone https://github.com/Ablativo/Ablativo_Backend

cd Ablativo_Backend

npm install

nodemon bin/www.js

```

### 3. Start Ablativo

```
npx react-native run-android
```
