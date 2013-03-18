
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

          }

}

// ================== UTILES =======================

function utiles(){

     socket.on("cmdo",function(data){

        comando = data.comando.split("::");

        comandos(comando);

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

  		  console.log("qlc-api > " + data.texto + " - socket_id : " + data.socket);


        $("#results tbody").html(" " +
                +"<tr>  <td>" + data.socket + "</td> <td> " + data.texto + "</td> <td>" + data.socket + "</td> </tr>"+
                                 +" ");

  	});
    

  	return false;
  

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
