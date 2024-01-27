import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    Image, ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import InputForm from "../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import {LinearGradient} from "expo-linear-gradient";

const Chat = ({ route, navigation }) => {
  if (!route.params) {
    console.log("Params não informados");
    return navigation.navigate("Friends");
  }

  const { friendId, friendName } = route.params || undefined;

  const [serverMessages, setServerMessages] = useState([]);
  const [myId, setUserId] = useState(0);
  const [webSocket, setWebSocket] = useState(null);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    AsyncStorage.getItem("myId").then((token) => {
      setUserId(Number(token));
    });
  }, []);

  let messages = [];
  const navigator = useNavigation();

    useEffect(() => {
      if (myId == 0) return;
        const websocket = new WebSocket(`wss://${apiUrl.replace('https://', '').replace('http','')}/ws/chat/`);
        setWebSocket(websocket);

        websocket.onopen = () => {
          console.log('Conectando ao websocket');
          console.log({
            'message': '',
            'from_user': myId,
            'to_user': friendId,
        })
            websocket.send(JSON.stringify({
                'message': '',
                'from_user': myId,
                'to_user': friendId,
            }));
            console.log('Conectado ao websocket');
        }

        websocket.onmessage = (e) => {
            messages.push(e.data);
            setServerMessages([...messages]);
            console.log({"Mesagem recebida": e.data});
        }

        websocket.onerror = (e) => {
            console.log(e.message);
        }

        websocket.onclose = () => {
            console.log('Desconectado do websocket');
        }

        return () => {
            websocket.close();
        }

    }, [myId]);

  const sendMessage = () => {
    if (message === "") return;
    webSocket.send(JSON.stringify({
        'message': message,
        'from_user': myId,
        'to_user': friendId,
    }));
    setMessage("");
  };

  return (
      <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
          <SafeAreaView style={styles.innerContainer}>
              <View style={styles.header}>
                  <Image style={styles.img} source={{uri: 'https://picsum.photos/200/200'}} />
                  <Text style={styles.headerTxt}>{friendName}</Text>
              </View>
              <ScrollView vertical>
                  {
                      serverMessages.map((message, index) => {
                          const msg = JSON.parse(message);
                          if (msg.message === '') return;
                          return (
                              <View key={index} style={msg.from_user == myId ? [styles.messageContainer, styles.myMsg] : [styles.messageContainer, styles.friendMsg]}>
                                  <Text style={styles.message}>{msg.message}</Text>
                              </View>
                          );
                      })
                  }
              </ScrollView>
              <View style={styles.inputContainer}>
                  <InputForm placeholder={'Digite aqui...'} onChangeText={setMessage} value={message}/>
                  <Pressable style={styles.sendButton} onPress={sendMessage}>
                      <MaterialIcons name="send" size={24} color="#fff" />
                  </Pressable>
              </View>
          </SafeAreaView>
      </LinearGradient>

  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    innerContainer:{
        flex: 1,
        justifyContent: "space-between"
    },
    messageContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    myMsg: {
        backgroundColor: "#412A75",
        alignSelf: "flex-end",
    },
    friendMsg: {
        backgroundColor: "#6a4cad",
        alignSelf: "flex-start",
    },
    message: {
        color: "#fff",
        fontSize: 16,
    },
    inputContainer: {
        padding: 15,
    },
    sendButton: {
        backgroundColor: "#412A75",
        padding: 10,
        borderRadius: 50,
        margin: 10,
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 15,
        right: 5,
    },
    header: {
        flexDirection: "row",
        backgroundColor: "rgba(65,42,117,0.50)",
        padding: 15,
        position: "absolute",
        width: '100%',
        alignItems: "center"
    },
    headerTxt:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        paddingLeft: 15,

    },
    img: {
        marginTop: 10,
        width: 38,
        height: 38,
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default Chat;
