var ball = document.getElementById('ball');

var mouseDown = Rx.Observable.fromEvent(ball, 'mousedown');
var mouseUp = Rx.Observable.fromEvent(ball, 'mouseup');
var mouseMove = Rx.Observable.fromEvent(document, 'mousemove');
var counter = 3;
var life = new Firebase("https://dragit.firebaseio.com");
life.child("lifeCount").set(counter);
life.child("success").set(false);

var $canvas  = document.getElementById('canvas');
var $touchLine  = document.getElementById('touchLine');
var $fail = document.getElementById('failureCount');
var $success = document.getElementById('successCount');

var dragBall = mouseDown.selectMany(function(mousedown) {

	var startX = mousedown.offsetX;
	var startY = mousedown.offsetY;

	return mouseMove.map(function(mousemove) {
		(mousemove.preventDefault) ? mousemove.preventDefault: event.returnValue = false;
		return {
			left: mousemove.clientX - startX,
			top: mousemove.clientY - startY
		};
	}).takeUntil(mouseUp);

});

var dragBallSubscription = dragBall.subscribe(function(position) {
	$canvas.className = "";
	if (position.left < 10 || position.top > 337 || position.left > 15) {		
		
		$canvas.className = $canvas.className + 'red-border';

		counter = counter - 1;		
		life.set({"lifeCount": counter});
		$fail.innerHTML = counter;
		life.child("success").set(false);
		console.log('%c '+ ' x,y- ' + position.left + ',' + position.top + ' ' ,'color:#fff; background-color: red; font-size:1em');
		
		if (counter <= 0) {
			dragBallSubscription.dispose();
		}
	} else {
		if (counter > 0) {
			ball.style.left = position.left + 'px';
			ball.style.top = position.top + 'px';
			/*console.log('ball.style.top - ' + ball.style.top + 'position.top -' + position.top);*/
		}

		if(position.top < 90) {
			$success.className = 'success';
			life.child("success").set(true);
			dragBallSubscription.dispose();
		}
	}

});

/*


console.log('top = ' + $canvas.offsetTop +
	'\nleft = ' + $canvas.offsetLeft);

console.log('touchLine ' + $touchLine.offsetLeft + ',' + $touchLine.offsetTop);*/