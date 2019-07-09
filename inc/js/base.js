// export var myButton = $('#my-button');
// export var myDesc = $('#my-desc');
module.exports = function $base() {
	//js測試
	console.log('234234234');

	//jq測試
	$('#my-button').click(function(){
		$(this).fadeOut();
	})

	//function測試
	this.hi=function(){
		console.log('hihiihihihihihihi');
	}
}