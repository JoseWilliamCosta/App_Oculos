import Paho from 'paho-mqtt';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

import { server } from '../../globals/GlobalVars'; // Ex: http://192.168.0.100:3000

const client = new Paho.Client('10.44.1.35', 9001, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

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
            const distanciaDetectada = parseFloat(message.payloadString);
            if (isNaN(distanciaDetectada)) return;

            setDistancia(distanciaDetectada);
            setContador(prev => prev + 1);

            // Condicional: enviar somente se estiver entre 10 e 20 cm
            if (distanciaDetectada >= 10 && distanciaDetectada <= 20) {
                try {
                    const tipoAlerta = 'alerta';
                    const dataAtual = new Date().toISOString();
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
            }
        };

        client.connect({
            onSuccess: () => {
                console.log('Conectado ao broker MQTT!');
                client.subscribe('aurora/sensor');
            },
            onFailure: (error) => console.error('Falha na conexão:', error),
            useSSL: false,
            timeout: 3,
        });

        return () => client.disconnect();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Logo de fundo */}
            <Image
                source={require('../../img/ativo2.png')}
                style={styles.logoFundo}
                resizeMode="contain"
            />

            {/* Card de Detecção */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Última Detecção</Text>
                <Text style={styles.status}>{distancia.toFixed(2)} cm</Text>
                <Text style={styles.subStatus}>Mensagens recebidas: {contador}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Os dados serão enviados para o banco apenas quando a distância estiver entre 10 e 20 cm.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 40,
        backgroundColor: '#f5f5f5',
        minHeight: '100%',
    },
    logoFundo: {
        position: 'absolute',
        top: 500,
        left: -100,
        width: '60%',
        height: 280,
        opacity: 0.1,
        zIndex: 0,
    },
    card: {
        width: '90%',
        backgroundColor: '#ffb300',
        borderRadius: 20,
        padding: 25,
        marginVertical: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
    },
    status: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    subStatus: {
        fontSize: 18,
        color: '#333',
    },
    infoContainer: {
        width: '85%',
        backgroundColor: '#e0f7fa',
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#006064',
        textAlign: 'center',
    },
});