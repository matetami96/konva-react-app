import { Dispatch, RefObject, SetStateAction } from "react";

export type Editing = { type: "width" | "height"; x: number; y: number; value: number };
export type ControlsProps = {
	width: number;
	height: number;
	setWidth: (value: number) => void;
	setHeight: (value: number) => void;
	saveAsPDF: () => void;
};
export type CanvasProps = {
	width: number;
	height: number;
	setDimensions: Dispatch<SetStateAction<{ width: number; height: number }>>;
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	stageRef: RefObject<{ saveCanvasAsPDF: () => void } | {}>;
};
export type FrameProps = {
	width: number;
	height: number;
	onLabelClick: (type: "width" | "height", x: number, y: number) => void;
};
export type CanvasRef = { saveCanvasAsPDF: () => void };
