import React, { useState, useCallback } from 'react';
import { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from './UserContext';

export default function CustomDrawerContent(props) {
  const { usuario, setUsuario } = useContext(UserContext);

  if (!usuario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Área do Usuário" onPress={() => props.navigation.navigate('AreaUsuario')} />
      <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('PerfilUsuario')} />

      {usuario?.tipo === 'admin' && (
        <>
          <DrawerItem label="Cadastrar Usuários" onPress={() => props.navigation.navigate('Signup')} />
          <DrawerItem label="Listar Usuários" onPress={() => props.navigation.navigate('ListarUsuarios')} />
          <DrawerItem label="Listar Óculos" onPress={() => props.navigation.navigate('ListarOculos')} />
        </>
      )}

      <DrawerItem
        label="Sair"
        onPress={async () => {
          await AsyncStorage.removeItem('usuarioLogado');
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Signin' }],
          });
        }}
      />
    </DrawerContentScrollView>
  );
}