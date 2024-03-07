<template>
  <div class="admin-panel">
    <h2>Panel de Administrador</h2>
    <ul>
      <li><router-link to="/comida">Comidas</router-link></li>
      <li><router-link to="/calendario">Calendario</router-link></li>
      <li><router-link to="/soporte">Soporte</router-link></li>
      <!-- Agrega más enlaces según las vistas disponibles en tu aplicación -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel'
}
</script>

<style scoped>
/* Estilos CSS para el panel de administrador */
.admin-panel {
  /* Estilos para el panel de administrador */
}
</style>
