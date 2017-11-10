const crossSpawn = require('cross-spawn');

function exit(result) {
  const tooEarly = 'The build failed because the process exited too early.';
	switch (result.signal) {
		case 'SIGKILL': console.error([
			tooEarly,
			'This probably means the system ran out of memory or someone called',
			'"kill -9" on the process.',
		].join(' ')); return process.exit(1);
		case 'SIGTERM': console.error([
			tooEarly,
			'Someone might have called `kill` or `killall`, or the system could',
			'be shutting down.',
		].join(' ')); return process.exit(1);
		default: return process.exit(result.status);
	}
}

function spawn(cmd, args, options) {
	return exit(crossSpawn(cmd, args, Object.assign({ stdio: 'inherit' }, options)));
}

spawn.sync = (cmd, args, options) => {
  return exit(crossSpawn.sync(cmd, args, Object.assign({ stdio: 'inherit' }, options)));
};

module.exports = spawn;
