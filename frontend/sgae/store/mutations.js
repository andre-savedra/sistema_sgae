export default {
    EDIT_TASK(state, payload) {
        state.editTaskId = payload;
    },
    TASKS_TO_PRINT(state, payload) {
        state.tasksToPrint = payload;
    },
    PRINT_MODE(state, payload) {
        state.printMode = payload;
    },
}