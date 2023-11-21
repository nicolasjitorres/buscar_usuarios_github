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
    const inputUser = value.trim();

    // Utilizamos la API de github para solicitar los datos del usuario a buscar, utilizamos await para esperar a que termine la ejecucion de la funcion fetch
    // Fetch es una funcion que se utiliza para solicitar recursos de una api, en este caso de github
    const respuesta = await fetch(`https://api.github.com/users/${inputUser}`);

    // En el caso de que no se haya encontrado un usuario o se haya ingresado un usuario no valido, se termina la ejecucion
    if (!respuesta.ok) {
      throw new Error('Usuario no encontrado');
    }

    const user = await respuesta.json();

    const logo = document.createElement('img');
    logo.src = user.avatar_url;
    logo.alt = 'Logo del usuario';
    logo.className = 'logo-usuario';
    divUsers.appendChild(logo);

    const usuario = document.createElement('h3');
    usuario.className = 'usuario';
    usuario.textContent = user.login;
    divUsers.appendChild(usuario);

    const nombreUsuario = document.createElement('p');
    nombreUsuario.className = 'nombre-usuario';
    nombreUsuario.textContent = user.name;
    divUsers.appendChild(nombreUsuario);

  } catch (error) {
    console.error('Error:', error.message);
    
    const mensajeError = document.createElement('p');

    mensajeError.textContent = 'Usuario no encontrado...';

    divUsers.appendChild(mensajeError);

  }

};

