const postData = async (url, data) => {
	let res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json()
}



export { postData };
