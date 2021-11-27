module.exports = {
	initiate : () => {
		let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {
			console.log(`database opened`);
		}

		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error.target.errorCode}`)
		}

		IDBOpenRequest.onupgradeneeded = function(event) {
			let db = event.target.result;
			
			if (db.objectStoreNames.index('Notes') === -1) 
				db.createObjectStore('Notes', {keyPath : 'id'});

		}
	},

	addOrUpdate : (storeName, data, messageholder) => {
		let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {			
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
		
		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error}`)
		};
		
	},

	get : (storeName, id, messageholder, callback) => {
		let IDBOpenRequest = window.indexedDB.open('ba');

		IDBOpenRequest.onsuccess = function(event) {
			
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
		}
		
		IDBOpenRequest.onerror = function(error) {
			console.log(`error ${error}`)
		};
	}
}