import Paho from 'paho-mqtt';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, ScrollView, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Criação do cliente MQTT
const client = new Paho.Client('10.44.1.35', 9001, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

export default function MQTTAula() {
    const [tempLida, setTempLida] = useState(0);
    const [cont, setCont] = useState(0);
    const [valor, setValor] = useState(30);
    const [chartData, setChartData] = useState([0]); // dados do gráfico

    const screenWidth = Dimensions.get("window").width;

    //enviar mensagem para topico api/sensor
    const enviarNovaDistancia = () => {
        const novaDistancia = parseFloat(valor);
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
            

            const novaLeitura = parseFloat(message.payloadString); // Distância em cm
            setTempLida(novaLeitura);
            setCont(prev => prev + 1);

            // Atualiza os dados do gráfico
            setChartData(prev => {
                const newData = [...prev, novaLeitura];
                if (newData.length > 11) newData.shift(); // mantém último 22 valores
                return newData;
            });
        };

        // Conexão com o broker
        client.connect({
            onSuccess: () => {
                console.log('Connected to MQTT broker!');
                client.subscribe('aurora/sensor');
            },
            onFailure: (error) => {
                console.error('Connection failed:', error);
            },
            useSSL: false,
            timeout: 3,
        });

        return () => {
            client.disconnect();
        };
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Logo de fundo */}
            <Image
                source={require('../../img/ativo2.png')}
                style={styles.logoFundo}
                resizeMode="contain"
            />

            {/* Card Status */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Status Recebido</Text>
                <Text style={styles.status}>Distância atual: {tempLida.toFixed(2)} cm</Text>
                <Text style={styles.status}>Leituras: {cont}</Text>
            </View>

            {/* Card Envio */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Enviar Nova Distância (CM) </Text>
                <TextInput
                    value={valor}
                    onChangeText={setValor}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={enviarNovaDistancia}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>

            {/* Card Gráfico */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Gráfico de Distância</Text>
                <LineChart
                    data={{
                        labels: chartData.map((_, i) => i.toString()),
                        datasets: [{ data: chartData }],
                    }}
                    width={screenWidth - 40}
                    height={240}
                    yAxisSuffix=" cm"
                    chartConfig={{
                        backgroundColor: "#e0f7fa",
                        backgroundGradientFrom: "#b2ebf2",
                        backgroundGradientTo: "#d0952eff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 94, 117, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "5", strokeWidth: "2", stroke: "#006064" },
                    }}
                    style={{ marginVertical: 12, borderRadius: 16 }}
                />
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
        width: '95%',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 20,
        marginVertical: 12,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000ff',
        marginBottom: 10,
    },
    status: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000ff',
        borderRadius: 12,
        padding: 10,
        width: '60%',
        marginBottom: 12,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 12,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});