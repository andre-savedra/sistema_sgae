export const state = () => ({    
    editTaskId: 0,
    tasksToPrint: [],
    printMode: '',
    BASE_URL: (process.env.BASE_URL + '/'),
    BASE_URL_IMG: process.env.BASE_URL,
    BASE_URL_IMGV: process.env.BASE_URL,
    actualUser: null,
});
