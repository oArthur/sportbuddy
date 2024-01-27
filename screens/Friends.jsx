import React, {useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import HeaderUser from "../components/HeaderUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";


export default function Friends() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [friends, setFriends] = useState([]);
    const [userId, setUserId] = useState('0');

    useEffect(() => {
        getFriends();
    }, [userId]);

    const getFriends = () =>{
        if (userId === '0') return;
        return fetch(`${apiUrl}/usuario/api/friends/${userId}`).then((res) => res.json()).then((res) => {
            console.log({
                'friends': res,
            });
            setFriends(res);
        }).catch((err) => {
            console.log(err);
            alert('Erro ao carregar notificações:\n' + err.message);
        })
    }

    const navigator = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('myId').then(token => {
            setUserId(token);
        });
    }, []);

    return(
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <HeaderUser showUser={false} />
                <Text style={styles.title}>Seus amigos:</Text>
                <ScrollView>
                    {friends.map((friend) => (
                            <View key={friend.id} style={styles.card}>
                                <Image source={{uri:'https://picsum.photos/200/200'}} style={styles.image} />
                                <View style={styles.content}>
                                    <Text style={styles.name}>{friend.first_name} {friend.last_name}</Text>
                                    <View style={styles.buttonContainer}>
                                        <Text style={styles.date}>{ friend.esporte }</Text>
                                    </View>
                                </View>
                                <Pressable onPress={() => {navigator.navigate(
                                    'Chat', {friendId: friend.id, friendName: friend.first_name}
                                )}}>
                                    <MaterialIcons style={styles.chat} name="chat"  />
                                </Pressable>
                            </View>
                    ))}
                </ScrollView>
                    </SafeAreaView>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    title:{
        color: '#fff',
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    chat:{
        color: '#fff',
        fontSize: 25,
        margin: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'normal',
        color: "#e0e0e0"
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',

    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    content: {
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
})