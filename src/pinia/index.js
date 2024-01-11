import { defineStore } from "pinia"

export const useStore = defineStore('store', {
  state: () => {
    return {
      view: true,
      message: null,
    }
  },
  actions: {
    setMessage(msg) {
      this.message = msg
    },
  },
})


