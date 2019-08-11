

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



/*bot.dialog('/pergunta', [
   session => {
       builder.Prompts.text(session, 'Escolha uma das opções');
   },
    (session, results) => {
        let escolha = results.response;
        
        switch(escolha) {
            case 'a':
//                session.beginDialog('/pergunta_a');
                session.endDialog('');
                break;
            case 'b':
//                session.beginDialog('/pergunta_b');
                session.endDialog('');
                break;
            case 'c':
//                session.beginDialog('/pergunta_c');
                session.endDialog('');
                break;
            case 'd':
//                session.beginDialog('/pergunta_d');
                session.endDialog('');
                break;
            case 'e':
//                session.beginDialog('/pergunta_e');
                session.endDialog('');
                break;
        }
    }
]);*/


        
    
bot.dialog('/perguntaNBR', [
    
    session =>{
    
   builder.Prompts.text(session, 'Digite os parametros do seu modelo');
    },
    
    (session, results) => {
        
        let paramNBR = results.response;
        if(paramNBR == 'Quantos lavatórios são necessários no canteiro?'){
        
        session.endDialog(`É necessário 1 (um) conjunto para cada grupo de 20 (vinte) trabalhadores ou fração (NR 18.2.4).`);}else{
            
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
        if(NBR2 == 'Quantos chuveiros são necessários no canteiro?'){
        session.endDialog(`É necessário 1 (uma) unidade para cada grupo de 10 (dez) trabalhadores ou fração (NR 18.2.4).`);}else{
            
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
        if(NBR3 == 'Como deve ser a instalação dos lavatórios?'){
        session.endDialog(`A instalação dos lavatórios deve seguir as recomendações de acordo com a Norma Regulamentadora NR 18 (18.4.2.5.1):\n
•	Possuir torneira de metal ou de plástico;\n 
•	Ficar a uma altura de 0,90m (noventa centímetros);\n 
•	Ser ligados diretamente à rede de esgoto, quando houver;\n 
•	Ter revestimento interno de material liso, impermeável e lavável;\n 
•	Ter espaçamento mínimo entre as torneiras de 0,60m (sessenta centímetros), quando coletivos\n
•	Dispor de recipiente para coleta de papéis usados.
`);}else{
            
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
        if(NBR4 == 'Como deve ser feito a armazenagem dos materiais em geral?'){
        
        session.endDialog(`• Fica estabelecida a distância máxima de 60,00m (sessenta metros) para o transporte manual de um saco (NR 11.2.2);\n
• As pilhas de sacos, nos armazéns, terão a altura máxima correspondente a 30 (trinta) fiadas de sacos quando for usado processo mecanizado de empilhamento (11.2.5);\n
• A altura máxima das pilhas de sacos será correspondente a 20 (vinte) fiadas quando for usado processo manual de empilhamento (NR 11.2.6);\n
• Material empilhado deverá ficar afastado das estruturas laterais do prédio a uma distância de pelo menos 0,50m (cinquenta centímetros) (NR 11.3.3).\n

Obs 1: O empilhamento máximo deve atentar ainda para as recomendações do fabricante;

Obs 2: Os sacos de cimento ser dispostos em pallets e protegidos da umidade e intempéries;
.`);}else{
            
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
        if(NBR5 == 'É necessário ambulatório em um canteiro de obras?'){
        
        session.endDialog(`O canteiro de obras deve dispor de ambulatório, quando se tratar de frentes de trabalho com 50 (cinquenta) ou mais trabalhadores (NR 18.4.1)`);}else{
            
            session.send('ZZZZZZZZZZZZZ');
        }
        
        
    }
]);
        
        
    
        

