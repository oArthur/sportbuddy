import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";


interface headerProps{
    showUser:boolean
}
const HeaderUser:React.FC<headerProps> = ({showUser}) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;


    const navigator = useNavigation();


    const [userId, setUserId] = useState('0');
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('myId').then(token => {
            setUserId(token);
        });
    }, []);
    useEffect(() => {
        if (userId === '0') return;
        getUser()
    }, [userId]);



    const getUser = () =>{
        return fetch(`${apiUrl}/usuario/api/${userId}`).then((res) => res.json()).then((res) => {
            setUser(res.first_name +' '+ res.last_name)
        }).catch((err) => {
            console.log(err);
        })
    }


    if (!showUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.sportBuddy}>Sport Buddy</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.sportBuddy}>Sport Buddy</Text>
            </View>
            <View style={styles.containerUser}>
                <View style={styles.containerTxtUser}>
                    <Text style={styles.txtUser}>Olá, {user}</Text>
                </View>
                <View style={styles.containerTxtUser}>
                    <Text style={styles.txtUser1}>Pontos: 0</Text>
                </View>
                <View style={styles.containerImgUser}>
                    <Pressable onPress={() => { // @ts-ignore
                        navigator.navigate('Notifications')}}>
                        <MaterialIcons style={styles.icon} name="notifications"  />
                    </Pressable>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sportBuddy: {
        color: 'rgba(255,255,255,0.04)',
        fontSize: 32,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 6.40,
    },
    icon:{
        color: '#cecece',
        fontSize: 34,
        alignSelf: "center"
    },
    containerUser:{
        marginLeft: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: "center",
        textAlign: "center",
        height: 80

    },
    containerTxtUser:{
        flex: 1,
        width: '80%',
        position: "absolute",
        textAlign: "center",

    },
    containerImgUser:{
        position: "absolute",
        height: '100%',
        justifyContent: "center",
        top: '10%',
        left: '85%'

    },
    txtUser:{
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        position: "absolute",
        alignSelf: 'flex-start',

    },
    txtUser1:{
        color: '#cccccc',
        top: 20,
        fontSize: 12,
        fontWeight: 'bold',
        position: "absolute",
        alignSelf: 'flex-start',

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 20,
        alignSelf: 'flex-end',
    },
});
export default HeaderUser;