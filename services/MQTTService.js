var mqtt = require("mqtt");
var socketHandler = require("../services/socketHandler");
var db = require("../db/monitoringDB");
var client = mqtt.connect('mqtt://1.234.51.99:9005', {
	username:"fsrnt",
	password:"75657565"
});

client.on("connect", function() {
	console.log("mqtt connect")
	client.subscribe("/soosang/mtag/1")
});

client.on("message", function(topic, message){
	message = JSON.parse(message);

	if(message){
		var beacon_id = message.beacon_id
		var from_layer = message.from_layer
		var layer = message.layer
		// 암호화 예정
		db.layerInfo(beacon_id, layer, function(result){
			console.log("ok!")
		});
		// 복호화 예정
		socketHandler.socketInfo(message);
	}
})
