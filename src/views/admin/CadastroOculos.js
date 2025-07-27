// Biblioteca básica
import React, { useState } from "react";

// Imports de componentes para IG do React
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// Import de estilos da IG
import styles from '../../globals/GlobalStyles';

// Imports para acesso ao BD
import axios from 'axios';

// Imports para parâmetros do Sistema
import { server } from '../../globals/GlobalVars';

// Bibliotecas do Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CadastroOculos() {
    const navigation = useNavigation();
    const route = useRoute();

    const idusuario = route.params?.idusuario || '';
    const [modelo, setModelo] = useState('');
    const [status, setStatus] = useState('Ativo'); // padrão
    const [firmwareVersion, setFirmwareVersion] = useState('1.0.0.0'); // padrão
    const [modoFeedback, setModoFeedback] = useState('som'); // default

    const cadastrarOculos = async () => {
        try {
            const res = await axios.post(`${server}/oculos/cadastrar`, {
                idusuario: idusuario,
                modelo: modelo,
                status: status,
                firmware_version: firmwareVersion,
                modo_feedback: modoFeedback
            });

            if (res.data.num_erro === 0) {
                alert(res.data.msg);
                navigation.goBack();
            } else {
                alert(res.data.msg_erro || 'Erro ao cadastrar óculos');
            }
        } catch (error) {
            console.log(error);
            alert('Erro ao conectar com o servidor');
        }
    };

    return (
        <View style={styles.containerTop}>
            <View style={styles.containerbox}>
                <Text style={styles.titulo1}>Cadastro de Óculos</Text>

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
                            { backgroundColor: status === 'Desativado' ? '#ee0909ff' : '#ccc' }
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
                            { backgroundColor: firmwareVersion === '1.0.0.0' ? '#4CAF50' : '#ccc' }
                        ]}
                        onPress={() => setFirmwareVersion('1.0.0.0')}
                    >
                        <Text style={{ color: '#fff' }}>1.0.0.0</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Modo de Feedback:</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { marginRight: 10, backgroundColor: modoFeedback === 'som' ? '#4CAF50' : '#ccc' }
                        ]}
                        onPress={() => setModoFeedback('som')}
                    >
                        <Text style={{ color: '#fff' }}>Som</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: modoFeedback === 'vibracao' ? '#4CAF50' : '#ccc' }
                        ]}
                        onPress={() => setModoFeedback('vibracao')}
                    >
                        <Text style={{ color: '#fff' }}>Vibração</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={cadastrarOculos}>
                    <Text style={styles.button}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}