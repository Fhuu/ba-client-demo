async function checkAuth () {
	console.log('called');
	let authorization = await fetch('/v1/user', {method: 'GET'});
	switch(authorization.status) {
		case 401 : 
			if(window.location.pathname !== '/login' || window.location.pathname !== '/' || window.location.pathname !== '/signup') window.location.replace('/');
			break;

		case 200 : 
			return (await authorization.json()).user;
		
	}
}

export default checkAuth;