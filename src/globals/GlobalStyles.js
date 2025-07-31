import { StyleSheet } from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    caixacinza: { //Area do usuario
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '90%',
        backgroundColor: '#b3b3b3ff',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'flex-start',
        paddingTop: 30,
        zIndex: 0,
        
    },

    caixalaranja: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
       

    },


    containerTop: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: '#fa8500ff',
        //borderWidth: 1
    },


    containerTop2:{
        flex: 1,
        padding:'20px',
        backgroundColor: '#ffffffff'

    },


    containerbox: {
    
        marginTop: '50px',
        padding: 10,
        width: '350px'
    },

    containercols: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fa8500ff',


        // Tentativa de dar mais profundidade
        elevation: 3, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.50,
        shadowRadius: 5,
        
    },


    itemlistarows50cols:{
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        
    },
    itemlistacols50cols:{ //aparentemente isso aqui serve pra dar mais espaço
        flexDirection: 'column',
        width: '50%',
        
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
        fontSize: 20,
        padding: 3,
        borderRadius: 15,
    },


    button: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#0b0b0bff',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        color: 'white'

    },


    card: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ff6f00ff',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        width:250
    }


});
