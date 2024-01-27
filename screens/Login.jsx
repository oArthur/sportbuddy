import React from 'react';
import {StyledContainer} from "../components/styles";
import HeaderComponent from "../components/HeaderComponent";
import FormCadastro from '../components/FormCadastro';
import { useNavigation } from "@react-navigation/core";
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Login = () => {
    const navigator = useNavigation();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const handleSubmit = (values) => {
        fetch(`${apiUrl}/usuario/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.pswd
            })
        }).then((res) => res.json()).then((response) => {
            if (response.id) {
                AsyncStorage.setItem('myId', String(response.id));
                // AsyncStorage.getItem('@app:session').then(token => {
                //     // use token
                //   });
                return navigator.navigate('HomeTabs');
            }
            throw new Error('Dados inválidos');

        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });
        
    }

    return(
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <StyledContainer>
                <HeaderComponent title={'Sport buddy'} imgSrc={require('./../assets/img/logo.png')} />
                <FormCadastro isRegister={false} handleSubmit={handleSubmit} />
            </StyledContainer>
        </LinearGradient>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Login;