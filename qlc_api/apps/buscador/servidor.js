var io = require('socket.io').listen(9090);

coll = ["articulos"];
var db = require("mongojs").connect("localhost/qlc",coll);
var sck = 0;

function buscar(data){


	         
       db.articulos.find({nombre : new RegExp(data.texto)  },function(err,resp){
    
                sck.emit("result", resp);


       });
           

}


function cargar(data){

          db.articulos.save(data, function(res){
            
             if(res){
                sck.emit('carga', {status:1});
               }else{
                sck.emit('carga', {status:0});
             }
    });

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



