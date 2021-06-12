const readline = require('readline');

const leitor = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

leitor.question('entrada: \n', 
function(resposta){
    if(!isNaN(resposta)){
        resposta = resposta**2 + resposta*5 +100;
        console.log(resposta);
    } else {
        console.log("não é um número");
    }
    leitor.close()
});



