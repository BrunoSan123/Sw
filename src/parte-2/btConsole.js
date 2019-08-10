const builder = require('botbuilder');
const connector = new builder.ConsoleConnector().listen();
const bot = new builder.UniversalBot(connector);


bot.dialog('/', [
    
    (session) => {
        
        builder.Prompts.text(session, 'Oi, Tudo bem?');
    },
    
    (session) => {
        
        builder.Prompts.text(session, "Quais normas vc  quer averiguar?")
    },
    
    (session, result) =>{
        
        let msg = result.response;
        session.send(`Para ${msg} Favor ver as NBR, pois ainda estou aprendendo`);
    }
]);


