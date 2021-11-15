import React, { useState } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Numbercontainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import Colors from '../consts/colors';

/* ================================== */

const StartGameScreen = props => {

    const [enteredVal, setEnteredVal] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedVal, setSelectedVal] = useState();

    /* ================================== */

    const startGame = () => props.onStartGame(selectedVal);

    const inputHandler = inputText => {
        setEnteredVal(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredVal('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNum = parseInt(enteredVal);
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99){
            Alert.alert("Invalid Number!","Number has to be between 1-99.",[{text: "Okay", style: "destructive", onPress: resetInputHandler}]);
            return;
        } 

        setConfirmed(true);
        setSelectedVal(chosenNum);
        setEnteredVal('');
        Keyboard.dismiss();
    };

    /* ================================== */

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()}}>
            <View style={styles.container}>
            <Text style={styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer} >
                <Text style={styles.text}>Select a Number</Text>
                <Input 
                    style={styles.input} 
                    keyboardType="numeric" 
                    maxLength={2} 
                    blurOnSubmit
                    onChangeText={inputHandler}
                    value={enteredVal}
                />
                <View style={styles.buttonContainer}>
                <View style={styles.button} >
                    <Button title="Reset" color={Colors.accent} onPress={resetInputHandler} />
                </View>
                <View style={styles.button} >
                    <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
                </View>
                </View>
            </Card>
            {confirmed && 
                <Card style={styles.summaryContainer}>
                    <Text>You selected</Text>
                    <Numbercontainer>{selectedVal}</Numbercontainer>
                    <MainButton onPress={startGame}>START GAME</MainButton>
                </Card>}
        </View>
        </TouchableWithoutFeedback>
    )

};

/* ================================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    button: {
        width: '40%',
    },
    input: {
        width: 50,
        textAlign: 'center',
        
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'open-sans',
    },
});

export default StartGameScreen;