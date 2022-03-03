export default {
  setEditTask(context, payload) {
    console.log("payload");
    console.log(payload);
    context.commit("EDIT_TASK", payload);
  },
};
