import styled from "styled-components/native";

Container, MessageBox, Message, Name

export const Container = styled.View`
    padding: 5px 10px;
`;

export const MessageBox = styled.View`
    border-radius: 7px;
    padding: 10px;
    background-color: ${ props => props.bg };
    margin-left: ${ props => props.marginLeft + 'px'};
    margin-right: ${ props => props.marginRight + 'px'};
`;

export const Name = styled.Text`
    font-weight: bold;
    color: #F53745;
    margin-bottom: 5px;
`;
export const Message = styled.Text`
    color: #000
`;
