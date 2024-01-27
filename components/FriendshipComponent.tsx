import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Button, GestureResponderEvent, View, Pressable, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileModal from './ProfileModal';


const FriendshipComponent = () => {
    const [suggestion, setSuggestion] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [myId, setUserId] = useState(0);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        if (myId === 0) return;
        getSuggestion();
    }, [myId, showModal]);

    useEffect(() => {
        AsyncStorage.getItem('myId').then(token => {
          setUserId(Number(token));
        });
    }, []);

    const getSuggestion = () => {
        fetch(`${apiUrl}/usuario/api/suggestion/${myId}`).then((res) => res.json()).then((res) => {
            if (res.error) {
                setSuggestion(undefined);
                return;
            };
            
            setSuggestion(res);
            console.log({suggestion: res});
        }).catch((err) => {
            console.log({friend_comp: err});
            alert('Erro ao buscar sugestão de amizade');
        })
    };

    const reject = (id) => {
        return (event: GestureResponderEvent) => {
            fetch(`${apiUrl}/usuario/api/suggestion/${myId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'friend_id': id,
                    'operation': 'ignore'
                })
            }).then((res)=>{
                getSuggestion();
                alert('Recomendação de amizade ignorada!');
            }).catch((err) => {
                console.log(err);
                alert('Erro ao ignorar recomendação');
            });
        };
    };
    
    const sendFriendRequest = (id) => {
        return (event: GestureResponderEvent) => {
            fetch(`${apiUrl}/usuario/api/suggestion/${myId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'friend_id': id,
                    'operation': 'add'
                })
            }).then((res)=>{
                getSuggestion();
                alert('Pedido de amizade enviado com sucesso!');
            }).catch((err) => {
                console.log(err);
                alert('Erro ao enviar pedido de amizade');
            });
        };
    };

    const showModalFunc = () => {
        if (suggestion) {
            setShowModal(true);
        }
    };

    return (
        <View>
            {showModal ? <ProfileModal userId={suggestion ? suggestion.id : 0} showModal={showModal} setShowModal={setShowModal} /> : <></>}
            <Text style={styles.heading}>Sugestões de amizade</Text>
            <Pressable onPress={showModalFunc}>
                <Image
                    source={{
                        uri: suggestion ?  (suggestion.image ? suggestion.image : 'https://picsum.photos/200/200') : 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-curioso_114360-2185.jpg?w=740&t=st=1701252745~exp=1701253345~hmac=26872dfe6d8226a9e7085900a02a1844af3848491f4db2c92a1d5af59f22fe08',
                    }}
                    style={styles.image}
                />
            </Pressable>
                <Text style={[styles.btnText, styles.bold, {marginBottom: 20}]}>{suggestion ? suggestion.first_name + ' ' + suggestion.last_name : 'Sem recomendação'}</Text>
                <View style={styles.container}>
                    <Pressable
                        onPress={reject(suggestion ? suggestion.id : 0)}
                        accessibilityLabel="Ignorar amizade"
                        style={suggestion ? [styles.btn, styles.reject] : styles.none}>
                        <Text style={styles.btnText}>Ignorar</Text>
                    </Pressable>
                    <Pressable
                        onPress={sendFriendRequest(suggestion ? suggestion.id : 0)}
                        accessibilityLabel="Enviar pedido de amizade"
                        style={suggestion ? [styles.btn, styles.accept] : styles.none}>
                        <Text style={styles.btnText}>Adicionar</Text>
                    </Pressable>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 10,
    },
    btn: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
    },
    reject: {
        backgroundColor: '#949494',
    },
    accept: {
        backgroundColor: '#1680e7',
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    none: {
        display: 'none',
    }
});

export default FriendshipComponent;