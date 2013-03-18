var io = require('socket.io').listen(9090);

coll = ["articulos"];
var db = require("mongojs").connect("localhost/qlc",coll);
var sck = 0;

function buscar(data){

	         
      var coll = ["articulos"];

      return data;

}


function cargar(data){


      if(db.articulos.save(data)) 
          sck.emit("carga",{ status : 1 });     
      else
          sck.emit("carga",{ status : 0 });


}




io.sockets.on('connection', function (socket) {  

  sck = socket;
  
  socket.on('buscar', function (data) {

      data.socket = socket.id;
      socket.emit('result',buscar(data));
      

  });



  socket.on("cmd",function(data){


  	   io.sockets.emit("cmdo",{ comando : data });

  });


  socket.on("cargar",function(data){

      cargar(data);

  });


});



