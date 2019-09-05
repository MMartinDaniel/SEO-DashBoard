# SEO-DASHBOARD

Proyecto de fin de grado, hecho con:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


### Instalacion

	npm install
	npm install -g nodemon
	crear config.js en /config/
		con el contenido:
		module.exports = {
			db: 'mongodb://localhost:27017/dashboard',
			db_dev: 'mongodb://localhost:27017/dashboard',
		};

	instalar mongodb
		crear la carpeta C:\data\db\
		ejecutar mongod.exe en la carpeta donde instales mongodb. (por defecto en programfiles/mongodb/server/4.0/bin/)
		mas informacion en ( https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ )

	Registro de usuario:
	peticion POST a http://localhost/api/account/signup
		{email:'test',password:'test'};
	entrar en la DB y activar el campo de administrador
	entrar en localhost:8080/login y logearse con los datos de arriba.

## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Run


Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```
