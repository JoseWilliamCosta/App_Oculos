// Biblioteca básica
import React from "react";

//Import de bibliotecas de navegação Stack entre telas
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Import de telas
import Signin from './src/views/Signin'
import AreaUsuario from "./src/views/AreaUsuario";
import Signup from './src/views/Signup'
import ListarUsuarios from "./src/views/ListarUsuarios";
import DadosUsuario from "./src/views/DadosUsuario";


const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        backBehavior="history" initialRouteName="Signin">
        <Drawer.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="AreaUsuario"
          component={AreaUsuario}
          options={{ title: 'Área do Usuário' }}
        />
        <Drawer.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Cadastrar Usuário' }}
        />
        <Drawer.Screen
          name="ListarUsuarios"
          component={ListarUsuarios}
          options={{ title: 'Listar Usuários' }}
        />
        <Drawer.Screen
          name="DadosUsuario"
          component={DadosUsuario}
          options={{ title: 'Dados do Usuário', drawerItemStyle: { display: 'none' } }}
        />
         {/*
        
        <Drawer.Screen
          name="PerfilUsuario"
          component={PerfilUsuario}
          options={{ title: 'Perfil do Usuário' }}
        />*/}

      </Drawer.Navigator>
    </NavigationContainer>
  );
}