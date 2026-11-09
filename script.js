const botonGuardado = document.getElementById("btn-guardar-preferencias");
const nombreUsuario = document.getElementById("nombre-usuario");
const botonRestablecer = document.getElementById("btn-restablecer-preferencias");


function setCookie(nombre, valor) {
  let cookie = nombre + "=" + encodeURIComponent(valor);
  cookie += "; path=/";
  document.cookie = cookie;
}

function getCookie(nombre) {
const pares = document.cookie.split("; ");
for (let par of pares) {
const [clave, valor] = par.split("=");
if (clave === nombre) {
return decodeURIComponent(valor);
}
}
return null; // No encontrada
}


function guardarPreferencias(){
    setCookie("nombre", nombreUsuario.value);
    setCookie("color", cambioColorFondo.value);
    setCookie("tema", cambioTema.value);
}
function restaurarPreferencias(){
   const nombre = getCookie("nombre");
   const color = getCookie("color");
   const tema = getCookie("tema");

   switch (preferencia) {
    case "nombre":
        nombreUsuario.value = valor;
        break;
    case "color":
        cambioColorFondo.value = valor;
        break;
    case "tema":
        cambioTema.value = valor;
        break;
   }
}

function borrarCookie(nombre) {
  document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function restablecerPreferencias(){
    borrarCookie("nombre");
    borrarCookie("color");
    borrarCookie("tema");

    document.getElementById("formulario").reset();
    cambiarColorFondo("#ffffff");
    cambiarTema("claro");
}

const h2 = document.createElement("h2");
h2.textContent = "Diseña tu Interfaz";
document.getElementById("h2-bienvenida").appendChild(h2);

const cambioColorFondo = document.getElementById("color-fondo");

function cambiarColorFondo(color){
    document.body.style.backgroundColor = color;
}

cambioColorFondo.addEventListener("input", () => {
    cambiarColorFondo(cambioColorFondo.value);  
});

const cambioTema = document.getElementById("tema");

function cambiarTema(tema){
    if(tema === "oscuro"){
        document.body.classList.remove("tema-claro");
        document.body.classList.add("tema-oscuro");
    }else{
        document.body.classList.remove("tema-oscuro");
        document.body.classList.add("tema-claro");
    }
}

cambioTema.addEventListener("change", () => {
    cambiarTema(cambioTema.value);
});

botonGuardado.addEventListener("click", guardarPreferencias);

botonRestablecer.addEventListener("click", restablecerPreferencias);


restaurarPreferencias();

