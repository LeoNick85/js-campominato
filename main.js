// Il computer deve generare 16 numeri casuali tra 1 e 100, che saranno le "mine".
// In seguito deve chiedere all'utente di inserire un numero alla volta, sempre compreso tra 1 e 100, che sarà la sua giocata.
// Se il numero è presente nella lista delle mine, la partita termina, altrimenti il gioco continua chiedendo all'utente un altro numero (continua a giocare).
// La partita termina quando il giocatore becca una mina, ossia inserisce un numero "vietato", oppure se raggiunge il numero massimo possibile di numeri consentiti, ossia ha inserito tutti i numeri possibili che non sono mine!
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito; in altre parole, deve comunicare all'utente quante giocate ha fatto prima di perdere.
// BONUS: all'inizio della partita, il software richiede anche un livello di difficoltà all'utente che cambia il range di numeri totali (le mine saranno sempre 16):
// con difficoltà 0=> si gioca con numeri che vanno da 1 a 100
// con difficoltà 1 => si gioca con numeri che vanno da 1 a 80
// con difficoltà 2=> si gioca con numeri che vanno da 1 a 50

//--FUNZIONI--

//Funzione per generare numero casuale
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Funzione che genera le mine:produce un array con 16 numeri casuali a partire da un numero minimo a uno massimo, assicurandosi che siano numeri diversi


function mineGenerator(num_mine, num_max) {
    var final_array = [];

    for (i=0; i < num_mine; i++) {
        var random_number = 0;
        do {
            var random_number = getRandom(1, num_max);
        } while (final_array.includes(random_number))

        final_array.push(random_number);
    }

    return final_array;
}

//Funzione per verificare se un numero è immediatamente successivo o precedente a quelli di un array
function isNextTo(number, confront) {
    var is_next = false;

    for (i = 0; i < confront.length && is_next == false; i++) {
        if ((confront[i] + 1) == number || (confront[i] - 1) == number) {
            is_next = true;
        }
    }

    return is_next;
}

//Chiedo all'utente il suo nome e con che livello di difficoltà vuole giocare
var user_name = prompt("Benvenuto a Prato Minato. Come ti chiami?")

var difficulty_level = "";

do {
    difficulty_level = prompt("A che livello di difficoltà vuoi giocare? (facile/medio/difficile)");

    if (difficulty_level != "facile" && difficulty_level != "medio" && difficulty_level != "difficile") {
        alert("Non hai selezionato correttamente il livello di difficoltà. Riprova");
    }

} while (difficulty_level != "facile" && difficulty_level != "medio" && difficulty_level != "difficile")

document.getElementById('user-name').insertAdjacentHTML("beforeEnd", user_name);
document.getElementById('difficulty').insertAdjacentHTML("beforeEnd", difficulty_level);
console.log(user_name, difficulty_level);
//In base alla difficoltà stabilisco il numero totale di caselle
if (difficulty_level == "facile") {
    var total_number = 100;
} else if (difficulty_level == "medio") {
    var total_number = 80;
} else {
    var total_number = 50;
}
console.log(total_number);

//Genero campo minato di conseguente ampiezza, con 16 mine (16 numeri casuali diversi tra loro)
for (i = 1; i <= total_number; i++) {
    document.getElementById('field').insertAdjacentHTML("beforeEnd","<li id=\"mine" + i + "\"><p><i class=\"far fa-question-circle\"></i></p></li>");
}

var mines = mineGenerator(16, total_number);
console.log(mines);;

//Chiedo all'utente un numero per il campo. Se è una mina passo alla stampa del risultato, altrimenti proseguo con il gioco fino a totale - 16 mine
var finish_check = false;
var guess_check = [];

do {
    do {
        var guess = parseInt(prompt("Quale casella vuoi aprire? Indica un numero tra 1 e " + total_number));

        if (isNaN(guess) || guess < 1 || guess > total_number) {
            alert("Non hai inserito un numero valido")
        } else if (guess_check.includes(guess)) {
            alert("Hai già tentato questo numero! Riprova")
        }
    } while (isNaN(guess) || guess < 1 || guess > total_number || guess_check.includes(guess))

    guess_check.push(guess);

    if (mines.includes(guess)) {
        alert("Hai trovato una mina! Hai perso");
        document.getElementById("mine" + guess).innerHTML = "<i class=\"fas fa-bomb\"></i>";
        finish_check = true;
    } else {
        if (isNextTo(guess, mines)) {
            alert("Hai trovato un fiore, ma è adiacente a una mina. Continua!");
            document.getElementById("mine" + guess).innerHTML = "<i class=\"fas fa-exclamation\"> </i><i class=\"fas fa-fan\"> </i><i class=\"fas fa-exclamation\"></i>";
        } else {
            alert("Hai trovato un fiore. Continua!");
            document.getElementById("mine" + guess).innerHTML = "<i class=\"fas fa-fan\"></i>";
        }
    }
} while (finish_check == false && guess_check.length < (total_number - 16))

document.getElementById("score").innerHTML = guess_check.length;
document.getElementById("total").innerHTML = total_number - 16;

console.log(guess_check, guess_check.length);

//Stampo il risultato, con il numero delle caselle indovinate
