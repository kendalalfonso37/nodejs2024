# Ejercicio de Backend con Node.js

Repositorio de prueba para crear una aplicacion Node.js con MySQL y Sequelize

# Requisitos

- Node.js 20
- nvm
- Docker
- Postman
- DBeaver, MySQL Workbench u otra aplicacion que permita conectar a la base de datos.
- Git
- Sequelize CLI (Ins1ztalado de manera global) npm install --global sequelize-cli
- ESLint (Instalado de manera global) npm install --global eslint

# Instalacion

1. Clonar el repositorio
2. copiar el contenido de .env.example en un nuevo archivo .env
3. ejecutar: npm install
4. ejecutar: sequelize db:migrate
5. ejecutar: npm run dev

# Scripts

`npm run dev`

Ejecutar el servidor para desarrollo utilizando nodemon.

`npm run start`

Ejecutar el servidor con node.

`npm run lint`

Ejecuta ESLint para verificar errores en codigo.

`npm run style-check`

Ejecutar prettier para listar errores en formato dentro del codigo.

`npm run style-fix`

Ejecutar prettier para corregir errores en formato dentro del codigo.


`sequelize db:create`

Crea la base de datos utilizando sequelize.

`sequelize model:create --name usuario --attributes username:string,email:string,password:string,is_active:boolean`

Crea un nuevo Modelo y su archivo de migracion.

`sequelize db:migrate`

Migra nuestros cambios y los sube a nuestra base de datos.

`sequelize seed:create`

Crea un nuevo archivo de seed.

`sequelize db:drop`

Borra la base de datos incluidos datos y tablas. **Usar con precaucion**

`sequelize --help`

Ver la ayuda asociada al comando sequelize.
