// Biblioteca básica
import React from "react";

//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState } from "react";

// Imports de componentes para IG do React
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native"


// Imports de ícones do FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
//-----------------------
//cmd para instalar os ícones
//npm install @fortawesome/react-native-fontawesome @fortawesome/free-solid-svg-icons
//------------------------

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
        <ScrollView contentContainerStyle={styles_login.container_login}>
            <View style={styles_login.areaimagem}>
                Area imagem
            </View>
            <View style={styles_login.containerbox_login}>
                <View style={styles_login.card_login}>
                    <Text style={styles.label}><FontAwesomeIcon icon={faUser} /> E-mail:</Text>
                    <TextInput style={styles.input}
                        value={email}
                        onChangeText={(email => setEmail(email))}
                    />
                    <Text style={styles.label}><FontAwesomeIcon icon={faLock} /> Senha:</Text>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={password => setPassword(password)}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={signin}
                >
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}

const styles_login = ({
    container_login: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    areaimagem: {
        width: '100%',
        height: 700,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    containerbox_login: {
        width: '100%',
        height: 700,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_login: {
        width: '40%',
        padding: 20,
        borderRadius: 10,

    },
    input: {
        flex: 1,
        fontSize: 20,
        color: '#222',
        fontWeight: 'bold',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        borderWidth: 0,
        textAlign: 'left',
    },
});

