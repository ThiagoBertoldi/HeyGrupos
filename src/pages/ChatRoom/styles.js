import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFF;
`;

export const HeaderRoom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 20px;
    padding-right: 10px;
    padding-left: 10px;
    background-color: #2e54d4;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
`;

export const HeaderRoomLeft = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ButtonHeaderLeft = styled.TouchableOpacity``;

export const TextHeaderLeft = styled.Text`
    font-size: 26px;
    font-weight: bold;
    color: #fff;
    padding-left: 10px;
`;

export const ButtonHeaderRigth = styled.TouchableOpacity``;

export const Modal = styled.Modal`
    width: 100%;
    height: 40%;
    background-color: #000;
`;

export const List = styled.FlatList`

`;