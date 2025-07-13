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

export default function Signin() {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('123456')

    const navigation = useNavigation()

    const signin = async () => {
        try {
            const res = await axios.post(`${server}/usuarios/signin`,
                {
                    email: email,
                    password: password
                }
            )

            if (res.data.num_erro == 0) {

                alert(res.data.msg)
                navigation.navigate('AreaUsuario')
            }

            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)
            }

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Sistema de Estacionamento</Text>
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
                    onPress={signin}
                >
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}