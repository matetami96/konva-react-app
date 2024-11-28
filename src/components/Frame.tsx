import { Rect, Line, Group, Label, Tag, Text, Shape } from "react-konva";

const Frame = ({
	width,
	height,
	onLabelClick,
}: {
	width: number;
	height: number;
	onLabelClick: (type: "width" | "height", x: number, y: number) => void;
}) => {
	const padding = 70; // Padding inside the frame
	// Dynamic offsets based on dimensions
	const helperLineOffset = Math.max(width, height) * 0.03; // Helper lines extend by 5% of the larger dimension
	const arrowOffset = Math.max(width, height) * 0.02; // Arrow offset for spacing
	const arrowHeadSize = Math.max(width, height) * 0.01; // Arrowhead size proportional to dimensions

	return (
		<Group>
			{/* Glass */}
			<Rect x={padding} y={padding} width={width - 2 * padding} height={height - 2 * padding} fill="lightblue" />
			{/* Borders */}
			<Line
				points={[0, 0, width, 0, width - padding, padding, padding, padding]}
				closed
				fill="white"
				stroke="black"
				strokeWidth={1}
			/>
			<Line
				points={[0, 0, padding, padding, padding, height - padding, 0, height]}
				closed
				fill="white"
				stroke="black"
				strokeWidth={1}
			/>
			<Line
				points={[0, height, padding, height - padding, width - padding, height - padding, width, height]}
				closed
				fill="white"
				stroke="black"
				strokeWidth={1}
			/>
			<Line
				points={[width, 0, width, height, width - padding, height - padding, width - padding, padding]}
				closed
				fill="white"
				stroke="black"
				strokeWidth={1}
			/>

			{/* Vertical Arrow with Helper Lines */}
			<Shape
				sceneFunc={(ctx, shape) => {
					// Left helper lines
					ctx.beginPath();
					ctx.moveTo(-arrowOffset - helperLineOffset, 0); // Top helper line
					ctx.lineTo(0, 0);
					ctx.moveTo(-arrowOffset - helperLineOffset, height); // Bottom helper line
					ctx.lineTo(0, height);
					ctx.stroke();

					// Main vertical arrow line
					ctx.moveTo(-arrowOffset / 2 - helperLineOffset / 2, 0);
					ctx.lineTo(-arrowOffset / 2 - helperLineOffset / 2, height);
					ctx.stroke();

					// Arrowhead (top)
					ctx.moveTo(-arrowOffset / 2 - arrowHeadSize - helperLineOffset / 2, arrowHeadSize);
					ctx.lineTo(-arrowOffset / 2 - helperLineOffset / 2, 0);
					ctx.lineTo(-arrowOffset / 2 + arrowHeadSize - helperLineOffset / 2, arrowHeadSize);
					ctx.fill();

					// Arrowhead (bottom)
					ctx.moveTo(-arrowOffset / 2 - arrowHeadSize - helperLineOffset / 2, height - arrowHeadSize);
					ctx.lineTo(-arrowOffset / 2 - helperLineOffset / 2, height);
					ctx.lineTo(-arrowOffset / 2 + arrowHeadSize - helperLineOffset / 2, height - arrowHeadSize);
					ctx.fill();

					ctx.closePath();
					ctx.strokeShape(shape);
				}}
				stroke="black"
				fill="black"
				strokeWidth={1}
			/>

			{/* Horizontal Arrow with Helper Lines */}
			<Shape
				sceneFunc={(ctx, shape) => {
					// Bottom helper lines
					ctx.beginPath();
					ctx.moveTo(0, height + arrowOffset + helperLineOffset); // Left helper line
					ctx.lineTo(0, height);
					ctx.moveTo(width, height + arrowOffset + helperLineOffset); // Right helper line
					ctx.lineTo(width, height);
					ctx.stroke();

					// Main horizontal arrow line
					ctx.moveTo(0, height + arrowOffset / 2 + helperLineOffset / 2);
					ctx.lineTo(width, height + arrowOffset / 2 + helperLineOffset / 2);
					ctx.stroke();

					// Arrowhead (left)
					ctx.moveTo(arrowHeadSize, height + arrowOffset / 2 - arrowHeadSize + helperLineOffset / 2);
					ctx.lineTo(0, height + arrowOffset / 2 + helperLineOffset / 2);
					ctx.lineTo(arrowHeadSize, height + arrowOffset / 2 + arrowHeadSize + helperLineOffset / 2);
					ctx.fill();

					// Arrowhead (right)
					ctx.moveTo(width - arrowHeadSize, height + arrowOffset / 2 - arrowHeadSize + helperLineOffset / 2);
					ctx.lineTo(width, height + arrowOffset / 2 + helperLineOffset / 2);
					ctx.lineTo(width - arrowHeadSize, height + arrowOffset / 2 + arrowHeadSize + helperLineOffset / 2);
					ctx.fill();

					ctx.closePath();
					ctx.strokeShape(shape);
				}}
				stroke="black"
				fill="black"
				strokeWidth={1}
			/>

			{/* Labels */}
			<Label
				x={-90}
				y={height / 2 - 10}
				onClick={(e) => onLabelClick("height", e.target.getAbsolutePosition().x, e.target.getAbsolutePosition().y)}
			>
				<Tag fill="white" stroke="grey" />
				<Text text={`${height}mm`} padding={5} fill="black" />
			</Label>
			<Label
				x={width / 2 - 20}
				y={height + 20}
				onClick={(e) => onLabelClick("width", e.target.getAbsolutePosition().x, e.target.getAbsolutePosition().y)}
			>
				<Tag fill="white" stroke="grey" />
				<Text text={`${width}mm`} padding={5} fill="black" />
			</Label>
		</Group>
	);
};

export default Frame;