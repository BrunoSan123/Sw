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
    session =>{
        
        session.beginDialog('/saudacao');
    }
    
]);

bot.dialog('/saudacao', [
    session => {
        
        builder.Prompts.text(session, 'Oi, qual o seu nome?');
    },
    
    (session, results) => {
        
        let msg =results.response;
        session.endDialog(`Oi ${msg}`)
    }
    
]);