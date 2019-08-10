const restify = require('restify'); 
const builder = require('botbuilder');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    
    console.log('%s Aplicação executando na porta %s', server.name, server)
});

const connector = new builder.ChatConnector({
    
    appId: '',
    appPassword: ''
});

const bot = new builder.UniversalBot(connector, [
    
 (session) => {
     
     builder.Prompts.text(session,'Olá, Prazer em te conhecer');
 },
    
(session) => {
    
    builder.Prompts.text(session, 'Digite a norma que deseja');
},
    
    (session, result) => {
        
        let msg = result.response;
        session.send(`A norma ${msg} diz que: Os gabinetes sanitários devem ser devem:
A- ser instalados em compartimentos individuais;
B-ter áreas e dimensões mínimas de 0,90x1,10;
C-ter entre si, divisórias com altura mínima de 1,80m;`);
    }
]);

server.post('api/messages', connector.listen());
