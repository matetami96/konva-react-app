import React from "react";
import { Stage, Layer, Rect, Line, Arrow, Label, Tag, Text, Circle, Arc } from "react-konva";

import { CompsByStep } from "../types/App.types";

type LadderDrawingProps = {
	data: CompsByStep;
};

const LadderDrawing = ({ data }: LadderDrawingProps) => {
	const canvasWidth = window.innerWidth;
	const canvasHeight = window.innerHeight;
	const ladderWidth = 50; // Width of the ladder (front view)
	const sideLadderWidth = 20; // Width of the ladder (side view)
	const segmentHeight = 280; // Height of each segment
	const rungSpacing = 40; // Space between rungs
	const coreComponent = data.components.id_component_core[0];
	const terminalBComponent = data.components.id_component_terminal_b[0];
	const cageComponent = data.components.system_accessory_optional[0];
	// Create ladder segments
	const ladderSegments = Array(coreComponent.quantity).fill(coreComponent);
	// Calculate ladder height
	const totalLadderHeight = ladderSegments.length * segmentHeight;
	// Center the ladder in the canvas (front view)
	// Offset for centering front view
	const ladderX = canvasWidth / 2 - 300;
	const ladderY = canvasHeight / 2 - totalLadderHeight / 2;
	// Side view ladder placement
	// Offset to the right of the front view
	const sideLadderX = ladderX + 600;

	const DrawFrontViewLadder = () => {
		// Draw Front View Ladder
		return ladderSegments.map((_, index) => {
			const segmentY = ladderY + index * segmentHeight;

			// Generate rungs for the segment
			const rungs = [];
			for (let i = 0; i < segmentHeight / rungSpacing; i++) {
				// Remove the topmost rung from the first segment
				if (index === 0 && i === 0) continue;

				// Remove the bottom-most rung from the last segment
				// if (index === ladderSegments.length - 1 && i === segmentHeight / rungSpacing - 1) continue;

				rungs.push(
					<Line
						key={`rung-${index}-${i}`}
						points={[
							ladderX + 10, // Start x
							segmentY + i * rungSpacing, // Start y
							ladderX + ladderWidth * 2, // End x
							segmentY + i * rungSpacing, // End y
						]}
						stroke="black"
						strokeWidth={2}
					/>
				);
			}

			return (
				<React.Fragment key={`segment-${index}`}>
					{/* Vertical sides of the ladder */}
					<Rect
						x={ladderX}
						y={segmentY}
						width={10} // Width of one vertical side
						height={segmentHeight}
						fill="grey"
						stroke="grey"
						strokeWidth={1}
					/>
					<Rect
						x={ladderX + ladderWidth * 2} // Right vertical side
						y={segmentY}
						width={15}
						height={segmentHeight}
						fill="grey"
						stroke="grey"
						strokeWidth={1}
					/>
					{/* Rungs */}
					{rungs}
				</React.Fragment>
			);
		});
	};

	const DrawFrontViewPlasticSockets = () => {
		return (
			<>
				<Rect x={ladderX} y={ladderY - 3} width={10} height={3} fill="black" stroke="black" strokeWidth={1} />
				<Rect x={ladderX + 2.5} y={ladderY - 5} width={5} height={2} fill="black" stroke="black" strokeWidth={1} />
				<Rect
					x={ladderX + ladderWidth * 2}
					y={ladderY - 3}
					width={15}
					height={3}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
				<Rect
					x={ladderX + ladderWidth * 2.08}
					y={ladderY - 5}
					width={7.5}
					height={3}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
				<Rect
					x={ladderX}
					y={ladderY + totalLadderHeight}
					width={10}
					height={3}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
				<Rect
					x={ladderX + 2.5}
					y={ladderY + totalLadderHeight + 3}
					width={5}
					height={2}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
				<Rect
					x={ladderX + ladderWidth * 2}
					y={ladderY + totalLadderHeight}
					width={15}
					height={3}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
				<Rect
					x={ladderX + ladderWidth * 2.08}
					y={ladderY + totalLadderHeight + 2}
					width={7.5}
					height={3}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
			</>
		);
	};

	const DrawFrontViewEndstops = () => {
		return (
			<>
				<Label x={ladderX + ladderWidth + 100} y={ladderY}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text
						text={terminalBComponent.name}
						fontSize={12}
						fill="black"
						align="center"
						verticalAlign="middle"
						width={80}
						padding={5}
						wrap="char"
					/>
				</Label>
				<Arrow
					points={[ladderX + ladderWidth + 100, ladderY + 20, ladderX + ladderWidth + 100 - 50, ladderY + 20]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Label x={ladderX + ladderWidth + 100} y={ladderY + 675}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text
						text={terminalBComponent.name}
						fontSize={12}
						fill="black"
						align="center"
						verticalAlign="middle"
						width={80}
						padding={5}
						wrap="char"
					/>
				</Label>
				<Arrow
					points={[ladderX + ladderWidth + 100, ladderY + 700, ladderX + ladderWidth + 100 - 50, ladderY + 700]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
			</>
		);
	};

	const DrawFrontViewFixations = () => {
		// Fixation rectangles
		const fixationWidth = 20; // Width of fixation rectangles
		const fixationHeight = 10; // Height of fixation rectangles
		const fixationOffsets = [250, totalLadderHeight - 250]; // Y offsets for fixations
		return fixationOffsets.map((offsetY, index) => (
			<React.Fragment key={`fixation-${index}`}>
				{/* Left side fixation */}
				<Rect
					x={ladderX - 20} // To the left of the ladder
					y={ladderY + offsetY - fixationHeight / 2}
					width={fixationWidth}
					height={fixationHeight}
					fill="grey"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Line
					points={[ladderX - 5, ladderY + offsetY, ladderX - 15, ladderY + offsetY]}
					stroke="white"
					strokeWidth={1}
				/>
				{/* Right side fixation */}
				<Rect
					x={ladderX + ladderWidth + 66} // To the right of the ladder
					y={ladderY + offsetY - fixationHeight / 2}
					width={fixationWidth}
					height={fixationHeight}
					fill="grey"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Line
					points={[ladderX + 120, ladderY + offsetY, ladderX + 130, ladderY + offsetY]}
					stroke="white"
					strokeWidth={1}
				/>
			</React.Fragment>
		));
	};

	const DrawFrontViewGlider = () => {
		return (
			<>
				<Rect
					x={ladderX + ladderWidth + 45}
					y={ladderY + totalLadderHeight - 330}
					width={25}
					height={15}
					fill="black"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Rect
					x={ladderX + ladderWidth + 55}
					y={ladderY + totalLadderHeight - 315}
					width={5}
					height={25}
					fill="black"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
			</>
		);
	};

	const DrawFrontViewBottomSection = () => {
		return (
			<Rect
				x={ladderX + ladderWidth + 50}
				y={ladderY + totalLadderHeight - 90}
				width={15}
				height={30}
				fill="lightgrey"
				stroke="lightgrey"
				strokeWidth={1}
				cornerRadius={2}
			/>
		);
	};

	const DrawLadderCage = () => {
		return (
			<>
				{/* Left Cage */}
				<Label x={ladderX + ladderWidth + 260} y={ladderY + 380}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text text={`${cageComponent.quantity}${cageComponent.um}`} fontSize={12} padding={5} fill="black" />
				</Label>
				<Arrow
					points={[
						ladderX + ladderWidth + 300,
						ladderY + 50,
						ladderX + ladderWidth + 300,
						ladderY + totalLadderHeight - 40,
					]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Arrow
					points={[
						ladderX + ladderWidth + 300,
						ladderY + totalLadderHeight - 40,
						ladderX + ladderWidth + 300,
						ladderY + 50,
					]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Label x={ladderX + ladderWidth + 270} y={ladderY + 300}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text
						text={cageComponent.name}
						fontSize={12}
						fill="black"
						align="center"
						verticalAlign="middle"
						width={60}
						padding={5}
						wrap="char"
					/>
				</Label>
				<Arrow
					points={[ladderX + ladderWidth + 270, ladderY + 320, ladderX + ladderWidth + 120, ladderY + 320]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				{/* Right Cage */}
				<Label x={sideLadderX + 130} y={ladderY + 380}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text text={`${cageComponent.quantity}${cageComponent.um}`} fontSize={12} padding={5} fill="black" />
				</Label>
				<Arrow
					points={[sideLadderX + 170, ladderY + 50, sideLadderX + 170, ladderY + totalLadderHeight - 40]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Arrow
					points={[sideLadderX + 170, ladderY + totalLadderHeight - 40, sideLadderX + 170, ladderY + 50]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Label x={sideLadderX + 140} y={ladderY + 300}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text
						text={cageComponent.name}
						fontSize={12}
						fill="black"
						align="center"
						verticalAlign="middle"
						width={60}
						padding={5}
						wrap="char"
					/>
				</Label>
				<Arrow
					points={[sideLadderX + 140, ladderY + 320, sideLadderX + 90, ladderY + 320]}
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
			</>
		);
	};

	const DrawFrontViewHelperLinesArrowsAndLabel = () => {
		return (
			<>
				{/* Helper Lines for Front View */}
				<Line
					points={[ladderX, ladderY, ladderX - 60, ladderY]} // Top helper line
					stroke="black"
					strokeWidth={1}
				/>
				<Line
					points={[ladderX, ladderY + totalLadderHeight, ladderX - 60, ladderY + totalLadderHeight]} // Bottom helper line
					stroke="black"
					strokeWidth={1}
				/>
				{/* Arrows between Helper Lines */}
				<Arrow
					points={[ladderX - 30, ladderY, ladderX - 30, ladderY + totalLadderHeight - 1]} // Upward arrow
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Arrow
					points={[ladderX - 30, ladderY + totalLadderHeight, ladderX - 30, ladderY + 1]} // Downward arrow
					stroke="black"
					fill="black"
					pointerLength={10}
					pointerWidth={10}
					strokeWidth={1.5}
				/>
				<Label x={ladderX - 80} y={ladderY + totalLadderHeight / 2 - 10}>
					<Tag fill="lightgrey" stroke="black" cornerRadius={5} />
					<Text text={`${data.length_net}m`} fontSize={12} padding={5} fill="black" />
				</Label>
			</>
		);
	};

	const DrawSideViewLadder = () => {
		// Generate side view ladder
		const sideViewRungs = [];
		for (let i = 0; i < totalLadderHeight / rungSpacing; i++) {
			// Skip the topmost rung
			if (i === 0) continue;

			// Skip the bottom-most rung
			// if (i === totalLadderHeight / rungSpacing - 1) continue;

			sideViewRungs.push(
				<Circle
					key={`side-rung-${i}`}
					x={sideLadderX + sideLadderWidth / 2} // Center of the side rectangle
					y={ladderY + i * rungSpacing} // Y position of the rung
					radius={3} // Dot size
					fill="white"
				/>
			);
		}

		return (
			<>
				<Rect
					x={sideLadderX}
					y={ladderY}
					width={sideLadderWidth}
					height={totalLadderHeight}
					fill="grey"
					stroke="grey"
					strokeWidth={1}
				/>
				{sideViewRungs}
			</>
		);
	};

	const DrawSideViewPlasticSockets = () => {
		return (
			<>
				<Rect x={sideLadderX} y={ladderY - 4} width={20} height={3} fill="black" stroke="black" strokeWidth={1} />
				<Arc
					x={sideLadderX + 8}
					y={ladderY - 2}
					innerRadius={0}
					outerRadius={8}
					angle={180}
					rotation={180}
					fill="black"
					stroke="black"
					strokeWidth={2}
				/>
				<Rect
					x={sideLadderX}
					y={ladderY + totalLadderHeight + 1}
					width={20}
					height={3}
					fill="black"
					stroke="black"
					strokeWidth={1}
				/>
				<Arc
					x={sideLadderX + 8}
					y={ladderY + totalLadderHeight + 2}
					innerRadius={0}
					outerRadius={8}
					angle={180}
					rotation={360}
					fill="black"
					stroke="black"
					strokeWidth={2}
				/>
			</>
		);
	};

	const DrawSideViewEndstops = () => {
		return (
			<>
				{/* Top endstop */}
				<Rect
					x={sideLadderX - 6}
					y={ladderY + 7}
					width={3}
					height={20}
					fill="lightgrey"
					stroke="lightgrey"
					strokeWidth={1}
				/>
				<Rect
					x={sideLadderX - 5}
					y={ladderY + 13}
					width={10}
					height={14}
					fill="lightgrey"
					stroke="lightgrey"
					strokeWidth={1}
				/>
				<Line
					points={[
						sideLadderX + 6,
						ladderY + 26,
						sideLadderX + 17,
						ladderY + 26,
						sideLadderX + 10,
						ladderY + 14,
						sideLadderX + 6,
						ladderY + 14,
					]}
					fill="lightgrey"
					stroke="lightgrey"
					strokeWidth={2}
					closed={true}
				/>
				<Circle x={sideLadderX - 1} y={ladderY + 20} radius={1.5} fill="black" />
				<Circle x={sideLadderX + 8} y={ladderY + 20} radius={2.5} fill="black" />
				{/* Bottom endstop */}
				<Rect
					x={sideLadderX - 6}
					y={ladderY + 700}
					width={3}
					height={20}
					fill="lightgrey"
					stroke="lightgrey"
					strokeWidth={1}
				/>
				<Rect
					x={sideLadderX - 5}
					y={ladderY + 700}
					width={10}
					height={14}
					fill="lightgrey"
					stroke="lightgrey"
					strokeWidth={1}
				/>
				<Line
					points={[
						sideLadderX + 6,
						ladderY + 700.5,
						sideLadderX + 17,
						ladderY + 700.5,
						sideLadderX + 10,
						ladderY + 713,
						sideLadderX + 6,
						ladderY + 713,
					]}
					fill="lightgrey"
					stroke="lightgrey"
					strokeWidth={2}
					closed={true}
				/>
				<Circle x={sideLadderX} y={ladderY + 706} radius={2.5} fill="black" />
				<Circle x={sideLadderX + 9} y={ladderY + 706} radius={1.5} fill="black" />
			</>
		);
	};

	const DrawSideViewFixations = () => {
		return (
			<>
				{/* Top fixation */}
				<Rect
					x={sideLadderX - 26}
					y={ladderY + 245}
					width={25}
					height={10}
					fill="grey"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Rect
					x={sideLadderX - 35}
					y={ladderY + 245}
					width={15}
					height={10}
					fill="grey"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Line
					points={[sideLadderX - 15, ladderY + 250, sideLadderX - 5, ladderY + 250]}
					stroke="black"
					strokeWidth={1.5}
				/>
				<Line
					points={[sideLadderX - 24, ladderY + 250, sideLadderX - 31, ladderY + 250]}
					stroke="black"
					strokeWidth={1.5}
				/>
				{/* Bottom fixation */}
				<Rect
					x={sideLadderX - 26}
					y={ladderY + 585}
					width={25}
					height={10}
					fill="grey"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Rect
					x={sideLadderX - 35}
					y={ladderY + 585}
					width={15}
					height={10}
					fill="grey"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Line
					points={[sideLadderX - 15, ladderY + 590, sideLadderX - 5, ladderY + 590]}
					stroke="black"
					strokeWidth={1.5}
				/>
				<Line
					points={[sideLadderX - 24, ladderY + 590, sideLadderX - 31, ladderY + 590]}
					stroke="black"
					strokeWidth={1.5}
				/>
			</>
		);
	};

	const DrawSideViewGlider = () => {
		return (
			<>
				<Rect
					x={sideLadderX + 16}
					y={ladderY + 510}
					width={12}
					height={15}
					fill="black"
					stroke="black"
					strokeWidth={1}
					cornerRadius={2}
				/>
				<Line
					points={[sideLadderX + 15, ladderY + 514, sideLadderX + 55, ladderY + 525]}
					stroke="black"
					strokeWidth={3}
				/>
				<Line
					points={[
						sideLadderX + 55,
						ladderY + 525,
						sideLadderX + 60,
						ladderY + 520,
						sideLadderX + 60,
						ladderY + 520,
						sideLadderX + 80,
						ladderY + 525,
						sideLadderX + 85,
						ladderY + 535,
						sideLadderX + 75,
						ladderY + 540,
						sideLadderX + 55,
						ladderY + 535,
						sideLadderX + 55,
						ladderY + 525,
					]}
					stroke="black"
					strokeWidth={3}
				/>
			</>
		);
	};

	return (
		<Stage width={canvasWidth} height={canvasHeight}>
			<Layer>
				{DrawFrontViewLadder()}
				{DrawFrontViewPlasticSockets()}
				{DrawFrontViewEndstops()}
				{DrawFrontViewFixations()}
				{DrawFrontViewGlider()}
				{DrawFrontViewBottomSection()}
				{DrawLadderCage()}
				{DrawFrontViewHelperLinesArrowsAndLabel()}
				{DrawSideViewLadder()}
				{DrawSideViewPlasticSockets()}
				{DrawSideViewEndstops()}
				{DrawSideViewFixations()}
				{DrawSideViewGlider()}
			</Layer>
		</Stage>
	);
};

export default LadderDrawing;
