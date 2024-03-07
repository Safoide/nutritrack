<template>
    <div class="error-page">
      <div class="content">
        <h1 data-text="404">404</h1>
        <h2>¡Ups! Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <div class="btns">
          <a href="/home">Inicio</a>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    .error-page {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin: 20px;
      top: 5px;
    }
  
    .error-page .content {
      max-width: 600px;
      text-align: center;
    }
  
    .content h1 {
      font-size: 18vw;
      line-height: 1em;
    }
  
    .content h2 {
      margin-bottom: 20px;
      text-transform: uppercase;
      color: #000;
      max-width: 600px;
      font-size: 2em;
    }
  
    .content p {
      font-size: 1.2em;
      color: #0d0d0d;
    }
  
    .content .btns {
      margin: 25px 0;
      display: inline-flex;
    }
  
    .content .btns a {
      display: inline-block;
      margin: 0 10px;
      text-decoration: none;
      border: 2px solid #69a6ce;
      color: #69a6ce;
      font-weight: 500;
      padding: 10px 25px;
      border-radius: 25px;
      text-transform: uppercase;
    }
  
    .content .btns a:hover {
      background: #69a6ce;
      color: #fff;
    }
  </style>
  