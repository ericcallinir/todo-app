import { Todo } from '../todos/models/todo.models';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}


const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de la realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore')

}

const loadStore = () => {
    if ( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    console.log( JSON.stringify (state) );
    localStorage.setItem('state', JSON.stringify (state));
}


const getTodos = ( filter = Filters.All) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );//Repasar que son los callbacks
        
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done ); //Filter me genera un nuevo arreglo y lo retorna.
        
        default:
            throw new Error(`Option ${ filter} is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');

    state.todos.push ( new Todo ( description ) );
    saveStateToLocalStorage();
}

const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }

        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter ( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted= () => {
    state.todos = state.todos.filter ( todo => !todo.done );
    saveStateToLocalStorage();
}

const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}
export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    getTodos,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    }