export const state = () => ({    
    editTaskId: 0,
    tasksToPrint: [],
    printMode: '',
    BASE_URL: (process.env.BASE_URL + '/'),
    BASE_URL_IMG: process.env.BASE_URL,
    BASE_URL_IMGV: process.env.BASE_URL,
    actualUser: null,
});

// ACTUAL USER STRUCTURE:
// {
//     "id": 42,
//     "nome": "Master",
//     "idUserFK": 32,
//     "email": "sgae.mange@gmail.com",
//     "fone": "",
//     "ativo": true,
//     "idNivelAcessoFK": {
//         "id": 8,
//         "nome": "Super",
//         "nivelAcesso": 150
//     },
//     "image": "/media/32-SGA.png"
// }