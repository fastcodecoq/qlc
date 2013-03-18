
var socket;

function server_eve(){

  socket = io.connect('http://quienlocompra.com:9090');
  console.log(socket.id);

}


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


function ini(){

   server_eve();
   buscar();
   console.log("qlc-api > todo cargado");

}


$(document).ready(function(){


  ini();

});
