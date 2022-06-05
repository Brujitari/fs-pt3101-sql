## Antes de empezar

1. Comprueba que tienes corriendo los contenedores de `postgres` y `adminer` a través de `docker-compose`

2. Los scripts `sql` están en el directorio `./sql`. Impórtalos a través de `adminer` (`http://localhost:8080`). Primero `creation.sql` y luego `insertion.sql`.

3. Crea un proyecto, en este directorio, desde 0.
```js
// npm init -y
// npm i express slonik
// npm i -D nodemon
```
Añade los scripts en `package.json` de `"start": "node index.js"` y `"dev": "nodemon index.js"`

Crea en este directorio el fichero `index.js` para empezar a escribir tu aplicación y no olvides separar responsabilidades entre servicios o rutas y controladores (`controllers` y cada carpeta específica con todos los controladores asociados)

Apóyate en los ejercicios anteriormente creados en clase para ir siguiendo el ejercicio! :D

## Ejercicios

1. Haz un endpoint para obtener todos los pokemons (incluye los tipos también. Devuelve el id del pokémon, el nombre y los tipos que tiene en un array)
```js
// GET http://localhost:3000/pokemons
```
```js
  {
    data: [
      {
        id: 1,
        name: 'bulbasaur',
        types: ['poison', 'grass']
      },
      ...
    ]
  }✅✅✅✅✅✅✅
```

2. Haz un endpoint para obtener `name`, `badge`, `description` y `city` (de `gyms`) de todos los entrenadores
```js
<<<<<<< HEAD
// GET http://localhost:3000/trainers
```✅✅✅✅✅✅✅
=======
// GET http://localhost:3000/leaders
```
>>>>>>> ca7191cbb2cfdde1d894cec6817af7cd5ce994c4

3. Haz un endpoint para obtener `name`, `badge` (leaders), lista de pokemons y nombre de ciudad de todos los entrenadores
```js
// GET http://localhost:3000/cities
```✅✅✅✅✅✅✅

4. Haz un endpoint pata obtener el nombre de todos los tipos guardados en base de datos
```js
<<<<<<< HEAD
// GET http://localhost:3000/types
```✅✅✅✅✅✅✅
=======
// GET http://localhost:3000/pokemons/types
```
>>>>>>> ca7191cbb2cfdde1d894cec6817af7cd5ce994c4

5. Modifica el primer endpoint para que acepte query params de la siguiente manera
```js
// GET http://localhost:3000/pokemons?type1=grass
// GET http://localhost:3000/pokemons?type1=grass&type2=poison
```
Devolviendo así todos los pokémon que contengan, entre sus tipos, los designados en los query params. Si solo se indica un tipo, tienes que traer todos los pokémon que al menos tengan el tipo designado. No tiene que ser de tipo único específicamente.✅✅✅✅✅✅✅✅

6. Crea un endpoint que devuelva todos los pokémon del tipo único especificado a través de route params
```js
// GET http://localhost:3000/pokemons/type/fire
```
Esto devuelve todos aquellos que sean únicamente de tipo `fire`✅✅✅✅✅✅

7. Crea un endpoint que devuelva la misma información del primer punto, pero para un único pokémon
```js
// GET http://localhost:3000/pokemons/gyarados
```✅✅✅✅✅✅

8. Crea un endpoint que devuelva un solo entrenador a partir del nombre como route param
```js
// GET http://localhost:3000/leaders/misty
```
Fíjate que hay un entrenador que tiene de nombre `Lt. Surge` y todos los nombres empiezan en mayúscula. Quizás debas crear otra columna, que tendrá el formato de los nombres para las búsquedas✅✅✅✅✅✅✅✅

9. Crea un endpoint para introducir un nuevo entrenador
```js
// POST http://localhost:3000/leaders/new
```
El body será así
```js
{
  "name": "trainer name",
  "badge": "badge name",
  "description": "trainer types description",
  "city": "city name"
}
```
Recuerda que `city` pertenece a otra entidad
✅✅✅✅✅✅✅✅

10. Crea un endpoint para enlazar pokémons existentes a entrenadores
```js
// PUT http://localhost:3000/leaders/:trainersName/pokemons
```
```js
{
  "pokemons": [
    "Geodude",
    "Pikachu",
    "Gyarados",
  ]
}
```✅✅✅✅✅✅✅✅

11. Crea un endpoint para crear un pokémon nuevo a mano
```js
// POST http://localhost:3000/pokemons/new
```
```js
{
  "name": "venusaur",
  "level": "21",
  "id": 3,
  "types": [
      "grass",
      "poison"
  ]
}
```✅✅✅✅✅✅

12. Modifica el controlador asociado al endpoint del punto 7 para que, si NO encuentra el pokémon, lo busque en la `PokeAPI` y, el resultado devuelto, lo inserte en tu base de datos. Tras guardar el resultado, devuelves la misma información que en el punto 7.
Si la PokeApi devuelve `no encontrado`, devuelves lo mismo. Si da algún error diferente, devuelve error de servidor (500)✅✅✅✅✅✅

13. Modifica la tabla `pokemons` para que el `id` no sea `Primary Key`. Modifica el nombre de `id` a `list_id` y crea una nueva columna con el tipo de `PRIMARY_KEY` que quieras (`serial`, `uuid`, etc...)
<<<<<<< HEAD
Considera también cómo puede afectar eso a la tabla intermedia `pokemons_elements`. Quizás `ON UPDATE CASCADE` te permita hacerlo sin problemas? ✅✅✅✅✅✅✅✅ 
(me lié y al final borré el id entonces se me llenó media tabla pokemons_elements de NULLs y tuve que arreglarlo con `./sql/fix_pokemons_elements_id.sql`)
⢰⣶⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢻⣿⣿⡏⠉⠓⠦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀
⠀⠀⢹⣿⡇⠀⠀⠀⠈⠙⠲⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⠖⢾⣿⣿⣿⡟
⠀⠀⠀⠹⣷⠀⠀⠀⠀⠀⠀⠀⠙⠦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠶⠚⠋⠁⠀⠀⣸⣿⣿⡟⠀
⠀⠀⠀⠀⠹⣇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡴⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⣿⣿⠏⠀⠀
⠀⠀⠀⠀⠀⠙⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⣀⡤⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡟⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⣠⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡄⠀⠀⢀⡴⠟⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣦⠾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⣠⣴⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡴⣶⣦⡀⠀⠀⠀⠀⠀⠹⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⠀⠀⠀⠀⠀⣯⣀⣼⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣄⣬⣿⡇⠀⠀⠀⠀⠀⠀⠘⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠁⠀⠀⠀⠀⠀⠻⣿⡿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠿⠿⠟⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣷⣶⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⢁⡾⠋⠉⠉⠙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠞⠋⠉⠛⢶⡄⠀⠀⠘⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⠸⣇⠀⠀⠀⠀⣸⠇⠀⠀⠀⠀⠀⢀⣠⠤⠴⠶⠶⣤⡀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀⢀⡇⠀⠀⠀⢿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠉⠳⠶⠶⠞⠁⠀⠀⠀⠀⠀⠀⢾⡅⠀⠀⠀⠀⠈⣷⠀⠀⠀⠀⠀⠀⠙⠷⢦⡤⠴⠛⠁⠀⠀⠀⢸⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣤⡀⠀⠀⣠⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣇⣀⣀⣀⣠⣠⣠⣠⣠⣀⣀⣀⣀⣀⣀⣄⣄⣄⣄⣄⣠⣀⣀⣀⣀⣠⣠⣠⣠⣠⣠⣼⡆
=======
Considera también cómo puede afectar eso a la tabla intermedia `pokemons_elements`.
>>>>>>> ca7191cbb2cfdde1d894cec6817af7cd5ce994c4
