<script setup>
    import { auth } from '../service/firebase';
    import { editUserProfile } from '../service/user';

    const updateMembership = async () => {
        try {
            const userID = auth.currentUser.uid;
            const newPremiumStatus = true;

            // Calcular la fecha de vencimiento (un mes a partir de ahora)
            const currentDate = new Date();
            const expiryDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

            console.log("Current Date:", currentDate);
            console.log("Expiry Date:", expiryDate);

            // Imprimir la fecha antes de actualizar la membresía
            console.log("Updating membership with expiry date:", expiryDate.toLocaleDateString()); // Formatea la fecha localmente

            // Agrega este console log para la fecha de caducidad
            console.log("Membership expiry date:", expiryDate.toLocaleDateString());

            // Actualizar la membresía en el componente del formulario de pago
            await editUserProfile(userID, { premium: newPremiumStatus, premiumExpiry: expiryDate });

            // Llamar a la función en auth.js para actualizar la fecha de vencimiento
            console.log("Membership updated to:", newPremiumStatus, "Expiry:", expiryDate.toLocaleDateString()); // Formatea la fecha localmente

        } catch (error) {
            console.error('Error al actualizar la membresía:', error);
            throw error;
        }
    }

    updateMembership();
</script>

<template>
    <div>
        <h1>¡Pago exitoso!</h1>
        <p>¡Gracias por tu compra!</p>
    </div>
</template>

