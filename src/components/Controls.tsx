interface ControlsProps {
	width: number;
	height: number;
	setWidth: (value: number) => void;
	setHeight: (value: number) => void;
}

const Controls = ({ width, height, setWidth, setHeight }: ControlsProps) => {
	return (
		<div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
			<div style={{ marginBottom: 10 }}>
				<label>
					Width:
					<input
						type="number"
						value={width}
						onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
						style={{ marginLeft: 5 }}
					/>
				</label>
			</div>
			<div>
				<label>
					Height:
					<input
						type="number"
						value={height}
						onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
						style={{ marginLeft: 5 }}
					/>
				</label>
			</div>
		</div>
	);
};

export default Controls;
