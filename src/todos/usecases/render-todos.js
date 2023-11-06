import { Todo } from "../models/todo.models"
import { createTodoHTML } from "./create-todo-html";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {
    
    if ( !element ) {//Esto evita que siempre se vaya a buscar al dom el elemento si ya existe
         element = document.querySelector( elementId );
    }

    if ( !element ) throw new Error(`Element ${ elementId } not found`);

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHTML(todo) );
    });
}