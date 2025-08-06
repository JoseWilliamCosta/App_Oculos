import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'
import axios from 'axios'
import { useRoute, useNavigation } from '@react-navigation/native'
import { server } from '../globals/GlobalVars'
import AsyncStorage from '@react-native-async-storage/async-storage'
// Hook para esconder/mostra botões
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
    
    if (!usuario) return null // ou um loader "Carregando..."
    return (
        <ScrollView testID='perfilusuario-teste'>
        <View style={styles.container}>
            <Text style={styles.titulo}>Perfil do Usuário</Text>

            <Text style={styles.label}>ID:</Text>
            <Text style={styles.info}>{idusuario}</Text>

            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.info}>{nome}</Text>

            <Text style={styles.label}>CPF:</Text>
            <Text style={styles.info}>{cpf}</Text>

            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.info}>{telefone}</Text>

            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.info}>{email}</Text>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DadosUsuario', { idusuario: idusuario })
                }}
                style={styles.buttonContainer}
            >
                <Text style={styles.button}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={async () => {
                    await AsyncStorage.removeItem('usuarioLogado')
                    navigation.navigate('Signin')
                }}
                style={styles.buttonContainer}
            >
                <Text style={styles.button}>Sair</Text>
            </TouchableOpacity>

            {usuario.tipo === 'comum' && (
                <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CadastroOculos', { idusuario: idusuario })}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.button}>Criar Óculos</Text>
                    </TouchableOpacity>

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
                        )}/>
                </>
            )}
        </View></ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitulo: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
        color: '#444',
    },
    buttonContainer: {
        marginTop: 12,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#4682B4',
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        borderRadius: 8,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    }
})