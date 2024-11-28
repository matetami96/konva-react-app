import { useState, useEffect, useRef, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent } from "react";
import { Stage, Layer, Group } from "react-konva";

import Frame from "./Frame";

const Canvas = ({
	width,
	height,
	setDimensions,
}: {
	width: number;
	height: number;
	setDimensions: Dispatch<SetStateAction<{ width: number; height: number }>>;
}) => {
	const [scale, setScale] = useState(1); // Scale for responsiveness
	const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
	const [editing, setEditing] = useState<{
		type: "width" | "height";
		x: number;
		y: number;
		value: number;
	} | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Update canvas size and scale dynamically
	useEffect(() => {
		const handleResize = () => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			// Calculate scale based on viewport size
			const maxWidth = viewportWidth * 0.8; // 80% of the viewport
			const maxHeight = viewportHeight * 0.8; // 80% of the viewport
			const newScale = Math.min(maxWidth / width, maxHeight / height); // Use the smaller scale

			setScale(newScale);
			setCanvasSize({ width: viewportWidth, height: viewportHeight });
		};

		handleResize(); // Initial call to set up dimensions
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [width, height]); // Only re-run when frame dimensions change

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
			<Stage width={canvasSize.width} height={canvasSize.height} scaleX={scale} scaleY={scale}>
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
