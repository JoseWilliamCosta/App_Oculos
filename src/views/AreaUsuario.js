// Biblioteca básica
import React from "react";

//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState } from "react";

// Imports de componentes para IG do React
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"

// Import de estilos da IG
import styles from '../globals/GlobalStyles'

//Imports para acesso ao BD
import axios from 'axios'

// Imports para parâmetros do Sistema
import { server } from '../globals/GlobalVars';

// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';

export default function AreaUsuario() {

    const navigation = useNavigation()

    const navtoSignup = () => {
        navigation.navigate('Signup')
    }

    const navListUsuarios = () => {
        navigation.navigate('ListarUsuarios')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
            //onPress={navtoPerfilUsuario}
            >
                <Text style={styles.card}>Perfil do Usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={navtoSignup}
            >
                <Text style={styles.card}>Cadastrar Usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={navListUsuarios}
            >
                <Text style={styles.card}>Listar Usuários</Text>
            </TouchableOpacity>
        </View>
    )
}