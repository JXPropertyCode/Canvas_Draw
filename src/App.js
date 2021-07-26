import "./App.css";
import { useRef, useEffect, useState } from "react";

function App() {
	// hold reference to our canvas element
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);

	// initalize our canvas API when our component is  mounted
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		// define 2d context to be able to draw
		const context = canvas.getContext("2d");
		context.scale(2, 2);
		context.lineCap = "round"; // round endings for lines
		context.strokeStyle = "black";
		context.lineWidth = 5;
		contextRef.current = context;
	}, []);

	// nativeEvent is derived from the
	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		contextRef.current.closePath();
		setIsDrawing(false);
	};
	const draw = ({ nativeEvent }) => {
		if (!isDrawing) {
			return;
		}
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
	};

	return (
		<canvas
			onMouseDown={startDrawing}
			onMouseUp={finishDrawing}
			onMouseMove={draw}
			ref={canvasRef}
		/>
	);
}

export default App;
