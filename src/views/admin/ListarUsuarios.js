// Biblioteca básica
import React from "react";

//Import temporário para armazenar as variáveis que ficarão no UseContext
import { useState, useEffect } from "react";

// Imports de componentes para IG do React
import { Modal, View, Text, TextInput, Image, TouchableOpacity, FlatList } from "react-native"

// Import de estilos da IG
import styles from '../../globals/GlobalStyles'

//Imports para acesso ao BD
import axios from 'axios'

// Imports para parâmetros do Sistema
import { server } from '../../globals/GlobalVars';

// Bibliotecas do Navigation
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";

export default function ListarUsuarios() {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idUsuarioRem, setIdUsuarioRem] = useState(0);

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

    React.useEffect(() => {
        if(confirmDel){
            //rem()
            //alert("Remove funcionando")
            rem(idUsuarioRem)
            setConfirmDel(() => false)
        }

    }, [confirmDel])


    

        const rem = async (idusuario) => {
                //console.log('Entrou \n')
                try {
                    console.log(`${server}/usuarios/rem`)
                    const res = await axios.post(`${server}/usuarios/rem`,
                        {
                            idusuario: idusuario,
                        }
                    )

                    if (res.data.num_erro == 0) {
                        alert(res.data.msg)
                        list()
                    }


                    if (res.data.num_erro == 1) {
                        alert(res.data.msg_erro)
                    }


                } catch (e) {
                    //showError(e)
                    console.log(e)
                }
            }

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
                    <TouchableOpacity style={{marginRight: 5}}
                        onPress={() => {
                            //alert(item.idusuario)
                            navigation.navigate('DadosUsuario', { idusuario: item.idusuario })
                        }
                        }
                    >
                        <Text style={styles.button}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            //alert(item.idusuario)
                            setModalVisible(() => true)
                            setIdUsuarioRem(() => item.idusuario)
                        }
                        }
                    >
                        <Text style={styles.button}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const delRegistro = () => {
        setModalVisible(() => false)
        setConfirmDel(() => true)
    }

    const fecharModal = () => {
        setModalVisible(() => false)
        setConfirmDel(() => false)
    }

    return (
        
        <View style={styles.containerTop2}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <View style={{
                        padding: 30, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: '#fa8500ff',
                        borderWidth:3, borderColor:'#000000ff',
                        borderRadius:15,
                    }}>
                        <Text style={{ fontSize: 20 }}>Deseja Confirmar Exclusão?</Text>
                        <View style={{flexDirection: 'row', textAlign: "center"}}>
                            
                            <br></br>
                            <TouchableOpacity 
                                style={{marginRight:10}}
                                onPress={delRegistro}
                            >
                                <Text style={styles.button}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={fecharModal}
                            >
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={dados}
                keyExtractor={user => user.idusuario}
                renderItem={renderItem}
            />
        </View>
        
    )

}