import React from 'react';

import { Container, TitleContainer, TextCont } from './styles';

export default function ChatList({ data, deleteRoom }) {

  

 return (
   <Container onPress={ () => {}} onLongPress={ () => deleteRoom && deleteRoom() } >
    <TitleContainer> { data.name } </TitleContainer>
    <TextCont> { data.lastMessage.text } </TextCont>
   </Container>
  );
}