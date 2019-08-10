
//server-------------------
const restify = require('restify');
const builder = require('botbuilder');
const { ActivityHandler, ActionTypes, ActivityTypes, CardFactory } = require('botbuilder');

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

//server---------




//dialogos entre usuario e bot------------
bot.dialog('/', [
    session =>{
        
        builder.Prompts.text(session, 'Olá, meu nome é Helderbot. cite as informações do seu modelo e veja o que a NBR diz, mas primeiro diga o seu nome!');
    },
    
    (session, results) => {
        
        let nome = results.response;
        session.send(`Oi ${nome}`);
        
        session.beginDialog('/perguntaNBR');
    }
    
]); 






        
    
bot.dialog('/perguntaNBR', [
    
    session =>{
    
   builder.Prompts.text(session, 'Digite os parametros do seu modelo');
    },
    
    (session, results) => {
        
        let paramNBR = results.response;
        if(paramNBR == 'vestiário'){
        
        session.endDialog(`A NBR para ${paramNBR}, diz:
A NBr 12284 diz que  no caso de vestiarios, estes devem estar o mais próximo da entrada da obra e das intalações sanitárias; com seu acesso protegido das intempéries.`);}else{
            
            session.send('SEJA MAIS ESPECIFICO');
            
            
        }
             
            session.beginDialog('/perguntaNBR2');
    }
]);
        
        
       
    

bot.dialog('/perguntaNBR2', [
    
    session => {
        builder.Prompts.text(session, 'Digite mais um parâmetro');
    },
    
    (session, results) => {
        
        let NBR2 = results.response;
        if(NBR2 == 'refeitório'){
        session.endDialog(`segundo a NBR 12284; As áreas de vivência devem possuir refeitórios, indpendentemente do número de trabalhadores.`);}else{
            
            session.send('Digite a referencia certa');
        }
            
        session.beginDialog('/perguntaNBR3');
    }
]);
        
        
        
    

bot.dialog('/perguntaNBR3', [
    
session => {
    
    builder.Prompts.text(session, 'Digite mais um parametro');
},
    (session, results) => {
        
        let NBR3 = results.response;
        if(NBR3 == 'chumaço'){
        session.endDialog(`Segundo a NBR 5628 para ${NBR3}; O chumaço deve ter área de (100x100) mm na superficie, e ter uma espessura de cerca de 20 mm, pesande entre 3 a 4 g, e ser fixado por meio de grampos e arames de aço a um bastidor de 100mm de lado,também de arame de aço de lado, também de arame de aço com cerca de 1m de diametro.O batedor é fixado em uma alça também de arame de aço com comprimento de, aproximadamente 750mm.`);}else{
            
            session.send('Digite a referencia certa!!!!');
        }
        
        session.beginDialog('/perguntaNBR4');
    }

]);
        
        
    

bot.dialog('/perguntaNBR4', [
    
   session => {
       builder.Prompts.text(session, 'Digite mais um parametro');
   },
    
    (session,results) => {
        
        let NBR4 = results.response;
        if(NBR4 == 'Fogo-livre'){
        
        session.endDialog(`Segundo a NBR 14432 sobre ${NBR4}; Diz que os elementos estruturais podem ser construidos sem a resistência ao fogo exigida por essa norma, desde que se desmonstrem que estejam livres da ação do incendio.`);}else{
            
            session.send('Essa não é a referencia.');
        }
        
        session.beginDialog('/perguntaNBR5');
    }
]);
      
        
    
bot.dialog('/perguntaNBR5', [
    
    session => {
        builder.Prompts.text(session, 'Digite um novo parametro');
    },
    
    (session,results) => {
        let NBR5 =results.response;
        if(NBR5 == 'TRRF'){
        
        session.endDialog(`Segundo a ${NBR5} referente á NBR 14432 diz que: Para ocupação/uso residencial(grupo A), Profundidade do solo como classe S2 tem h0> 10m e 90m; para classes S1 tem h0 <= 10m e tempo = a 30(60) min, levando-se em consideração a profundidade do subsolo.`);}else{
            
            session.send('ZZZZZZZZZZZZZ');
        }
        
        
    }
]);
        
        
    
        

