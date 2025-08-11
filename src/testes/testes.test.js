import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import AreaUsuario from '../views/AreaUsuario';
import PerfilUsuario from '../views/PerfilUsuario';

// Mocks globais
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
      return Promise.resolve(JSON.stringify({
        idusuario: '1',
        nome: 'usuario',
        tipo: 'comum'
      }));
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
  email: 'teste@gmail.com'
}));

jest.mock('axios', () => ({
  post: jest.fn()
    // Mock para get usuario
    .mockResolvedValueOnce({ 
      data: { 
        res: {
          idusuario: '1',
          nome: 'usuario',
          cpf: '12345678901',
          telefone: '11999999999',
          email: 'usuario@gmail.com'
        }
      }
    })
    // Mock para listar óculos
    .mockResolvedValueOnce({ 
      data: { 
        res: []
      }
    })
}));

describe('Testes de renderização', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza AreaUsuario corretamente', async () => {
    render(<AreaUsuario />);
    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeTruthy();
      expect(screen.getByText('Perfil')).toBeTruthy();
    });
  });

  it('renderiza PerfilUsuario com dados do usuário', async () => {
    render(<PerfilUsuario />);
    
    await waitFor(() => {
      // Verifica os textos combinados usando regex
      expect(screen.getByText(/Nome:\s*usuario/)).toBeTruthy();
      expect(screen.getByText(/CPF:\s*12345678901/)).toBeTruthy();
      expect(screen.getByText(/Telefone:\s*11999999999/)).toBeTruthy();
      expect(screen.getByText(/E-mail:\s*usuario@gmail\.com/)).toBeTruthy();
      
      // Verifica os botões
      expect(screen.getByText('Editar')).toBeTruthy();
      expect(screen.getByText('Sair')).toBeTruthy();
    });
  });
});

describe('Testes de interação', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar a navegação ao pressionar o botão Editar', async () => {
    render(<PerfilUsuario />);
    
    // Aguarda o botão estar disponível
    const editButton = await screen.findByTestId('edit-button');
    
    // Simula o pressionamento
    fireEvent.press(editButton);
    
    // Verifica a navegação
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('DadosUsuario', { idusuario: '1' });
    });
  });

  it('deve deslogar ao pressionar o botão Sair', async () => {
    render(<PerfilUsuario />);
    
    const logoutButton = await screen.findByText('Sair');
    fireEvent.press(logoutButton);
    
    const asyncStorage = require('@react-native-async-storage/async-storage');
    await waitFor(() => {
      expect(asyncStorage.removeItem).toHaveBeenCalledWith('usuarioLogado');
      expect(mockNavigate).toHaveBeenCalledWith('Signin');
    });
  });
});