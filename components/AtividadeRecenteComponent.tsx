import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AtividadeRecente = () => {

    //TODO toda vez que entrar no componente refazer a requisicao.

    const apiUrl:string = process.env.EXPO_PUBLIC_API_URL;


    const [atividades, setAtividades] = useState([
    ]);
    const [myId, setUserId] = useState(undefined);

    useEffect(() => {
        AsyncStorage.getItem('myId').then(token => {
          setUserId(Number(token));
        });
    }, []);

    useEffect(() => {
        if (myId === undefined) return;
        getAtividades();
    }, [myId]);

    const getAtividades = async () => {
        try {
            const response = await fetch(`${apiUrl}/evento/api/recomendado/${myId}`);
            const data = await response.json();
            setAtividades(data);
        } catch (error) {
            console.log("Sem atividades recentes")
        }
    };

    const participar = (id) => {
        fetch(`${apiUrl}/evento/api/join/${id}/${myId}`, {'method': 'GET'}).then((res) => res.json()).then((res) => {
            const atividadesAtualizadas = atividades.map(atividade => {
                if (atividade.id === id) {
                    return { ...atividade, inscrito: true };
                }
                return atividade;
            });

            setAtividades(atividadesAtualizadas);
        }).catch((err) => {
            console.log(err);
            alert('Erro ao increver-se na atividade:\n' + err.message);
        })

    };
    if (!atividades.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Nenhuma atividade disponível no momento</Text>
            </View>
        );
    }
    return (
        <ScrollView horizontal style={styles.container}>
            {atividades.map((atividade, index) => (
                <View style={styles.atividadeContent} key={index}>
                    <Image
                        source={{
                            uri: atividade.image ? atividade.image && atividade: 'https://picsum.photos/200/200',
                        }}
                        style={styles.img}
                    />
                    <Text style={styles.title}>{atividade.esporte}</Text>
                    <TouchableOpacity
                        style={[styles.btn,{ borderColor: atividade.inscrito ? '#D93D97' : 'white' }]}
                        onPress={() => participar(atividade.id)}
                        disabled={atividade.inscrito}
                    >
                        <Text style={[styles.txtBtn,{ color: atividade.inscrito ? '#D93D97' : 'white' }]}>
                            {atividade.inscrito ? 'Inscrito' : 'Participar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    atividadeContent: {
        alignItems: 'center',
        marginRight: 10,
    },
    img: {
        width: 38,
        height: 38,
        borderRadius: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
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

export default AtividadeRecente;
