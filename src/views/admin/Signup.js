// Biblioteca básica
import React from "react";


//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState } from "react";


// Imports de componentes para IG do React
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { StyleSheet } from 'react-native';

// Import de estilos da IG
import styles from '../../globals/GlobalStyles'


//Imports para acesso ao BD
import axios from 'axios'


// Imports para parâmetros do Sistema
import { server } from '../../globals/GlobalVars';


// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function Signup() {
    const [idUsuario, setIdUsuario] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigation = useNavigation()


    const signup = async () => {
        try {
            console.log(`${server}/usuarios/signup`)
            const res = await axios.post(`${server}/usuarios/signup`, {
                //idusuario: idusuario,
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                email: email,
                password: password,
            })


            if (res.data.num_erro == 0) {


                alert(res.data.msg)
                navigation.goBack()
            }


            if (res.data.num_erro == 1) {
                alert(res.data.msg_erro)
            }


        } catch (e) {
            //showError(e)
            console.log(e)
            alert(e)
        }
    }




    return (
        <View style={styles.containerTop}>

            <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', width: '100%',height: '30%', }}>
                <Text style={[styles.titulo1, { textAlign: 'left',  lineHeight: 30}]}>
                    Faça parte da{'\n'}nossa comunidade!
                </Text>
            </View>


            <View style={styles.containerbox}>
                
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input}
                    value={nome}
                    onChangeText={(nome => setNome(nome))}
                />
                <Text style={styles.label}>CPF:</Text>
                <TextInput style={styles.input}
                    value={cpf}
                    onChangeText={(cpf => setCpf(cpf))}
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
                <br></br>
                
                <TouchableOpacity style={{width:'250px',alignSelf: 'center' }} onPress={signup}>
                    <Text style={styles.button}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>

        
    )

    
}
