export const state = () => ({    
    editTaskId: 0,
    tasksToPrint: [],
    printMode: '',
    BASE_URL: 'https://backend.sgae501.com.br/',
    BASE_URL_IMG: 'https://backend.sgae501.com.br',
    BASE_URL_IMGV: 'https://backend.sgae501.com.br',
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