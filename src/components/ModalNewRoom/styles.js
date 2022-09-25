import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
`;

export const Background = styled.View`
    width: 100%;
    height: 45%;
    background-color: #F1F1F1;
    bottom: 0px;
    position: absolute;
    align-items: center;
`;

export const Title = styled.Text`
    color: #000;
    font-size: 22px;
    font-weight: bold;
    margin-top: 30px;
`;

export const Input = styled.TextInput`
    width: 85%;
    height: 50px;
    background-color: #DDD;
    border-radius: 8px;
    padding: 10px;
    margin-top: 35px;
`;

export const ButtonModal = styled.TouchableOpacity`
    width: 85%;
    height: 50px;
    background-color: ${props => props.bg};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 10px;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-size: 17px;
    font-weight: bold;
`;