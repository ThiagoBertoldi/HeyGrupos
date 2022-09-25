import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Container, Title, ButtonModal, ButtonText, Input, Background } from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ModalNewRoom({ setVisibleModal, setUpdateScreen }) {
    const [roomName, setRoomName] = useState('');
    const user = auth().currentUser.toJSON();

    function handleButtonCreate(){
        if(roomName === '' || roomName === null) return;

        firestore().collection('MESSAGE_THREADS').get()
        .then((snapshot) => {
            let myThreads = 0;

            snapshot.docs.map( docItem => {
                if(docItem.data().owner == user.uid){
                    myThreads += 1;
                }
            })

            if(myThreads >= 4){
                alert('Você já atingiu o limite de grupos por usuário!')
            }else{
                createRoom();
            }
        })

    }

    function createRoom(){
        firestore().collection('MESSAGE_THREADS').add({
            name: roomName,
            owner: user.uid,
            lastMessage:  {
                text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }
        })
        .then( (docRef) => {
            docRef.collection('MESSAGES').add({
                text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
                system: true
            })
            .then( () => {
                setVisibleModal();
            })
            .catch((error) => {
                console.log('Error: ' + error.code);
            })

            setVisibleModal();
            setUpdateScreen();
        })
        .catch((error) => {
            console.log('Error: ' + error.code)
        })
    }

 return (
   <Container>
        <Background>
            <Title> Criar novo grupo? </Title>
            <Input
                placeholder='Qual o nome da sala?'
                value={ roomName }
                onChangeText={ (value) => setRoomName(value) }
            />

            <ButtonModal onPress={ () => handleButtonCreate() } bg='#2354d4'>
                <ButtonText> Criar sala </ButtonText>
            </ButtonModal>
            <ButtonModal onPress={ setVisibleModal } bg='#F64B57'>
                <ButtonText> Voltar </ButtonText>
            </ButtonModal>
        </Background>
   </Container>
  );
}