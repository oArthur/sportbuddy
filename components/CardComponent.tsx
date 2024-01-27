import React from 'react';
import {CardContainer, CardContainerimg, CardContent, CardTitle, CardTxtFooter} from './styles'
import {ImageBackground, StyleSheet, TouchableOpacity} from "react-native";


interface cardProps{
    title:string,
    img_path?:any,
    type: 'image' | 'default',
    footer?:string,
    content?: React.ReactNode;
    handlePress?: () => void,
    color?:string
}

const Card:React.FC<cardProps> = ({title,img_path,type,footer,handlePress,content,color}) =>{

    if (type === 'image'){
        return (
            <TouchableOpacity onPress={handlePress}>
                <CardContainerimg>
                    <ImageBackground source={img_path} resizeMode="cover" style={styles.image}>
                        <CardContent style={styles.container}>
                            <CardTitle style={styles.center}>{ title.toUpperCase() }</CardTitle>
                            <CardTxtFooter>{footer}</CardTxtFooter>
                        </CardContent>
                    </ImageBackground>
                </CardContainerimg>
            </TouchableOpacity>

        )
    }else{
        return (
                <CardContainer style={{ backgroundColor: color ? `${color}` : '#313798' }}>
                        <CardContent style={styles.container}>
                            <CardTitle style={styles.center}>{ title.toUpperCase() }</CardTitle>
                            {content}
                            <CardTxtFooter>{footer}</CardTxtFooter>
                        </CardContent>
                </CardContainer>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    center: {
        textAlign: "center",
    },
    bgcolor:{
        backgroundColor: '#313798'
    }
})

export default Card;

