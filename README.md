# Proyecto II: Social Rolling con JS
##### Autor: Emilio Ezequiel Hurtado
Se creó una web que representa una red social responsive utilizando Javascript puro, aplicando CSS3 y HTML5. Los nombres de las variables fueron escritas en idioma inglés, pero los comentarios y el sitio, en español. El deploy del sitio se hizo en Netlify, puedes acceder desde el siguiente enlace: https://socialrolling.netlify.app/

Se desarrollaron las siguientes secciones:
- Pantalla de Login
- Pantalla principal para Usuario Logueado
- Modal o pantalla de Historias para usuario Logueado
- Modal o pantalla de Historias para Usuario Invitado
- Pantalla de invitación a registrarse para usuarios no logueados
- Pantalla 404
 
Las librerías que se agregaron fueron:
- Font Awesome: íconos
- Moment JS: formatear fecha de publicaciones
- JQuery: simples funciones como el cierre de un modal
- Sweet Alert 2: carteles de alerta
 
CSS3 Framework:
- Bootstrap 5

# Secciones
### Login
[x] Campo usuario (email) y contraseña, ambos obligatorios.
[x] Campo de email validado por medio de expresiones regulares:
- Hasta 8 caracteres
- Letras de alfabeto y números
- Al menos 1 carácter especial de los siguientes 4: # & * %

[x] Botón Login que redirige a página principal
[x] Botón Continuar como invitado que redirige a página principal, limitando funciones
[x] Usuario loguado guardado en Local Storage
[x] Errores en validación muestran un mensaje de error

### Página principal
[x] Acceso luego de Login o Continuar como invitado pero con limitadas funciones
[x] Burbuja de perfil con función para agregar publicación, en caso de estar logueado
[x] Función para guardar imagen en Local Storage al agregarla
[x] Tres burbujas adicionales precargadas
[x] Posteos con imagen, fecha y likes

### Modal de historias
[x] Modal que muestra carrusel de imágenes cargadas por usuario logueado
[x] Las imágenes cambian automáticamente con un intervalo de 3 segundos
[x] Botón para incrementar likes
[x] Al finalizar carrusel:
- Redirige a página principal si usuario logueado
- Redirige a página de registro si usuario invitado

[x] Botón eliminar publicación para usuario logueado
[x] Barra de progreso para historias

### Página de registro
[x] Logo Social Rolling
[x] Invitación a registro
[x] Botón con redirección a página 404

### Página 404
[x] Leyenda de página no encontrada
[x] Botón de redirección a pantalla principal