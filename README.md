# Wall App - Backend

## Context

This is an app for displaying information in a post it wall. It was built with `react.js`, `react-router`, `react-router-dom` and `axios`.

The unauth/unlogged guest may read the post its, create a user or log in, while the authed/logged user can handle basic **CRUD** (create, read, update and delete) operations for the post its.

The backend of this application can be found [here](https://github.com/luciobj/Wallapp-backend).

The design of this application is based on [this figma](https://www.figma.com/file/6XyCxqYVUcAl7R7B3tqBgR/Wall-App?node-id=0%3A1).

## Requirements

- node.js
- npm

## Installation

First, clone this repository to your local machine.

```bash
git clone git@github.com:luciobj/wallapp-frontend.git
```

Enter the created folder, and install the dependencies.

```bash
cd wallapp-frontend
npm install
```

Now you can run the application.

```bash
npm start
```

## Usage

For this application to run properly, you need to have the backend already running. You can do that by accessing the [backend repository](https://github.com/luciobj/Wallapp-backend) and following the instructions.

By accessing the application on the adress `http://localhost:3000/`, you can you it direcly as you'd like.

You can also access the api by accessing the address `http://localhost:3000/api/get/`, if you have the backend running.

## Previews

[Preview Mobile Main Unauth]('./assets/preview1.png')
[Preview Mobile Login]('./assets/preview2.png')
[Preview Mobile Register]('./assets/preview3.png')
[Preview Mobile Main Auth]('./assets/preview4.png')
[Preview Main Unauth]('./assets/preview5.png')
[Preview Login]('./assets/preview6.png')
[Preview Register]('./assets/preview7.png')
[Preview Main Auth]('./assets/preview8.png')
