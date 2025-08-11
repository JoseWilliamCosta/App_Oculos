import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import AreaUsuario from '../views/AreaUsuario';
import PerfilUsuario from '../views/PerfilUsuario';
import Signin from '../views/Signin';
import { UserProvider } from '../globals/UserContext';

// Mocks globais
global.alert = jest.fn();
const mockNavigate = jest.fn();
const mockAddListener = jest.fn((event, callback) => {
  if (event === 'focus') callback();
  return jest.fn();
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    addListener: mockAddListener,
  }),
  useRoute: () => ({ params: {} }),
}));

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

jest.mock('../views/admin/useUsuarioLogado', () => () => ({
  tipo: 'comum',
  id: '1',
  nome: 'Usuário Teste',
  email: 'teste@gmail.com',
}));

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
  // Resposta padrão para outras chamadas
  return Promise.resolve({ data: {} });
});

//---------------testando se as telas abrem corretamente ao logar -------------------------------------------------//

describe('testando se as telas abrem corretamente ao logar', () => {
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

  // Testa se a tela Signin aparece
  it('renderizando signin', async () => {
    render(
      <UserProvider>
        <Signin />
      </UserProvider>
    );

    // Verifica se o botão de entrar está aparecendo
    expect(screen.getByTestId('Bsignin')).toBeOnTheScreen();

    // ativa o evento de click no botão
    fireEvent.press(screen.getByTestId('Bsignin'));
  });

  // Renderiza a tela AreaUsuario e espera os efeitos
  it('renderizando AreaUsuario', async () => {
    render(<AreaUsuario />);

    // Aguarda algum elemento que deve aparecer após carregamento
    await waitFor(() => {
      expect(screen.getByTestId('areausuario-teste')).toBeTruthy();
    });
  });

  // Encontra o ID para ver se o elemento específico na area do usuario pode ser visto
  it('encontra o ID do AreaUsuario', async () => {
    render(<AreaUsuario />);

    await waitFor(() => {
      expect(screen.getByTestId('areausuario-teste')).toBeTruthy();
      expect(screen.getByTestId('Bperfil')).toBeOnTheScreen();
    });

    // Pressionar botão de perfil
    fireEvent.press(screen.getByTestId('Bperfil'));
  });

  // Renderiza a pagina de perfil, espera carregamento
  it('renderizando PerfilUsuario', async () => {
    render(
      <UserProvider>
        <PerfilUsuario />
      </UserProvider>
    );

    await waitFor(() => expect(screen.getByTestId('perfilusuario-teste')).toBeTruthy());
  });
});
