import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, SubTitle, InputArea, Input, ButtonLogin, TextButton, ToggleLoginButton, ToggleText } from './styles';

import auth from '@react-native-firebase/auth';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [signInMethod, setsignInMethod] = useState(false);
  
  function toggleLogin(){
    setsignInMethod(!signInMethod);
    setEmail('');
    setName('');
    setPass('');
  }

  function handleSignIn(){
    if(email === '' || pass === ''){
      return alert('Preencha todos os campos!!');
    }

    auth().signInWithEmailAndPassword(email, pass)
    .then( () => {
      navigation.goBack();
    }).catch( (error) => {
      if(error.code === 'auth/invalid-email'){
        console.log('That email address is invalid!');
      }
    })

  }

  function handleSignUp(){
    if(name === '' || email === '' || pass === ''){
      return alert('Preencha todos os campos!!');
    }

    auth().createUserWithEmailAndPassword(email, pass)
    .then( (snapshot) => {
      snapshot.user.updateProfile({
        displayName: name,
      }).then( () => {
        navigation.goBack();
      }).catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
          console.log('That email addres is already in use!');
        }

        if(error.code === 'auth/invalid-email'){
          console.log('That email address is invalid!');
        }
      })
    }).catch( (error) => {
      return alert('Erro ao cadastrar usuário: ' + error.code);
    })

  }


 return (
   <Container>

    <Title>HeyGrupos</Title>
    <SubTitle>Ajude, colabore, faça networking!</SubTitle>

    <InputArea>
      { signInMethod && (
        <Input 
          placeholder='Thiago Bertoldi'
          value={ name }
          onChangeText={ (value) => setName(value) }
        />
      )}
      <Input 
        placeholder='exemplo@gmail.com'
        value={ email }
        onChangeText={ (value) => setEmail(value) }
      />
      <Input 
         placeholder='*********'
         value={ pass }
         onChangeText={ (value) => setPass(value) }
         secureTextEntry={ true }
      />
    </InputArea>
    <ButtonLogin bg={ signInMethod ? '#f64b57' : '#51c880'} onPress={ () => { signInMethod ? handleSignUp() : handleSignIn() } }>
      <TextButton> { signInMethod ? 'Cadastrar' : 'Acessar' } </TextButton>
    </ButtonLogin>

    <ToggleLoginButton onPress={ () => toggleLogin() }>
      <ToggleText> { signInMethod ? 'Já possuo uma conta' : 'Criar uma nova conta' } </ToggleText>
    </ToggleLoginButton>

   </Container>
  );
}