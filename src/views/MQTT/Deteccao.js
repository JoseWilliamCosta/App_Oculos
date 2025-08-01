import Paho from 'paho-mqtt';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

import { server } from '../../globals/GlobalVars'; // Ex: http://192.168.0.100:3000

const client = new Paho.Client('broker.emqx.io', 8083, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

// SUBSTITUIR PELO ID DO ÓCULOS QUE ESTÁ ASSOCIADO AO USUÁRIO
const id_oculos = 1;

export default function Deteccao() {
    const [distancia, setDistancia] = useState(0);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        client.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error('Conexão perdida:', responseObject.errorMessage);
            }
        };

        client.onMessageArrived = async (message) => {
            console.log('Mensagem recebida:', message.payloadString);

            const distanciaDetectada = parseFloat(message.payloadString);

            if (isNaN(distanciaDetectada)) return;

            setDistancia(distanciaDetectada);
            setContador(prev => prev + 1);

            // Enviar para o backend
            try {
                const tipoAlerta = distanciaDetectada < 20 ? 'alerta' : 'normal'; // lógica de exemplo
                const dataAtual = new Date().toISOString().split('T')[0];
                const payload = {
                    id_oculos: id_oculos,
                    data_hora: dataAtual,
                    distancia_detectada_cm: distanciaDetectada,
                    tipo_alerta_acionado: tipoAlerta
                };

                console.log("Enviando para o servidor:", payload);

                const res = await axios.post(`${server}/deteccao/salvar`, payload);

                if (res.data.num_erro !== 0) {
                    console.warn("Erro ao salvar:", res.data.msg_erro);
                } else {
                    console.log("Detecção salva:", res.data.msg);
                }

            } catch (err) {
                console.error("Erro ao enviar detecção:", err.message);
            }
        };

        client.connect({
            onSuccess: () => {
                console.log('Conectado ao broker MQTT!');
                client.subscribe('aurora/sensor');
            },
            onFailure: (error) => {
                console.error('Falha na conexão:', error);
            },
            useSSL: false,
            timeout: 3,
        });

        return () => {
            client.disconnect();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Última distância detectada:</Text>
            <Text style={styles.status}>{distancia} cm</Text>
            <Text style={styles.status}>Mensagens recebidas: {contador}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    status: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#444',
    },
});