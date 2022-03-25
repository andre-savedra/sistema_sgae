export default {
  setEditTask(context, payload) {
    console.log("payload");
    console.log(payload);
    context.commit("EDIT_TASK", payload);
  },
  setTaskToPrint(context, payload) {
    console.log("payload PRINT");
    console.log(payload);
    context.commit("TASKS_TO_PRINT", payload);
  },
  setPrintMode(context, payload) {
    console.log("payload PRINT MODE");
    console.log(payload);
    context.commit("PRINT_MODE", payload);
  },
  setActualUser(context, payload) {
    console.log("payload ACTUAL USER");
    console.log(payload);
    context.commit("ACTUAL_USER", payload);
  },
};
