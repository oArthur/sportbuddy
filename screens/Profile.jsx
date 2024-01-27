import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient";


export default function Profile() {
    return (
        <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
            <SafeAreaView style={styles.container}>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});