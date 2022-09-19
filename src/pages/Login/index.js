import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container, Title, SubTitle, InputArea, Input, ButtonLogin, TextButton, ToggleLoginButton, ToggleText } from './styles';

export default function Login() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [signUpMethod, setSignUpMethod] = useState(false);

  function toggleLogin(){
    signUpMethod ? setSignUpMethod(false) : setSignUpMethod(true);
    setEmail('');
    setName('');
    setPass('');
  }

 return (
   <Container>

    <Title>HeyGrupos</Title>
    <SubTitle>Ajude, colabore, faça networking!</SubTitle>

    <InputArea>
      <Input 
        placeholder='exemplo@gmail.com'
        value={ email }
        onChangeText={ (value) => setEmail(value) }
      />
      { signUpMethod && (
        <Input 
          placeholder='Thiago Bertoldi'
          value={ name }
          onChangeText={ (value) => setName(value) }
        />
      )}
      <Input 
         placeholder='*********'
         value={ pass }
         onChangeText={ (value) => setPass(value) }
      />
    </InputArea>
    <ButtonLogin onPress={ () => {} }>
      <TextButton> { signUpMethod ? 'Cadastrar' : 'Acessar' } </TextButton>
    </ButtonLogin>

    <ToggleLoginButton onPress={ () => toggleLogin() }>
      <ToggleText> { signUpMethod ? 'Já tenho uma conta' : 'Criar uma nova conta' } </ToggleText>
    </ToggleLoginButton>

   </Container>
  );
}