const restify = require('restify');
const builder = require('botbuilder');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    
    console.log("%s Aplicação rodando na porta %s", server.name, server.url);
});


const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});


server.post('api/messages', connector.listen());


const bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    
    (session,results,next) => {
        
        if(!session.userData.nome){
            builder.Prompts.text(session, 'Olá,  Qual é o seu nome?')
        } else {
            
            next();
        }
    },
    
    (session, results) => {
        
        if (results.response) {
            let msg = results.response;
            session.userData.nome =msg;
        }
        
        session.send(`Olá! ${session.userData.nome}`);
    }
]);