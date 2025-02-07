// // File: Canvas.tsx
// // Description: Manages the graphical canvas using React-Konva. Handles scaling, PDF generation, and inline input for dimensions.
// import jsPDF from "jspdf";
// import Konva from "konva";
// import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
// import { Stage, Layer, Group } from "react-konva";

// import Frame from "./Frame";
// import { CanvasProps, CanvasRef, Editing } from "../types/App.types";

// const Canvas = ({ width, height, setDimensions, stageRef }: CanvasProps) => {
// 	// State to track the canvas scale for responsiveness
// 	const [scale, setScale] = useState(1);
// 	// State to track the size of the canvas viewport
// 	const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
// 	// State to track the inline editing mode for width/height labels
// 	const [editing, setEditing] = useState<Editing | null>(null);
// 	const inputRef = useRef<HTMLInputElement>(null); // Ref for the inline input field
// 	const canvasRef = useRef<Konva.Stage>(null); // Ref for the Konva Stage instance

// 	// Effect to handle window resizing and dynamically adjust canvas scaling
// 	useEffect(() => {
// 		const handleResize = () => {
// 			const viewportWidth = window.innerWidth;
// 			const viewportHeight = window.innerHeight;
// 			const maxWidth = viewportWidth * 0.8;
// 			const maxHeight = viewportHeight * 0.8;
// 			// Determine the scaling factor
// 			const newScale = Math.min(maxWidth / width, maxHeight / height);
// 			setScale(newScale);
// 			setCanvasSize({ width: viewportWidth, height: viewportHeight });
// 		};
// 		// Adjust scaling on initial load
// 		handleResize();
// 		// Listen for window resize events
// 		window.addEventListener("resize", handleResize);

// 		return () => window.removeEventListener("resize", handleResize);
// 	}, [width, height]); // Recalculate scaling when dimensions change

// 	// Effect to attach the saveCanvasAsPDF function to the stageRef
// 	useEffect(() => {
// 		if (stageRef.current && canvasRef.current) {
// 			console.log("Attaching saveCanvasAsPDF to stageRef.current...");
// 			(stageRef.current as CanvasRef).saveCanvasAsPDF = saveCanvasAsPDF; // Assign the function
// 		} else {
// 			console.error("stageRef.current is null or canvasRef.current is null");
// 		}
// 	}, [stageRef]);

// 	// Function to save the canvas as a PDF
// 	const saveCanvasAsPDF = () => {
// 		console.log("saveCanvasAsPDF called");
// 		const stage = canvasRef.current;
// 		if (stage) {
// 			const pdf = new jsPDF("l", "px", [stage.width(), stage.height()]);
// 			const imageData = stage.toDataURL({ pixelRatio: 2 });
// 			pdf.addImage(imageData, "PNG", 0, 0, stage.width(), stage.height());
// 			pdf.save("canvas.pdf");
// 		} else {
// 			console.error("Konva Stage is not accessible");
// 		}
// 	};

// 	// Handle click on a label to open an inline input field
// 	const handleLabelClick = (type: "width" | "height", x: number, y: number) => {
// 		setEditing({
// 			type,
// 			x,
// 			y,
// 			value: type === "width" ? width : height,
// 		});
// 		setTimeout(() => {
// 			inputRef.current?.focus();
// 		}, 0);
// 	};

// 	// Update state when the inline input value changes
// 	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		const value = parseInt(e.target.value, 10) || 0;
// 		setEditing((prev) => prev && { ...prev, value });
// 	};

// 	// Commit the updated value when input loses focus or "Enter" is pressed
// 	const handleInputBlur = () => {
// 		if (editing) {
// 			setDimensions({
// 				...{ width, height },
// 				[editing.type]: editing.value,
// 			});
// 		}
// 		setEditing(null);
// 	};

// 	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
// 		if (e.key === "Enter") {
// 			handleInputBlur();
// 		}
// 	};

// 	return (
// 		<div style={{ position: "relative" }}>
// 			{/* Konva Stage to render the graphical content */}
// 			<Stage
// 				width={canvasSize.width}
// 				height={canvasSize.height}
// 				scaleX={scale}
// 				scaleY={scale}
// 				ref={canvasRef} // Attach the stage ref
// 			>
// 				<Layer>
// 					{/* Center the frame */}
// 					<Group x={canvasSize.width / 2 / scale - width / 2} y={canvasSize.height / 2 / scale - height / 2}>
// 						<Frame width={width} height={height} onLabelClick={handleLabelClick} />
// 					</Group>
// 				</Layer>
// 			</Stage>

// 			{/* Inline input for editing dimensions */}
// 			{editing && (
// 				<input
// 					ref={inputRef}
// 					type="number"
// 					value={editing.value}
// 					onChange={handleInputChange}
// 					onBlur={handleInputBlur}
// 					onKeyDown={handleKeyDown}
// 					style={{
// 						position: "absolute",
// 						top: editing.y,
// 						left: editing.x,
// 						width: "60px",
// 						fontSize: "16px",
// 						textAlign: "center",
// 						zIndex: 1000,
// 					}}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default Canvas;
