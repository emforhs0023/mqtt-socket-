var mqtt = require("mqtt");
var client = mqtt.connect('mqtt://1.234.51.99:9005', {
	username:"fsrnt",
	password:"75657565"
});

client.on("connect", function() {
	console.log("mqtt connect")
});

client.publish("/soosang/mtag/1", '{"beacon_id":"00000003", "from_layer":"2", "layer":"1"}')
// module.exports.start = function(){
	
// }