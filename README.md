# Anx - Conecta y Muestra tu Talento, Auténticamente

[![Estado del Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](soon)
[![Licencia](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blueviolet?style=flat-square)](https://blog.breadriuss.com)

**Anx** es una plataforma social emergente diseñada para profesionales que buscan mostrar sus habilidades y experiencias laborales de una manera más dinámica, visual y humana. Creemos que tu trayectoria profesional es más que una lista de puntos en un currículum; es una historia de crecimiento, colaboración y logros reales.

**Visita la aplicación:** [https://anx.breadriuss.com](https://anx.breadriuss.com)

<!-- espacio reservado para imagenes de anx -->
<!-- <p align="center">
  <img src="soon" alt="" width="700"/>
</p> -->

## 🤔 ¿Por Qué Anx?

Las plataformas profesionales tradicionales a menudo se sienten rígidas, enfocadas en títulos y conexiones superficiales. Se pierde la esencia de *cómo* trabajamos, los desafíos que superamos y la personalidad que aportamos a nuestros roles.

**Anx** nace para cambiar eso. Ofrecemos un espacio donde puedes:

*   **Contar tu historia profesional:** No solo qué hiciste, sino cómo lo hiciste, qué aprendiste y quién eres como profesional y que quieres lograr. Cual es tu objetivo real.
*   **Mostrar trabajo real:** Comparte proyectos, estudios de caso, prototipos, código, diseños, escritos, de forma visual y contextualizada.
*   **Conectar genuinamente:** Encuentra y colabora con personas basadas en habilidades compartidas, intereses y enfoques de trabajo compatibles.
*   **Destacar habilidades blandas:** Demuestra tu comunicación, trabajo en equipo y creatividad a través de tus interacciones y la forma en que presentas tu trabajo.
*   **Compartir tu forma de ser:** Puedes demostrar que tipo de persona eres, no solo en el ámbito laboral, y subir fotos hechas con IA a LinkedIn, dónde cuentas una historia siendo políticamente correcto donde te vendes como si fueras un producto, si no más bien como una persona que tiene metas, sueños, aspiraciones, obligaciones, días malos, días buenos.

## ✨ Características Principales

*   **Perfiles Centrados en la Persona:** Más allá de los títulos, con espacio para tu enfoque de trabajo, valores y lo que te apasiona.
*   **Showcase Dinámico de Habilidades:** Publica "Entradas de Habilidad" detallando proyectos específicos, desafíos superados y resultados obtenidos (con soporte para imágenes, videos, enlaces, etc.).
*   **Narrativa Profesional:** Comparte actualizaciones, reflexiones o aprendizajes sobre tu viaje laboral.
*   **Conexiones Significativas:** Sigue a profesionales, interactúa con su trabajo y construye una red basada en la admiración mutua y la compatibilidad.
*   **Descubrimiento Inteligente:** Encuentra personas y contenido relevante basado en habilidades, industrias e intereses.
*   **Feedback Constructivo (Próximamente):** Un sistema de reconocimiento y feedback enfocado en el crecimiento, ya que consideramos que pasar por este proceso dónde se recibe una retro-alimentación es muy importante para el desarrollo que tienes como profesional.

## 🛠️ Stack Tecnológico

Este proyecto está construido utilizando las siguientes tecnologías:

*   **Frontend:** React + Typescript (En un enfoque futuro, se piensa en los micro-frontends)
*   **Backend:** Arq. Hexagonal con NestJS, ORM Prisma. (En un enfoque futuro cuando crezca la aplicación se piensa en un enfoque basado en micro-servicios usando Go & Rust)
*   **Base de Datos:** PostgreSQL.
*   **Autenticación:** JWT (JSON Web Token)
*   **Despliegue:** Para el testing de la aplicación y producción temporal Netlify.

<!-- tengo pendiente añadir el showcase del perfil -->
<!--
### Vista del Perfil
<img alt="Vista del Perfil" width="500"/>

### Showcase de Habilidad
<img alt="Showcase de Habilidad" width="500"/>
-->

## ¿Como contribuir al proyecto?

*   **Donaciones:** Puedes hacer donaciones si te agrada el proyecto y el enfoque que tiene.
*   **Feedback del proceso actual:** El feedback para poder mejorar la experiencia de usuario es fundamental. No es necesario que seas un ingeniero de software o programador, simplemente puedes exponer tus puntos y ayudarnos a que este proyecto se adapte a las verdaderas necesidades de quienes lo usan, y por supuesto que **NUNCA** pierda su propósito incial.
* **Contribuyendo al desarrollo:** Este repositorio busca presentar el proyecto de código abierto para permitir a esos desarrolladores que se encuentren haciendo vida en la misma app, puedan contribuir y ayudarnos a mejorar lo que hasta hoy es **Anx**. 

## 🚀 Empezando (Desarrollo Local)

Sigue estos pasos para configurar el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    # Backend (por ahora el acceso al backend es privado, ya que se busca llegar a una versión estable para aceptar contribución)
    git clone https://github.com/anthonycursewl/anx-app-backend.git
    cd anx-app-backend

    # Frontend
    git clone https://github.com/anthonycursewl/anx-app.git
    cd anx-app
    ```

2.  **Instala Dependencias:**
    *   **Backend:**
        ```bash
        # Navega a la carpeta del backend si es necesario (ej. cd anx-app-backend)
        npm install
        # o yarn install
        ```
    *   **Frontend:**
        ```bash
        # Navega a la carpeta del frontend si es necesario (ej. cd anx-app)
        npm install
        # o yarn install
        ```

3.  **Configura las variables de Entorno:**
    *   Crea un archivo `.env` en la raíz del backend basándote en los archivos `.env.example` proporcionados.
    *   Rellena las variables necesarias.
        ```bash
        # Ejemplo para el backend
        cp .env.example .env
        nano .env # Editalo con tus crendenciales de base de datos local.
        ```

4.  **Configura la Base de Datos:**
    *   Asegúrate de tener PostgreSQL instalado y corriendo.
    *   Rellena con la info necesaria el archivo `.env`.
    *   Ejecuta las migraciones de **Prisma**:
        ```bash 
        # Ejecuta el comando para migrar el scheme de prisma a tu base de datos local.
        npx prisma migrate dev
        ```

5.  **Inicia la Aplicación:**
    *   **Backend:**
        ```bash
        # Para iniciar la aplicación en desarrollo
        npm run start:dev # o usa pnpm run start:dev

        # o iniciala sin el modo desarrollo
        npm run start # pnpm run start

        # Puedes usar `npm run` para ver la lista de scripts.
        ```
    *   **Frontend:**
        ```bash
        npm run dev
        # o yarn dev
        ```

6.  **Accede a la aplicación:** Abre tu navegador y ve a `http://localhost:5173`. El backend estará disponible en `http://localhost:3000`.

## ✅ Ejecutando Pruebas

Para ejecutar las pruebas automatizadas:

```bash
# Hasta el momento no se ha empezado a hacer testing.
