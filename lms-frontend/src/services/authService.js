import api from './api';

// Mock mode - set to true to use fake data (for testing without backend)
const MOCK_MODE = true;

// Mock users data
const MOCK_USERS = {
  'admin@test.local': {
    email: 'admin@test.local',
    password: 'password',
    user: {
      id: 1,
      name: 'Admin User',
      email: 'admin@test.local',
      role: 'admin',
    },
    token: 'mock-admin-token-12345',
  },
  'guru@test.local': {
    email: 'guru@test.local',
    password: 'password',
    user: {
      id: 2,
      name: 'Guru User',
      email: 'guru@test.local',
      role: 'guru',
    },
    token: 'mock-guru-token-67890',
  },
  'siswa@test.local': {
    email: 'siswa@test.local',
    password: 'password',
    user: {
      id: 3,
      name: 'Siswa User',
      email: 'siswa@test.local',
      role: 'siswa',
    },
    token: 'mock-siswa-token-11111',
  },
};

// Mock delay to simulate network request
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    if (MOCK_MODE) {
      await mockDelay();
      
      const mockUser = MOCK_USERS[email];
      
      if (!mockUser || mockUser.password !== password) {
        throw {
          response: {
            data: {
              message: 'Email atau password salah',
            },
          },
        };
      }
      
      return {
        token: mockUser.token,
        user: mockUser.user,
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
      
      // Find user by token
      const mockUser = Object.values(MOCK_USERS).find(u => u.token === token);
      
      if (!mockUser) {
        throw {
          response: {
            data: {
              message: 'Token tidak valid',
            },
          },
        };
      }
      
      return mockUser.user;
    }
    
    const response = await api.get('/me');
    return response.data;
  },
};
