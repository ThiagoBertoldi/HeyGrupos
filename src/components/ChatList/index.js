import React from 'react';

import { Container, TitleContainer, TextCont } from './styles';

import { useNavigation } from '@react-navigation/native';

export default function ChatList({ data, deleteRoom, userStatus }) {

  const navigation = useNavigation();

  function openChat(){
    
    if(userStatus){
      navigation.navigate('Messages', { thread: data});
    }else{
      navigation.navigate('Login');
    }
    
  }

 return (
   <Container onPress={ openChat } onLongPress={ () => deleteRoom && deleteRoom() } >
    <TitleContainer> { data.name } </TitleContainer>
    <TextCont> { data.lastMessage.text } </TextCont>
   </Container>
  );
}