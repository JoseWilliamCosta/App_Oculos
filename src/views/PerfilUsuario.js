import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image } from 'react-native'
import axios from 'axios'
import { useRoute, useNavigation } from '@react-navigation/native'
import { server } from '../globals/GlobalVars'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUsuarioLogado from "./admin/useUsuarioLogado";

export default function PerfilUsuario() {
    const [idusuario, setIdUsuario] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCPF] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [oculos, setOculos] = useState([])

    const route = useRoute()
    const navigation = useNavigation()
    const usuario = useUsuarioLogado()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const dados = await AsyncStorage.getItem('usuarioLogado')
            if (dados) {
                const usuario = JSON.parse(dados)
                setIdUsuario(usuario.idusuario)
                carregarUsuario(usuario.idusuario)
                carregarOculos(usuario.idusuario)
            }
        })
        return unsubscribe
    }, [navigation])

    const carregarUsuario = async (id) => {
        try {
            const response = await axios.post(`${server}/usuarios/get`, { idusuario: id })
            const user = response.data.res
            setIdUsuario(user.idusuario)
            setNome(user.nome)
            setCPF(user.cpf)
            setTelefone(user.telefone)
            setEmail(user.email)
        } catch (e) {
            console.error('Erro ao buscar usuário:', e)
        }
    }

    const carregarOculos = async (id) => {
        try {
            const response = await axios.post(`${server}/oculos/listar`, { idusuario: id })
            setOculos(response.data.res)
        } catch (e) {
            console.error('Erro ao buscar óculos:', e)
        }
    }
    
    if (!usuario) return null 

 return (
        <ScrollView contentContainerStyle={styles.scrollContainer}
        testID="perfilusuario-teste"
        >
            {/* Logo de fundo */}
            <Image
                source={require('../img/ativo2.png')}
                style={styles.logoFundo}
                resizeMode="contain"
            />

            {/* Imagem de perfil */}
            <View style={styles.perfilContainer}>
                <Image
                    source={require('../img/per.arturo.jpg')}
                    style={styles.fotoPerfil}
                  
                />
            </View>

            {/* Card amarelo com dados e botões */}
            <View style={styles.cardInfo}>
                {/* Dados em linha */}
                <View style={styles.linhaDados}>
                    <Text style={styles.label}>Nome: <Text style={styles.info}>{nome}</Text></Text>
                    <Text style={styles.label}>CPF: <Text style={styles.info}>{cpf}</Text></Text>
                </View>
                <View style={styles.linhaDados}>
                    <Text style={styles.label}>Telefone: <Text style={styles.info}>{telefone}</Text></Text>
                  
                </View>
                <View style={styles.linhaDados}>
                    <Text style={styles.label}>E-mail: <Text style={styles.info}>{email}</Text></Text>
                </View>

                {/* Botões em linha */}
                <View style={styles.linhaBotoes}>
                    <TouchableOpacity
                        testID="edit-button" 
                        onPress={() => navigation.navigate('DadosUsuario', { idusuario: idusuario })}
                        style={[styles.buttonContainer, { backgroundColor: '#4CAF50' }]}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem('usuarioLogado')
                            navigation.navigate('Signin')
                        }}
                        style={[styles.buttonContainer, { backgroundColor: '#E53935' }]}
                    >
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>


                    {usuario.tipo === 'comum' && (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CadastroOculos', { idusuario: idusuario })}
                            style={[styles.buttonContainer, { backgroundColor: '#2196F3' }]}
                        >
                            <Text style={styles.buttonText}>Criar Óculos</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Versão abaixo do card */}
           

            {/* Lista de óculos, se for usuário comum */}
            {usuario.tipo === 'comum' && (
                <>
                    <Text style={styles.subtitulo}>Seus Óculos:</Text>
                    <FlatList
                        data={oculos}
                        keyExtractor={item => item.id_oculos.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text>Modelo: {item.modelo}</Text>
                                <Text>Status: {item.status}</Text>
                                <Text>Firmware: {item.firmware_version}</Text>
                            </View>
                        )}
                    />
                </>
            )}
            <View style={styles.versaoContainer}>
                <Text style={styles.versaoTexto}>
                    Aurora/version2
                    <Text style={styles.rCircle}>®</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: '#fff',
        minHeight: '100%',
    },
    logoFundo: {
        position: 'absolute',
        top: 500,
        left: -100,
        width: '60%',
        height: 280,
        opacity: 0.15,
        zIndex: 0,
    },
    perfilContainer: {
        marginTop: 40,
        marginBottom: -90, 
        alignItems: 'center',
        zIndex: 2,
    },
    fotoPerfil: {
        width: 140,
        height: 140,
        borderRadius: 70,
        elevation: 5,
    },
    cardInfo: {
        backgroundColor: '#ffb300',
        borderRadius: 20,
        padding: 22,
        alignItems: 'center',
        marginBottom: 18,
        marginTop: 50,
        width: '90%',
        height: 350,
        elevation: 4,   
        zIndex: 1,
    },
    linhaDados: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 8,
        gap: 10,
    },
    label: {
        top: 40,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#222',
        marginRight: 10,
        fontFamily: 'sans-serif'
    },
    info: {
        fontWeight: 'normal',
        color: '#444',
        fontSize: 15,
        fontFamily: 'sans-serif'
    },
    linhaBotoes: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
        gap: 10,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 8,
        top: 160,
        minWidth: 90,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    subtitulo: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    versaoContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    versaoTexto: {
        fontSize: 16,
        color: '#535151ff',
        fontFamily: 'sans-serif',
        fontWeight: 'light',
        letterSpacing: 1,
    },
    rCircle: {
        fontSize: 13,
        color: '#5d5a5aff',
        fontWeight: 'bold',
        marginLeft: 2,
        paddingHorizontal: 4,
        paddingVertical: 0,
        textAlign: 'center',
        overflow: 'hidden',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    }
});