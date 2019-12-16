export const messageService = {
  namespaced: true,
  state: {
    hidden: {
      type: Boolean,
      required: true,
      default: true,
    },
    message: {
      type: String,
      required: true,
      default: true,
    },
    title: {
      type: String,
      required: true,
      default: true,
    },
    type: {
      type: String,
      required: true,
      default: true,
    },
  },
  mutations: {},
  getters: {
    get_hidden: state => state.hidden,
    get_title: state => state.title,
    get_type: state => state.type,
    get_message: state => state.message
    },
  actions: {},
};
