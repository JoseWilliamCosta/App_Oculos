// Biblioteca básica
import React from "react";

//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState } from "react";

// Imports de componentes para IG do React
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from "react-native"

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

export default function ListarUsuarios() {

    // Dados da lista
    const [dados, setDados] = useState()

    // Navegação entre telas
    const navigation = useNavigation()
    const route = useRoute()

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused

            list()
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions

            };
        }, [])
    );

    const list = async () => {
        //console.log('Entrou \n')
        try {
            console.log(`${server}/usuarios/list`)
            const dt = await axios.post(`${server}/usuarios/list`,
                {
                }
            )

            console.log('OK-list')

            setDados(dt.data.res)

        } catch (e) {
            //showError(e)
            console.log(e)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.containercols}>
                    <View style={styles.itemlistacols50cols}>
                        <Text>{item.nome}</Text>
                        <Text>{item.email}</Text>
                    </View>
                    <View style={styles.itemlistarows50cols}>
                        <TouchableOpacity
                            onPress={() => {
                                //alert(item.idusuario)
                                navigation.navigate('DadosUsuario', { idusuario: item.idusuario })
                            }
                            }
                        >
                            <Text style={styles.button}>Editar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }

    return (
        <View style={styles.containerTop2}>
            <FlatList
                data={dados}
                keyExtractor={user => user.idusuario}
                renderItem={renderItem}
            />
        </View>
    )

}