// const url = 'ws://cpp-crow-server.herokuapp.com/ws';
const url = 'ws://cpp-crow-server.herokuapp.com/ws';
let socket;

// const $log = $('#log');
const log = document.getElementById('log');

const $msg = $('#msg');
// const msg = document.getElementById('msg');

const $submit = $('#submitMessage');
// const submit = document.getElementById('submitMessage');

// const id = Math.floor(Math.random() * 1000000);
// id = "bob";

$submit.submit(event => {
    event.preventDefault();
    id = document.getElementById("name");

    if(!(id.style.diaplay == "none")) {
        id.style.display = "none"; 
    }
    socket.send(createMessage(id.value, 'chat', $msg.val()));
    // if(!document.getElementById('name').disabled) {
    //     document.getElementById('name').disabled = true;
    // }
    
    $msg.val('');
});

createMessage = (id, type, body) => JSON.stringify({id, type, body});

openSocket = () => {
    socket = new WebSocket(url);
    socket.onopen = () => {
        log.value = '';
        console.log('open');
    };
    socket.onclose = () => {
        console.log('close');
        setTimeout(openSocket, 1000);
    };
    socket.onerror = (e) => {
        console.log('error', e);
    };
    socket.onmessage = (e) => {
        try {
            const message = JSON.parse(e.data);
            switch (message.type) {
                case 'chat':
                    log.value = `${message.id} : ${message.body}\n` + log.value;
                    break;
                default:
                    console.error('Unknown message type');
            }
        } catch (err) {
            console.log(e.data);
        }
    };    
}

openSocket();

