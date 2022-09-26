import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const ContainerInput = styled.View`
    width: 100%;
    height: 60px;
    margin: 10px 5px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    background-color: #ddd;
    width: 80%;
    height: 50px;
    margin: 5px;
    border-radius: 8px;
    padding: 0px 8px;
`;

export const ButtonSearch = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: #2e54d4;
    margin: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
`;

export const List = styled.FlatList`

`;