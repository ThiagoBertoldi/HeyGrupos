import React, { useState, useEffect } from 'react';
import { Container, ContainerInput, Input, ButtonSearch, List } from './styles';

import Feather from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ChatList from '../../components/ChatList';

import { useIsFocused } from '@react-navigation/native';
import { Keyboard } from 'react-native';

export default function Search() {
  const isFocused = useIsFocused();
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {

    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);

  }, [isFocused]);

  async function handleSearch(){
    if(input === '') return;

    const responseSearch = await firestore().collection('MESSAGE_THREADS')
    .where('name', '>=', input)
    .where('name', '<=', input + '\uf8ff')
    .get()
    .then( (querySnapshot) => {
      const threads = querySnapshot.docs.map( docSnapshot => {
        return {
          _id: docSnapshot.id,
          name: '',
          lastMessage: { text: '' },
          ...docSnapshot.data()
        }
      });

      setChats(threads);
      setInput('');
      Keyboard.dismiss();

    });

  }

  return (
    <Container>
      <ContainerInput>
        <Input 
          placeholder='Digite aqui...'
          value={ input }
          onChangeText={ (value) => setInput(value) }
          autoCapitalize={'none'}
        />
        <ButtonSearch onPress={ () => handleSearch() }>
          <Feather size={ 25 } color='#FFF' name='search' />
        </ButtonSearch>
      </ContainerInput>

      <List
        showVerticalScrollIndicator={ false }
        data={ chats }
        keyExtractor={ item => item._id }
        renderItem={ ({ item }) => (
          <ChatList data={ item } userStatus={ user } />
        ) }
      />

    </Container>
    );
}