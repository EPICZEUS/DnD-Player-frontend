const ws = new WebSocket("ws://localhost:3000/api/v1/cable");

ws.onopen = () => ws.send(JSON.stringify({
	command: "subscribe",
	identifier: JSON.stringify({ channel: "AppChannel" })
}));

ws.onerror = console.error;

export default ws;