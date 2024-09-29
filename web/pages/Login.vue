<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="pa-6" max-width="400">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="email" label="Email" type="email" prepend-icon="mdi-email" required outlined
                        dense></v-text-field>

                    <v-text-field v-model="password" label="Senha" type="password" prepend-icon="mdi-lock" required
                        outlined dense></v-text-field>

                    <v-btn class="mt-4" color="primary" block @click="handleLogin">
                        Login
                    </v-btn>

                    <v-btn class="mt-2" color="secondary" @click="showSignUpModal = true">
                        Não tem uma conta? Crie uma
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>

        <v-dialog v-model="showSignUpModal" max-width="500">
            <v-card>
                <v-card-title>
                    <v-row align="center">
                        <v-col cols="10">
                            <span class="text-h5">Criar conta</span>
                        </v-col>
                        <v-col cols="2">
                            <v-btn icon @click="showSignUpModal = false" variant="text">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-card-title>

                <v-card-text>
                    <v-form>
                        <v-text-field v-model="name" label="Nome" prepend-icon="mdi-account" required outlined
                            dense></v-text-field>

                        <v-text-field v-model="signUpEmail" label="Email" type="email" prepend-icon="mdi-email" required
                            outlined dense></v-text-field>

                        <v-text-field v-model="signUpPassword" label="Senha" type="password" prepend-icon="mdi-lock"
                            required outlined dense></v-text-field>

                        <v-text-field v-model="confirmPassword" label="Confirme a senha" type="password"
                            prepend-icon="mdi-lock" required outlined dense></v-text-field>

                        <v-btn class="mt-4" color="primary" block @click="signUp">
                            Criar conta
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts" setup>

import { useAuth } from '@/composables/useAuth';

const { user, isAuthenticated, login, logout, token } = useAuth();

const router = useRouter();

const email = ref('');
const password = ref('');
const showSignUpModal = ref(false);

const name = ref('');
const signUpEmail = ref('');
const signUpPassword = ref('');
const confirmPassword = ref('');

const loginFormValid = computed(() => {
    return email.value && password.value;
});

const signUpFormValid = computed(() => {
    return name.value && signUpEmail.value && signUpPassword.value && confirmPassword.value;
});

// Login function
const handleLogin = async () => {
    if (!loginFormValid.value) {
        alert('Por favor preencha todos os campos.');
        return;
    }

  await login(email.value, password.value);
    router.push('/home');
};

const signUp = async () => {
    try {
        if (signUpFormValid.value) {
            const data = await fetch('http://192.168.100.207:8000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nome: name.value,
                    email: signUpEmail.value,
                    senha: signUpPassword.value,
                    codigo_verificacao: '123456'
                }),
            });

            if (data.ok) {
                alert('Cadastro realizado com sucesso!')
                showSignUpModal.value = false;
            } else {
                console.error('Erro ao realizar o cadastro:', data.status, data.statusText);
            }
        } else {
            alert('Por favor preencha todos os campos.');
        }
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
    }
};

</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>