import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {yellow200} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const ItensLoja = () => {
    const [atividades, setAtividades] = useState([
        { id: 1, esporte: '1000 pontos', imagem: require('../assets/img/list/image_8.png'),},
        { id: 2, esporte: '2000 pontos', imagem: require('../assets/img/list/image_9.png'),},
        { id: 3, esporte: '5000 pontos', imagem: require('../assets/img/list/image_10.png'),},
    ]);


    return (
        <ScrollView horizontal style={styles.container}>
            {atividades.map((atividade, index) => (
                <TouchableOpacity style={styles.content} key={index}>
                    <View style={styles.bgImg}>
                        <Image source={atividade.imagem} />
                    </View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{atividade.esporte}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
    content: {
        alignItems: 'center',
        marginRight: 10,
    },
    bgImg:{
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 85,
        height: 85,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: '#efd200'
    },
    containerTitle:{
        width: 95,
        height: 25,
        backgroundColor: '#000',
        borderRadius: 50,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 14,
        fontWeight: '300',
        color: '#fff'
    },
    btn: {
        marginTop: 3,
        padding: 2,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'black',
    },
    txtBtn: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ItensLoja;
