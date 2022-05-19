start();

// onload関数
function start() {
	log("start");

}

function testbtn1() {
	log("test!2");

	// 通知を許可したけどスマホでは通知表示出来ていない。↓
	Notification.requestPermission().then(function(result) {
		if (result === 'granted') {
			
            setTimeout(function () {
                var notification = new Notification('Notification title', {
                    icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                    body: 'Notification text',
                });
                notification.onclick = function () {
                    log("onclick!");
                };
            }, 3000);

		}
	});
}

function testbtn2() {
	if('serviceWorker' in navigator) {
		log('testbtn2');
		navigator.serviceWorker.register('serviceWorker.js');
	};
}


// 画面にテキスト出力、consoleと違って単純にテキストだけ出力している
function log() {
	//console.log(arguments);
	let logger = $('#logger');
  for (var i=0; i<arguments.length; i++){
    logger.append(arguments[i]);
  }
	logger.append("\n");
}
