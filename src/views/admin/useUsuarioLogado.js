// src/hooks/useUsuarioLogado.js
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useUsuarioLogado() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const carregar = async () => {
      const usuarioStr = await AsyncStorage.getItem('usuarioLogado')
      if (usuarioStr) {
        setUsuario(JSON.parse(usuarioStr))
      }
    }
    carregar()
  }, [])

  return usuario
}