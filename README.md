# TechSecure Auth System

Sistema de autenticación y gestión de usuarios desarrollado como proyecto académico, enfocado en seguridad, escalabilidad y buenas prácticas de desarrollo.

---

## Overview

Este proyecto implementa un sistema web que permite:

- Registro de usuarios
- Autenticación (login/logout)
- Gestión de usuarios (panel administrador)
- Control de accesos

El sistema fue desarrollado aplicando metodología ágil Scrum y evolucionó desde diseño conceptual hasta un prototipo funcional.

---

## Arquitectura

El sistema sigue una arquitectura en capas:

- **Frontend (Presentación)**: Interfaces de usuario (Login, Signup, Admin)
- **Backend (Negocio)**: Lógica de autenticación y gestión (Django)
- **Base de Datos (Datos)**: Persistencia de usuarios (MySQL, Django)

---

## ⚙️ Tech Stack

- **Backend:** Python + Django  
- **Frontend:** HTML5, CSS, JavaScript  
- **Database:** MySQL, Django  
- **UI/UX:** Figma  
- **Version Control:** GitHub  
- **Project Management:** Trello  

---

## Features

- User registration
- User login/logout
- Credential validation
- Admin panel for user management
- Secure password handling
- Layered architecture

---

## Testing

Se realizaron pruebas funcionales e2e y de usuario:

- Validación de login
- Registro de usuarios
- Gestión desde panel admin

Se documentaron mediante un **Manual de Testing**, validando cumplimiento de historias de usuario y Definition of Done.

---

## 🛠️ Setup & Installation

```bash
# Clonar repositorio
git clone https://github.com/tu-repo

# Entrar al proyecto
cd nombre-proyecto

# Crear entorno virtual
python -m venv venv

# Activar entorno
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar dependencias
pip install -r requirements.txt

# Migraciones
python manage.py migrate

# Ejecutar servidor
python manage.py runserver