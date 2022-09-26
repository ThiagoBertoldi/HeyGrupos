import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Container, List, Input, ContainerInput, MainContainerInput, Button } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ChatMessages from '../../components/ChatMessages';

export default function Messages({ route }) {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const { thread } = route.params;

  const user = auth().currentUser.toJSON();

  useEffect( () => {
    
    const unsubscribeListener = firestore().collection('MESSAGE_THREADS').doc(thread._id).collection('MESSAGES')
    .orderBy('createdAt', 'desc')
    .onSnapshot( querySnapshot => {
      const messages = querySnapshot.docs.map( docs => {
        const firebaseData = docs.data();

        const data = { 
          _id: docs.id,
          text: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          ...firebaseData
        }

        if(!firebaseData.system){
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.displayName
          }
        }

        return data;
      });

      setMessages(messages);

    });

    return () => {
      unsubscribeListener();
    }

  }, []);

  async function handleSend(){
    if(input === '') return;

    await firestore().collection('MESSAGE_THREADS').doc(thread._id).collection('MESSAGES')
    .add({
      text: input,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: user.uid,
        displayName: user.displayName,
      }
    })

    await firestore().collection('MESSAGE_THREADS').doc(thread._id)
    .set(
      {
        lastMessage: {
          text: input,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      },
      { 
        merge: true 
      }
    )

    setInput('');

  }

 return (
   <Container>
    <List
      data={ messages }
      keyExtractor={ item => item._id }
      renderItem={ ({item}) => (
        <ChatMessages data={ item } />
      ) }
      inverted={ true }
    />
    <ContainerInput
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <MainContainerInput>

        <Input
          placeholder='Digite sua mensagem ...'
          value={ input }
          onChangeText={ (value) => setInput(value) }
          multiline={ true }
          autoCorrect={ false }
        />

      </MainContainerInput>
      <Button onPress={ () => handleSend() }>
          <Feather name='send' size={ 27 } color='#FFF' />
      </Button>
    </ContainerInput>
   </Container>
  );
}