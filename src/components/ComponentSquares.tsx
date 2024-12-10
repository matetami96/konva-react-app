import { useCallback } from "react";
import { Stage, Layer, Label, Tag, Text, Group, Rect } from "react-konva";

interface ComponentModel {
	id: number;
	code: string;
	name: string;
	quantity: number;
	um?: string;
	price?: unknown;
	model_details?: {
		quantity: number;
		color: string;
	};
	subcomponents?: ComponentModel[];
}

interface Components {
	[key: string]: ComponentModel[];
}

interface Data {
	wizard_key: string;
	length_net: number;
	length_brut: number;
	components: Components;
}

const ComponentSquares = ({ data }: { data: Data }) => {
	const squareSize = 125; // Size of each square
	const padding = 10; // Space between squares
	const canvasWidth = window.innerWidth; // Canvas width for wrapping logic

	// Function to generate Konva components dynamically
	const generateComponents = useCallback(() => {
		let currentX = 50; // X position for the next square
		let currentY = 50; // Y position for the next row
		const squares: JSX.Element[] = []; // Array to hold all rendered components

		// Helper function to add squares
		const addSquare = (name: string) => {
			// Wrap to the next row if the current square exceeds canvas width
			if (currentX + squareSize + padding > canvasWidth) {
				currentX = 50; // Reset X to the start
				currentY += squareSize + padding; // Move to the next row
			}

			squares.push(
				<Group key={`${currentX}-${currentY}`} x={currentX} y={currentY}>
					<Rect width={squareSize} height={squareSize} fill="lightgrey" stroke="black" strokeWidth={1} />
					<Label x={squareSize / 2} y={squareSize / 2} offsetX={squareSize / 2} offsetY={10}>
						<Tag fill="white" stroke="black" cornerRadius={5} />
						<Text
							text={name}
							fontSize={12}
							fill="black"
							align="center"
							verticalAlign="middle"
							width={squareSize}
							padding={5}
							wrap="char"
						/>
					</Label>
				</Group>
			);

			currentX += squareSize + padding; // Move to the next square position
		};

		// Process components
		Object.keys(data.components).forEach((key) => {
			const components = data.components[key];

			components.forEach((component) => {
				// Handle `id_component_core` separately
				if (key === "id_component_core") {
					// Special case: Render based on lengths (e.g., 50m, 100m, 50m)
					const lengths = [50, 100, 50]; // Hardcoded for now
					lengths.forEach((length) => {
						addSquare(`${component.name} (${length}m)`);
					});
				} else if (component.subcomponents) {
					// If the component has subcomponents, render them based on `model_details.quantity`
					component.subcomponents.forEach((sub) => {
						for (let i = 0; i < sub.model_details!.quantity; i++) {
							addSquare(sub.name);
						}
					});
				} else {
					// If no subcomponents, use `model_details.quantity` for rendering
					for (let i = 0; i < component.model_details!.quantity; i++) {
						addSquare(component.name);
					}
				}
			});
		});

		return squares;
	}, [data, canvasWidth]);

	return (
		<Stage width={canvasWidth} height={window.innerHeight}>
			<Layer>{generateComponents()}</Layer>
		</Stage>
	);
};

export default ComponentSquares;
