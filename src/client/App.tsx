import React, { useState, useEffect } from 'react';
import { socket } from './helpers/socket';


const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');

	useEffect(() => {
		// (async () => {
		// 	try {
				console.log('socket: ', socket, socket.connected);
				socket.emit('getInitialState', (msg) =>console.log(msg))
				socket.on('response', (msg) => console.log(msg))
				socket.on('poloUpdate', (msg) => console.log('poloUpdate:', msg))
				socket.on('bittrexUpdate', (msg) => console.log('bittrexUpdate:', msg))
				socket.on('full order book', (msg) => console.log('full order book:', msg))

				// const res = await fetch('/api/sup');
				// const greeting = await res.json();
				// setGreeting(greeting);
			// } catch (error) {
			// 	console.log(error);
			// }
		// })();
	});

	return (
		<div className="min-vh-100 d-flex justify-content-center align-items-center">
			<h1 className="display-1">Sup {greeting}!</h1>
		</div>
	);
};

interface AppProps {}

export default App;
