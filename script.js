// function api(){
const fetchTodos = fetch("http://localhost:1337/api/to-dos/");
const square = document.getElementById("square");      
fetchTodos.then(response => {
    return response.json();
}).then(data => {
    console.log(data)
    square.innerHTML = listoftask(data);
});


// // window.addEventListener("load", (event) => {
// //     console.log("page is fully loaded");
// //     setInterval("api()", 2000);   
// //   });
// api()

function listoftask(data) {
const todoData = data.data;
const titles = todoData.map((todo) => (
                todo.attributes.completed == true ? `<li class="lista"><label class="container">
                <input type="checkbox" id = "check" onclick="completed(${todo.id}, on=true)" checked/>
               <span class="checkmark"></span>
                  <div>${todo.attributes.title}</div><button onclick = "openModal(${todo.id},'${todo.attributes.title}','${todo.attributes.description}')" class="edit-btn"><img id="dlugopis" src="dlugopis.png"/></button>
                    </li>
                    <div id="mytodoModal">
                    <div id="myModal-content">
                    <input type="text" id="Tytul"/>
                    <input type="text" id="Opis"/>
                    <input type="hidden" id="id" />
                    <button onclick="send()" id="Ptaszek"><img src="C:/Users/Filip/to do front/3.png"></button>
                    <button onclick = "closeModal()" id="krzyzyk"><img src="C:/Users/Filip/to do front/2.png"></button>
                    <button onclick = "deletetodo()" id="deletetodo">Delete item</button>
                    </div>
                    </div>` : `<li class="lista"><label class="container">
                        <input type="checkbox" id = "check" onclick ="completed(${todo.id}, on=false)"/>
                        <span class = checkmark></span>
                        </div>${todo.attributes.title}<button onclick = "openModal(${todo.id}, title='${todo.attributes.title}', description='${todo.attributes.description}')" class="edit-btn"><img id="dlugopis" src="dlugopis.png"></button>
                    </li><div id="mytodoModal">
                    <div id="myModal-content">
                    <input type="text" id="Tytul"/>
                    <input type="text" id="Opis"/>
                    <input type="hidden" id="id" />
                    <button onclick = "send()" id="Ptaszek"><img src="C:/Users/Filip/to do front/3.png"></button>
                    <button onclick = "closeModal()" id="krzyzyk"><img src="C:/Users/Filip/to do front/2.png"></button>
                    <button onclick = "deletetodo()" id="deletetodo">Delete item</button> 
        
        
                
                    </div>
                    </div>`)).join("\n")
        return ` <ul>${titles}</ul>`
      }


    function openModal(id,title,description) {
        document.getElementById("Tytul").value = title;
        document.getElementById("Opis").value = description;
        document.getElementById("id").value = id
        var modal=document.getElementById("mytodoModal")
    modal.style.display = "block";
    
    
    }





var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");


btn.onclick = function() {
modal.style.display = "block";
}



window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}



function display(){
    const body = {
        "data":{
            "title":document.getElementById("Tytul-new").value,
                "description":document.getElementById("Opis-new").value,
        }
    }
    fetch('http://localhost:1337/api/to-dos/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    }
    }).then(function (response) {
    // The API call was successful!
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
    }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
    document.getElementById("Tytul-new").value = ""
    document.getElementById("Opis-new").value = ""
    }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
    }); 
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}   



function closeModal() {
    var modal = document.getElementById("mytodoModal");
    var modal2 = document.getElementById("myModal");
    modal.style.display = "none";
    modal2.style.display = "none";
    }
    
   
    var button = document.getElementById("krzyzyk");
    
    button.onclick = function() {
    closeModal();
    }
    
    window.onclick = function(event) {
    if (event.target == krzyzyk) {
        closeModal();
    }
    }


const refreshBtn = document.getElementById("refresh");
    
function odswiezanie() {
    window.location.reload();
}
refreshBtn.addEventListener("click", odswiezanie);



// const PtaszekBtn = document.getElementById("Ptaszek");
    
// function Ptaszek() {
//     window.location.reload();
// }
// PtaszekBtn.addEventListener("click", Ptaszek);



// var dlt = document.getElementById("delete");
// var mdl = document.getElementById("mytodoModal");
// function usuwanie(){
//     if (mdl.style.display = "block"){
//         dlt.style.display = "block";
//     }    
// }



// function addnewwyl(){
// var mdl = document.getElementById("mytodoModal");
// var anb = document.getElementById("myBtn")
//     if(mdl.style.display = "block"){
//         anb.style.display = "none";
//     }
// }

function send(){
id = document.getElementById("id").value
console.log(id)
const body = {
    "data":{
      "title": document.getElementById("Tytul").value,
      "description":document.getElementById("Opis").value,
}
}
fetch(`http://localhost:1337/api/to-dos/${id}/`, {
method: 'PUT',
body: JSON.stringify(body),
headers: { 
    'Content-Type': 'application/json'
}

}).then(function (response) {
// The API call was successful!
if (response.ok) {
  return response.json();
} else {
  return Promise.reject(response);
}
}).then(function (data) {
// This is the JSON from our response
console.log(data);

var modal = document.getElementById("mytodoModal");
// var btn = document.getElementsByid("Ptaszek");
modal.style.display = "none";
}).catch(function (err) {
// There was an error
console.warn('Something went wrong.', err);
});
}

function completed(id, on){
            console.log(id)
            var completed = false 
            if(on == false){
                completed = true 

            }
            const body = {
                "data":{
                    "completed": completed
                
                }
            }
            fetch(`http://localhost:1337/api/to-dos/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

            }).then(function (response) {
            // The API call was successful!
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
            }).then(function (data) {
            // This is the JSON from our response
            console.log(data);
            
            }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
            });

            }


            function deletetodo(){
                id = document.getElementById("id").value
                console.log(id)
              
                
                fetch(`http://localhost:1337/api/to-dos/${id}/`, {
                method: 'DELETE',
              
                
                }).then(function (response) {
                // The API call was successful!
                if (response.ok) {
                  return response.json();
                } else {
                  return Promise.reject(response);
                }
                }).then(function (data) {
                // This is the JSON from our response
                console.log(data);
                
                }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
                });
            }