import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Card from "../components/CardComponent";
import ItensLoja from "../components/ItensLoja";


export default function Store() {
    return (
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Card title={'Area do Anunciante'} type={"default"} color={'#b2b2b2'}/>
                    <Text style={styles.listTitle}>Mais vendidos</Text>
                    <ItensLoja />
                <View style={styles.containerFake}>
                    <View style={styles.fakeCard}></View>
                    <View style={styles.fakeCard}></View>
                    <View style={styles.fakeCard}></View>
                </View>
                <View style={styles.containerFake1}>
                    <View style={styles.fakeCard}></View>
                    <View style={styles.fakeCard}></View>
                    <View style={styles.fakeCard}></View>
                </View>
                <View style={styles.containerFake2}>
                    <View style={styles.fakeCard}></View>
                    <View style={styles.fakeCard}></View>
                    <View style={styles.fakeCard}></View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    lista: {
        flex: 1,
        textAlign: "left",
        padding: 10
    },
    listTitle: {
        color: '#fff',
        fontWeight: "500",
        fontSize: 16,
        letterSpacing: 1.5
    },
    fakeCard: {
        width: 120,
        height: 80,
        backgroundColor: '#a2a2a2',
    },
    containerFake:{
        top: 350,
        position: "absolute",
        margin: 3,
        flexDirection: "row",
        gap: 10
    },
    containerFake1:{
        top: 440,
        position: "absolute",
        margin: 3,
        flexDirection: "row",
        gap: 10
    },
    containerFake2:{
        top: 530,
        position: "absolute",
        margin: 3,
        flexDirection: "row",
        gap: 10
    }
});