export default {
    EDIT_TASK(state, payload) {
        state.editTaskId = payload;
    },
    TASKS_TO_PRINT(state, payload) {
        state.tasksToPrint = payload;
    },
}