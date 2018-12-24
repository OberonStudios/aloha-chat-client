const url = 'https://cpp-crow-server.herokuapp.com/api/chat_history';
// const url = 'http://localhost:8080/api/chat_history';


let history_array = {};
let history_container = document.getElementById('history_container');

async function get_history () {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

render_history = () => {
    for (var i = 0; i < history_array.length; i++) {
        let temp_text = document.createElement("p");
        temp_text.innerHTML = history_array[i].id +" - "+ history_array[i].body;

        history_container.appendChild(temp_text);
        // console.log(history_array[i]);
    }
}

get_history()
.then(data => history_array = data.history)
.then(render_history)


