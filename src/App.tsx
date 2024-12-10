import LadderDrawing from "./components/LadderDrawing";

const compsByStep = {
	wizard_key: "ladder",
	length_net: 10,
	components: {
		id_component_core: [
			{
				id: 790,
				code: "SAL204",
				name: "SafeLadder Pro  280cm",
				quantity: 3,
			},
		],
		id_component_terminal_a: [
			{
				id: 728,
				code: "SAL201",
				name: "SafeLadder Pro bottom section  280cm",
				quantity: 1,
			},
		],
		id_component_terminal_b: [
			{
				id: 744,
				code: "SAL235",
				name: "SafeLadder Pro top / bottom end stop",
				quantity: 1,
			},
		],
		id_component_glider: [
			{
				id: 821,
				code: "RHF518-SLPRO",
				name: "Trolley Granvia 4 for SafeLadder Pro",
				quantity: 1,
			},
		],
		system_accessory_optional: [
			{
				id: 809,
				code: "SAL280",
				name: "Cage for Safeladder Pro",
				quantity: 9,
				um: "m",
			},
			{
				id: 745,
				code: "SAL285",
				name: "Plastic socket 2 pieces",
				quantity: 1,
			},
		],
	},
};

const App = () => {
	return <LadderDrawing data={compsByStep} />;
};

export default App;
