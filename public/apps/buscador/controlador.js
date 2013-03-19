
var socket;

function server_eve(){

  socket = io.connect('http://quienlocompra.com:9090');
  console.log(socket.id);

}


// ================= COMANDOS ========================

function comandos(comando){


          switch(comando[0]){

              case "$reload":

                 location.reload();

               break;

               case "$promo":

                 alert(comando[1]);

               break;

               case "$carga":               

                  cargar();

                break;

          }

}

// ================== UTILES =======================

function utiles(){

     socket.on("cmdo",function(data){

        comando = data.comando.split("::");

        comandos(comando);

     });


     $("input[name='b_text']").keyup(function(){

           if($(this).val() == "")
              $("#results tbody").html("");

     });


}

// ================== BUSCAR =======================


function buscar(){


  $("#buscar").click( function(e){

      e.preventDefault;
      e.stopPropagation; 

       $("form#buscador").submit();
    
   });

  $("#buscador").submit(function(){  	

  	var data = {

  		        texto : $("input[name='b_text']").val(),
  		        socket : ""

  		       };    

    if(data.texto.match("$") &&  data.texto.match("::"))
          {
             
             socket.emit("cmd", data.texto);
             return false;

          }

  	socket.emit('buscar',data);

  	socket.on("result",function(data){
  		  
        var salida = "";
        $("#results tbody").html(salida);
   
      for(i= 0 ; i < data.length ; i++) {

        salida += " " +

                +"<tr>"+  

                +"<td>" + data[i].id + "</td>" +
                +"<td>" + data[i].nombre + "</td>" +
                +"<td>" + data[i].categoria + "</td>" +
                +"<td>" + data[i]._id + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +
                +"<td>" + data[i].tipo + "</td>" +

                +"</tr>"+
                        
                         +" ";                      

      }

              $("#results tbody").html(salida);
      

  	});
    

  	return false;
  

  });


}


function cargar(){

    socket.emit("cargar",{ nombre : "blackberry 9630" , id : "ad8dad8asd70", tipo : "movil" , categoria : "celulares>qwerty>blackberry>9630"});

    socket.on("carga",function(data){

       console.log(data.status);

    });

}

// ================== INI =======================


function ini(){

   server_eve();
   buscar();
   utiles();
   console.log("qlc-api > todo cargado");

}


// ================== DOCUMENT.READY =======================



$(document).ready(function(){

  ini();

});
