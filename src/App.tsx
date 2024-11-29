import { useRef, useState } from "react";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

import "./App.css";
import { CanvasRef } from "./types/App.types";

const App = () => {
	const [dimensions, setDimensions] = useState({ width: 500, height: 1000 });
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	const stageRef = useRef<CanvasRef | {}>({});

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
			<Controls
				width={dimensions.width}
				height={dimensions.height}
				setWidth={(width) => setDimensions((prev) => ({ ...prev, width }))}
				setHeight={(height) => setDimensions((prev) => ({ ...prev, height }))}
				saveAsPDF={saveAsPDF}
			/>
			<Canvas width={dimensions.width} height={dimensions.height} setDimensions={setDimensions} stageRef={stageRef} />
		</div>
	);
};

export default App;
