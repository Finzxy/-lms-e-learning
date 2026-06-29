import api from './api';
import { getUserByCredentials, getUserByToken, mockDelay } from '../mocks/academicMock';

// Mock mode - set to true to use fake data (for testing without backend)
const MOCK_MODE = true;

export const authService = {
  login: async (email, password) => {
    if (MOCK_MODE) {
      await mockDelay();
      
      const user = getUserByCredentials(email, password);
      
      if (!user) {
        throw {
          response: {
            data: {
              message: 'Email atau password salah',
            },
          },
        };
      }
      
      return {
        token: user.token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          kelas_id: user.kelas_id,
          nis: user.nis,
        },
      };
    }
    
    const response = await api.post('/login', { email, password });
    return response.data;
  },

  register: async (data) => {
    if (MOCK_MODE) {
      await mockDelay();
      throw {
        response: {
          data: {
            message: 'Register tidak tersedia di mock mode',
          },
        },
      };
    }
    
    const response = await api.post('/register', data);
    return response.data;
  },

  logout: async () => {
    if (MOCK_MODE) {
      await mockDelay();
      return { message: 'Logout berhasil' };
    }
    
    const response = await api.post('/logout');
    return response.data;
  },

  me: async () => {
    if (MOCK_MODE) {
      await mockDelay();
      
      const token = localStorage.getItem('token');
      const user = getUserByToken(token);
      
      if (!user) {
        throw {
          response: {
            data: {
              message: 'Token tidak valid',
            },
          },
        };
      }
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        kelas_id: user.kelas_id,
        nis: user.nis,
      };
    }
    
    const response = await api.get('/me');
    return response.data;
  },
};
