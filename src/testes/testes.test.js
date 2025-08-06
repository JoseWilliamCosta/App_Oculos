import React from 'react';
import { render } from '@testing-library/react-native';
import AreaUsuario from '../views/AreaUsuario';
import PerfilUsuario from '../views/PerfilUsuario';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ 
    navigate: jest.fn(),
    addListener: jest.fn((event, callback) => {
      if (event === 'focus') {
        callback();
      }
      return jest.fn(); 
    }),
  }),
  useRoute: () => ({ params: {} }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('../views/admin/useUsuarioLogado', () => () => ({ 
  tipo: 'comum',
  id: '1',
  nome: 'Usuário Teste',
  email: 'teste@gmail.com'
}));

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ 
    data: { 
      res: {
        idusuario: '1',
        nome: 'usuario',
        cpf: '12345678901',
        telefone: '11999999999',
        email: 'usuario@gmail.com'
      }
    }
  }))
}));

describe('Testes de renderização', () => {
  beforeAll(() => {
    require('@react-native-async-storage/async-storage').getItem.mockImplementation((key) => {
      if (key === 'usuarioLogado') {
        return Promise.resolve(JSON.stringify({
          idusuario: '1',
          nome: 'usuario',
          tipo: 'comum'
        }));
      }
      return Promise.resolve(null);
    });
  });

  it('renderizando AreaUsuario', () => {
    render(<AreaUsuario />);
  });

  it('encontra o ID do AreaUsuario', () => {
    const { getByTestId } = render(<AreaUsuario />);
    expect(getByTestId('areausuario-teste')).toBeTruthy();
  });

  it('renderizando PerfilUsuario', async () => {
    await render(<PerfilUsuario />);
  });

  it('encontra o ID do PerfilUsuario', async () => {
    const { findByTestId } = render(<PerfilUsuario />);
    await expect(findByTestId('perfilusuario-teste')).resolves.toBeTruthy();
  });
});