let allf1 = document.querySelectorAll(".f1 div");

let modelvisible = false;

let body = document.querySelector("body");

let addbtn = document.querySelector("#add");

let second = document.querySelector(".seconddiv");

let uid = new ShortUniqueId();

let colors = {

    pink: "#d595aa",

    blue: "#5ecdde",

    green: "#91e6c7",

    black: "black",

};



let colorclasses = ["pink" , "blue" , "green" , "black"];



let deletestate = false;

let deletbtn = document.querySelector("#delete");



//Inialization of localstorage system for data persistance.

if(!localStorage.getItem("tasks")){

    localStorage.setItem("tasks" , JSON.stringify([]));

}



deletbtn.addEventListener("click" , function(e){

    if(deletestate)

    {

        deletestate = false;

        e.currentTarget.classList.remove("delete-state");

    }

    else{

        deletestate = true;

        e.currentTarget.classList.add("delete-state");

    }

})



addbtn.addEventListener("click", function () {

    if (modelvisible) return;



    if(deletbtn.classList.contains("delete-state"))

    {

        deletestate = false;

        deletbtn.classList.remove("delete-state"); 

    }



    let model = document.createElement("div")



    model.classList.add("newtab");

    model.setAttribute("click-first", true);

    model.innerHTML = `<div class="textarea" contenteditable="" >Enter your Task</div>

       <div class="design">

             <div class="colordesign">

                   <div class="model-filter pink"></div>

                   <div class="model-filter blue"></div>



                   <div class="model-filter green"></div>



                   <div class="model-filter black active"></div>



             </div>`



    let allmodelfilter = model.querySelectorAll(".model-filter")

    for (let i = 0; i < allmodelfilter.length; i++) {

        allmodelfilter[i].addEventListener("click",function(e) {

            for (let j = 0; j < allmodelfilter.length; j++) {

                allmodelfilter[j].classList.remove("active");

            }

            e.currentTarget.classList.add("active");

        } );

    }

    let wa = model.querySelector(".textarea");

    wa.addEventListener("click", function (e) {

        if (model.getAttribute("click-first") == "true") {

            wa.innerHTML = "";

            model.setAttribute("click-first", false);

        }

    });



    wa.addEventListener("keypress", function (e) {

        if (e.key == "Enter") {

            let task = e.currentTarget.innerText;

            let selectedmodelfilter = document.querySelector(".active");

            let color = selectedmodelfilter.classList[1];

            let ticket = document.createElement("div");

            let id = uid();

            ticket.classList.add("ticket");

            ticket.innerHTML = `<div class = "header ${color}"></div>

                 <div class = "equipment">

                <div class = "ticketid">#${id}</div>

                <div class="awasome"><span class="material-icons lockiconbtn">lock

                </span><span class="material-icons ticketdeletebtn"> delete </span></div>

                </div>

                <div class="text" contenteditable="true">${task}</div>`;

            

                

                saveinlocalstorage(id,color,task);

                let ticketcwirtingarea = ticket.querySelector(".text");



                ticketcwirtingarea.addEventListener("input" , ticketcwirtingareaHandler);



            let ticketdeletbtn = ticket.querySelector(".ticketdeletebtn");

            ticketdeletbtn.addEventListener('click',function(e){

                if(deletestate){

                let id =  e.currentTarget.parentElement.parentElement. querySelector(".ticketid").innerText.split("#")[1];

                

                let taskarray = JSON.parse(localStorage.getItem("tasks"));



                taskarray = taskarray.filter(function(e1){

                    return e1.id != id;

                });



                localStorage.setItem("tasks" , JSON.stringify(taskarray));

               

                    

                    ticket.remove();

                }

            });          

            let lock = ticket.querySelector(".lockiconbtn");

            lock.addEventListener("click" ,  function (e){

                let lockicon = ticket.querySelector(".text");

               if(e.currentTarget.classList.contains("icon-state"))

               {

                   e.currentTarget.classList.remove("icon-state");

                   lockicon.setAttribute("contenteditable" , true);

               }

               else{

                   e.currentTarget.classList.add("icon-state");

                   lockicon.removeAttribute("contenteditable");

               

            

               }

            });

            

            let ticketcolordiv = ticket.querySelector(".header");

            ticketcolordiv.addEventListener("click" , ticketcolorHandler);



            second.appendChild(ticket);



            model.remove();

            modelvisible = false;

            

        }

       

    });

    body.appendChild(model);

    modelvisible = true;

});





    

function saveinlocalstorage(id,color,task){

    let requireobj = {id , color , task}

    let taskarray = JSON.parse(localStorage.getItem("tasks"));

    if(taskarray == null)

    {

        taskarray = [];

    }

    taskarray.push(requireobj);

    localStorage.setItem("tasks" , JSON.stringify(taskarray));

}



function ticketcolorHandler(e){

    let id =  e.currentTarget.parentElement.querySelector(".ticketid").innerText.split("#")[1];

    //    console.log(id);

       let taskarray = JSON.parse(localStorage.getItem("tasks"));

       let reqIndex = -1;

       for(let i = 0; i < taskarray.length; i++)

       {

           if(taskarray[i].id == id)

           {

               reqIndex = i;

               break;

           }

       }



    let currcolor = e.currentTarget.classList[1];

    let index = colorclasses.indexOf(currcolor);

    index++;

    index = index % 4;

    e.currentTarget.classList.remove(currcolor);

    e.currentTarget.classList.add(colorclasses[index]);

    taskarray[reqIndex].color = colorclasses[index];

    localStorage.setItem("tasks" , JSON.stringify(taskarray));



}

function ticketcwirtingareaHandler(e){

    let id =  e.currentTarget.parentElement.querySelector(".ticketid").innerText.split("#")[1];

    console.log(id.length)

    let taskarray = JSON.parse(localStorage.getItem("tasks"));

    

    let reqIndex = -1;

    for(let i = 0; i < taskarray.length; i++)

    {   

         

        if(taskarray[i].id == id)

        {

            reqIndex = i;

            break;

        }

    }

    console.log("req"+reqIndex);



    taskarray[reqIndex].task  =  e.currentTarget.innerText;

    localStorage.setItem("tasks" , JSON.stringify(taskarray));

 }



 function LoadTask(passedcolor){

     let alltickets = document.querySelectorAll(".ticket");

     for(let t = 0; t < alltickets.length; t++)

     {

         alltickets[t].remove();

     }



    let tasks = JSON.parse(localStorage.getItem("tasks"));

    for(let i = 0; i < tasks.length; i++)

    {

        let id = tasks[i].id;

        let color = tasks[i].color;

        let taskvalue = tasks[i].task;



        if(passedcolor)

        {

            if(passedcolor != color) continue;

        }





        let ticket = document.createElement("div");

        ticket.classList.add("ticket");

        ticket.innerHTML = `<div class = "header ${color}"></div>

             <div class = "equipment">

            <div class = "ticketid">#${id}</div>

            <div class="awasome"><span class="material-icons lockiconbtn">lock

            </span><span class="material-icons ticketdeletebtn"> delete </span></div>

            </div>

            <div class="text" contenteditable="true">${taskvalue}</div>`;



        let ticketcwirtingarea = ticket.querySelector(".text");

        ticketcwirtingarea.addEventListener("input" , ticketcwirtingareaHandler);



        let ticketcolordiv = ticket.querySelector(".header");

        ticketcolordiv.addEventListener("click" , ticketcolorHandler);



        let ticketdeletbtn = ticket.querySelector(".ticketdeletebtn");

        ticketdeletbtn.addEventListener('click',function(e){

            if(deletestate){

            let id =  e.currentTarget.parentElement.parentElement. querySelector(".ticketid").innerText.split("#")[1];

            

            let taskarray = JSON.parse(localStorage.getItem("tasks"));



            taskarray = taskarray.filter(function(e1){

                return e1.id != id;

            });



            localStorage.setItem("tasks" , JSON.stringify(taskarray));

           

                

                ticket.remove();

            }

        });  

        let lock = ticket.querySelector(".lockiconbtn");

        lock.addEventListener("click" ,  function (e){

            let lockicon = ticket.querySelector(".text");

           if(e.currentTarget.classList.contains("icon-state"))

           {

               e.currentTarget.classList.remove("icon-state");

               lockicon.setAttribute("contenteditable" , true);

           }

           else{

               e.currentTarget.classList.add("icon-state");

               lockicon.removeAttribute("contenteditable");

           

        

           }

        });



        second.appendChild(ticket);

    }



 }



 LoadTask();

 for (let i = 0; i < allf1.length; i++) {

    allf1[i].addEventListener("click", function (e) {



        if(e.currentTarget.parentElement.classList.contains("selected-filter"))

        {

            e.currentTarget.parentElement.classList.remove("selected-filter");

            LoadTask();

        }

        else{

            

            let color = e.currentTarget.classList[0].split("-")[0];

            e.currentTarget.parentElement.classList.add("selected-filter");

            LoadTask(color);

        }

    });

};