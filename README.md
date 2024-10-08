# :computer: _Sistema de Gestion TUP_ :rocket: :books:

<!-- repo url:  https://github.com/Seminario-Integrador-2024/GestionTUP -->

<!-- repo badges -->

![GitHub followers](https://img.shields.io/github/followers/Seminario-Integrador-2024) [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![FrontCI Pipeline](https://github.com/Seminario-Integrador-2024/GestionTUP/actions/workflows/FrontCi.yml/badge.svg)](https://github.com/Seminario-Integrador-2024/GestionTUP/actions/workflows/FrontCi.yml)

[![Django](https://img.shields.io/badge/Django-5.1-green.svg)](https://www.djangoproject.com/) [![Python](https://img.shields.io/badge/Python-3.10.14-blue.svg)](https://www.python.org/) [![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-4.3.5-blue.svg)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-2.4.4-blue.svg)](https://vitejs.dev/) [![Docker](https://img.shields.io/badge/Docker-20.10.7-blue.svg)](https://www.docker.com/) [![Docker Compose](https://img.shields.io/badge/Docker_Compose-1.29.2-blue.svg)](https://docs.docker.com/compose/) [![ESLint](https://img.shields.io/badge/ESLint-7.32.0-blue.svg)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-2.4.1-orange.svg)](https://prettier.io/) [![Google Cloud](https://img.shields.io/badge/Google_Cloud-Run-lightblue.svg)](https://cloud.google.com/run)

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

## Table of Contents

- [About the project](#about-the-project)
- [Team](#team)
- [Documentation](#documentation)
  - [Frontend Documentation (React)](#frontend-documentation-react)
    - [React + TypeScript + Vite](#react--typescript--vite)
    - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
  - [Backend](#backend)
    - [Setting up the backend for Development](#setting-up-the-backend-for-development)
    - [Running the Backend Server Locally](#running-the-backend-server-locally)

## About the project

Team project for the Seminario Universitario course at the UTN - FRRe. The project consists of a web application for managing the TUP (Tecnicatura Universitaria en Programacion) of the students of the UTN - FRRe. The project is divided into two parts, the frontend and the backend. The frontend is developed using React/TS/Vite and the backend using Python with Django/DRF.

## Team

[carlosferreyra]: http://github.com/carlosferreyra
[TobiasMaciel]: http://github.com/TobiasMaciel
[yoelmarain]: https://github.com/yoelmarain
[facundomelgarejo]: https://github.com/facundomelgarejo
[MirandaAriano]: http://github.com/MirandaAriano
[samuop]: https://github.com/samuop
[ulises]: https://github.com/ulisespallares888

- [Ferreyra, Carlos Eduardo][carlosferreyra]
- [Maciel Meister, Tobias Alejandro][TobiasMaciel]
- [Marain, Yoel Mario][yoelmarain]
- [Melgarejo Roma, Facundo Gabriel][facundomelgarejo]
- [Miranda Falkievich, Ariano Gabriel][MirandaAriano]
- [Pallares, Ulises Pablo][ulises]
- [Paredes, Samuel Octavio][samuop]

- [Robales Lopez, Lautaro Nicols]

## Documentation

### Frontend Documentation (React)

#### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

=======================================

[DjangoDocs]: https://www.djangoproject.com/
[PythonDocs]: https://www.python.org/doc/
[DRFDocs]: https://www.django-rest-framework.org/
[DRFSpectacularDocs]: https://drf-spectacular.readthedocs.io/en/latest/

### Backend

This section is used for setting up the backend [Django][DjangoDocs] server, using [Python][PythonDocs] and [Django REST framework][DRFDocs], along with 3th party libraries like [drf-spectacular][DRFSpectacularDocs] for API documentation.

This deployment is done using the `Dockerfile`.
This template provides a minimal setup to get Python working in a Django web server.

#### Setting up the backend for Development

- Tools needed:
  - Shell (bash, zsh, PowerShell, etc.)
  - Python 3.10 or higher
    - pip (Python package manager)
  - Docker
    - Docker Compose
  - Visual Studio Code (optional - recommended)

Steps to set up the backend environment:

1. Install Python 3.10 or higher using the package manager from you OS:

   1. if macOS run using zsh:

      ```bash
      brew install python
      ```

   2. if Ubuntu/Debian run using bash:

      ```bash
      sudo apt-get install python3
      ```

   3. if Windows run using PowerShell or PowerShell Core:

      ```bash
      winget install python
      ```

      **Note:** _If you are using a different OS, or prefer a manual installation, please refer to the official Python [download page](https://www.python.org/downloads/)_

2. Install pip (Python package manager):

   ```bash
   python -m ensurepip
   ```

   to get the latest version of pip:

   ```bash
   python -m pip install --upgrade pip
   ```

3. At the root of the project, create a virtual environment:

   ```bash
   python -m venv venv
   ```

4. And finally, activate the virtual environment:

   1. On macOS/Linux:

      ```bash
      source venv/bin/activate
      ```

   2. On Windows:

      ```bash
      .\venv\Scripts\Activate
      ```

   **Note:**

- _You can deactivate the virtual environment using the `deactivate` command, once you are done working on the project._
- _A complete list of python dependencies can be found in the `requirements.txt` file at the root of the project._

<!-- development setup finished -->

5. Now you can install the project dependencies using pip:

   ```bash
   pip install -r requirements.txt
   ```

6.

#### Running the Backend Server Locally

1. Install Docker using the official downloader [Docker Desktop](https://www.docker.com/products/docker-desktop), or using the package manager from your OS:
   1.On macOS run:

   ```bash
    brew install docker
   ```

   2.On Linux/Debian run:

   ```bash
    sudo apt-get install docker
   ```

   1.On Windows run:

   ```bash
    winget install docker
   ```

   _**Note:**_ _You may also need to install Docker Compose using `brew install docker-compose` in macOS or `sudo apt-get install docker-compose` in Ubuntu/Debian_

2. Run the following command to deploy the backend server using docker-compose:

   ```bash
   docker-compose up -d
   ```

3. You can access the API documentation with Swagger UI at `http://localhost:8000/api/swagger-ui/` or
4. You can access the API documentation with ReDoc at `http://localhost:8000/api/redoc-ui/`
5. to stop the server and remove the volumes run:

   ```bash
   docker-compose down -v
   ```

6. to stop the server and keep the volumes run:

   ```bash
   docker-compose down
   ```
