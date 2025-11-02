var score = 0;
var questionActuelle = 1;
var reponseCorrecte = 0;
var repondu = false;

var cartes = document.getElementsByTagName('label');
var entrees = document.getElementsByName('answer');
var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var resultat = document.getElementById('result');
var scoreAffiche = document.getElementById('score');
var questionAffichee = document.getElementById('current');
var conteneurQuiz = document.getElementById('quiz-container');
var conteneurFinal = document.getElementById('final');
var scoreFinal = document.getElementById('final-score');
function nombreAleatoire() {
    return Math.floor(Math.random() * 10) + 1;
}
function genererQuestion() {
    repondu = false;
    resultat.innerHTML = '';
    resultat.setAttribute('class', 'result');
    
    var i = 0;
    while (i < entrees.length) {
        entrees[i].checked = false;
        entrees[i].classList.remove('wrong');
        i++;
    }
    var x = nombreAleatoire();
    var y = nombreAleatoire();
    var bonneReponse = x * y;
    
    num1.innerHTML = String(x);
    num2.innerHTML = String(y);
    var reponses = [];
    reponses[0] = bonneReponse;
    
    while (reponses.length < 3) {
        var variation = nombreAleatoire();
        var mauvaiseReponse;
        
        if (Math.random() > 0.5) {
            mauvaiseReponse = bonneReponse + variation;
        } else {
            mauvaiseReponse = bonneReponse - variation;
        }
        
        var existe = false;
        var j = 0;
        while (j < reponses.length) {
            if (reponses[j] == mauvaiseReponse) {
                existe = true;
            }
            j++;
        }
        
        if (mauvaiseReponse > 0 && !existe) {
            reponses[reponses.length] = mauvaiseReponse;
        }
    }
    var k = reponses.length - 1;
    while (k > 0) {
        var index = Math.floor(Math.random() * (k + 1));
        var temp = reponses[k];
        reponses[k] = reponses[index];
        reponses[index] = temp;
        k--;
    }
    var m = 0;
    while (m < reponses.length) {
        if (reponses[m] == bonneReponse) {
            reponseCorrecte = m;
        }
        m++;
    }
    var n = 0;
    while (n < cartes.length) {
        cartes[n].innerHTML = String(reponses[n]);
        n++;
    }
}
function verifier(indexChoisi) {
    if (repondu) {
        return;
    }
    
    repondu = true;
    if (indexChoisi == reponseCorrecte) {
        score++;
        scoreAffiche.innerHTML = String(score);
        resultat.innerHTML = '✓ Correct!';
        resultat.setAttribute('class', 'result correct');
    } else {
        entrees[indexChoisi].classList.add('wrong');
        resultat.innerHTML = '✗ La bonne réponse était ' + cartes[reponseCorrecte].innerHTML;
        resultat.setAttribute('class', 'result wrong');
    }
    setTimeout(function() {
        if (questionActuelle < 10) {
            questionActuelle++;
            questionAffichee.innerHTML = String(questionActuelle);
            genererQuestion();
        } else {
            afficherResultatFinal();
        }
    }, 2000);
}
function afficherResultatFinal() {
    conteneurQuiz.style.display = 'none';
    conteneurFinal.classList.remove('hidden');
    scoreFinal.innerHTML = String(score);
    
    var cartesDiv = document.querySelector('.cards');
    cartesDiv.style.display = 'none';
}
function recommencer() {
    score = 0;
    questionActuelle = 1;
    scoreAffiche.innerHTML = '0';
    questionAffichee.innerHTML = '1';
    conteneurQuiz.style.display = 'flex';
    conteneurFinal.classList.add('hidden');
    
    var cartesDiv = document.querySelector('.cards');
    cartesDiv.style.display = 'flex';
    
    genererQuestion();
}
genererQuestion();