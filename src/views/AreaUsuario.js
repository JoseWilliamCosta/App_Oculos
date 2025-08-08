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
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";

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

    const navMQTTAula = () => {
        navigation.navigate('MQTTAula')
    }

    return (
        
        <View testID="areausuario-teste" style={styles.container}>
            <View style={styles.caixacinza}>
                
            </View>

            <View style={{
                    position: 'absolute', 
                    justifyContent: 'flex-start',
                    borderRadius:15,
                    backgroundColor: '#fea815',

                    //tamanho
                    top: 10,
                    marginRight: 170,
                    height:'25%',
                    marginTop: 10,
                    marginLeft:10,
                    marginBottom: 10,
                    padding: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 20,
                    width:235

                }}>

                {usuario.tipo === 'admin' && (
                    <Text style={styles.caixalaranja}>DashBoard admin</Text>
                )}
                {usuario.tipo === 'comum' && (
                    <Text style={styles.caixalaranja}>DashBoard comum</Text>
                )}
            </View>
            

                

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

                    <TouchableOpacity onPress={navMQTTAula}>
                        <Text style={styles.card}>Informações oculos</Text>
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

