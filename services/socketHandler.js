SocketHandler = (function(){

	var root = this;
	var Module;
	var io = null;

	if(typeof exports !== "undefined"){ // exports ==  module.exports는 
		Module = exports;
	}else{
		Module = root.Module = {};
	}

	Module.setSocketIO = function(socketIo){ // room 만드는 작업
		io = socketIo;

		io.on("connection", function(socket){})
	}

	Module.socketInfo = function(data){
		try {
			io.emit('location', data);
		} catch(e) {
			console.log(e);
		}
	}

	return Module;
})();


module.exports = SocketHandler;