
	// Expose `Proto` identifier, even
	// in AMD and CommonJS for browser emulators.
	if(!nodeEnv){
		window.Proto = Proto;
	}

	return Proto;
}));