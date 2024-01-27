import React from 'react';
import {Line, TextInput} from './styles';

interface InputProps {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
}

const InputForm: React.FC<InputProps> = ({ placeholder,value,onChangeText }) => {
    return (
        <>
            <TextInput
                placeholder={placeholder.toUpperCase()}
                value={value}
                onChangeText={onChangeText}

                placeholderTextColor="rgba(187, 187, 187, 0.49)"
                secureTextEntry={placeholder === "Senha *"}
                keyboardType={placeholder === "Email *" ? "email-address" : "default"}

            />
            <Line />
        </>
    );
};
export default InputForm;
