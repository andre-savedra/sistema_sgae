export const state = () => ({    
    editTaskId: 0,
    tasksToPrint: [],
    printMode: '',
    BASE_URL: 'http://localhost:8003/',
    BASE_URL2: 'http://localhost:8003',
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