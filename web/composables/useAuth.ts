// composables/useAuth.ts
import type { User } from '~/types/types';

const user = ref<User>();

const isAuthenticated = ref(false);
const token = ref<string | null>(null);

export const useAuth = () => {
    const login = async (email: string, senha: string) => {
        const response = await fetch('http://192.168.100.207:8000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            const data = await response.json();

            alert(`Bem-vindo, ${data.user.nome}, ${token}!`);

            user.value = data.user; 
            token.value = data.token;
            isAuthenticated.value = true;
            localStorage.setItem('user', JSON.stringify(user.value));
            localStorage.setItem('token', token.value!); 
        } else {
            console.error('Login failed');
        }
    };

    const logout = () => {
        //@ts-ignore
        user.value = null;
        isAuthenticated.value = false;
        token.value = null; 
        localStorage.removeItem('user');
        localStorage.removeItem('token'); 
    };

    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
            user.value = JSON.parse(storedUser);
            token.value = storedToken; 
            isAuthenticated.value = true;
        }
    };

    loadUserFromStorage();

    return {
        user,
        isAuthenticated,
        token, 
        login,
        logout
    };
};
