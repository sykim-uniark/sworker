start();

// onload関数
function start() {
	serviceRegist();
}

function testbtn1() {
	log("test!1");

	// 通知を許可したけどスマホでは通知表示出来ていない。↓
	Notification.requestPermission().then(function (result) {
		if (result === 'granted') {

			setTimeout(function () {
				var notification = new Notification('Notification title', {
					icon: 'img/ic512.png',
					body: 'Notification text',
				});
				// notification.onclick = function () {};
			}, 3000);

		}
	});
}

function testbtn2() {
	log('push testbtn2.');
}

function testbtn3() {
}

function serviceRegist() {
	if ('serviceWorker' in navigator) {
		log('regist serviceWorker.');
		navigator.serviceWorker.register('serviceWorker.js');
		console.log(navigator.serviceWorker);
	};
}

// 画面にテキスト出力、consoleと違って単純にテキストだけ出力している
function log() {
	console.log(arguments);
	let logger = $('#logger');
	for (var i = 0; i < arguments.length; i++) {
		logger.append(arguments[i]);
	}
	logger.append("\n");
}
