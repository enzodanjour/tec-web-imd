const http = require('http')

const server = http.createServer((req, resp) => {

    switch (req.url) {
        case '/aluno':
            alunoRoute(req, resp);// finaliza a mensagem
            break;

        default:
            resp.writeHead(404, { 'Content-Type': "text/json" })
            resp.write(JSON.stringify({"req.url": req.url}))
            resp.write(JSON.stringify({ msg: "Path não encontrado" }))
            resp.end()
            break;
    }

});

server.listen(8080, () => {
    console.log('Servidor pronto na porta 8080!')
})

function alunoRoute(req, resp) {
    switch (req.method) {
        case 'GET':
            resp.writeHead(200, { 'Content-Type': "text/json" });
            resp.write(JSON.stringify({ alunos: ["Laura","Enzo"] })); 
            
            resp.end();
            break;
        case 'POST':
            resp.writeHead(200, { 'Content-Type': "text/json" });
            resp.write(JSON.stringify({ msg: "Aluno criado" })); 
            resp.end();
            break;
        default:
            resp.writeHead(400, { 'Content-Type': "text/json" });
            resp.write(JSON.stringify({ msg: "Operação não suportada" })); 
            resp.end();
            break;
    }

}
