export const state = () => ({    
    editTaskId: 0,
    tasksToPrint: [],
    printMode: '',
    BASE_URL: 'https://env-sgae4.eba-npvnqzqf.us-east-1.elasticbeanstalk.com/',
    BASE_URL_IMG: 'https://env-sgae4.eba-npvnqzqf.us-east-1.elasticbeanstalk.com',
    BASE_URL_IMGV: 'https://env-sgae4.eba-npvnqzqf.us-east-1.elasticbeanstalk.com',
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