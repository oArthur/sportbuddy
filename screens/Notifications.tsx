import React, {useEffect, useState} from "react";
import {GestureResponderEvent, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderUser from "../components/HeaderUser";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";


export default function Notifications() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;


    const navigator = useNavigation();

    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState('0');


    useEffect(() => {
        getNotifications();
    }, [userId]);

    const getNotifications = () =>{
        if (userId === '0') return;
        return fetch(`${apiUrl}/usuario/api/notificacao/${userId}`).then((res) => res.json()).then((res) => {
            // console.log(res);
            setNotifications(res);
        }).catch((err) => {
            console.log(err);
            alert('Erro ao carregar notificações:\n' + err.message);
        })
    }

    useEffect(() => {
        AsyncStorage.getItem('myId').then(token => {
            setUserId(token);
        });
    }, []);

    const handleFriendRequest = (id, operation) => {
        return (event: GestureResponderEvent) => {
            fetch(`${apiUrl}/usuario/api/suggestion/${userId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'friend_id': id,
                    'operation': operation
                })
            }).then((res)=>{
                getNotifications();
            }).catch((err) => {
                console.log(err);
                alert('Erro ao aceitar pedido de amizade');
            });
        };
    };

    return (
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <HeaderUser showUser={false} />
                <Pressable onPress={() => { // @ts-ignore
                    navigator.navigate('Home')}}>
                    <MaterialIcons style={styles.icon} name="arrow-back"  />
                </Pressable>
                <Text style={styles.title}>Notificações</Text>
                <ScrollView>
                    <View style={styles.container}>
                        {notifications.map((notification) => (
                            <View key={notification.id} style={styles.card}>
                                <Image source={{ uri: notification.image }} style={styles.image} />
                                <View style={styles.content}>
                                    <Text style={styles.name}>{notification.title}</Text>
                                    <View style={styles.buttonContainer}>
                                        {notification.tipo === 'friend_req' && (
                                            <View>
                                                <Text style={styles.date}>{ notification.description }</Text>
                                                <View style={styles.buttonContainer}>
                                                    <Pressable
                                                        onPress={handleFriendRequest(notification.usuario_relacionado, 'reject')}
                                                        accessibilityLabel="Rejeitar amizade"
                                                        style={[styles.button, styles.reject]}
                                                    >
                                                        <Text style={styles.buttonText}>Recusar</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        onPress={handleFriendRequest(notification.usuario_relacionado, 'accept')}
                                                        accessibilityLabel="Aceitar pedido de amizade"
                                                        style={[styles.button, styles.accept]}
                                                    >
                                                        <Text style={styles.buttonText}>Aceitar</Text>
                                                    </Pressable>
                                                </View>

                                            </View>
                                        )}
                                        {(notification.tipo === 'evento'|| notification.tipo === 'req_update') && (
                                            <Text style={styles.date}>{ notification.description }</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    innerContent:{
        padding: 25
    },
    icon:{
        color: '#cecece',
        fontSize: 34,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '80%',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reject: {
        backgroundColor: '#949494',
    },
    accept: {
        backgroundColor: '#1680e7',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    txt:{
        color:'#fff'
    }
});
