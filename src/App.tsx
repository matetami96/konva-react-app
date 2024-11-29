// File: App.tsx
// Description: The main application file. Manages the state for dimensions and orchestrates the rendering of `Controls` and `Canvas` components.
import { useRef, useState } from "react";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

import "./App.css";
import { CanvasRef } from "./types/App.types";

const App = () => {
	// State to track the current dimensions of the window (width and height).
	const [dimensions, setDimensions] = useState({ width: 500, height: 1000 });
	// Ref to pass down to the Canvas component for accessing the saveCanvasAsPDF function.
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	const stageRef = useRef<CanvasRef | {}>({});
	// Function to trigger the PDF saving functionality in Canvas.
	const saveAsPDF = () => {
		console.log("Saving as PDF...");
		if (stageRef.current && (stageRef.current as CanvasRef).saveCanvasAsPDF) {
			console.log("Calling saveCanvasAsPDF...");
			(stageRef.current as CanvasRef).saveCanvasAsPDF();
		} else {
			console.error("saveCanvasAsPDF is not set on stageRef.current");
		}
	};

	return (
		<div className="App">
			{/* Controls component to adjust width, height, and trigger PDF saving */}
			<Controls
				width={dimensions.width}
				height={dimensions.height}
				setWidth={(width) => setDimensions((prev) => ({ ...prev, width }))}
				setHeight={(height) => setDimensions((prev) => ({ ...prev, height }))}
				saveAsPDF={saveAsPDF}
			/>
			{/* Canvas component to render the graphical window */}
			<Canvas width={dimensions.width} height={dimensions.height} setDimensions={setDimensions} stageRef={stageRef} />
		</div>
	);
};

export default App;
