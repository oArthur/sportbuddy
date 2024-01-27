import React from 'react';
import {Button, ButtonText} from './styles';
import {LinearGradient} from "expo-linear-gradient";
import { StyleSheet} from 'react-native';

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

const ButtonPrimary: React.FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <Button
            onPress={onPress}>
            <LinearGradient colors={['#0F0C29', '#3A0AAA', '#24243E']} style={styles.linearGradient}>
                <ButtonText >{title.toUpperCase()}</ButtonText>
            </LinearGradient>
        </Button>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ButtonPrimary;
