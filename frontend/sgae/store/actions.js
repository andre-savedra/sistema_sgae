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
};
