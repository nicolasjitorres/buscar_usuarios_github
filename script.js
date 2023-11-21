// Declaramos las constantes
const divUsers = document.getElementById('div-users');

// Creamos una funcion asincrona
async function agregarUsuario(event) {

  // Previene que se reinicie la pagina al tener un boton de submit
  event.preventDefault();

  // Despeja el contenedor de usuarios cada que se realiza una busqueda
  divUsers.innerHTML = '';

  // Devuelve el texto ingresado en el input
  const { value } = event.target.searchBar;

  // Si no se ingreso nada, termina la ejecucion
  if (!value) return;

  // Creamos la funcion que utiliza la API de github para buscar un usuario
  try {

    // Utilizamos trim en caso de que se hayan ingresado espacios en la busqueda
    const inputUser = value.replaceAll(' ', '');

    console.log(inputUser);

    // Utilizamos la API de github para solicitar los datos del usuario a buscar, utilizamos await para esperar a que termine la ejecucion de la funcion fetch
    // Fetch es una funcion que se utiliza para solicitar recursos de una api, en este caso de github
    const respuesta = await fetch(`https://api.github.com/users/${inputUser}`);

    // En el caso de que no se haya encontrado un usuario o se haya ingresado un usuario no valido, se termina la ejecucion
    if (!respuesta.ok) {
      throw new Error('Usuario no encontrado...');
    }

    // A esa respuesta recibida le aplicamos json para que nos devuelva un json con los datos del usuario.
    const user = await respuesta.json();

    // Creamos el elemento img que sera el logo del usuario, contendra el src con el link al logo y la clase logo-usuario
    const logo = document.createElement('img');
    logo.src = user.avatar_url;
    logo.alt = 'Logo del usuario';
    logo.className = 'logo-usuario';
    
    // Creamos el elemento h3 que contendra el nombre de usuario
    const usuario = document.createElement('h3');
    usuario.className = 'usuario';
    usuario.textContent = `Usuario: ${user.login || "no disponible"} `;

    // Creamos el elemento p que contendra el nombre del usuario, si lo tuviese
    const nombreUsuario = document.createElement('p');
    nombreUsuario.className = 'nombre-usuario';
    nombreUsuario.textContent = `Nombre: ${user.name || "no disponible"} `;

    // Agregamos al contenedor de usuario los elementos creado anteriormente
    
    const contenedorNombre = document.createElement('div');
    contenedorNombre.className = 'contenedor-nombre';
    contenedorNombre.appendChild(usuario);
    contenedorNombre.appendChild(nombreUsuario);
    
    divUsers.appendChild(logo);
    divUsers.appendChild(contenedorNombre);
    

  } catch (error) {

    // Devolvemos en consola el mensaje de error
    console.error('Error:', error.message);
    
    // Creamos el elemento p con el error especificado
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error.message;
    mensajeError.className = 'mensaje-error'

    // Agregamos al div el mensaje de error
    divUsers.appendChild(mensajeError);

  }

};


// Creamos la funcion para despejar el div de usuario
const borrarDatos = () => {
  divUsers.innerHTML = '';
};