// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const carregarUsuario = async () => {
    try {
      const dados = await AsyncStorage.getItem('usuarioLogado');
      if (dados) setUsuario(JSON.parse(dados));
    } catch (e) {
      console.error('Erro ao carregar usuário:', e);
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}