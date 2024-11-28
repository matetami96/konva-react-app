import { useState } from "react";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

import "./App.css";

const App = () => {
	const [dimensions, setDimensions] = useState({ width: 500, height: 1000 });

	return (
		<div className="App">
			<Controls
				width={dimensions.width}
				height={dimensions.height}
				setWidth={(width) => setDimensions((prev) => ({ ...prev, width }))}
				setHeight={(height) => setDimensions((prev) => ({ ...prev, height }))}
			/>
			<Canvas width={dimensions.width} height={dimensions.height} setDimensions={setDimensions} />
		</div>
	);
};

export default App;
