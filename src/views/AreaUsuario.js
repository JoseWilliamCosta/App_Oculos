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

// Hook para esconder/mostra botões
import useUsuarioLogado from "./admin/useUsuarioLogado";

// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';

export default function AreaUsuario() {

    const navigation = useNavigation()

    const usuario = useUsuarioLogado()

    if (!usuario) return null // ou um loader "Carregando..."

    const navtoPerfilUsuario = () => {
        navigation.navigate('PerfilUsuario')
    }

    const navtoSignup = () => {
        navigation.navigate('Signup')
    }

    const navListUsuarios = () => {
        navigation.navigate('ListarUsuarios')
    }

    const navListaOculos = () => {
        navigation.navigate('ListarOculos')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navtoPerfilUsuario}>
                <Text style={styles.card}>Perfil do Usuário</Text>
            </TouchableOpacity>

            {usuario.tipo === 'admin' && (
                <>
                    <TouchableOpacity onPress={navtoSignup}>
                        <Text style={styles.card}>Cadastrar Usuário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navListUsuarios}>
                        <Text style={styles.card}>Listar Usuários</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navListaOculos}>
                        <Text style={styles.card}>Listar Óculos</Text>
                    </TouchableOpacity>
                </>
            )}

            {usuario.tipo === 'comum' && (
                <>

                <TouchableOpacity /*onPress={}*/>
                        <Text style={styles.card}>!!</Text>
                </TouchableOpacity>
                    <Text>Você é um usuário comum</Text>

                </>
            )}
        </View>
    )
}