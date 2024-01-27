import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {CardContainer, CardTitle, ContainerCheckBox, StyledContainer, ItemList, TextList} from "./styles";

const CheckboxListComponent = ({onChange}) =>{
    const [isChecked1, setChecked1] = useState(true);
    const [isChecked2, setChecked2] = useState(true);
    const [isChecked3, setChecked3] = useState(true);

    useEffect(() => {
        onChange([isChecked1, isChecked2, isChecked3]);
    }, [isChecked1, isChecked2, isChecked3]);

    return (
            <ContainerCheckBox>
                <CardContainer>
                    <CardTitle>Privacidade</CardTitle>
                    <ItemList >
                        <Checkbox style={styles.checkbox} value={isChecked1} color={isChecked1 ? '#25c400' : undefined} onValueChange={setChecked1} />
                        <TextList style={styles.paragraph}>Permitir que me econtrem por interesses esportivos em comum.</TextList>
                    </ItemList>
                    <ItemList >
                        <Checkbox style={styles.checkbox} value={isChecked2} color={isChecked2 ? '#25c400' : undefined} onValueChange={setChecked2} />
                        <TextList style={styles.paragraph}>Compartilhar conquistas.</TextList>
                    </ItemList>
                    <ItemList >
                        <Checkbox style={styles.checkbox} value={isChecked3} color={isChecked3 ? '#25c400' : undefined} onValueChange={setChecked3} />
                        <TextList style={styles.paragraph}>Notificações de amigos.</TextList>
                    </ItemList>
                </CardContainer>
            </ContainerCheckBox>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});

export default CheckboxListComponent;