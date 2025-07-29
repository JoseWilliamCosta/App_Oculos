// Biblioteca básica
import React from "react";

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
//import Deteccao from "./src/views/MQTT/Deteccao";

// módulos internos personalizados
import useUsuarioLogado from "./src/views/admin/useUsuarioLogado"; // Hook React personalizado
import CustomDrawerContent from './src/components/CustomDrawerContent'; // Componente de interface (UI)
import { UserProvider } from "./src/globals/UserContext"; // Gerenciamento de estado global

const Drawer = createDrawerNavigator();

export default function App() {
  const usuarioLogado = useUsuarioLogado();

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
      >
        {/* Todas as rotas continuam registradas aqui */}
        <Drawer.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Drawer.Screen name="AreaUsuario" component={AreaUsuario} options={{ title: 'Área do Usuário' }} />
        <Drawer.Screen name="Signup" component={Signup} options={{ title: 'Cadastrar Usuário' }} />
        {/*<Drawer.Screen name="Deteccao" component={Deteccao} options={{ title: 'Detecção de Proximidade' }} />*/}
        <Drawer.Screen name="ListarUsuarios" component={ListarUsuarios} options={{ title: 'Listar Usuários', drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="ListarOculos" component={ListarOculos} options={{ title: 'Listar Óculos', drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="DadosUsuario" component={DadosUsuario} options={{ title: 'Dados do Usuário', drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="PerfilUsuario" component={PerfilUsuario} options={{ title: 'Perfil do Usuário' }} />
        <Drawer.Screen name="CadastroOculos" component={CadastroOculos} options={{ title: 'Cadastrar Óculo', drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}