import { onMounted, ref } from "vue";
import { getUserProfileById } from "../service/user";

export function useUserProfile(id) {
    const loadingProfile = ref(true);
    const userProfile = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
        height: null,
        weight: null,
        birthday: null,
        premium: null,
        premiumExpiry: null,
        isAdmin: null,
        fullProfileLoaded: false,
    });

    onMounted(async () => {
        loadingProfile.value = true;
        userProfile.value = await getUserProfileById(id);
        loadingProfile.value = false;
    });

    return {
        loadingProfile,
        userProfile,
    }
}