<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<template>
  <header class="header">

    <img class="bg" src="../img/bg.svg" alt="">
    <img class="esp" src="../img/especies.png" alt="">

    <div class="header-content container">

      <div class="header-info">

        <div class="header-txt">
          <h1>Bienvenido a NutriTrack</h1>
          <p>NutriTrack es la aplicación web que te ayuda a mejorar tus hábitos alimenticios y alcanzar tus objetivos nutricionales. Registra tus comidas, establece límites de calorías y conecta con profesionales de la salud. Descubrí una forma más inteligente de comer con NutriTrack.</p>
          <router-link to="/comida" class="btn-1">Comidas</router-link>
        </div>

        <div class="header-img">
          <img src="../img/ensalada-1.png" alt="">
        </div>

      </div>

    </div>

  </header>

  <section class="info container">
    <router-link @click.native="scrollToTop" to="/calendario" class="info-1">
      <img src="../img/home/calendario.png" alt="">
      <h2>Calendario</h2>
    </router-link>

    <router-link @click.native="scrollToTop" to="/comida" class="info-1">
      <img src="../img/home/manzana.png" alt="">
      <h2>Comidas</h2>
    </router-link>

    <router-link @click.native="scrollToTop" to="/soporte" class="info-1">
      <img src="../img/home/soporte.png" alt="">
      <h2>Soporte</h2>
    </router-link>
  </section>



  <section class="nosotros">

    <img class="bg-2" src="../img/bg-2.svg" alt="">

    <div class="nosotros-info container">

      <div class="nosotros-img">
        <img src="../img/ensalada-2.png" alt="">
      </div>

      <div class="nosotros-txt">
        <span>Prémium</span>
        <h2>Obtené beneficios</h2>
        <p>NutriTrack Prémium ofrece una experiencia nutricional personalizada y exclusiva. Obtienes acceso a tu nutricionista o deportólogo para recibir orientación experta y planes de comidas adaptados a tus objetivos. Analiza en detalle los nutrientes de tus comidas y disfruta de descuentos exclusivos en alimentos saludables. Con NutriTrack Prémium, estás más cerca de alcanzar tus metas de bienestar y mejorar tus hábitos alimenticios de manera efectiva.</p>
        <a href="#" class="btn-1">Saber más</a>
      </div>

    </div>

  </section>

  <section class="containerPrice">
    <div class="container">
      <div class="infoP">
        <div class="info-content">
          <div class="info-price">
            <h2>Precio</h2>
            <p class="price">$10.000</p>
            <p>En NutriTrack, tu salud es una inversión valiosa. Nuestra plataforma te proporciona las herramientas
              necesarias para mejorar tus hábitos alimenticios y alcanzar tus objetivos nutricionales de manera
              informada. Únete a nosotros y comienza tu viaje hacia una vida más saludable.</p>
          </div>
          <div class="info-txt">
            <h2>Más información</h2>
            <p>En NutriTrack, tu seguridad es nuestra prioridad. Aceptamos pagos a través de Mercado Pago, una
              plataforma de pago en línea altamente segura y confiable. Descubre cómo NutriTrack puede transformar tu
              relación con la comida y tu salud, proporcionándote información detallada sobre tu ingesta nutricional,
              planes de comidas personalizados y acceso a profesionales de la salud. Obtén más detalles sobre cómo
              NutriTrack puede ayudarte a alcanzar tus metas nutricionales y llevar un estilo de vida más saludable.</p>
            <a class="btn-2" href="#">Información</a>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  position: relative;
}

.bg {
  position: absolute;
  width: 700px;
  z-index: auto;
  right: 0;
}

.esp {
  position: absolute;
  top: 675px;
  bottom: 0;
  width: 350px;
}

.header-info {
  display: flex;
  align-items: center;
  margin-top: 100px;
}

.header-txt {
  width: 50%;
  padding-right: 35px;
}

.header-txt h1 {
  font-size: 55px;
  line-height: 70px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 25px;
}

.header-txt p {
  font-size: 16px;
  color: #545454;
  margin-bottom: 35px;
}

.btn-1 {
  display: inline-block;
  background-color: #FF9F0D;
  padding: 13px 30px;
  border-radius: 25px;
  color: #ffffff;
  text-transform: capitalize;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.btn-2 {
  display: inline-block;
  background-color: #ffffff;
  padding: 15px 25px;
  color: #303030;
  border-radius: 25px;
  margin-top: 20px;
}

.btn-1:hover {
  background-color: #EE9003;
}

.header-img {
  width: 50%;
}

.header-img img,
.nosotros-img img {
  max-width: 100%;
  height: auto;
}


.info {
  padding: 100px;
  display: flex;
  justify-content: space-between;
}

.info-1 {
  width: 300px;
  padding: 8px 16px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.info-1:hover {
  background-color: #f0f0f0;
  transform: translateY(-5px);
}

.info-1 img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.info-1 h2 {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
}


.info-1 p {
  font-size: 16px;
  color: #545454;
}

.nosotros {
  position: relative;
}

.bg-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  z-index: auto;
}

.nosotros-info {
  padding: 100px 0;
  display: flex;
  align-items: center;
}

.nosotros-img {
  width: 50%;
}

.nosotros-img img {
  width: 650px;
}

.nosotros-txt {
  width: 50%;
}

.nosotros-txt span {
  font-size: 16px;
  color: #FF9F0D;
  font-weight: 700;
  margin-bottom: 25px;
}

.nosotros-txt h2 {
  font-size: 45px;
  color: #303030;
  margin-bottom: 30px;
}

.nosotros-txt p {
  font-size: 18px;
  color: #545454;
  margin-bottom: 50px;
}

.containerPrice {
  padding: 200px 0px 30px 0px;
  background-image: url(../img/bg-3.svg);
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
}

.info-content {
  display: flex;
}

.info-price {
  padding: 35px;
  text-align: center;
  background-color: #F5F5F5;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.3);
  margin: 0px 150px 0px 0px;
  color: #0E0E0E;
}

.info-price h2 {
  font-size: 25px;
  margin-bottom: 10px;
}

.price {
  font-size: 14px;
  color: #EE9003 !important;
  margin-bottom: 10px;
}

.info-price p {
  font-size: 16px;
  color: #525254;
}

.info-txt {
  margin-left: 35px;
  color: #ffffff;
}

@media (max-width: 991px) {
  .bg {
    width: 100%;
  }

  .esp {
    display: none;
  }

  .header-info {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

  .header-txt {
    width: 100%;
    text-align: center;
    padding: 0;
  }

  .header-txt h1 {
    font-size: 40px;
    line-height: 50px;
  }

  .header-img {
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }

  .header-img img {
    width: 80%;
  }

  .info {
    padding: 20px;
    flex-direction: column;
    align-items: center;
  }

  .info-1 {
    width: 80%;
    padding: 20px;
    margin: 10px 0;
  }

  .nosotros {
    padding: 20px;
  }

  .bg-2 {
    top: 80px;
    width: 200px;
  }

  .nosotros-info {
    padding: 20px 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .nosotros-img {
    width: 80%;
  }

  .nosotros-img img {
    width: 100%;
  }

  .nosotros-txt h2 {
    font-size: 40px;
    line-height: 50px;
    margin-bottom: 10px;
  }

  .nosotros-txt p {
    margin-bottom: 20px;
  }

  .containerPrice {
    padding: 20px;
  }

  .info-content {
    flex-direction: column;
    text-align: center;
  }

  .info-price {
    margin: 0px 0px 20px 0px;
  }

  .info-txt {
    margin: 0px;
  }
  @media (max-width: 767px) {
  .header-txt p {
    max-width: 300px;
    margin: 0 auto;
  }

  .info-1 h2 {
    max-width: 200px;
    margin: 0 auto;
  }
  .nosotros-txt {
    max-width: 300px;
    margin: 0 auto;
    text-align: left;
  }

  .nosotros-txt span {
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
  }

  .nosotros-txt h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .nosotros-txt p {
    font-size: 16px;
    line-height: 1.6; 
    margin-bottom: 20px;
  }
}

}
</style>