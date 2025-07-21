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
import { prerenderToNodeStream } from "react-dom/static";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";

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
                <Image
                    source={require('../img/img1_aurora.jpg')}
                    style={{ width: '100%', height: 400 }}
                    resizeMode="contain"
                />
            </View>
            <View style={styles_login.container}>

                <View style={styles_login.arealogo}>
                    <Image
                        source={require('../img/logo_aurora.png')}
                        style={{ width: 500, height: 200 }}
                    />
                </View>
                <View style={styles_login.card_login}>
                    <View style={styles_login.inputContainer}>
                        <FontAwesomeIcon icon={faUser} style={styles_login.icon} />
                        <TextInput
                            style={styles_login.inputText}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="E-mail"
                            placeholderTextColor="#888"
                            autoCapitalize="none"
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={styles_login.inputContainer}>
                        <FontAwesomeIcon icon={faLock} style={styles_login.icon} />
                        <TextInput
                            style={styles_login.inputText}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Senha"
                            placeholderTextColor="#888"
                            secureTextEntry={true}

                        />
                    </View>
                    <TouchableOpacity
                        onPress={signin}
                    >
                        <Text style={styles_login.button}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView >
    )

}

const styles_login = ({
    container_login: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        width: '100%',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    areaimagem: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    },
    arealogo: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerbox_login: {
        width: '100%',
        height: 700,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_login: {
        width: '70%',
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 25,
        paddingVertical: 5,
        width: '40%',
    },
    icon: {
        marginRight: 10,
        fontSize: 22,
        color: '#222',
    },
    inputText: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#222',
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 0,
        outline: 'none',
    },
    button: {
        width: '200px',
        height: 50,
        backgroundColor: 'black',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 50,
        borderRadius: 5,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

