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
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

export default function DadosUsuario() {
    const [idusuario, setIdUsuario] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCPF] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            //alert('OK ' + route.params.idusuario)
            getUsuario()
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                //setLoad(true)
                route.params = null
            };
        }, [])
    );

    let getUsuario = async () => {
        console.log('Id: ' + route.params.idusuario)
        try {
            console.log(`${server}/usuarios/get`)
            const user = await axios.post(`${server}/usuarios/get`, {
                idusuario: route.params.idusuario,
            })
            //console.log(user.data)
            setIdUsuario(user.data.res.idusuario)
            setNome(user.data.res.nome)
            setCPF(user.data.res.cpf)
            setTelefone(user.data.res.telefone)
            setEmail(user.data.res.email)
        } catch (e) {
            //showError(e)
            // @TODO
            // Colocar msg erro com Modal
            console.log(e)
        }
    }

    const update = async () => {

    }


    return (
        <View style={styles.containerTop}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Dados de Usuário</Text>
                <Text style={styles.label}>Id. Usuário:</Text>
                <TextInput style={styles.input}
                    value={idusuario}
                    //onChangeText={(idUsuario => setIdUsuario(idUsuario))}
                />
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input}
                    value={nome}
                    onChangeText={(nome => setNome(nome))}
                />
                <Text style={styles.label}>CPF:</Text>
                <TextInput style={styles.input}
                    value={cpf}
                    onChangeText={(cpf => setCPF(cpf))}
                />
                <Text style={styles.label}>Telefone:</Text>
                <TextInput style={styles.input}
                    value={telefone}
                    onChangeText={(telefone => setTelefone(telefone))}
                />
                <Text style={styles.label}>E-mail:</Text>
                <TextInput style={styles.input}
                    value={email}
                    onChangeText={(email => setEmail(email))}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={update}
                >
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}