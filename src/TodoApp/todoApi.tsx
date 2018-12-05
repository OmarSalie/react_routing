

export const todoApi = (function () {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", "{}");
  }

  let todos = JSON.parse(localStorage.getItem("todos") || "{}");

  return {
    all() {
      return Promise.resolve(Object.keys(todos).map((k) => todos[k]))
    },
    findBy(key: any, value: any) {
      return Promise.resolve(Object.keys(todos).map((k) => todos[k]).find((todo: any) => {
        return todo[key] === value;
      }));
    },
    filterBy(key: any, value: any) {
      return Promise.resolve(Object.keys(todos).map((k) => todos[k]).filter((todo: any) => {
        return todo[key] === value;
      }));
    },
    filterByAny(key: any, value: any) {
      return Promise.resolve(Object.keys(todos).map((k) => todos[k]).filter((todo: any) => {
        return todo[key].includes(value);
      }));
    },
    create(todo: any) {
      return new Promise((resolve, reject) => {
        try {
          const id = Math.floor(new Date().valueOf() * Math.random());
          todos[id] = {
            ...todo,
            id,
          };
          localStorage.setItem("todos", JSON.stringify(todos));
          return resolve(id);
        } catch (e) {
          return reject(e);
        }
      });
    },
    update(id: any, todo: any) {
      return new Promise((resolve, reject) => {
        try {
          const updated = { ...todos[id], ...todo };
          todos[id] = updated;
          localStorage.setItem("todos", JSON.stringify(todos));
          return resolve(updated);
        } catch (e) {
          return reject(e);
        }
      })
    },
    remove(id: any) {
      return new Promise((resolve, reject) => {
        try {
          todos = Object.keys(todos).reduce((without, todoId) => {
            if (id == todoId) {
              return without;
            }

            return {
              ...without,
              [todoId]: todos[todoId]
            };
          }, {});

          localStorage.setItem("todos", JSON.stringify(todos));
          return resolve();
        } catch (e) {
          return reject(e);
        }
      });
    },
  }
})();

export default todoApi;