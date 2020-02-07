const loaderUtils = require('loader-utils')

function loader(source) {
	console.log('loader3')
	return source
}

loader.pitch = (rr) => {
	console.log('pitch loader3')
	const req = loaderUtils.stringifyRequest(this, rr)
	console.log(req)
	let str = `
		require(${req})
	`
	return str
}

module.exports = loader
