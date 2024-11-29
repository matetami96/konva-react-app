import jsPDF from "jspdf";
import Konva from "konva";
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Stage, Layer, Group } from "react-konva";

import Frame from "./Frame";
import { CanvasProps, CanvasRef, Editing } from "../types/App.types";

const Canvas = ({ width, height, setDimensions, stageRef }: CanvasProps) => {
	const [scale, setScale] = useState(1);
	const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
	const [editing, setEditing] = useState<Editing | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const canvasRef = useRef<Konva.Stage>(null);

	useEffect(() => {
		const handleResize = () => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const maxWidth = viewportWidth * 0.8;
			const maxHeight = viewportHeight * 0.8;
			const newScale = Math.min(maxWidth / width, maxHeight / height);
			setScale(newScale);
			setCanvasSize({ width: viewportWidth, height: viewportHeight });
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [width, height]);

	useEffect(() => {
		if (stageRef.current && canvasRef.current) {
			console.log("Attaching saveCanvasAsPDF to stageRef.current...");
			(stageRef.current as CanvasRef).saveCanvasAsPDF = saveCanvasAsPDF; // Assign the function
		} else {
			console.error("stageRef.current is null or canvasRef.current is null");
		}
	}, [stageRef]);

	const saveCanvasAsPDF = () => {
		console.log("saveCanvasAsPDF called");
		const stage = canvasRef.current;
		if (stage) {
			const pdf = new jsPDF("l", "px", [stage.width(), stage.height()]);
			const imageData = stage.toDataURL({ pixelRatio: 2 });
			pdf.addImage(imageData, "PNG", 0, 0, stage.width(), stage.height());
			pdf.save("canvas.pdf");
		} else {
			console.error("Konva Stage is not accessible");
		}
	};

	const handleLabelClick = (type: "width" | "height", x: number, y: number) => {
		setEditing({
			type,
			x,
			y,
			value: type === "width" ? width : height,
		});
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10) || 0;
		setEditing((prev) => prev && { ...prev, value });
	};

	const handleInputBlur = () => {
		if (editing) {
			setDimensions({
				...{ width, height },
				[editing.type]: editing.value,
			});
		}
		setEditing(null);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleInputBlur();
		}
	};

	return (
		<div style={{ position: "relative" }}>
			<Stage
				width={canvasSize.width}
				height={canvasSize.height}
				scaleX={scale}
				scaleY={scale}
				ref={canvasRef} // Attach the stage ref
			>
				<Layer>
					<Group x={canvasSize.width / 2 / scale - width / 2} y={canvasSize.height / 2 / scale - height / 2}>
						<Frame width={width} height={height} onLabelClick={handleLabelClick} />
					</Group>
				</Layer>
			</Stage>

			{editing && (
				<input
					ref={inputRef}
					type="number"
					value={editing.value}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					style={{
						position: "absolute",
						top: editing.y,
						left: editing.x,
						width: "60px",
						fontSize: "16px",
						textAlign: "center",
						zIndex: 1000,
					}}
				/>
			)}
		</div>
	);
};

export default Canvas;
