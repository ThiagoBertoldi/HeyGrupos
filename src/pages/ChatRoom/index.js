import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Container, HeaderRoom, HeaderRoomLeft, ButtonHeaderLeft, TextHeaderLeft, ButtonHeaderRigth, Modal, List } from './styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

  }, [isFocused, updateScreen]);
 
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

  function deleteRoom(owner, idRoom){
    if(owner !== user?.uid) return;

    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja deletar essa sala?",
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => handleDeleteRoom(idRoom),
        }
      ]
    )

  }    

  async function handleDeleteRoom(idRoom){
    await firestore().collection('MESSAGE_THREADS').doc(idRoom).delete();

    setUpdateScreen(!updateScreen);
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
        <ButtonHeaderRigth onPress={ () => navigation.navigate('Search')}>
          <MaterialIcons name="search" size={28} color="#fff"/>
        </ButtonHeaderRigth>
      </HeaderRoom>

      <List
        showVerticalScrollIndicator={ false }
        data={threads}
        key={ item => item._id }
        renderItem={ ({ item }) => ( 
          <ChatList 
            data={item} 
            deleteRoom={ () => deleteRoom( item.owner, item._id ) } 
            userStatus={ user } 
          /> ) }
      />
     
      <FabButton 
        setVisibleModal={ () => setModal(true) } 
        userStatus={ user } 
      />
      
      <Modal
        visible={ modal }
        transparent={ true }
      >
        <ModalNewRoom 
          setVisibleModal={ () => setModal(false) } 
          setUpdateScreen={ () => setUpdateScreen(!updateScreen) } />
      </Modal>
   </Container>
  );
}