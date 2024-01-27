import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, Pressable, Text, GestureResponderEvent } from 'react-native';
import DropdownComponent from './DropdownComponent';
import Checkbox from 'expo-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";


const ModalComponent = ({showModal, setShowModal}) => {
    const [publicEvent, setPublic] = useState(false);
    const [selectedSports, setSelectedSports] = useState([]);
    const [sports, setSports] = useState({});
    const [selectedRas, setSelectedRas] = useState([]);
    const [myId, setUserId] = useState(0);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        AsyncStorage.getItem('myId').then(token => {
          setUserId(Number(token));
        });
    }, []);

    const createEvent = () => {
        return (event: GestureResponderEvent) => {
            fetch(`${apiUrl}/evento/api`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: 'Evento',
                    data_inicio: new Date(), // TODO: se der tempo usar datepicker
                    data_fim: new Date(),
                    local_evento: selectedRas.toString(),
                    id_participantes: [myId],
                    esporte: selectedSports,
                    criador: myId,
                }),
            }).then((res) => {
                if (res.status === 201) {
                    alert('Evento criado com sucesso!');
                } else {
                    alert('Erro ao criar evento!');
                }
            }).catch((err) => {
                console.log(err);
                alert('Erro ao criar evento:\n' + err.message);
            });

            setShowModal(false);
        };
    };
    
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

    useEffect(() => {
        fetch(`${apiUrl}/esporte/api/all/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }}
          ).then(response =>response.json())
          .then((result) => {
            setSports(result);
          }).catch((error) => {
            console.error(error);
            alert("Erro ao obter os esportes:\n" + error.message);
          });
      }, []);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeading}>Novo evento</Text>
                    <View style={styles.dropdownContainer}>
                        <DropdownComponent
                            data={sports}
                            label={'Esportes:'}
                            save={'key'}
                            onChange={setSelectedSports}
                        />
                        <DropdownComponent
                            data={ras}
                            label={"Regiões:"}
                            save={'value'}
                            onChange={setSelectedRas}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15 }}>Evento público:</Text>
                            <Checkbox
                                style={styles.checkbox}
                                value={publicEvent}
                                color={publicEvent ? '#25c400' : undefined}
                                onValueChange={setPublic}
                            />
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCreate]}
                            onPress={createEvent()}
                        >
                            <Text style={styles.textStyle}>Criar Evento</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        marginBottom: 30,
        alignContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#120f19aa',
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: '#402B70',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
    },
    fab: {
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    buttonClose: {
        backgroundColor: '#C6C5CF',
    },
    buttonCreate: {
        backgroundColor: '#26872F',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fabText: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalHeading: {
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    checkbox: {
        margin: 8,
    },
});

export default ModalComponent;