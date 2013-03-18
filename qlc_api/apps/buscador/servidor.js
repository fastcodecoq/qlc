var io = require('socket.io').listen(9090);


function buscar(data){

	   
      console.log(data);


      return data;

}


io.sockets.on('connection', function (socket) {  
  
  socket.on('buscar', function (data) {

      data.socket = socket.id;
      socket.emit('result',buscar(data));


  });

});



