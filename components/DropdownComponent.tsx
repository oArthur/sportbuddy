import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import {CardContainer, Colors} from './styles';


interface DropdownProps {
    label: string;
    data: any;
    save: "key" | "value";
    onChange: (selectedItems: any) => void;
    defaultOpt?: any;
}

// TODO fazer com que o componente receba um array de objetos e retorne um array (selecionados)

const DropdownComponent = ({ label, data, save, onChange, defaultOpt, }: DropdownProps) => {
    const [selected, setSelected] = useState([]);
    defaultOpt = defaultOpt ? defaultOpt : data[0];

    useEffect(() => {
        // Call the onChange prop with the selected items whenever it changes
        onChange(selected);
    }, [selected, onChange]);

    return (
            <MultipleSelectList
                label={label}
                data={data}
                defaultOption={defaultOpt}
                save={save}
                onSelect={() => {

                }}
                setSelected={(val) => setSelected(val)}
                searchPlaceholder="Pesquisar..."
                notFoundText="Nenhum item encontrado"

                boxStyles={styles.boxStyle}
                badgeStyles={styles.badgeStyles}
                dropdownTextStyles={styles.colorText}
                labelStyles={styles.colorText}
                inputStyles={styles.colorText}
            />
    );
}

const styles = StyleSheet.create({
    badgeStyles: {
        backgroundColor: Colors.accentPrimary,
        color: '#fff'
    },
    boxStyle: {
        borderRadius: 5,
        backgroundColor: '#313798'
    },
    colorText:{
        color: '#fff'
    }
});

export default DropdownComponent;