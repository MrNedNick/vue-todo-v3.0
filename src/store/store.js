import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todos: [
            {
              id: 1,
              title: "Clean my room",
              completed: false,
              editing: false,
            },
            {
              id: 2,
              title: "Read new book",
              completed: false,
              editing: false,
            },
        ],
    },
    getters: {
        remaining(state) {
            return state.todos.filter((todo) => !todo.completed).length;
        },
        anyRemaining(state, getters) {
        return getters.remaining != 0;
        },
        showClearCompleatedButton(state) {
        return state.todos.filter((todo) => todo.completed).length > 0;
        },
    }
})