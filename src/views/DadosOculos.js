import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from '../globals/GlobalStyles';
import axios from 'axios';
import { server } from '../globals/GlobalVars';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

export default function DadosOculos() {
    const [idoculos, setIdOculos] = useState('');
    const [idusuario, setIdUsuario] = useState('');
    const [modelo, setModelo] = useState('');
    const [status, setStatus] = useState('');
    const [firmware, setFirmware] = useState('');

    const navigation = useNavigation();
    const route = useRoute();

    useFocusEffect(
        React.useCallback(() => {
            getOculos();
            return () => {
                route.params = null;
            };
        }, [route.params.idoculos])
    );

    const getOculos = async () => {
        try {
            const response = await axios.post(`${server}/oculos/getOculos`, {
                idoculos: route.params.idoculos
            });

            const oculos = response.data.res;
            setIdOculos(oculos.id_oculos);
            setIdUsuario(oculos.idusuario);
            setModelo(oculos.modelo);
            setStatus(oculos.status);
            setFirmware(oculos.firmware_version);
        } catch (e) {
            console.log(e);
            alert('Erro ao buscar os dados do óculos.');
        }
    };

    const update = async () => {
        try {
            const res = await axios.post(`${server}/oculos/atualizar`, {
                idoculos: idoculos,
                idusuario: idusuario,
                modelo: modelo,
                status: status,
                firmware_version: firmware
            });

            if (res.data.num_erro === 0) {
                alert(res.data.msg);
                navigation.goBack();
            } else {
                alert(res.data.msg_erro);
            }
        } catch (e) {
            console.log(e);
            alert('Erro ao atualizar os dados.');
        }
    };

    return (
        <View style={styles.containerTop}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Dados do Óculos</Text>

                <Text style={styles.label}>ID Óculos:</Text>
                <TextInput style={styles.input} value={idoculos} editable={false} />

                <Text style={styles.label}>ID Usuário:</Text>
                <TextInput style={styles.input} value={idusuario} editable={false} />

                <Text style={styles.label}>Modelo:</Text>
                <TextInput
                    style={styles.input}
                    value={modelo}
                    onChangeText={setModelo}
                />

                <Text style={styles.label}>Status:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { marginRight: 10, backgroundColor: status === 'Ativo' ? '#4CAF50' : '#ccc' }
                        ]}
                        onPress={() => setStatus('Ativo')}
                    >
                        <Text style={{ color: '#fff' }}>Ativo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: status === 'Desativado' ? '#4CAF50' : '#ccc' }
                        ]}
                        onPress={() => setStatus('Desativado')}
                    >
                        <Text style={{ color: '#fff' }}>Desativado</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Firmware Version:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: firmware === '1.0.0.0' ? '#4CAF50' : '#ccc' }
                        ]}
                        onPress={() => setFirmware('1.0.0.0')}
                    >
                        <Text style={{ color: '#fff' }}>1.0.0.0</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={update}>
                    <Text style={styles.button}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}