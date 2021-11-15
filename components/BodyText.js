import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../consts/colors';

/* ================================== */

const TextContainer = props => {
    return (<Text style={{...styles.headerTitle, ...props.style}}>
                {props.children}
            </Text>
    )
}

/* ================================== */

const styles = StyleSheet.create({
    headerTitle: {
        color : Colors.accent,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});

export default TextContainer;