import React from 'react';
import {StyledContainer} from "../components/styles";
import HeaderComponent from "../components/HeaderComponent";
import FormCadastro from "../components/FormCadastro";
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet,ScrollView} from "react-native";



const Signup = () => {

    return(
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <ScrollView>
                <StyledContainer>
                    <HeaderComponent title={'Sport buddy'} imgSrc={require('./../assets/img/logo.png')} />
                    <StyledContainer>
                        <FormCadastro />
                    </StyledContainer>
                </StyledContainer>
            </ScrollView>
        </LinearGradient>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Signup;