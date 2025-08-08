// Biblioteca básica
import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";

// Imports para acesso ao BD
import axios from 'axios';
import { server } from '../globals/GlobalVars';

// Hook para esconder/mostra botões
import useUsuarioLogado from "./admin/useUsuarioLogado";

// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';

export default function AreaUsuario() {

    const navigation = useNavigation();
    const usuario = useUsuarioLogado();

    if (!usuario) return null;

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
        <View style={estilos.background}>
            {/* Imagem de fundo posicionada à esquerda, menor e transparente */}
            <Image
                source={require('../img/ativo2.png')}
                style={estilos.fundoImg}
                resizeMode="contain"
            />
            <View style={estilos.container}>
                {/* Título com imagem */}
                <View style={estilos.tituloContainer}>
                    <Text style={estilos.titulo}>Menu</Text>
                    <Image
                        source={require('../img/ativo2.png')}
                        style={estilos.iconeMenu}
                    />
                </View>

                {/* Grid de botões */}
                <View style={estilos.grid}>
                    <TouchableOpacity style={estilos.botao} onPress={navtoPerfilUsuario}>
                        <Text style={estilos.botaoTexto}>Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.botao} onPress={navtoSignup}>
                        <Text style={estilos.botaoTexto}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.botao} onPress={navListaOculos}>
                        <Text style={estilos.botaoTexto}>Listar Óculos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.botao} onPress={navListUsuarios}>
                        <Text style={estilos.botaoTexto}>Listar Usuário</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão maior */}
                <TouchableOpacity style={estilos.botaoGrande} onPress={navMQTTAula}>
                    <Text style={estilos.botaoTexto}>Informações do Óculos</Text>
                </TouchableOpacity>

                {/* Rodapé */}
                <Text style={estilos.rodape}>Aurora/ version2®</Text>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
   background: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    fundoImg: {
        position: 'absolute',
        left: -45,
        top: 80,
        width: 120, 
        height: 1000, 
        opacity: 0.15, 
        zIndex: 0,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingVertical: 20,
        zIndex: 1,
    },
    tituloContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    titulo: {
        fontSize: 45,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: '#000'
    },
    iconeMenu: {
        width: 32,
        height: 60,     
        marginLeft: 10,
    },
    grid: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10
    },
    botao: {
        backgroundColor: '#ffb300',
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: 140,
        alignItems: 'center',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    botaoGrande: {
        backgroundColor: '#ffb300',
        paddingVertical: 25,
        borderRadius: 10,
        width: '75%',
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    botaoTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000'
    },
    rodape: {
        marginTop: 20,
        fontSize: 14,
        color: '#555'
    }
});