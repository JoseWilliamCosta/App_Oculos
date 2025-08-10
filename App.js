// Biblioteca básica
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

//Import de bibliotecas de navegação Stack entre telas
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Import de telas
import Signin from './src/views/Signin'
import AreaUsuario from "./src/views/AreaUsuario";
import Signup from "./src/views/admin/Signup";
import ListarUsuarios from "./src/views/admin/ListarUsuarios";
import DadosUsuario from "./src/views/DadosUsuario";
import ListarOculos from "./src/views/admin/ListarOculo";
import PerfilUsuario from "./src/views/PerfilUsuario";
import CadastroOculos from "./src/views/admin/CadastroOculos";
import Deteccao from "./src/views/MQTT/Deteccao";
import MQTTAula from "./src/views/MQTT/MQTTTeste";

// módulos internos personalizados
import useUsuarioLogado from "./src/views/admin/useUsuarioLogado"; // Hook React personalizado
import CustomDrawerContent from './src/components/CustomDrawerContent'; // Componente de interface (UI)
import { UserProvider } from "./src/globals/UserContext"; // Gerenciamento de estado global

const Drawer = createDrawerNavigator();

export default function App() {
  const usuarioLogado = useUsuarioLogado();


  const headerRightHomeButton = (navigation) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("AreaUsuario")}
      style={{ marginRight: 15 }}
      activeOpacity={0.7}
    >
      <FontAwesomeIcon icon={faHome} size={22} color="#000" />
    </TouchableOpacity>
  );

  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator
          key={usuarioLogado?.idusuario || 'drawer'} // <- FORÇA RECONSTRUÇÃO
          initialRouteName="Signin"
          backBehavior="history"
          drawerContent={(props) => (
            <CustomDrawerContent {...props} usuario={usuarioLogado} />
          )}
          screenOptions={{
            headerStyle: { backgroundColor: '#ffb300' },  // Cor de fundo da barra superior                  
            headerTitleStyle: { fontWeight: 'bold' },     // Opcional: estilo do texto do título

          }}
        >
          {/* Todas as rotas continuam registradas aqui */}
          <Drawer.Screen name="Signin" component={Signin} options={{ headerShown: false }} />

          <Drawer.Screen
            name="AreaUsuario"
            component={AreaUsuario}
            options={({ navigation }) => ({
              headerTitle: () => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={require('./src/img/logo_aurora.png')}
                    style={{ width: 200, height: 80, resizeMode: 'contain' }}
                  />
                </View>
              ),
              headerTitleAlign: 'center',
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="MQTTAula"
            component={MQTTAula}
            options={({ navigation }) => ({
              title: "MQTT Dados",
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="Signup"
            component={Signup}
            options={({ navigation }) => ({
              title: "Cadastrar Usuário",
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="Deteccao"
            component={Deteccao}
            options={({ navigation }) => ({
              title: "Detecção de Proximidade",
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="ListarUsuarios"
            component={ListarUsuarios}
            options={({ navigation }) => ({
              title: "Listar Usuários",
              drawerItemStyle: { display: "none" },
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="ListarOculos"
            component={ListarOculos}
            options={({ navigation }) => ({
              title: "Listar Óculos",
              drawerItemStyle: { display: "none" },
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="DadosUsuario"
            component={DadosUsuario}
            options={({ navigation }) => ({
              title: "Dados do Usuário",
              drawerItemStyle: { display: "none" },
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="PerfilUsuario"
            component={PerfilUsuario}
            options={({ navigation }) => ({
              title: "Perfil do Usuário",
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />

          <Drawer.Screen
            name="CadastroOculos"
            component={CadastroOculos}
            options={({ navigation }) => ({
              title: "Cadastrar Óculo",
              drawerItemStyle: { display: "none" },
              headerRight: () => headerRightHomeButton(navigation),
            })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}