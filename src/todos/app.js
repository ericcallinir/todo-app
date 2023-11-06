import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos, renderPending } from './usecases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput:'#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilers: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
    }

    //Cuando la funcion App() se llama, esto es una funcion auto invocada apenas se llama al archivo se ejecuta.
    (() => {
        const app = document.createElement('div'); //aqui se esta creando un elemento div de HTML.
        app.innerHTML = html; //se esta guardando en la constante app todo lo que tiene app.html.
        document.querySelector(elementId).append( app );//Esta buscando el elemento por id y le esta agregando lo que tiene app.
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
    const filterLIs = document.querySelectorAll( ElementIDs.TodoFilers );

    //Listeners

    newDescriptionInput.addEventListener( 'keyup', ( event ) => {//Se esta escuchando cuando se pulsa una tecla y obtener los values de esta.
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().lenght === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
        
    });

    todoListUL.addEventListener('click', ( event ) => {//se esta escuchando el evento click sobre el elemento UL
        const element = event.target.closest( '[data-id]' );//Aqui buscar el elemento mas cercano con el nombre "data-id" en el padre
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        const isDestroyElement = event.target.className === 'destroy'//Aqui busco el elemento que tenga la clase destroy
        const element = event.target.closest( '[data-id]' );//Aqui buscar el elemento mas cercano con el nombre "data-id" en el padre
        if ( !element || !isDestroyElement ) return;//Validamos si existe elemento o si isDestoyElement es true si no salimos de la funcion sin hacer nada.

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', ( event ) => {//aqui no es necesario el event ya que no se esta usando porque ya capturamos el click.
        todoStore.deleteCompleted();
        displayTodos();
    });

    filterLIs.forEach( element => {//Aqui no se puede usar el addEventListener directo porque es un arreglo al utilizar querySelectorAll. por ende se debe recorrer.
        element.addEventListener('click', ( element ) => {//Aqui como estamos recorriendo los elementos 1 a 1 ya se puede usar addEventListener.
            filterLIs.forEach( el => el.classList.remove('selected'));//Elimina la clase 'selected' de todos
            element.target.classList.add('selected');//Aqui añadimos la clase selected para que se aplique el filtro.

            switch ( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }
            displayTodos();
        });
    });

}
