import Paho from 'paho-mqtt';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryAxis,
} from "victory";

// Criação do cliente MQTT
const client = new Paho.Client('broker.emqx.io', 8083, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

// Série de dados para o gráfico
const series = [
    {
        name: "Distância",
        data: [],
    },
];

export default function MQTTAula() {
    const [tempLida, setTempLida] = useState(0);
    const [cont, setCont] = useState(0);
    const [valor, setValor] = useState(30);



    //enviar mensagem para topico api/sensor
    const enviarNovaDistancia = () => {
        const novaDistancia = parseFloat(valor); // ou pegue de um input
        const message = new Paho.Message(novaDistancia.toString());
        message.destinationName = "api/sensor";
        client.send(message);
    };

    useEffect(() => {




        // Callback para perda de conexão
        client.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error('Connection lost:', responseObject.errorMessage);
            }
        };

        // Callback para mensagens recebidas
        client.onMessageArrived = (message) => {
            console.log('Message arrived:', message.payloadString, 'on topic:', message.destinationName);

            const novaLeitura = parseFloat(message.payloadString); // Distância em cm
            setTempLida(novaLeitura);

            // Atualiza os dados do gráfico
            if (series[0].data.length < 60) {
                series[0].data.push(novaLeitura);
            } else {
                series[0].data.shift(); // Remove o mais antigo
                series[0].data.push(novaLeitura);
            }

            setCont(prev => prev + 1);
        };

        // Conexão com o broker
        client.connect({
            onSuccess: () => {
                console.log('Connected to MQTT broker!');
                client.subscribe('aurora/sensor'); // mesmo tópico do ESP32
            },
            onFailure: (error) => {
                console.error('Connection failed:', error);
            },
            useSSL: false,
            timeout: 3,
        });

        // Desconectar ao desmontar o componente
        return () => {
            client.disconnect();
        };
    }, []);

    // Função utilitária para gerar ticks dos eixos
    const arrayRange = (start, stop, step) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Status Recebido:</Text>
            <Text style={styles.status}>Distância atual: {tempLida.toFixed(2)} cm</Text>
            <Text style={styles.status}>Leituras: {cont}</Text>
            <Text style={styles.status}>Botão de enviar</Text>
            <TextInput
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"  // ajuda a limitar só números no teclado
                style={{ borderWidth: 1, padding: 5, width: 100, marginBottom: 10 }}
            />
            <TouchableOpacity onPress={enviarNovaDistancia}>
                <Text>Enviar</Text>
            </TouchableOpacity>

            <VictoryChart theme={VictoryTheme.clean}>
                <VictoryAxis
                    dependentAxis
                    tickValues={arrayRange(0, 200, 20)}
                    tickFormat={(value) => `${value} cm`}
                    style={{
                        axis: { stroke: "transparent" },
                        axisLabel: { fontSize: 8, padding: 50 },
                        tickLabels: { fontSize: 8 },
                        grid: { stroke: "#d9d9d9", size: 5 },
                    }}
                />
                <VictoryAxis
                    tickValues={arrayRange(0, 60, 10)}
                    style={{
                        tickLabels: { fontSize: 8 },
                        ticks: { stroke: "#757575", size: 5 },
                    }}
                />
                <VictoryLine
                    data={series[0].data.map((d, i) => ({ x: i, y: d }))}
                />
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    status: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#444',
    },
});
