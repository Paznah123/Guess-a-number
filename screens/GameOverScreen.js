import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TextContainer from '../components/BodyText';
import MainButton from '../components/MainButton';

import Colors from '../consts/colors';

/* ================================== */

const GameOverScreen = props => {

    return (
        <View style={styles.container}>
            <TextContainer style={styles.title}>The game is over!</TextContainer>
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} 
                    style={styles.image} resizeMode='cover'
                />
            </View>
            <TextContainer style={styles.highlight}>Number of rounds: {props.rounds}</TextContainer>
            <TextContainer style={styles.highlight}>Number was: {props.userNumber}</TextContainer>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )

};

/* ================================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 40,
        color: Colors.primary,
    }
});

export default GameOverScreen;