import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import Numbercontainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

/* ================================== */

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor( Math.random() * (max - min) ) + min;

    if(rndNum === exclude) return generateRandomBetween(min, max, exclude);

    else return rndNum;
};

const renderListItem = (listLen, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLen - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>);

/* ================================== */

const GameScreen = props => {
    const initGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currGuess, setCurrGuess] = useState(initGuess);
    const [pastGuesses, setPastGuesses] = useState([initGuess]);

    const currLow = useRef(1);
    const currHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    /* ================================== */

    useEffect(() => {
        if (currGuess === props.userChoice){
            props.onGameOver(pastGuesses.length);
        }
    }, [currGuess, userChoice, onGameOver]);

    /* ================================== */

    const nextGuessHandler = direction => {
        if (direction === -1 && currGuess < props.userChoice 
            || direction === 1 && currGuess > props.userChoice){
            Alert.alert("Don't lie!", "I Know Everything...", [{style: 'cancel'}]);
            return;
        } 

        if (direction === -1) currHigh.current = currGuess;
        else currLow.current = currGuess + 1;

        const nextNum = generateRandomBetween(currLow.current,currHigh.current,currGuess);
        setCurrGuess(nextNum);
        setPastGuesses(currGuesses => [nextNum, ...currGuesses]);
    };

    /* ================================== */

    return (
        <View style={styles.container}>
            <Text> Opponent's Guess </Text>
            <Numbercontainer>{currGuess} </Numbercontainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, -1)}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,1)}>
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
        </View>
    )
    
};

/* ================================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default GameScreen;