import React, {useState} from "react";
import {SubTitle, TextDesc,ContainerCheckBox, TextLink} from "./styles";
import InputForm from "./Input";
import ButtonPrimary from "./ButtonPrimary";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet, View} from "react-native";



const FormCadastro = ({ isRegister = true, handleSubmit }) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [telefone, setTel] = useState('');
    const navigator = useNavigation();

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;



    const isPasswordValid = (password) => {
        // Pelo menos uma letra maiúscula
        const uppercaseRegex = /[A-Z]/;
        // Pelo menos um número
        const numberRegex = /\d/;
        // Pelo menos um caractere especial
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        return (
            uppercaseRegex.test(password) &&
            numberRegex.test(password) &&
            specialCharRegex.test(password)
        );
    };

    const handleRegister = () => {
        if (isPasswordValid(pswd)) {
            navigateFunc();
        } else {
            alert('A senha não atende aos requisitos.')
        }
    };

    const navigateFunc = () => {
        if (!isRegister) {
            // @ts-ignore
            return navigator.navigate('Signup');
        }

        fetch(`${apiUrl}/usuario/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: nome,
                last_name: sobrenome,
                email: email,
                username: email,
                password: pswd,
                telefone: telefone,
                cpf: '',
                aceitou_termo: true,
                pontuacao: 0
            })
        }).then((res) => res.json()).then((res) => {
            AsyncStorage.setItem('myId', res.id.toString());
            // @ts-ignore
            return navigator.navigate('Preferences');
        }).catch((err) => {
            console.log(err);
            alert('Erro ao cadastrar usuário:\n' + err.message);
            // @ts-ignore
            return navigator.navigate('Preferences');   // TODO tratar esse erro
        })

    }

    if (!isRegister) {
        return (
            <View style={styles.login}>
                <SubTitle>login</SubTitle>
                <InputForm placeholder={'Email * '} onChangeText={setEmail}/>
                <InputForm placeholder={'Senha *'} onChangeText={setPswd} />
                <ButtonPrimary title={'Entrar'} onPress={
                    () => handleSubmit({ email, pswd })
                } />
                <ButtonPrimary title={'Cadastrar conta'} onPress={navigateFunc} />
            </View>
        )
    }
    return(
        <>
            <SubTitle>cadastro</SubTitle>
            <InputForm placeholder={'nome *'} onChangeText={setNome} value={nome}/>
            <InputForm placeholder={'sobrenome '} onChangeText={setSobrenome} value={sobrenome} />
            <InputForm placeholder={'Cpf * '} />
            <InputForm placeholder={'Email * '} onChangeText={setEmail} value={email} />
            <InputForm placeholder={'Telefone *'} onChangeText={setTel} value={telefone} />
            <InputForm placeholder={'Senha *'} onChangeText={setPswd} value={pswd} />
            <ContainerCheckBox>
                <Ionicons name="checkbox-outline" size={24} color="green" />
                <TextDesc>Li e concordo com os termos da <TextLink>política de privacidade.</TextLink></TextDesc>
            </ContainerCheckBox>
            <ButtonPrimary title={'Registar-se'} onPress={handleRegister} />
        </>
    )
}

const styles = StyleSheet.create({
    login: {
        top: '10%'
    },
});

export default FormCadastro;