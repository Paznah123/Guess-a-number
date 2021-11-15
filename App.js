import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

/* ================================== */

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};

/* ================================== */

export default function App() {

  const [userNum, setUserNum] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  /* ================================== */

  if (!dataLoaded) {
      return (<AppLoading 
                startAsync={fetchFonts} 
                onFinish={() => setDataLoaded(true)} 
                onError={() => {}}
              />);
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNum(null);
  };

  const startGameHandler = selectedNum => {
      setUserNum(selectedNum);
      setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  /* ================================== */

  return (
    <View style={styles.container}>
        <Header title="Guess A Number"/>
        { !userNum && <StartGameScreen onStartGame={startGameHandler}/>}
        { userNum && guessRounds <= 0 ? <GameScreen userChoice={userNum} onGameOver={gameOverHandler}/> : null } 
        { guessRounds > 0 && <GameOverScreen userNumber={userNum} rounds={guessRounds} onRestart={newGameHandler}/>}
    </View>
  );

}

/* ================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
