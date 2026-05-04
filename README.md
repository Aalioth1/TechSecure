# Sistema de Autenticación de Usuarios - TechSecure Ltda.

## Descripción
Proyecto académico que implementa un sistema de autenticación de usuarios para una plataforma web, con foco en seguridad y control de accesos por roles para la empresa TechSecure Ltda.

El sistema permite registro de usuarios, inicio y cierre de sesión, validación de credenciales y gestión de accesos según roles.

---

## Objetivo
Desarrollar una solución segura y eficiente que permita gestionar el acceso de usuarios a una plataforma web mediante mecanismos de autenticación.

---

## Metodología
Scrum, organizando el trabajo en sprints iterativos con Product Backlog y Sprint Backlog gestionados en Trello.

---

## Arquitectura del sistema

Arquitectura en capas con frontend y backend desacoplados, comunicados por API REST con JWT.

### Capa de Presentación (Frontend)
- Angular 20, Angular Material 20 + **Angular CDK**, **Reactive Forms**, SCSS.
- **RxJS**, TypeScript, **Zone.js** .
- Vistas: login, registro y panel de administración.

### Capa de Negocio (Backend)
- Python + **Django 5.x** + **Django REST Framework** + **SimpleJWT** + **django-cors-headers**.
- Variables de entorno con **python-dotenv**; cliente HTTP **requests** (p. ej. servicios externos).
- Encripta contraseñas con el sistema de hashing nativo de Django.
- Expone API REST: autenticación JWT, registro de usuarios y extensión para gestión de usuarios.

### Capa de Datos
- SQLite por defecto rápido para desarrollo.


---

## Cómo levantar el proyecto

### 1. Backend (Django)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser   # opcional, para acceder al admin
python manage.py runserver
```

El backend queda disponible en `http://localhost:8000`.

Endpoints relevantes:
- `/admin/usuarios/usuario/` - lista de usuarios.
- `/admin/` — panel de Django.

### 2. Frontend (Angular)

```powershell
cd frontend
npm install
npx ng serve
```

El frontend queda en `http://localhost:4200` y consume el API en `http://localhost:8000/api` (configurable en `src/environments/`).

### 3. Pruebas end-to-end (Playwright)

Pruebas funcionales del frontend (cargan `ng serve` automáticamente):

```powershell
cd frontend
npm run e2e:install   # solo la primera vez (descarga Chromium)
npm run e2e           # ejecuta las pruebas
npm run e2e:ui        # modo UI interactiva
```

---

## Funcionalidades principales

- Registro de usuarios.
- Inicio y cierre de sesión con JWT.
- Validación de credenciales.
- Control de accesos basado en roles (`admin`, `usuario`).
- Gestión de usuarios desde el panel administrador.

---

## Tecnologías

- **Backend:** Python **3.11+** (compatible con Django 5.x; en desarrollo se ha usado p. ej. 3.13), **Django 5.x**, **Django REST Framework**, **djangorestframework-simplejwt**, **django-cors-headers**, **PyMySQL** (driver MySQL en Windows), **python-dotenv**, **requests**.
- **Frontend:** **Angular 20.x**, **Angular Material 20.x**, **Angular CDK 20.x**, **@angular/animations**, **RxJS** 7.8, **TypeScript**, **SCSS**, componentes standalone. **Pruebas:** Karma + Jasmine (unit), **Playwright** (e2e).
- **Base de datos:** SQLite (desarrollo por defecto), MySQL (opcional, `USE_MYSQL=true` en `.env`).
- **Control de versiones:** Git / GitHub.
- **Gestión ágil:** Trello.

---

## Avance del proyecto

- ✔ Sprint 1 - Planificación (épicas, historias, Product Backlog, Roadmap).
- ✔ Sprint 2 - Análisis (refinamiento, definición de tecnologías).
- ✔ Sprint 3 - Diseño (prototipos de login y registro, diagramas UML, arquitectura en capas).
- ◔ Sprint 4 - Implementación (en curso): scaffolding monorepo, modelo de usuario, JWT, esqueleto de pantallas.

---

## Épicas

- Épica 0: Configuración del entorno.
- Épica 1: Autenticación.
- Épica 2: Gestión de usuarios.
- Épica 3: Seguridad.
- Épica 4: Diseño y modelamiento.
- Épica 5: Arquitectura.

---

## Integrantes

- Moisés Martínez
- Estefanía Neira

---

## Estado del proyecto
En desarrollo (fase de implementación).
