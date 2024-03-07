<script>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useAuth } from '../composition/useAuth';
import { getAllUserProfiles, editUserProfile, deleteUser } from '../service/user';
import { useRouter, useRoute } from 'vue-router'; // Importa useRoute desde vue-router

export default {
  setup() {
    const { user } = useAuth();
    const loading = ref(true);
    const usuarios = ref([]);
    const localRouter = useRouter();
    const route = useRoute(); // Obtén la ruta actual
    const searchQuery = ref('');
    const userIdToDelete = ref(null);
    const userToDelete = ref(null);


    const verPerfil = (usuario) => {
      if (usuario && usuario.id) {
        console.log("Ver perfil de usuario:", usuario);
        localRouter.push({ name: 'user-profile', params: { userId: usuario.id } });
      } else {
        console.error("ID de usuario no definida o no válida:", usuario);
      }
    };

    const editarUsuario = (usuario) => {
      if (usuario && usuario.id) {
        localRouter.push({ name: 'UserProfileEdit', params: { userId: usuario.id } });
      } else {
        console.error("ID de usuario no definida o no válida:", usuario);
      }
    };


    const confirmDelete = (userId) => {
      userIdToDelete.value = userId;
      // Obtener el usuario a eliminar
      userToDelete.value = usuarios.value.find(usuario => usuario.id === userId);
      // Abre el modal de confirmación
      const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
      modal.show();
    };

    const deleteUserConfirmed = async () => {
      if (userIdToDelete.value) {
        try {
          await deleteUser(userIdToDelete.value);
          // Elimina el usuario de la lista
          usuarios.value = usuarios.value.filter(usuario => usuario.id !== userIdToDelete.value);
          console.log("Usuario eliminado con éxito.");
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
        } finally {
          // Reinicia el valor del ID del usuario a eliminar
          userIdToDelete.value = null;
          // Cierra el modal después de eliminar el usuario
          closeDeleteModal(); // Llama a la función para cerrar el modal
          // Forzar la actualización de la vista después de cerrar el modal
          await nextTick();
        }
      }
    };


    const closeDeleteModal = () => {
      // Cierra el modal
      const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
      modal.hide();
    };




    const eliminarUsuario = async (userId) => {
      try {
        await deleteUser(userId);
        usuarios.value = usuarios.value.filter(usuario => usuario.id !== userId);
        console.log("Usuario eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    };

    const hacerAdmin = async (usuario) => {
      try {
        console.log("Haciendo Admin al usuario con ID:", usuario.id);
        await editUserProfile(usuario.id, { isAdmin: true });
        usuario.isAdmin = true;
      } catch (error) {
        console.error("Error al hacer Admin al usuario:", error);
      }
    };

    const hacerUsuario = async (usuario) => {
      try {
        console.log("Haciendo Usuario al usuario con ID:", usuario.id);
        await editUserProfile(usuario.id, { isAdmin: false });
        usuario.isAdmin = false;
      } catch (error) {
        console.error("Error al hacer Usuario al usuario:", error);
      }
    };

    const filteredUsuarios = computed(() => {
      return usuarios.value.filter(usuario => {
        const query = searchQuery.value.toLowerCase();
        const nameMatch = usuario.displayName.toLowerCase().includes(query);
        const emailMatch = usuario.email.toLowerCase().includes(query);
        return nameMatch || emailMatch;
      });
    });


    onMounted(async () => {
      try {
        const fetchedUsuarios = await getAllUserProfiles();
        await nextTick();
        usuarios.value = fetchedUsuarios;
      } catch (error) {
        console.error("Error al obtener los perfiles de usuario:", error);
      } finally {
        loading.value = false;
      }
    });

    return {
      user,
      usuarios,
      loading,
      verPerfil,
      editarUsuario,
      eliminarUsuario,
      hacerAdmin,
      hacerUsuario,
      searchQuery,
      filteredUsuarios,
      confirmDelete,
      deleteUserConfirmed,
      closeDeleteModal,
      userToDelete
    };
  },
};
</script>





<template>
  <div class="user-management text-center">
    <h2>Lista de Usuarios</h2>

    <!-- Campo de búsqueda -->
    <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o correo electrónico..." class="search-input">

    <!-- Muestra una carga mientras se obtienen los datos -->
    <div v-if="loading" class="loading">Cargando...</div>

    <div class="container">
      <div class="table-responsive">
        <table v-if="!loading" class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in filteredUsuarios" :key="usuario.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.displayName }}</td>
              <td class="actions">
                <button @click="verPerfil(usuario)" class="btn btn-primary mr-1 m-1"><i class="fa-solid fa-user "></i> Ver
                  Perfil</button>

                <button @click="editarUsuario(usuario)" class="btn btn-warning mr-1 m-1">
                  <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>

                <button @click="confirmDelete(usuario.id)" class="btn btn-danger mr-1 m-1"><i
                    class="fa-solid fa-trash"></i> Borrar</button>

                <button v-if="user.email === 'nutritrack@hotmail.com' && usuario.isAdmin" @click="hacerUsuario(usuario)"
                  class="btn btn-secondary mr-1 m-1">Cambiar a Usuario</button>

                <button v-if="user.email === 'nutritrack@hotmail.com' && !usuario.isAdmin" @click="hacerAdmin(usuario)"
                  class="btn btn-info mr-1 m-1">Cambiar a Admin</button>
              </td>
              <router-link class="btn btn-primary mr-2" :to="`/usuario/${usuario.id}/chat`">Chat Privado</router-link>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar eliminación</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
  ¿Estás seguro de que quieres eliminar al usuario <strong>{{ userToDelete ? userToDelete.displayName : '' }}</strong>?
</div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button @click="deleteUserConfirmed(); closeDeleteModal()" type="button" data-bs-dismiss="modal"
            class="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>






<style scoped>
.actions {
  margin-left: 10%;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
  width: 50%;
  margin-bottom: 15px;
}


.user-management {
  margin: 20px;
}

.loading {
  font-style: italic;
  color: #888;
}

.table-container {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.btn-profile,
.btn-edit,
.btn-delete,
.btn-change-role {
  padding: 6px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.btn-profile:hover,
.btn-edit:hover,
.btn-delete:hover,
.btn-change-role:hover {
  background-color: #0056b3;
}

@media only screen and (max-width: 320px) {

  .user-table th,
  .user-table td {
    padding: 4px;
    font-size: 12px;
  }

  .btn-profile,
  .btn-edit,
  .btn-delete,
  .btn-change-role {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>


