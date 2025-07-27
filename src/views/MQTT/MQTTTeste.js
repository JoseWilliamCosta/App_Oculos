import Paho from 'paho-mqtt';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryAxis,
} from "victory";


const client = new Paho.Client('broker.emqx.io', 8083, 'reactNativeClientId_' + parseInt(Math.random() * 100000));

const series = [
    {
        name: "Temperatura",
        data: Array(),
    },
];

export default function MQTTAula() {

    const [tempLida, setTempLida] = useState(0)
    const [cont, setCont] = useState(0)

    /*let temperatura = new Array(30)
    for (let index = 0; index < temperatura.length; index++) {
        temperatura[index] = Math.random() * 50;
    }

    console.log(temperatura)*/

    useEffect(() => {
        client.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error('Connection lost:', responseObject.errorMessage);
            }
        };

        client.onMessageArrived = (message) => {
            console.log('Message arrived:', message.payloadString, 'on topic:', message.destinationName);
            // Process the received message here
            setTempLida(parseInt(message.payloadString))

            if(cont < 60){
                series[0].data[cont] = tempLida
            }else{
                series[0].data.splice(0, 1)
                series[0].data.push(tempLida)
            }
 
            setCont(() => cont + 1)
        };

        client.connect({
            onSuccess: () => {
                console.log('Connected to MQTT broker!');
                client.subscribe('ifrncang/temperatura'); // Subscribe to a topic
            },
            onFailure: (error) => {
                console.error('Connection failed:', error);
            },
            useSSL: false, // Set to true if using SSL/TLS (e.g., port 8084)
            timeout: 3,
        });



        return () => {
            client.disconnect();
        };
    }, [cont]);

    /*const enviarMensagem = (msg) => {
        console.log(msg)
        const message = new Paho.Message(msg);
        message.destinationName = 'ifrncang/led';
        client.send(message);
    }*/

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Status Recebido:</Text>
            <Text style={styles.status}>Temperatura atual: {tempLida}</Text>
            <Text style={styles.status}>Contador: {cont}</Text>

            <VictoryChart
                theme={VictoryTheme.clean}
            >
                <VictoryAxis
                    dependentAxis
                    tickValues={arrayRange(0, 50, 10)}
                    tickFormat={(value) => `T: ${value} (°C)`}
                    style={{
                        axis: {
                            stroke: "transparent",
                        },
                        axisLabel: {
                            fontSize: 8,
                            padding: 50,
                        },
                        tickLabels: {
                            fontSize: 8,
                        },
                        grid: {
                            stroke: "#d9d9d9",
                            size: 5,
                        },
                    }}
                />
                <VictoryAxis
                    tickValues={arrayRange(0, 60, 10)}
                    style={{
                        tickLabels: {
                            fontSize: 8,
                        },
                        ticks: {
                            stroke: "#757575",
                            size: 5,
                        },
                    }}
                />


                <VictoryLine
                    data={series[0].data.map(
                        (d, i) => ({
                            x: i,
                            y: d,
                        }),
                    )}
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
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    status: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#444',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});