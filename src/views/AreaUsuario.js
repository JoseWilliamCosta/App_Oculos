// Biblioteca básica
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";

// Imports para acesso ao BD
import axios from 'axios';
import { server } from '../globals/GlobalVars';
import AsyncStorage from '@react-native-async-storage/async-storage'


// Hook para esconder/mostra botões
import useUsuarioLogado from "./admin/useUsuarioLogado";

// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';

export default function AreaUsuario() {
    const [idusuario, setIdUsuario] = useState(null);
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const navigation = useNavigation();
    const usuario = useUsuarioLogado();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const dados = await AsyncStorage.getItem('usuarioLogado')
            if (dados) {
                const usuario = JSON.parse(dados)
                setIdUsuario(usuario.idusuario)
                carregarUsuario(usuario.idusuario)
            }
        })
        return unsubscribe
    }, [navigation])

    const carregarUsuario = async (id) => {
        try {
            const response = await axios.post(`${server}/usuarios/get`, { idusuario: id })
            const user = response.data.res
            setNome(user.nome)
            setEmail(user.email)
        } catch (e) {
            console.error('Erro ao buscar usuário:', e)
        }
    }

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
        <View style={estilos.background} testID="areausuario-teste">
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

                    {usuario.tipo === 'comum' && (
                        <>
                            <View style={estilos.area}>
                                <View style={estilos.cartaoUsuario}>
                                    <Image
                                        source={require('../img/per.arturo.jpg')}
                                        style={estilos.fotoPerfil}
                                    />
                                    <View style={estilos.infoUsuario}>
                                        <Text style={estilos.nomeUsuario}>{nome}</Text>
                                        <Text style={estilos.username}>{email}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={estilos.botao} onPress={navtoPerfilUsuario}>
                                    <Text testID='Bperfil' style={estilos.botaoTexto}>Perfil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilos.botao} /*onPress={}*/>
                                    <Text style={estilos.botaoTexto}>Sobre</Text>
                                </TouchableOpacity>
                            </View>
                        </>)}
                    {usuario.tipo === 'admin' && (
                        <>
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
                        </>
                    )}
                </View>
                {usuario.tipo === 'admin' && (
                    <>
                        {/* Botão maior */}
                        <TouchableOpacity style={estilos.botaoGrande} onPress={navMQTTAula}>
                            <Text style={estilos.botaoTexto}>Informações do Óculos</Text>
                        </TouchableOpacity>
                    </>
                )}
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
        margin: 10
    },
    botao: {
        backgroundColor: '#ffb300',
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: 149,
        alignItems: 'center',
        margin: 8,
        // Tentativa de dar mais profundidade
        elevation: 3, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.50,
        shadowRadius: 5,
    },
    botaoGrande: {
        backgroundColor: '#ffb300',
        paddingVertical: 25,
        borderRadius: 10,
        width: '75%',
        alignItems: 'center',
        marginTop: 15,

        // Tentativa de dar mais profundidade
        elevation: 3, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.50,
        shadowRadius: 5,
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
    },

    // Cartão do usuario comum:
    area: {
        width: 400,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 20
    },
    cartaoUsuario: {
        backgroundColor: '#ffb300',
        borderRadius: 20,
        width: 300,
        height: 120, // mais baixo
        flexDirection: 'row', // imagem e infos lado a lado
        alignItems: 'center',
        padding: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginTop: 60,
    },
    fotoPerfil: {
        width: 90,
        height: 90,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#fff',
        marginRight: 15, // espaço entre foto e texto
    },
    infoUsuario: {
        flex: 1,
        justifyContent: 'center',
    },
    nomeUsuario: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
    },
    username: {
        fontSize: 14,
        color: '#444',
        marginTop: 4,
    },
    linkAvancado: {
        marginTop: 40,
        alignSelf: 'stretch',  // Para ocupar toda largura possível dentro do cartão
    },
    linkTexto: {
        fontSize: 16,
        color: '#fafafaff',
        backgroundColor: '#000000ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
});
