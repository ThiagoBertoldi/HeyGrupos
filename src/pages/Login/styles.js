import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #f6f6f6;
    align-items: center;
`;

export const Title = styled.Text`
    color: #000;
    font-size: 30px;
    font-weight: bold;
    margin-top: 75px;
`;

export const SubTitle = styled.Text`
    color: #000;
    font-size: 15px;
`;

export const InputArea = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export const Input = styled.TextInput`
    width: 90%;
    height: 50px;
    background-color: #e9e9e9;
    padding: 15px;
    margin: 8px 0px;
    border-radius: 5px;
    font-size: 16px;
`;

export const ButtonLogin = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    background-color: #2e54d4;
    border-radius: 5px;
    margin-top: 8px;
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const ToggleLoginButton = styled.TouchableOpacity `
    margin-top: 15px;
`;

export const ToggleText = styled.Text`
    color: #000
`;
