import React, { useEffect, useState } from 'react';
import { Container, HeaderRoom, HeaderRoomLeft, ButtonHeaderLeft, TextHeaderLeft, ButtonHeaderRigth, Modal, List } from './styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, StatusBar } from 'react-native';

import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect( () => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log(hasUser);

    setUser(hasUser);

  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getChats(){
      firestore().collection('MESSAGE_THREADS').orderBy('lastMessage.createdAt', 'desc').limit(10).get()
      .then((snapshot)=>{
        const threads = snapshot.docs.map( documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...documentSnapshot.data()
          }
        })

        if(isActive){
          setThreads(threads);
          setLoading(false);
        }
        
      })
    }

    getChats();

    return () => isActive = false;

  }, [isFocused, updateScreen])
 
    function handleSignOut(){
      auth().signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('Login')
      })
      .catch((error) => {
        alert('Não tem usuário: ' + error);
      })
    }

    function deleteRoom(){
      alert('OK');
    }

    if(loading){
      return(
        <ActivityIndicator color='#000' size='large' />
      )
    }

  return (
   <Container>
    <StatusBar backgroundColor="#2e54d4" />
      <HeaderRoom>
        <HeaderRoomLeft>
          { user && ( 
            <ButtonHeaderLeft onPress={ () => handleSignOut() }>
              <MaterialIcons name="arrow-back" size={28} color="#fff"/>
            </ButtonHeaderLeft>
           ) }
          <TextHeaderLeft>Grupo</TextHeaderLeft> 
        </HeaderRoomLeft>
        <ButtonHeaderRigth>
          <MaterialIcons name="search" size={28} color="#fff"/>
        </ButtonHeaderRigth>
      </HeaderRoom>

      <List
        showVerticalScrollIndicator={ false }
        data={threads}
        key={ item => item._id }
        renderItem={ ({ item }) => ( <ChatList data={item} /> ) }
      />
     
      <FabButton setVisibleModal={ () => setModal(true) } userStatus={ user }  deleteRoom={ () => deleteRoom() } />
      
      <Modal
        visible={ modal }
        transparent={ true }
      >
        <ModalNewRoom setVisibleModal={ () => setModal(false) } setUpdateScreen={ () => setUpdateScreen(!updateScreen) } />
      </Modal>
   </Container>
  );
}