
# :computer: _Sistema de Gestion TUP_ :rocket::books:

![GitHub followers](https://img.shields.io/github/followers/samuop) ![GitHub forks](https://img.shields.io/github/forks/samuop/GestionTUP) ![GitHub Repo stars](https://img.shields.io/github/stars/samuop/GestionTUP) ![GitHub watchers](https://img.shields.io/github/watchers/samuop/GestionTUP) [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![Django](https://img.shields.io/badge/Django-5.0.7-green.svg)](https://www.djangoproject.com/)   [![Python](https://img.shields.io/badge/Python-3.10.0-blue.svg)](https://www.python.org/) [![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-4.3.5-blue.svg)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-2.4.4-blue.svg)](https://vitejs.dev/) [![Docker](https://img.shields.io/badge/Docker-20.10.7-blue.svg)](https://www.docker.com/) [![Docker Compose](https://img.shields.io/badge/Docker_Compose-1.29.2-blue.svg)](https://docs.docker.com/compose/) [![ESLint](https://img.shields.io/badge/ESLint-7.32.0-blue.svg)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-2.4.1-orange.svg)](https://prettier.io/) [![Google Cloud](https://img.shields.io/badge/Google_Cloud-Run-lightblue.svg)](https://cloud.google.com/run)

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

## :notebook: Table of Contents :ledger:

- [:computer: _Sistema de Gestion TUP_ :rocket::books:](#computer-sistema-de-gestion-tup-rocketbooks)
  - [:notebook: Table of Contents :ledger:](#notebook-table-of-contents-ledger)
  - [About the project :briefcase:](#about-the-project-briefcase)
  - [Team :busts\_in\_silhouette: :star:](#team-busts_in_silhouette-star)
  - [Documentation :notebook:](#documentation-notebook)
    - [Frontend Documentation (React)](#frontend-documentation-react)
      - [React + TypeScript + Vite](#react--typescript--vite)
      - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
    - [Backend :snake:🧑‍💻](#backend-snake)
      - [Setting up the backend](#setting-up-the-backend)
        - [Setting up the Docker container](#setting-up-the-docker-container)

## About the project :briefcase:

Team project for the Seminario Universitario course at the UTN - FRRe. The project consists of a web application for managing the TUP (Tecnicatura Universitaria en Programacion) of the students of the UTN - FRRe. The project is divided into two parts, the frontend and the backend. The frontend is developed using React/TS/Vite and the backend using Python with Django/DRF.

## Team :busts_in_silhouette: :star:

[carlosferreyra]: <http://github.com/carlosferreyra>
[TobiasMaciel]: <http://github.com/TobiasMaciel>
[yoelmarain]: <https://github.com/yoelmarain>
[facundomelgarejo]: <https://github.com/facundomelgarejo>
[MirandaAriano]: <http://github.com/MirandaAriano>
[samuop]: <https://github.com/samuop>
[ulises]: <https://github.com/ulisespallares888>

- [Ferreyra, Carlos Eduardo][carlosferreyra]
- [Maciel Meister, Tobias Alejandro][TobiasMaciel]
- [Marain, Yoel Mario][yoelmarain]
- [Melgarejo Roma, Facundo Gabriel][facundomelgarejo]
- [Miranda Falkievich, Ariano Gabriel][MirandaAriano]

- [Pallares, Ulises Pablo]{ulises}
- [Paredes, Samuel Octavio][samuop]
- [Robales Lopez, Lautaro Nicols]

## Documentation :notebook:

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
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

=======================================

[DjangoDocs]: <https://www.djangoproject.com/>
[PythonDocs]: <https://www.python.org/doc/>
[DRFDocs]: <https://www.django-rest-framework.org/>
[DRFSpectacularDocs]: <https://drf-spectacular.readthedocs.io/en/latest/>
[APIUrl]: <https://tup-backend-3q7z7w7zfq-uc.a.run.app/api/swagger-ui/>

### Backend :snake:🧑‍💻

This section is used for setting up the backend [Django][DjangoDocs] server, using [Python][PythonDocs] and [Django REST framework][DRFDocs], along with 3th party libraries like [drf-spectacular][DRFSpectacularDocs] for API documentation.

You can test the current backend (only Swagger API endpoint done so far) by visiting the following [URL][APIUrl] deployed in GCP (Google Cloud Platform):
This deployment is done using the `Dockerfile`.
This template provides a minimal setup to get Python working in a Django web server.

#### Setting up the backend

- Tools needed:
  - Python 3.10 or higher
    - pip (Python package manager)
    - venv (Python virtual environment manager)
  - Docker (optional)
    - Docker Compose (optional)
  - Git (optional)
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

3. At the root of the project, create a virtual environment

   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment using:
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

##### Setting up the Docker container

1. Install Docker using the official [Docker Desktop](https://www.docker.com/products/docker-desktop) application or using the package manager from your OS:
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
2. Build the Docker image using at the root of the project:

    ```bash
    docker build -t [backend] . #replace `[backend]` with the desired image name 
    ```

    Docker settings can be configured in the `Dockerfile` and `docker-compose.yml` files at the root of the project.
3. Run the Docker container using

    ```bash
    docker run -p 8000:8000 [backend] #replace `[backend]` with the image name used in the previous step. 
    ```

   You can also run the container in the background using the `-d` flag or specify a different port using `-p [host_port]:8000`
4. If defaults settings are used,the Django server should now be running on

   ```bash
   http://localhost:8000/
   ```

5. You can access the Django admin panel (if the '_DEBUG_' flag is set to True):

   ```bash
   http://localhost:8000/_/` #using superuser credentials
   ```

6. You can access the API documentation with Swagger UI at `http://localhost:8000/api/swagger-ui/` or
7. You can access the API documentation with ReDoc at `http://localhost:8000/api/redoc-ui/`
8. to stop the container press `Ctrl + C` in the terminal where the container is running.

   *_If the container is running in the background use:_

   ```bash
   docker ps #get the container ID
   ```

   and then:

   ```bash
   docker stop [container_id] #replace `[container_id]` with the container ID
   ```

9. to restart the container use:

   ```bash
   docker start [container_id] #replace `[container_id]` with the container ID
   ```

10. to remove the image use:

      ```bash
      docker rmi [backend] #replace `[backend]` with the image name
      ```

11. to remove the container and image use:

   ```bash
      docker rm -f [container_id] #replace `[container_id]` with the container ID
   ```
