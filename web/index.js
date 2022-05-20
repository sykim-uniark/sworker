start();

let isSubscribed = false;
let sw = null;
const applicationServerPublicKey = 'BFxZasZTOa2ijnJ-zZyRIMH1gw24ecj5RY0qYmVehdV_2P_WFu2mDHXZ2VpCwVP_Ov_JifC-Iu0Mmhc7KBSnL1k';

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
	log('push testbtn3.');
	showNotification();
}

function serviceRegist() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('serviceWorker.js').then((swreg)=>{
			log('regist serviceWorker.');
			sw = swreg;

			const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
			sw.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: applicationServerKey
			})
			.then(function(subscription) {
				console.log('User is subscribed:', subscription);
				updateSubscriptionOnServer(subscription);
				isSubscribed = true;
			})
			.catch(function(err) {
				console.log('Failed to subscribe the user: ', err);
			});

			sw.pushManager.getSubscription().then((subscription)=>{
				isSubscribed = !(subscription === null);
				updateSubscriptionOnServer(subscription);

				if (isSubscribed) {
					console.log('User IS subscribed.');
				} else {
					console.log('User is NOT subscribed.');
				}

			});
		});
	};
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
  } else {
		subscriptionJson.textContent = "";
	}
}

function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: 'img/ic32.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
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

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}