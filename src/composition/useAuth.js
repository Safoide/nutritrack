import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToAuth } from '../service/auth';
import { getAllUserProfiles } from '../service/user';

export function useAuth() {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
        height: null,
        weight: null,
        birthday: null,
        isAdmin: null,
        premiumExpiry: null,
        premium: null,
        fullProfileLoaded: false,
    });

    let authUnsubscribe;

    onMounted(async () => {
        authUnsubscribe = subscribeToAuth(async (newUser) => {
            const allUserProfiles = await getAllUserProfiles();
            console.log("Todos los perfiles de usuario:", allUserProfiles);

            user.value = { ...newUser };
        });
    });

    onUnmounted(() => authUnsubscribe());

    return {
        user,
    };
}
