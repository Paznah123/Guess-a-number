import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../consts/colors';

/* ================================== */

const Numbercontainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>

    )
};

/* ================================== */

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.accent,
        borderRadius: 10,
    },
    number: {
        color: Colors.accent,
        fontSize: 22,
    },
});

export default Numbercontainer;