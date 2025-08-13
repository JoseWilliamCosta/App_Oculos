import React, { useState, useCallback } from 'react';
import { useContext } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../globals/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faHome, faUsers, faGlasses, faEye, faMicrochip, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


export default function CustomDrawerContent(props) {
  const { usuario } = useContext(UserContext);

  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const { state, navigation } = props;

  // Função para renderizar um item customizado
  function DrawerButton({icon, label, routeName }) {
    const isActive = state.routeNames[state.index] === routeName;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        style={[styles.button, isActive && styles.activeButton]}
        activeOpacity={0.7}
      >
        <FontAwesomeIcon icon={icon} size={18} style={{ marginRight: 12, color: isActive ? 'black' : '#555' }} />
        <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('usuarioLogado');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signin' }],
    });
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <DrawerButton label="Perfil" routeName="PerfilUsuario" icon={faUser} />
      <DrawerButton label="Área do Usuário" routeName="AreaUsuario" icon={faHome} />
      <DrawerButton label="MQTT Dados" routeName="MQTTAula" icon={faMicrochip} />

      {usuario?.tipo === 'admin' && (
        <>
          <DrawerButton label="Cadastrar Usuários" routeName="Signup" icon={faUsers} />
          <DrawerButton label="Listar Usuários" routeName="ListarUsuarios" icon={faUsers} />
          <DrawerButton label="Listar Óculos" routeName="ListarOculos" icon={faGlasses} />
          <DrawerButton label="Detecção" routeName="Deteccao" icon={faEye} />
          
        </>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <FontAwesomeIcon icon={faSignOutAlt} size={18} style={{ marginRight: 12, color: '#555' }} />
        <Text style={styles.label}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa', // fundo claro suave, melhor que transparente
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginVertical: 4,
  },
  activeButton: {
    backgroundColor: '#ffb300',
    borderRadius: 8,
    marginVertical: 4,
  },
  label: {
    color: '#333333',
    fontSize: 16,
    flex: 1,
  },
  activeLabel: {
    fontWeight: 'bold',
    color: 'black', // texto branco no ativo para contraste
  },
});