
//Referencias html

const lblEscritorio = document.querySelector('h1')      ;
const btnAtender    = document.querySelector('button')  ;
const divAlerta     = document.querySelector('.alert')  ;
const lblTicket     = document.querySelector('small')   ;

const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}


const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;


divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {

    btnAtender.disabled = false;
});

socket.on('ultimo-ticket', ultimoTicket =>{
    // lblNuevoTicket.innerText = 'Ticket ' + ultimoTicket;
});


socket.on('tickets-pendientes', ticketsPendientes => {


    lblPendientes.innerText = ticketsPendientes;
    
    
})


socket.on('disconnect', () => {
 
    btnAtender.disabled = true;
});

    btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => {
        
        if( !ok ){
            lblTicket.innerText = `Nadie`
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ ticket.numero }`
    })
});