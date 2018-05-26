/*---------------------------------------------------------------------------*/
/* blackjack.js                                                              */
/*                                                                           */
/* Autor: Santiago Barquero                                                  */
/* Fecha: 16/05/2018                                                         */
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/
/* CRUPIER */
/*---------------------------------------------------------------------------*/

var crupier = {}; // Objeto crupier
crupier.cartas = []; // cartas del crupier, que barajará y repartirá
crupier.mano = []; // mano que juega el crupier

// Recibe juego de cartas nuevas como parámtero y vacia el array de su mano
crupier.inicializar = function (cartas) {
  console.log("crupier.inicializar()");
  this.cartas = [];
  this.mano = [];
  // copiamos la cartas recibidas como parámetro al array de cartas del crupier
  for (var i= 0; i < cartas.length; i++) {
    this.cartas[this.cartas.length] = cartas[i];
  }
};

// Función para barajar las cartas el número de veces recibido como parámetro
crupier.barajar = function(num) {
  console.log("crupier.barajar() - " + num + " intercambios");
  // Posiciones de dos cartas para hacer el intercambio
  var pos1 = 0; // posición de la primera carta
  var pos2 = 0; // posición de la segunda carta
  var aux = null; // variable temporal que almacena carta en intercambio
  for (var i = 0; i < num; i++) {
    // dos número aleatorios entre 0 y 51 ambos inclusive para intercambio 
    pos1 = Math.floor(Math.random() * 52);
    pos2 = Math.floor(Math.random() * 52);
    // intercambio de cartas con variable auxiliar temporal
    aux = this.cartas[pos1];
    this.cartas[pos1] = this.cartas[pos2];
    this.cartas[pos2] = aux;
  }
};

// Función que devuelve una carta
crupier.darCarta = function() {
  var nueva = []; // Baraja resultante tras dar carta
  var carta = this.cartas[0]; // Cogemos primera carta
  // guardamos el resto de cartas en el nuevo array
  for (var i = 1; i<this.cartas.length; i++) {
    nueva[nueva.length] = this.cartas[i];
  }
  this.cartas = nueva; // actualizamos baraja tras quitarle una carta
  return carta; 
};

// Función que coge una carta que recibe como parámetro y añade a su mano
crupier.cogerCarta = function(carta) {
  this.mano[this.mano.length] = carta;
};

// Función que puntua una mano recibida como parámetro
crupier.puntuar = function(mano) {
  var totalPuntos = 0; // total punto a retornar
  var puntosCarta = 0; // puntuación de una carta según su valor
  var valorCarta = 0;  // valor de una carta

  for (var i = 0; i < mano.length; i++) {
    valorCarta = mano[i].valor;
    // si es Jota, Dama o Rey el valor es 10;
    if (valorCarta === 11 || valorCarta === 12 || valorCarta === 13) {
      puntosCarta = 10; 
    } else if (valorCarta === 1) { // si la carta es un As
        puntosCarta = 11;
    } else { // el resto de cartas cogen su valor
        puntosCarta = valorCarta;
    }
    totalPuntos = totalPuntos + puntosCarta;
  }
  return totalPuntos;
};

// Función que devuelve un string con la mano y su puntuación
crupier.mostrar =  function() {
  var mensaje = "Mano crupier: " + strMano(this.mano) + 
      "  Puntuación: " + crupier.puntuar(this.mano);
  return mensaje;
};

/*---------------------------------------------------------------------------*/
/* JUGADOR */
/*---------------------------------------------------------------------------*/
var jugador = {};

// Mano de cartas del jugador. Inicialmente vacio.
jugador.mano = [];

// Inicializamos la mano de jugador al empezar una nueva partida
jugador.inicializar = function() {
  this.mano = [];
};

// Función que añade una carta, que recibe como parámetro, a su mano
jugador.pedirCarta = function(carta) {
  this.mano[this.mano.length] = carta;
};

// Función que le muestra información al jugador y le pregunta si pasar.
// También pasa automáticamente cuando el jugador supera 21 puntos.
jugador.pasar = function() {
  // forma cadena con información del jugador y del crupier
  var mensaje = this.mostrar() + crupier.mostrar();
  
  // si la puntuación es menor de 21 pregunta al jugador si quiere otra carta
  if (crupier.puntuar(this.mano) < 21) {
    var respuesta = "";
    do { // bucle hasta que sea respuesta correcta
      respuesta = prompt(mensaje + "\n¿Desea pasar S o N?", "");
      respuesta = respuesta.toUpperCase(); // convierte la respuesta a mayúsculas
    } while (respuesta !== "S" && respuesta !== "N");
    if (respuesta === "S") {
      console.log("Jugador pasa");
      return true; 
    } 
    else {
      console.log("Jugador pide carta");
      return false; 
    }
  } // sino es que la puntuación es igual o mayor a 21
  else {
    console.log("Jugador ha llegado a 21 o lo ha superado");
    return true;
  }
};

// Función que retorna string con información de la mano del jugador.
jugador.mostrar =  function() {
  var mensaje = "Tu mano: " + strMano(this.mano) + 
      "  Puntuación: " + crupier.puntuar(this.mano) + '\n';
  return mensaje;
};


/*---------------------------------------------------------------------------*/
/* FUNCIONES AUXILIARES */
/*---------------------------------------------------------------------------*/

// Función que devuelve una nueva baraja completa creada.
// Tomo como modelo las cartas del póker con 4 palos y 13 cartas cada palo
// Tiene un total de 52 cartas
// Los valores son Ás = 1, J (Jota) = 11, Q = 12 (Dama), K = 13 (Rey)
function creaBaraja() {
  var nuevaBaraja = [];
  var palos = "CDPT";  // C = Corazón, D = Diamantes, P = Picas, T = Trébol
  // Número de cartas por palo. 
  for (var i = 1; i <= 13; i++) {
    for (var j = 0; j < palos.length; j++) {
      // voy añadiendo la nueva carta al final del array
      nuevaBaraja[nuevaBaraja.length] = {valor: i, palo: palos[j]};
    }
  }
  return nuevaBaraja;
};


// Función auxiliar que devuelve el string de una mano para visualizar
function strMano(mano) {
  var resultado = "";
  //console.log(mano.length);
  for (var i = 0; i < mano.length; i++) {
    resultado = resultado + mano[i].valor + mano[i].palo + " ";
  }
  return resultado; 
};

/*---------------------------------------------------------------------------*/
/* BLACKJACK - FUNCION PRINCIPAL */
/*---------------------------------------------------------------------------*/
function blackjack() {
  // crea una baraja nueva
  var miBaraja = creaBaraja();
  var miCrupier = crupier;
  var miJugador = jugador;
  var mensaje = "";
  
  console.clear();
  console.log("miBaraja");
  console.log(miBaraja);

  miCrupier.inicializar(miBaraja); // inicializo crupier con una baraja nueva
  miCrupier.barajar(200); // barajar cartas con 200 intercambios
  console.log("\ncrupier.cartas después de barajar");
  console.log(crupier.cartas);

  miJugador.inicializar(); // inicializo mano del jugador
  
  // Crupier reparte dos cartas al jugador
  miJugador.pedirCarta(miCrupier.darCarta());
  miJugador.pedirCarta(miCrupier.darCarta());
  // Crupier coge una carta para él
  miCrupier.cogerCarta(miCrupier.darCarta());
  
  console.log("\nmiCrupier.cartas - Cartas que quedan tras el reparto inicial");
  console.log(miCrupier.cartas);
  
  console.log("-------- Manos tras reparto inicial ---------\n" + 
              miJugador.mostrar() + miCrupier.mostrar());
  
  // ejecuta bucle mientras el jugador no tenga mas de 21 puntos y no pase
  console.log("------------- Turno del jugador -------------");
  while (!miJugador.pasar(miCrupier.mostrar())){
    miJugador.pedirCarta(miCrupier.darCarta());
    console.log(miJugador.mostrar());
  }
  
  var puntosJugador = miCrupier.puntuar(miJugador.mano);
  var puntosCrupier = miCrupier.puntuar(miCrupier.mano);

  // Si el jugador no se ha pasado de 21, le toca al crupier jugar
  if (puntosJugador <= 21) {
    console.log("------------- Turno del crupier -------------");
    // por las reglas del juego el crupier coge carta hasta tener 17 como mínimo
    while(puntosCrupier < 17) {
      // Crupier coge una carta para él
      miCrupier.cogerCarta(miCrupier.darCarta());
      puntosCrupier = miCrupier.puntuar(miCrupier.mano);
      console.log("Crupier tiene puntuación < 17 y coge carta.\n" + 
                  crupier.mostrar());
    }
    
    // Cuando el crupier supera la puntuación de 17, para y comprueba quién gana
    console.log("---------- Comprobación del ganador ---------");
    if (puntosCrupier > 21 || puntosCrupier < puntosJugador) {
      console.log("Crupier se ha pasado de 21");      
      mensaje = "Enhorabuena ganas la partida.\n" + 
          miJugador.mostrar() + miCrupier.mostrar();
    } 
    else {
      if (puntosCrupier > puntosJugador) {
        console.log("Crupier obtiene más puntos"); 
        mensaje = "Lo siento has perdido la partida. " + 
            "El crupier obtiene más puntuación\n" + 
            miJugador.mostrar() + miCrupier.mostrar();
      } 
      else {
        console.log("Crupier y jugador empatan");        
        mensaje = "Has empatado la partida.\n" + 
            miJugador.mostrar() + miCrupier.mostrar();
      }
    }
  } 
  else { // sino es que el jugador se ha pasado de 21
    console.log("-------- Jugador se ha pasado de 21 ---------");
    mensaje = "Lo siento, has perdido la partida, te has pasado de 21.\n";
    mensaje = mensaje + miJugador.mostrar();
  }
  
  console.log("--------------- Resultado -------------------");
  console.log(mensaje);
  alert(mensaje);
}
/*---------------------------------------------------------------------------*/

// lanzo ejecución de la función principal
blackjack();
