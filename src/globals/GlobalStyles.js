import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },


    containerTop: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        //borderWidth: 1
    },


    containerTop2:{
        flex: 1,
    },


    containerbox: {
        borderColor: '#cccccc',
        borderWidth: 3,
        backgroundColor: '#eeeeee',
        padding: 10,
        borderRadius: 10,
        width: '80%'
    },
    containercols: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10
    },


    itemlistarows50cols:{
        flexDirection: 'row',
        width: '50%',
        borderWidth: 0,
        justifyContent: 'center'
    },
    itemlistacols50cols:{
        flexDirection: 'column',
        width: '50%',
        borderWidth: 0,
        justifyContent: 'center'
    },
    titulo1: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center"
    },


    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },


    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        fontSize: 20,
        padding: 3
    },


    button: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#5555FF',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10
    },


    card: {
        color: 'white',
        textAlign: "center",
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: '#5555FF',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10
    }


});
