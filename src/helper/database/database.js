module.exports = {
	initiate : () => {
		let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {
			console.log(`database opened`);
			console.log(event.target.result.objectStoreNames);

			let version2 = window.indexedDB.open('ba', parseInt(event.target.result.version) + 1);

			version2.onsuccess = function (event) {
				console.log('opened version 2');
			}

			version2.onerror = function (error) {
				console.log('error version 2', error);
			}
			version2.onupgradeneeded = function(event) {
				let db = event.target.result;
				
				if (!db.objectStoreNames.contains('Notes')) 
					db.createObjectStore('Notes' , {keyPath : 'id'});

			}
			// console.log(event.target, typeof event.target.result.objectStoreNames);
		}

		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error.target.errorCode}`)
		}
	},

	addOrUpdate : (storeName, data, messageholder) => {
		let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {	
			try {
				let transaction = event.target.result.transaction(storeName, 'readwrite');
	
				let store = transaction.objectStore(storeName);
	
				let request = store.put(data);
	
				request.onsuccess = function(event) {
					messageholder.innerHTML = '<span>Data added to the database</span>';
				}
	
				request.onerror = function(error) {
					messageholder.innerHTML = '<span>Error when adding data to database</span>';
				}
			}	
			catch (error) {
				createObjectStore(storeName);
			}
		}
		
		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error}`)
		};
		
	},

	get : (storeName, id, messageholder, callback) => {
		let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {
			
			try {
				let transaction = event.target.result.transaction(storeName, 'readonly');
	
				let store = transaction.objectStore(storeName);
	
				let request = store.get(id);
	
				request.onsuccess = function(event) {
					callback(request.result);
					if(request.result)
						messageholder.innerHTML = '<span>Data fetched from the database</span>';
					else 
						messageholder.innerHTML = '<span>New Note created</span>'
				}
	
				request.onerror = function(error) {
					messageholder.innerHTML = '<span>Error when fetching data to database</span>';
				}
			} catch (error) {
				createObjectStore(storeName);
			}

		}
		
		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error}`)
		};
	}
}

var createObjectStore = (storeName) => {
	let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {
			console.log(`database opened`);
			console.log(event.target.result.objectStoreNames);

			let version2 = window.indexedDB.open('ba', parseInt(event.target.result.version) + 1);

			version2.onsuccess = function (event) {
				console.log('opened version 2');
			}

			version2.onerror = function (error) {
				console.log('error version 2', error);
			}
			version2.onupgradeneeded = function(event) {
				let db = event.target.result;
				
				if (!db.objectStoreNames.contains(storeName)) 
					db.createObjectStore(storeName , {keyPath : 'id'});

				window.location.reload();

			}
			// console.log(event.target, typeof event.target.result.objectStoreNames);
		}

		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error.target.errorCode}`)
		}
}