// BOTONES Y AREAS DE TEXTO
const TextoIngresado = document.getElementById("ingTextAqui");
const Textosalida = document.getElementById("mensaje");
const btnEncriptar = document.getElementById("botonEncriptar");
const btnDesencriptar = document.getElementById("botonDesencriptar");
const btnCopiar = document.getElementById("botonCopiar");
const btnReparar = document.querySelector("#reparar");
const borrar = document.getElementById("borrar");
const label = document.querySelector("label");
const imagen = document.getElementById("imagen");

// FOCO EN INGRESAR TEXTO
TextoIngresado.focus();

// FUNCION PARA ELIMINAR ACENTOS
const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// FUNCIONES PARA OCULTAR  Y MOSTRAR IMAGEN
function ocultarImagen() {
    imagen.style.visibility = "hidden";
}

function mostrarImagen() {
    imagen.style.visibility = "visible";
}

// COMPORTAMIENTO DE LA PAGINA
// INICIAL - SIN ERRORES
function estadoInicial(){
    label.style.color = "#000";             
    TextoIngresado.style.color = "#000";     
    btnReparar.style.visibility = "hidden";    
    proceder = true
}
// CON ERRORES
function estadoError(){
    label.style.color = "#f00"; 
    TextoIngresado.style.color = "#f00";  
    btnReparar.style.visibility = "visible";
    proceder = false
}

// EVENTO REPARAR
btnReparar.addEventListener("click",reparar);

//FUNCION PARA REPARAR TEXTO
function reparar(){
    let textoAreparar = removerAcentos(TextoIngresado.value);
    textoAreparar = textoAreparar.toLowerCase();
    TextoIngresado.value = textoAreparar;
    estadoInicial();
    TextoIngresado.focus();   
}

//EVENTOS DE BOTONES: DESENCRIPTAR, ENCRIPTAR Y CORREGIR
btnDesencriptar.addEventListener("click",desencriptar);
btnEncriptar.addEventListener("click",encriptar);
TextoIngresado.addEventListener("keyup",corregir);
let proceder = true;

//FUNCION PARA CORREGIR TEXTO
function corregir(){
    let requisitos = TextoIngresado.value;
    let cumplir = removerAcentos(TextoIngresado.value);
    let cumplir2 = TextoIngresado.value.toLowerCase();
    if(requisitos != cumplir){
        estadoError();
    }    
    if(requisitos != cumplir2){
        estadoError();
    }    
    if(requisitos == cumplir2 && requisitos == cumplir){
        estadoInicial();
    }
}

// CONDICIONES PARA ENCRIPTACION 
const vocal = ["e", "i", "a", "o", "u"];
const vocalEncriptada = ["enter", "imes", "ai", "ober", "ufat"];

// FUNCION PARA ENCRIPTAR
function encriptar(){
    if(proceder){
        let texto = TextoIngresado.value
        for (let i = 0; i < vocal.length; i++) {
            texto = texto.replaceAll(vocal[i], vocalEncriptada[i]);       
        }
        mensaje.value = texto;        
        if(TextoIngresado.value != ""){
            ocultarImagen();
        }
        if(TextoIngresado.value == ""){
            mostrarImagen();
        }       
    }
}

// FUNCION PARA DESENCRIPTAR
function desencriptar(){
    if(proceder){
        let texto = TextoIngresado.value
        for (let i = 0; i < vocal.length; i++) {
            texto = texto.replaceAll(vocalEncriptada[i], vocal[i]);
        }
        mensaje.value = texto;
        mensaje.select();
        if(TextoIngresado.value != ""){
            ocultarImagen();
        }
        if(TextoIngresado.value == ""){
            mostrarImagen();
        }       
    }
}

// EVENTO COPIAR TEXTO
btnCopiar.addEventListener("click", copiar);

// FUNCION PARA COPIAR TEXTO
function copiar(){
    if(mensaje.value != ""){
        TextoIngresado.value= mensaje.value;
        navigator.clipboard.writeText(mensaje.value);
        Textosalida.value= "";
        estadoInicial();
        TextoIngresado.select();
    }
    TextoIngresado.focus();
}

// EVENTO BORRAR TEXTO
borrar.addEventListener("click",borrarTexto);

// FUNCION PARA BORRAR TEXTO
function borrarTexto(){
    TextoIngresado.value = "";
    Textosalida.value= "";
    TextoIngresado.focus();
    estadoInicial();
}