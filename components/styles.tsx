import styled from 'styled-components/native'
import Constants from 'expo-constants'
//cores

const StatusBarHeight:number = Constants.statusBarHeight;
export const Colors = {
    txtPrimary: "#FFFFFF",
    txtSecondary: "#BBBBBB",
    bgPrimary: "#2A3692",
    bgCard: '#313798',
    bgSecondary: "#412A75",
    accentPrimary: "#FF7A00",
    bgColorSecondary: "#313798"
};

const { txtPrimary, txtSecondary, bgPrimary, bgColorSecondary,bgCard} = Colors;

export const StyledContainer = styled.View`
  display: flex;
  padding: 25px;
  margin-top: 10%;
  width: 100%;
  height: 100%;
  `;
export const InnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 10%;
  width: 100%;
  height: 80%;
  `;

export const SmallLogo = styled.Image`
  width: 87px;
  height: 79px;
  
`;

export const Header = styled.View`
  width: 100%;
  height: 99px;
  flex-direction: row;
 align-items: center;
`;


export const Title = styled.Text`
  color: ${txtPrimary};
  width: 70%;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 6.4px;
  text-transform: uppercase;
`;
export const SubTitle = styled.Text`
  color: ${txtPrimary};
  width: 90%;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 6.4px;
  text-transform: uppercase;
  align-self: center;
`;

export const Line = styled.View`
  width: 100%;
  height: 2px;
  align-self: center;
  background-color: #FF7A00;
  
`;

export const TextInput = styled.TextInput`
  color: ${txtPrimary};
  font-size: 16px;
  border: none;
  font-weight: 500;
  letter-spacing: 2.6px;
  margin-top: 10px;
  height: 45px;
`;

export const Button = styled.TouchableOpacity`
  font-size: 16px;
  margin-top: 50px;
  color: ${txtPrimary};
  font-weight: 500;
  width: 80%;
  border-radius: 10px;
  height: 65px;
  align-self: center;
  
`;
export const ButtonText = styled.Text`
  color: ${txtPrimary};
  text-align: center;
  text-shadow: 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 2.5px;
  line-height: 17px;
`;

export const ContainerCheckBox = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  flex-direction: row;
  align-items: center;
`;


export const TextDesc = styled.Text`
  font-size: 12px;
  letter-spacing: 1.2px;
  font-weight: 500;
  color: rgba(187, 187, 187, 0.49);
  margin-left: 5px;
`;
export const TextLink = styled.Text`
  color: ${txtPrimary};
`;
export const CardContainer = styled.View`
  width: 332px;
  height: 177px;
  border-radius: 5px;
  //background-color: ${bgCard};
  box-shadow: 4px 4px  rgba(0, 0, 0, 0.25);
`;

export const CardContainerimg = styled.View`
  width: 332px;
  height: 177px;
  border-radius: 5px;
  box-shadow: 4px 4px  rgba(0, 0, 0, 0.25);

`

export const CardTitle = styled.Text`
  color: ${txtPrimary};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  margin: 10px;
`;

export const CardTxtFooter = styled.Text`
  text-align: center;
  color: #000;
  font-weight: bold;
`

export const CardContent = styled.View`
  justify-content: space-between;
  padding: 10px
`


export const ItemList = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin: 5px;
`;
export const TextList = styled.Text`
  color: #FFF;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
`;

