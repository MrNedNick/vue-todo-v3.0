<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Add task"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button class="todo-button" @click="addTodo">SUBMIT</button>
    <transition-group name="fade">
      <todo-item
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
        @removedTodo="removeTodo"
        @finishedEdit="finishedEdit"
      />
    </transition-group>

    <div class="footer">
      <div>
        <label>
          <input
            type="checkbox"
            :checked="!anyRemaining"
            @change="checkAllTodos"
          />
          Check All</label
        >
      </div>

      <div>{{ remaining }} tasks left</div>
    </div>
    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <transition name="fade">
              <button
                v-if="showClearCompleatedButton"
                class="todo-button clear-button"
                v-bind="attrs"
                v-on="on"
              >
                Clear Completed
              </button>
            </transition>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Are you sure? </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                NO
              </v-btn>
              <v-btn color="green darken-1" text @click="clearCompleated">
                YES
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: "",
      dialog: false,
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
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    showClearCompleatedButton() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) return;

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearCompleated() {
      this.todos = this.todos.filter((todo) => !todo.completed);
      this.dialog = false;
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    },
  },
};
</script>

<style >
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
  width: 80%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid rgb(255, 255, 255);
}

.todo-button {
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 20%;
  height: 46px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  border-radius: 5px;
  transition: all 0.2s linear;
}

.todo-button:hover {
  background-color: #e8c300;
  border-color: #e8c300;
}

.todo-button:active {
  background-color: #ff7300;
  border-color: #ff7300;
}

.clear-button {
  width: 150px;
  height: 25px;
  font-size: 12px;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
  height: 30px;
}

.active {
  background: lightgrey;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
