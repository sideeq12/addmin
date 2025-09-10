import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const storedAuth = authService.getStoredUser();
      const isAuth = authService.isAuthenticated();
      
      if (storedAuth && isAuth) {
        setUser(storedAuth.user);
        setUserType(storedAuth.userType);
        setIsAuthenticated(true);
      } else {
        // Clear invalid auth data
        authService.logout();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, type = 'tutor') => {
    try {
      setLoading(true);
      
      let response;
      if (type === 'tutor') {
        response = await authService.tutorSignin(credentials);
        setUser(response.tutor);
      } else {
        response = await authService.studentSignin(credentials);
        setUser(response.student);
      }
      
      setUserType(type);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData, type = 'tutor') => {
    try {
      setLoading(true);
      
      let response;
      if (type === 'tutor') {
        response = await authService.tutorSignup(userData);
        setUser(response.tutor);
      } else {
        response = await authService.studentSignup(userData);
        setUser(response.student);
      }
      
      setUserType(type);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  const refreshUserDetails = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting user details refresh...');
      console.log('📊 Previous user data:', user);
      const updatedUser = await authService.refreshUserDetails();
      console.log('✅ User details refreshed successfully!');
      console.log('🆕 New user data:', updatedUser);
      console.log('💵 Account balance updated:', updatedUser?.account_balance);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('❌ Refresh user details error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    userType,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    initializeAuth,
    refreshUserDetails
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};