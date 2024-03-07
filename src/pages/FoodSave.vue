<template>
  <div class="container mt-4">
    <div class="text-center">
      <h1>Comidas Guardadas</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- Verificar si hay comidas guardadas -->
        <div v-if="comidas.length === 0" class="alert alert-info">
          Sin comidas guardadas
        </div>
        <!-- Mostrar comidas si las hay -->
        <div v-else class="row">
          <div v-for="(comida, index) in comidas" :key="index" class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ comida.name }}</h5>
                <p class="card-text">{{ comida.calories }} calorías</p>
                <button @click="eliminarComida(index)" class="btn btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para las tarjetas y mensaje de alerta */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.card-text {
  color: #666;
}

.alert-info {
  margin: 40px;
  padding: 20px;
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}
</style>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      comidas: [] 
    };
  },
  methods: {
    async eliminarComida(index) {
      // Eliminar la comida del arreglo
      this.comidas.splice(index, 1);
      
      // Actualizar la base de datos de Firebase
      const auth = getAuth();
      const usuario = auth.currentUser;
      if (usuario) {
        const uid = usuario.uid;
        const db = getFirestore();
        const docRef = doc(db, 'foodsave', uid);
        try {
          await updateDoc(docRef, { comidas: this.comidas });
        } catch (error) {
          console.error("Error al eliminar la comida:", error);
        }
      }
    }
  },
  async mounted() {
    const auth = getAuth();
    const usuario = auth.currentUser;

    if (usuario) {
      const uid = usuario.uid;
      const db = getFirestore();

      const docRef = doc(db, 'foodsave', uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.comidas = docSnap.data().comidas;
        } else {
          console.log("No hay documentos!");
        }
      } catch (error) {
        console.error("Error al obtener las comidas guardadas:", error);
      }
    }
  }
};
</script>
