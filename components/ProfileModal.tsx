import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Text,
  GestureResponderEvent,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileModal = ({ showModal, setShowModal, userId }) => {
  const [userData, setUserData] = useState(undefined);
  const [myId, setUserId] = useState(0);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    AsyncStorage.getItem("myId").then((token) => {
      setUserId(Number(token));
    });
  }, []);

  const getProfileData = () => {
    console.log("Obtendo dados do usuário...");
    fetch(`${apiUrl}/usuario/api/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao obter dados do usuário!");
      });
  };

  useEffect(() => {
    if (userId) {
      getProfileData();
    }
  }, []);

  const handleFriendRequest = (id, operation) => {
    return (event: GestureResponderEvent) => {
      fetch(`${apiUrl}/usuario/api/suggestion/${myId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friend_id: id,
          operation: operation,
        }),
      })
        .then((res) => {
          setShowModal(false);
          if (operation == "ignore") alert("Recomendação de usuário ignorada!");
          else alert("Pedido de amizade enviado!");
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao aceitar pedido de amizade");
        });
    };
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => setShowModal(false)}
      >
        <View>
          <View style={styles.modalView}>
            <Image
              source={{
                uri:
                  userData && userData.image
                    ? userData.image
                    : "https://picsum.photos/200/200",
              }}
              style={styles.profileImg}
            />
            <Text style={styles.profileName}>
              {userData ? userData.first_name + " " + userData.last_name : ""}
            </Text>
            <View style={styles.profileDataContainer}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.profileData}>
                  Esportes:{" "}
                  {userData
                    ? userData.preferencia.esporte_preferencia
                        .map((esporte) => esporte.nome)
                        .join(", ")
                    : ""}
                </Text>
                <Text style={styles.profileData}>
                  Locais:{" "}
                  {userData
                    ? userData.preferencia.local_preferencia
                    : "Sem preferência de locais"}
                </Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <Pressable
                onPress={handleFriendRequest(userId, "ignore")}
                accessibilityLabel="Ignorar"
                style={[styles.button, styles.reject]}
              >
                <Text style={styles.buttonText}>Ignorar</Text>
              </Pressable>
              <Pressable
                onPress={handleFriendRequest(userId, "add")}
                accessibilityLabel="Enviar pedido de amizade"
                style={[styles.button, styles.accept]}
              >
                <Text style={styles.buttonText}>Enviar pedido</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#120f19aa",
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "#402B70",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
  },
  profileDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "80%",
  },
  profileData: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  reject: {
    backgroundColor: "#949494",
  },
  accept: {
    backgroundColor: "#1680e7",
  },
  txt: {
    color: "#fff",
  },
});

export default ProfileModal;
