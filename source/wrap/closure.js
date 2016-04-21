

//|-----------------------------------------------------------------------------
//| Expose `Proto` identifier, even in AMD and CommonJS for browser emulators.
//'-----------------------------------------------------------------------------

	if(!nodeEnv){
		window.Proto = Proto;
	}


//|-----------------------------------------------------------------------------
//| Expose `Proto` identifier, even in query plugins.
//'-----------------------------------------------------------------------------

	if($ && $.fn === Object($.fn)){
		$.fn.Proto = Proto;
	}

	return Proto;
}));
