# PetMatch

PetMatch is a full-stack web application for managing animal adoptions.

The project consists of a **FastAPI REST API** connected to a relational
database and a **HTML/CSS/JavaScript frontend** that consumes the API
using Axios.

## Technologies

### Backend

-   Python
-   FastAPI
-   SQLAlchemy
-   Alembic
-   Pydantic
-   SQLite
-   Uvicorn

### Frontend

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   Axios
-   Live Server

## Project structure

``` text
PetMatch/
├── backend/
│   ├── alembic/
│   │   └── versions/
│   ├── config/
│   ├── controller/
│   ├── database/
│   ├── enums/
│   ├── model/
│   ├── routes/
│   ├── schema/
│   ├── .env.example
│   ├── .gitignore
│   ├── alembic.ini
│   ├── db.sqlite3
│   ├── main.py
│   ├── README.md
│   └── requirements.txt
└── frontend/
    ├── index.html
    └── src/
        ├── css/
        │   ├── styles.css
        │   ├── header.css
        │   ├── cards.css
        │   ├── forms.css
        │   ├── dialogs.css
        │   └── responsive.css
        └── js/
            ├── api.js
            ├── app.js
            └── dialogs.js
```

## Data model

PetMatch manages four entities:

-   **Shelter**
-   **Animal**
-   **Adopter**
-   **Adoption Interest**

Relationships:

-   One shelter can have many animals.
-   One adopter can have many adoption interests.
-   One animal can have many adoption interests.
-   `AdoptionInterest` is the intermediate entity between adopters and
    animals.

## Requirements

Install:

-   Python 3.12+ recommended
-   Visual Studio Code
-   Git
-   A modern web browser

The frontend does **not** require `npm install`: it is a plain
HTML/CSS/JavaScript application and Axios is loaded through an import
map.

# Backend setup

From the project root:

``` cmd
cd backend
```

## 1. Create the virtual environment

``` cmd
python -m venv .venv
```

## 2. Activate it

Windows CMD:

``` cmd
.venv\Scripts\activate
```

## 3. Install dependencies

``` cmd
pip install -r requirements.txt
```

## 4. Apply database migrations

``` cmd
alembic upgrade head
```

## 5. Start the backend

``` cmd
uvicorn main:app --reload
```

The API will be available at:

``` text
http://127.0.0.1:8000
```

Swagger:

``` text
http://127.0.0.1:8000/docs
```

ReDoc:

``` text
http://127.0.0.1:8000/redoc
```

# Frontend setup

The frontend is a static application and does not require Node.js or
`npm install`.

## Using Live Server

1.  Open the `frontend` folder in Visual Studio Code.
2.  Install the **Live Server** extension.
3.  Open `index.html`.
4.  Right-click it and select **Open with Live Server**.

The frontend normally runs at:

``` text
http://127.0.0.1:5500
```

# Running the complete project

You need two terminals.

### Terminal 1 --- Backend

``` cmd
cd PetMatch\backend
.venv\Scripts\activate
uvicorn main:app --reload
```

### Terminal 2 --- Frontend

Open `frontend/index.html` with Live Server.

Then open:

``` text
http://127.0.0.1:5500
```

# Database migrations

After modifying SQLAlchemy models, create a migration:

``` cmd
cd backend
.venv\Scripts\activate
alembic revision --autogenerate -m "describe the changes"
```

Apply it:

``` cmd
alembic upgrade head
```

Current migration:

``` cmd
alembic current
```

Migration history:

``` cmd
alembic history
```

## Reset the local SQLite database

Stop the backend, delete:

``` text
backend/db.sqlite3
```

Then run:

``` cmd
cd backend
.venv\Scripts\activate
alembic upgrade head
```

# API endpoints

## Animals

``` text
GET    /animals/
POST   /animals/
GET    /animals/{id}
PUT    /animals/{id}
DELETE /animals/{id}
DELETE /animals/{id}/cascade
```

## Adopters

``` text
GET    /adopters/
POST   /adopters/
GET    /adopters/{id}
PUT    /adopters/{id}
DELETE /adopters/{id}
DELETE /adopters/{id}/cascade
```

## Shelters

``` text
GET    /shelters/
POST   /shelters/
GET    /shelters/{id}
PUT    /shelters/{id}
DELETE /shelters/{id}
DELETE /shelters/{id}/cascade
```

## Adoption Interests

``` text
GET    /adoption-interests/
POST   /adoption-interests/
GET    /adoption-interests/{id}
PUT    /adoption-interests/{id}
DELETE /adoption-interests/{id}
```

# Testing

The API can be tested with:

-   Swagger UI: `http://127.0.0.1:8000/docs`
-   Postman

Example:

``` http
POST http://127.0.0.1:8000/animals/
Content-Type: application/json
```

``` json
{
    "name": "Luna",
    "species": "dog",
    "breed": "Labrador",
    "age": 3,
    "adopted": false,
    "shelter_id": 1
}
```

For adoption interests, the API uses IDs internally. The frontend
displays the corresponding animal and adopter names instead of their
IDs.

# Frontend features

-   Animal management
-   Adopter management
-   Shelter management
-   Adoption interest management
-   CRUD operations
-   Cascade deletion where applicable
-   HTML form validation
-   API error handling
-   Responsive layout
-   Responsive navigation menu
-   Dialog-based CRUD operations
-   Shelter selection by name for animals
-   Animal and adopter selection by name for adoption interests

# Git

The project ignores local/generated files such as:

``` text
.venv/
__pycache__/
*.pyc
node_modules/
.env
```

Typical workflow:

``` cmd
git status
git add .
git commit -m "Describe the changes"
git push
```

# Authors

PetMatch was developed as a full-stack course project using FastAPI and
a JavaScript frontend.

------------------------------------------------------------------------

# PetMatch --- Español

PetMatch es una aplicación web **full-stack** para gestionar adopciones
de animales.

El proyecto está compuesto por una **API REST desarrollada con
FastAPI**, conectada a una base de datos relacional, y un **frontend
desarrollado con HTML, CSS y JavaScript** que consume la API mediante
Axios.

## Tecnologías

### Backend

-   Python
-   FastAPI
-   SQLAlchemy
-   Alembic
-   Pydantic
-   SQLite
-   Uvicorn

### Frontend

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   Axios
-   Live Server

## Modelo de datos

PetMatch gestiona cuatro entidades principales:

-   **Shelter**
-   **Animal**
-   **Adopter**
-   **Adoption Interest**

Relaciones:

-   Un refugio puede tener muchos animales.
-   Un adoptante puede tener muchos intereses de adopción.
-   Un animal puede tener muchos intereses de adopción.
-   `AdoptionInterest` actúa como entidad intermedia entre adoptantes y
    animales.

## Requisitos

Es necesario tener instalado:

-   Python 3.12 o superior recomendado
-   Visual Studio Code
-   Git
-   Un navegador web moderno

El frontend **no requiere `npm install`**, ya que es una aplicación
desarrollada únicamente con HTML, CSS y JavaScript, y Axios se carga
mediante un import map.

# Configuración del Backend

Desde la raíz del proyecto:

``` cmd
cd backend
```

## 1. Crear el entorno virtual

``` cmd
python -m venv .venv
```

## 2. Activar el entorno virtual

En Windows CMD:

``` cmd
.venv\Scripts\activate
```

## 3. Instalar las dependencias

``` cmd
pip install -r requirements.txt
```

## 4. Aplicar las migraciones de la base de datos

``` cmd
alembic upgrade head
```

## 5. Lanzar el Backend

``` cmd
uvicorn main:app --reload
```

La API estará disponible en:

``` text
http://127.0.0.1:8000
```

Documentación Swagger:

``` text
http://127.0.0.1:8000/docs
```

Documentación ReDoc:

``` text
http://127.0.0.1:8000/redoc
```

# Configuración del Frontend

El frontend es una aplicación estática y no necesita Node.js ni
`npm install`.

## Usando Live Server

1.  Abrir la carpeta `frontend` en Visual Studio Code.
2.  Instalar la extensión **Live Server**.
3.  Abrir `index.html`.
4.  Hacer clic derecho sobre el archivo y seleccionar **Open with Live
    Server**.

Normalmente el frontend estará disponible en:

``` text
http://127.0.0.1:5500
```

# Ejecutar el proyecto completo

Es necesario tener dos terminales abiertas.

### Terminal 1 --- Backend

``` cmd
cd PetMatch\backend
.venv\Scripts\activate
uvicorn main:app --reload
```

### Terminal 2 --- Frontend

Abrir `frontend/index.html` utilizando Live Server.

Después acceder a:

``` text
http://127.0.0.1:5500
```

# Migraciones de la base de datos

Después de modificar los modelos de SQLAlchemy, crear una nueva
migración:

``` cmd
cd backend
.venv\Scripts\activate
alembic revision --autogenerate -m "describe the changes"
```

Aplicarla:

``` cmd
alembic upgrade head
```

Consultar la migración actual:

``` cmd
alembic current
```

Consultar el historial:

``` cmd
alembic history
```

## Reiniciar la base de datos SQLite local

Detener el backend y eliminar:

``` text
backend/db.sqlite3
```

Después ejecutar:

``` cmd
cd backend
.venv\Scripts\activate
alembic upgrade head
```

# Endpoints de la API

## Animals

``` text
GET    /animals/
POST   /animals/
GET    /animals/{id}
PUT    /animals/{id}
DELETE /animals/{id}
DELETE /animals/{id}/cascade
```

## Adopters

``` text
GET    /adopters/
POST   /adopters/
GET    /adopters/{id}
PUT    /adopters/{id}
DELETE /adopters/{id}
DELETE /adopters/{id}/cascade
```

## Shelters

``` text
GET    /shelters/
POST   /shelters/
GET    /shelters/{id}
PUT    /shelters/{id}
DELETE /shelters/{id}
DELETE /shelters/{id}/cascade
```

## Adoption Interests

``` text
GET    /adoption-interests/
POST   /adoption-interests/
GET    /adoption-interests/{id}
PUT    /adoption-interests/{id}
DELETE /adoption-interests/{id}
```

# Pruebas

La API puede probarse utilizando:

-   Swagger UI: `http://127.0.0.1:8000/docs`
-   Postman

Ejemplo:

``` http
POST http://127.0.0.1:8000/animals/
Content-Type: application/json
```

``` json
{
    "name": "Luna",
    "species": "dog",
    "breed": "Labrador",
    "age": 3,
    "adopted": false,
    "shelter_id": 1
}
```

En los intereses de adopción, la API utiliza los IDs internamente,
mientras que el frontend muestra los nombres correspondientes del animal
y del adoptante.

# Funcionalidades del Frontend

-   Gestión de animales
-   Gestión de adoptantes
-   Gestión de refugios
-   Gestión de intereses de adopción
-   Operaciones CRUD
-   Eliminación en cascada cuando corresponde
-   Validación de formularios HTML
-   Gestión de errores de la API
-   Diseño responsive
-   Menú de navegación responsive
-   Diálogos para las operaciones CRUD
-   Selección de refugios mediante su nombre para los animales
-   Selección de animales y adoptantes mediante sus nombres para los
    intereses de adopción

# Git

El proyecto ignora archivos locales y generados como:

``` text
.venv/
__pycache__/
*.pyc
node_modules/
.env
```

Flujo habitual:

``` cmd
git status
git add .
git commit -m "Describe the changes"
git push
```

# Autores

PetMatch ha sido desarrollado como proyecto de curso full-stack
utilizando FastAPI y un frontend basado en JavaScript.
