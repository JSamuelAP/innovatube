# InnovaTube API

## Arquitectura
<img width="1654" height="1243" alt="imagen" src="https://github.com/user-attachments/assets/f85512cc-df66-4b5a-a6ab-9e076d4c7bb9" />

* Frontend
  * Angular con primeng y tailwindcss
  * Netlify como hosting
  * Protección reCAPTCHA V2
* Backend
  * Nodejs con TypeScript
  * Express  para crear la API REST
  * Render como nube para ejecutar la API
  * Supabase y PostgreSQL como base de datos relacional
  * API de YouTube
  * Validación reCAPTCHA

## Base de datos
Se utilizo supabase para crear las tablas _user_ y _user_favorite_, la tabla _video_ no existe porque su información se consulta de la API de YouTube, pero se incluye en el diagrama para visualizar los campos consultados:
<img width="2688" height="1288" alt="imagen" src="https://github.com/user-attachments/assets/14b23903-1379-4e2c-93d7-8a5167822594" />

## Casos de uso
<img width="3188" height="2284" alt="imagen" src="https://github.com/user-attachments/assets/94f58ffb-e721-4a50-8151-d66fec2d7d63" />

