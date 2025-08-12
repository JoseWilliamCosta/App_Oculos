import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react-native';
import AreaUsuario from '../views/AreaUsuario';
import PerfilUsuario from '../views/PerfilUsuario';
import Signin from '../views/Signin';
import { UserProvider } from '../globals/UserContext';


// Mocks globais
global.alert = jest.fn();
const mockNavigate = jest.fn();
const mockAddListener = jest.fn((event, callback) => {
  if (event === 'focus') {
    callback(); // chama síncrono para que fique dentro do act no teste
  }
  return jest.fn();
});

// Mock de navegação
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    addListener: mockAddListener,
  }),
  useRoute: () => ({ params: {} }),
}));

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key) => {
    if (key === 'usuarioLogado') {
      return Promise.resolve(
        JSON.stringify({
          idusuario: '1',
          nome: 'usuario',
          tipo: 'comum',
        })
      );
    }
    return Promise.resolve(null);
  }),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock hook admin
jest.mock('../views/admin/useUsuarioLogado', () => () => ({
  tipo: 'comum',
  id: '1',
  nome: 'Usuário Teste',
  email: 'teste@gmail.com',
}));

// Mock de axios
import axios from 'axios';
jest.mock('axios');

axios.post.mockImplementation((url) => {
  if (url.includes('/usuarios/get')) {
    return Promise.resolve({
      data: {
        res: {
          idusuario: '1',
          nome: 'usuario',
          cpf: '12345678901',
          telefone: '11999999999',
          email: 'usuario@gmail.com',
        },
      },
    });
  }
  if (url.includes('/oculos/listar')) {
    return Promise.resolve({
      data: { res: [] },
    });
  }
  return Promise.resolve({ data: {} });
});

//--------------- Testando se as telas abrem corretamente ao logar -------------------------------------------------//

describe('testando se as telas abrem corretamente ao logar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    require('@react-native-async-storage/async-storage').getItem.mockImplementation((key) => {
      if (key === 'usuarioLogado') {
        return Promise.resolve(
          JSON.stringify({
            idusuario: '1',
            nome: 'usuario',
            tipo: 'comum',
          })
        );
      }
      return Promise.resolve(null);
    });
  });

  it('renderizando signin', async () => {
    render(
      <UserProvider>
        <Signin />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('Bsignin')).toBeTruthy();
    }, { timeout: 2000 });

    fireEvent.press(screen.getByTestId('Bsignin'));
  });

  it('renderizando AreaUsuario', async () => {
    render(<AreaUsuario />);

    await waitFor(() => {
      expect(screen.getByTestId('areausuario-teste')).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('encontra o ID do AreaUsuario', async () => {
    render(<AreaUsuario />);

    await waitFor(() => {
      expect(screen.getByTestId('areausuario-teste')).toBeTruthy();
      expect(screen.getByTestId('Bperfil')).toBeTruthy();
    }, { timeout: 2000 });

    await act(async () => {
      fireEvent.press(screen.getByTestId('Bperfil'));
    });
  });


  // Agora os essa parte do teste causo aqueles avisos( warnings ) \/\/\/\/

  it('renderizando PerfilUsuario', async () => {
    render(
      <UserProvider>
        <PerfilUsuario />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('perfilusuario-teste')).toBeTruthy();
      expect(screen.getByText(/Nome:/i)).toBeTruthy();
    }, { timeout: 10000 });
  });

  // Agora os essa parte do teste causo aqueles avisos(  warnings ) /\/\/\/\
});


