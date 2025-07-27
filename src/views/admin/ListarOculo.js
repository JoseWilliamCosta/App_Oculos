// Biblioteca básica
import React, { useState, useEffect } from "react";

// Imports de componentes para IG do React
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";

// Import de estilos da IG
import styles from '../../globals/GlobalStyles';

// Imports para acesso ao BD
import axios from 'axios';

// Imports para parâmetros do Sistema
import { server } from '../../globals/GlobalVars';

// Bibliotecas do Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ListarOculos() {

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [idOculosRem, setIdOculosRem] = useState(0);

    const [dados, setDados] = useState([]);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            list();
            return () => { };
        }, [])
    );

    useEffect(() => {
        if (confirmDel) {
            rem(idOculosRem);
            setConfirmDel(false);
        }
    }, [confirmDel]);

    const rem = async (id_oculos) => {
        try {
            const res = await axios.post(`${server}/oculos/remover`, {
                id_oculos: id_oculos,
            });

            if (res.data.num_erro === 0) {
                alert(res.data.msg);
                list();
            } else {
                alert(res.data.msg_erro);
            }

        } catch (e) {
            console.log(e);
        }
    };

    const list = async () => {
        try {
            const dt = await axios.post(`${server}/oculos/listar`, {});
            setDados(dt.data.res);
        } catch (e) {
            console.log(e);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.containercols}>
                <View style={styles.itemlistacols50cols}>
                    <Text>Modelo: {item.modelo}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>Firmware: {item.firmware_version}</Text>
                    <Text>ID Usuário: {item.idusuario}</Text>
                </View>
                <View style={styles.itemlistarows50cols}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DadosOculos', { id_oculos: item.id_oculos });
                        }}
                    >
                        <Text style={styles.button}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                            setIdOculosRem(item.id_oculos);
                        }}
                    >
                        <Text style={styles.button}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const delRegistro = () => {
        setModalVisible(false);
        setConfirmDel(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setConfirmDel(false);
    };

    return (
        <View style={styles.containerTop2}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 20 }}>Você quer realmente excluir o registro?</Text>
                        <TouchableOpacity onPress={delRegistro}>
                            <Text style={styles.button}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={fecharModal}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={dados}
                keyExtractor={item => item.id_oculos.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}
