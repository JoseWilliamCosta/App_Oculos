import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signin from '../Signin';
import axios from 'axios';

// Mocks para evitar erros durante os testes
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

// Mock do useNavigation do React Navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    reset: mockNavigate,
  }),
}));

// Mock do contexto do usuário
jest.mock('../../globals/UserContext', () => ({
  UserContext: {
    Provider: ({ children }) => children,
  },
}));

describe('Teste da página Signin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renderiza os campos de login corretamente', () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  it('Dispara a função signin ao clicar no botão Entrar', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        num_erro: 0,
        res: { nome: 'Usuário Teste' },
        msg: 'Login realizado com sucesso',
      },
    });

    const { getByText } = render(<Signin />);
    const botao = getByText('Entrar');
    fireEvent.press(botao);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/usuarios/signin'),
        { email: 'admin@gmail.com', password: '123456' }
      );
    });
  });
});

describe('Verificação de existência das páginas de dados', () => {
  it('Deve importar DadosUsuario sem erros', () => {
    expect(() => require('../DadosUsuario')).not.toThrow();
  });

  it('Deve importar DadosOculos sem erros', () => {
    expect(() => require('../DadosOculos')).not.toThrow();
  });
});
