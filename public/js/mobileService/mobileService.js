app.service('MobileService', function() {
	var svc = this;
	
	svc.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry|BB10|Tablet|Mobile/i);
		},
		
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		
		Windows: function() {
			return navigator.userAgent.match(/IEMobile|Edge/i);
		},
		
		any: function() {
			var isAny = (svc.isMobile.Android() || svc.isMobile.BlackBerry() || svc.isMobile.iOS() || svc.isMobile.Opera() || svc.isMobile.Windows());
			return isAny;
		}
	};
})