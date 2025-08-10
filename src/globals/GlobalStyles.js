import { StyleSheet } from "react-native";
import CadastroOculos from "../views/admin/CadastroOculos";


export default styles = StyleSheet.create({


    //estlizacao signup
     containerbox: {
        width: '100%',
        height: '650px',
        backgroundColor: '#fea815',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box_cadastro: {
        width: '80%',
        height: '70%',
        backgroundColor: '#fea815',
    },
    titulo2: {
        fontSize: 14,
        fontWeight: 'light',
        
    },
    containerTop: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    containerbox_usuarios: {
        width: '100%',
        height: '800px',
        backgroundColor: '#fea815',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box_editar: {
        width: '80%',
        height: '70%',
        marginBottom: 100,
    },
       containerbox_editarusuario: {
        width: '100%',
        height: '800px',
        backgroundColor: '#ffb300',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 10,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTop2:{
        flex: 1,
        padding:'20px',
        backgroundColor: '#ffffffff'
    },

    containercols: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffb300',


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
        textAlign: "start",
        marginBottom: 2
        
    },

    input: {
        backgroundColor: 'white',
        fontSize: 18,
        fontWeight: 'light',
        padding: 7,
        borderRadius: 10,
        marginBottom: 13
    },


    button: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#4CAF50',
        marginTop: 10,
        marginBottom: 10,
        padding: 9,
        borderRadius: 10,
        color: 'white',

        // Tentativa de dar mais profundidade
        elevation: 3, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.50,
        shadowRadius: 5,

    },
    button2: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#E53935',
        marginTop: 10,
        marginBottom: 10,
        padding: 9,
        borderRadius: 10,
        color: 'white'

    },


    card: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ffb300',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        width:250
    }


});
