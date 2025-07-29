// Biblioteca básica
import React from "react";

//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../globals/UserContext";

// Imports de componentes para IG do React
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native"


// Imports de ícones do FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
//-----------------------
//cmd para instalar os ícones
//npm install @fortawesome/react-native-fontawesome @fortawesome/free-solid-svg-icons
//------------------------

// Biblioteca para armazenamento local persistente (armazenar usuário logado etc)
// cmd para instalar: npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    const { setUsuario } = useContext(UserContext); // 👈 Aqui

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
                const usuario = res.data.res

                // Armazenar os dados do usuário no AsyncStorage
                await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario))
                setUsuario(usuario); // 👈 Atualiza o contexto global
                alert(res.data.msg)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AreaUsuario' }],
                });
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

            <Image style={styles_login.areaimagem}
                source={require('../img/img1_aurora.jpg')}
                resizeMode="cover" />


            <View style={styles_login.container}>

                <View style={styles_login.arealogo}>
                    <Image
                        source={require('../img/logo_aurora.png')}
                        style={{ width: 200, height: 80, resizeMode: 'contain' }}
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
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        width: '100%',
        height: 370,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        marginTop: -50, // <- aqui está o segredo
        backgroundColor: '#fff', // Certifique-se que o fundo cubra a imagem
        paddingBottom: 40, // espaço inferior extra
    },
    areaimagem: {
        width: '100%',
        height: '60%',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    },
    arealogo: {
        width: '100%',
        height: 100,
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
        width: '80%', // Aumentado para dar mais espaço
        maxWidth: 400, // Limite para telas grandes
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

