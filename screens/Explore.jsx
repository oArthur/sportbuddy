import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FriendshipComponent from "../components/FriendshipComponent";
import ModalComponent from "../components/ModalComponent";
import { FAB } from 'react-native-paper';
import CardComponent from "../components/CardComponent";



export default function Explore() {
    const [showModal, setShowModal] = useState(false);

    if (showModal) {
        return (
            <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
                <SafeAreaView style={[styles.container]}>
                    <ModalComponent
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                    <FriendshipComponent/>
                    <View style={styles.centeredView}>
                        <FAB
                            icon="plus"
                            style={styles.fab}
                            onPress={() => setShowModal(true)}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <CardComponent
                     title="Desafio Diário"
                     img_path={require("../assets/desafios.png")}
                     type="image"
                />
                <FriendshipComponent />
                <View style={styles.centeredView}>
                    <FAB
                        icon="plus"
                        style={styles.fab}
                        onPress={() => setShowModal(true)}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        bottom: 60,
    },
});