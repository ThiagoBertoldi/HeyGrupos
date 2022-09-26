import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const List = styled.FlatList`
    width: 100%;
`;

export const ContainerInput = styled.KeyboardAvoidingView`
    width: 100%;
    height: 60px;
    bottom: 0px;
    flex-direction: row;
    align-items: center;
    margin: 10px;
`;

export const MainContainerInput = styled.View`
    width: 80%;
`;

export const Input = styled.TextInput`
    max-height: 120px;
    background-color: #FFF;
    border-radius: 30px;
    padding-left: 15px;
`;  

export const Button = styled.TouchableOpacity`
    min-width: 60px;
    max-width: 60px;
    min-height: 60px;
    max-height: 60px;
    background-color: #51C880;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin-left: 5px;
`;