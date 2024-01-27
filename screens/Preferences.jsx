import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CardContainer,
  InnerContainer,
  StyledContainer,
  SubTitle,
} from "../components/styles";
import HeaderComponent from "../components/HeaderComponent";
import DropdownComponent from "../components/DropdownComponent";
import CheckboxListComponent from "../components/CheckboxListComponent";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {StyleSheet, View, Image, Text, ScrollView, Pressable, GestureResponderEvent} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Preferences = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [sports, setSports] = useState({});
  const [selectedSports, setSelectedSports] = useState([]);
  const [defaultSports, setDefaultSports] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [defaultRa, setDefaultRas] = useState([]);
  const [userId, setUserId] = useState('0');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState();

  useEffect(() => {
    if (userId == 0) return;
    fetch(`${apiUrl}/preferencia/api/my/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }}
      ).then(response => response.json())
      .then((result) => {
        console.log({SELECTED: result});
        setSports(result);
        if (result[0].locais != "") {
          setDefaultRas(result[0].locais.split(", "));
        }

        let selected = [];
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
          if (result[i].selected) {
            selected.push({
              key: result[i].key,
              value: result[i].value,
            });
          }
        }
        setDefaultSports(selected);
        console.log(defaultSports)
      }).catch((error) => {
        console.error(error);
        setSports({});
        alert("Erro ao obter os esportes:\n" + error.message);
      });
  }, [userId]);


  useEffect(() => {
    AsyncStorage.getItem('myId').then(token => {
      setUserId(Number(token));
      setIsLogged(true);
    });
  }, []);

  useEffect(() => {
    getUser()
  }, [userId]);



  const getUser = () =>{
    return fetch(`${apiUrl}/usuario/api/${userId}`).then((res) => res.json()).then((res) => {
      setUser(res.first_name ? res.first_name +' '+ res.last_name:  undefined)
      setEmail(res.email)
    }).catch((err) => {
      console.log(err);
    })
  }
  // TODO se der tempo, fazer a requisição para o back
  const ras = [
    {
        key: 1,
        value: "Vicente Pires",
    },
    {
        key: 2,
        value: "Águas Claras",
    },
    {
        key: 3,
        value: "Taguatinga",
    },
    {
        key: 4,
        value: "Plano Piloto",
    },
    ];

  const save = "key";
  const label = "Esportes";
  const navigator = useNavigation();

  let selectedRas = [];

  let setSelectedRas;
  setSelectedRas = (selectedItems) => {
    selectedRas = selectedItems;
  };

  let setSelectedCheckboxes;
  setSelectedCheckboxes = (selectedItems) => {
    selectedCheckboxes = selectedItems;
  };

  const navigate = () => {
    fetch(`${apiUrl}/preferencia/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_preferencia: userId,
        local_preferencia: selectedRas.join(", "),
        esporte_preferencia: selectedSports,
      }),
    })
      .then((response) => {
        setIsLogged(true);
        navigator.navigate("HomeTabs"); // TODO tratamento de erro
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao salvar preferências:\n" + error.message);
        navigator.navigate("HomeTabs"); // TODO tratamento de erro
      });
  };

  const saveChanges = () => {
    alert("Alterações salvas com sucesso!"); // TODO requisição para o back
    navigator.navigate("HomeTabs");

  };

  const deleteAccount = () => {
    return (event: GestureResponderEvent) => {
    console.log("deletando conta");
      fetch(`${apiUrl}/usuario/api/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("conta apagada");
          setIsLogged(false);
          navigator.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
          // navigator.navigate("Login"); // TODO tratamento de erro
        })
        .catch((error) => {
          console.log("conta apagada");
          setIsLogged(false);
          navigator.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        });
    }
  }

  if (isLogged) {
    return (
      <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
        <SafeAreaView>
          <ScrollView vertical>
              <View style={styles.container}>
                <View style={[styles.container, styles.row, styles.end]}>
                  <Image
                    style={styles.user}
                    source={require("./../assets/img/logo.png")}
                  />
                  <Image
                    style={[styles.icon, styles.negativeMargin]}
                    source={require("./../assets/img/change_img_icon.png")}
                  />
                </View>
                <View style={[styles.container, styles.row]}>
                  <Text style={styles.username}>{ user ? user : 'Selecione as preferências' }</Text>
                </View>
                <Text style={styles.email}>{ email }</Text>
              </View>
              <View style={styles.content}>
                {user ?  
                  <>
                    <Text style={styles.titleSports}>Esportes Selecionados: </Text>
                    <View style={styles.sports}>
                          {defaultSports.map((sportsData, index) => (
                          <Text style={styles.bgSports}>{sportsData.value}</Text>
                          ))}
                        </View>

                    <View>
                      <Text style={styles.titleSports}>Locais Selecionados:</Text>
                      <View style={styles.sports}>
                          {defaultRa.map((sportsData, index) => (
                          <Text style={styles.bgSports}>{sportsData}</Text>
                          ))}
                        </View>
                    </View>
                  </>
                 : 
                 <>
                 <DropdownComponent
                      data={sports}
                      label={label}
                      save={save}
                      onChange={setSelectedSports}
                      defaultOpt={defaultSports}
                    />
                    <DropdownComponent
                      data={ras}
                      label={"Regiões:"}
                      save="value"
                      onChange={setSelectedRas}
                    />
                 </>
                  }
                <View style={styles.privacy}>
                  <CheckboxListComponent onChange={setSelectedCheckboxes} />
                  <ButtonPrimary title={"Salvar"} onPress={navigate} />
                </View>
                {user ? 
                  <Pressable style={styles.trash} onPress={deleteAccount()}>
                    <Image
                        style={styles.icon}
                        source={require("./../assets/img/trash.png")}
                    />
                    <Text style={{color:"red"}}>Apagar conta</Text>
                  </Pressable>
                : <></>}
              </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient colors={["#2A3692", "#412A75"]} style={styles.container}>
        <SafeAreaView>
          <ScrollView vertical>
            <StyledContainer>
              <HeaderComponent
                title={"Sport buddy"}
                imgSrc={require("./../assets/img/logo.png")}
              />
              <InnerContainer>
                <SubTitle>Preferências</SubTitle>
                <DropdownComponent
                  data={sports}
                  label={label}
                  save={save}
                  onChange={setSelectedSports}
                />
                <DropdownComponent
                  data={ras}
                  label={"Regiões:"}
                  save={save}
                  onChange={setSelectedRas}
                />
                <CheckboxListComponent onChange={setSelectedCheckboxes} />
                <ButtonPrimary title={"Finalizar"} onPress={navigate} />
              </InnerContainer>
            </StyledContainer>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
};
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginTop: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sports:{
    flex: 1,
    gap: 15,
    flexDirection: "row"
  },
  titleSports:{
    color: '#fff',
    fontSize: 14,
    fontWeight: "bold"
  },
  bgSports:{
    backgroundColor: 'rgba(0,36,124,0.5)',
    color: '#fff',
    padding: 5,
    fontWeight: "bold"

  },
  icon: {
    width: 30,
    height: 30,
  },
  user: {
    width: 125,
    height: 125,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  end: {
    alignItems: "flex-end",
  },
  negativeMargin: {
    marginLeft: -60,
  },
  username: {
    fontSize: 25,
    color: '#fff',
    fontWeight: "bold",
  },
  email:{
    color: '#fff',
  },
  trash:{
    flex:1,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap:25,
    color: "red",

  },
  content: {
    gap: 10,
    marginTop: 20,
  },
  privacy: {
    marginTop: 20,
    gap: 50,
  },
});

export default Preferences;
