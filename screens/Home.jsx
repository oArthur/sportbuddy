import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Card from "../components/CardComponent";
import AtividadeRecente from "../components/AtividadeRecenteComponent";
import FriendshipComponent from "../components/FriendshipComponent";
import ModalComponent from "../components/ModalComponent";
import { FAB } from 'react-native-paper';
import HeaderUser from "../components/HeaderUser";


export default function Home() {
    const [showModal, setShowModal] = useState(false);

    if (showModal) {
        return (
            <LinearGradient colors={["#2A3692", "#412A75"]} style={[styles.container, { alignItems: 'center' }]}>
                <SafeAreaView style={[styles.container]}>
                    <ModalComponent
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                    <Card
                        title="Desafio Diário"
                        img_path={require("../assets/desafios.png")}
                        type="image"
                    />
                    <FriendshipComponent />
                    <Card title={'Atividade na sua região'} type={'default'} color={'#5CB74E'} content={<AtividadeRecente />}/>
                    <Card title={'Organizar um jogo'} footer={'Reserve Agora'} img_path={require('../assets/img/card/campo.png')} type={'image'} />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <SafeAreaView style={[styles.container]}>
                <HeaderUser showUser={true}/>
                <ScrollView>
                    <View style={[styles.container, { gap: 25 }, { alignItems: 'center', position: "relative", }]}>
                        <Card
                            title="Desafio Diário"
                            img_path={require("../assets/desafios.png")}
                            type="image"
                        />
                        <FriendshipComponent />
                        <Card title={'Atividade na sua região'} type={'default'} color={'#5CB74E'}
                              content={<AtividadeRecente />}/>
                        <Card title={'Organizar um jogo'} footer={'Reserve Agora'}
                              img_path={require('../assets/img/card/campo.png')} type={'image'} />
                    </View>
                </ScrollView>

                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => setShowModal(true)}
                    />
        </SafeAreaView>
</LinearGradient>

);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 10,
    },
});