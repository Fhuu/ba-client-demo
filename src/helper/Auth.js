async function checkAuth () {
	let authorization = await fetch('/v1/user/authr', {method: 'GET'});
	console.log(authorization.status);
	let data = await authorization.json();
	console.log(data.data);
	if(authorization.status === 401) window.location.replace('/login');
}

module.exports = {
	checkAuth
};