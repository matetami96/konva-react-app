// File: Controls.tsx
// Description: This component provides user controls to adjust the width and height of the window and save the canvas as a PDF.
import { ControlsProps } from "../types/App.types";

const Controls = ({ width, height, setWidth, setHeight, saveAsPDF }: ControlsProps) => {
	return (
		<div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
			{/* Input field for adjusting width */}
			<div style={{ marginBottom: 10 }}>
				<label>
					Width:
					<input
						type="number"
						value={width}
						onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
						style={{ marginLeft: 10 }}
					/>
				</label>
			</div>
			{/* Input field for adjusting height */}
			<div>
				<label>
					Height:
					<input
						type="number"
						value={height}
						onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
						style={{ marginLeft: 5, marginBottom: 10 }}
					/>
				</label>
			</div>
			{/* Button to save the canvas as a PDF */}
			<button
				onClick={saveAsPDF}
				style={{
					padding: "5px 10px",
					backgroundColor: "#007BFF",
					color: "white",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Save as PDF
			</button>
		</div>
	);
};

export default Controls;
