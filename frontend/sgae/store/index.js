export const state = () => ({    
    editTaskId: 0,
    tasksToPrint: [],
    printMode: '',
    BASE_URL: 'http://projeto-sgae-dev.us-east-1.elasticbeanstalk.com/',
    BASE_URL_IMG: 'http://projeto-sgae-dev.us-east-1.elasticbeanstalk.com',
    BASE_URL_IMGV: 'http://projeto-sgae-dev.us-east-1.elasticbeanstalk.com',
    actualUser: null,
});

// ACTUAL USER STRUCTURE:
// {
//     "id": 42,
//     "nome": "Master",
//     "idUserFK": 32,
//     "email": "sgae.mange@gmail.com",
//     "fone": "19993805639",
//     "ativo": true,
//     "idNivelAcessoFK": {
//         "id": 8,
//         "nome": "Super",
//         "nivelAcesso": 150
//     },
//     "image": "/media/32-SGA.png"
// }