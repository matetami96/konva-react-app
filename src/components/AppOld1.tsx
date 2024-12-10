import ComponentSquares from "./components/ComponentSquares";

const compsByStep = {
	wizard_key: "cable_horizontal",
	length_net: 200,
	length_brut: 204,
	components: {
		id_component_core: [
			{
				id: 25,
				code: "LDV005",
				name: "Cable Ø 8 mm construction 1x19",
				quantity: 204, // 50 + 100 + 50 + 4 (2+2 curves)
				um: "m",
				price: null,
				model_details: {
					quantity: 3,
					color: "gray",
				},
			},
		],
		id_component_corner: [
			{
				id: 570,
				code: "LDV015+LDV043x2+LDV011x2",
				name: "Corner 45° to 135° LDV015 with intermediate anchors NEO LDV043 and crimping rings LDV011",
				quantity: 2,
				subcomponents: [
					{
						id: 31,
						code: "LDV015",
						name: "Corner plate for angle between 45° to 140° for Multipost, Unipost & rigid post",
						quantity: 2,
						price: {
							base: 50,
							final: 22.5,
						},
						model_details: {
							quantity: 2,
							color: "gray",
						},
					},
					{
						id: 419,
						code: "LDV043",
						name: "NEO Anchor for horizontal or inclined lifeline",
						quantity: 4,
						price: null,
						model_details: {
							quantity: 4,
							color: "gray",
						},
					},
					{
						id: 29,
						code: "LDV011",
						name: "Crimping ring length 30 mm",
						quantity: 4,
						price: null,
						model_details: {
							quantity: 4,
							color: "gray",
						},
					},
				],
			},
		],
		id_component_end_anchor: [
			{
				id: 22,
				code: "LDV002",
				name: "End or top anchor for horizontal or inclined  lifeline",
				quantity: 2,
				price: null,
				model_details: {
					quantity: 2,
					color: "gray",
				},
			},
		],
		id_component_intermediate_anchor: [
			{
				id: 419,
				code: "LDV043",
				name: "NEO Anchor for horizontal or inclined lifeline",
				quantity: 16,
				price: null,
				model_details: {
					quantity: 16,
					color: "gray",
				},
			},
		],
		id_component_fixation_element_end: [
			{
				id: 338,
				code: "IDF019",
				name: "Post height 50 cm for end anchor, curves & intermediates",
				quantity: 4,
				price: null,
				model_details: {
					quantity: 4,
					color: "gray",
				},
			},
		],
		id_component_fixation_element_end_accessory: [
			{
				id: 261,
				code: "IDF012=170",
				name: "Felt roof seal Ø75-90 height 170 mm",
				quantity: 4,
				price: null,
				model_details: {
					quantity: 4,
					color: "gray",
				},
			},
		],
		id_component_fixation_element: [
			{
				id: 339,
				code: "IDF018",
				name: "Post height 50 cm for inter anchor EVO and anchor point LDV029",
				quantity: 16,
				price: null,
				model_details: {
					quantity: 16,
					color: "gray",
				},
			},
		],
		id_component_fixation_element_accessory: [
			{
				id: 45,
				code: "LDV058",
				name: "Roofmate 23 x 23 x 1 cm",
				quantity: 16,
				price: null,
				model_details: {
					quantity: 16,
					color: "gray",
				},
			},
		],
		id_component_terminal_a: [
			{
				id: 553,
				code: "LDV032#1+LDV008",
				name: "Energy absorber provided with spring and Crimping ring length 100 mm",
				quantity: 1,
				price: null,
				subcomponents: [
					{
						id: 38,
						code: "LDV032",
						name: "Energy absorber provided with spring",
						quantity: 1,
						price: null,
						model_details: {
							quantity: 1,
							color: "gray",
						},
					},
					{
						id: 27,
						code: "LDV008",
						name: "Crimping ring length 100 mm",
						quantity: 1,
						price: null,
						model_details: {
							quantity: 1,
							color: "gray",
						},
					},
				],
			},
		],

		id_component_terminal_b: [
			{
				id: 431,
				code: "LDV137",
				name: "Line tensioner",
				quantity: 1,
				price: null,
				model_details: {
					quantity: 1,
					color: "gray",
				},
			},
		],
		id_component_glider: [
			{
				id: 417,
				code: "LDV001",
				name: "Opening glider for ground or wall configuration",
				quantity: 1,
				price: null,
				model_details: {
					quantity: 1,
					color: "gray",
				},
			},
		],
		system_accessory_mandatory: [
			{
				id: 999, // random id after rewriting system_accessory_mandatory
				// id: 29,
				code: "LDV011, FP001",
				name: "Crimping ring length 30 mm and Marking kit",
				quantity: 2,
				price: null,
				subcomponents: [
					{
						id: 29,
						code: "LDV011",
						name: "Crimping ring length 30 mm",
						quantity: 2,
						price: null,
						model_details: {
							quantity: 2,
							color: "gray",
						},
					},
					{
						id: 542,
						code: "FP001",
						name: "Marking kit",
						quantity: 1,
						price: null,
						model_details: {
							quantity: 1,
							color: "gray",
						},
					},
				],
			},
		],
	},
};

const App = () => {
	return (
		<div style={{ width: "100vw", height: "100vh", overflow: "scroll" }}>
			{/* Pass the components to the ComponentSquares component */}
			<ComponentSquares data={compsByStep} />
		</div>
	);
};

export default App;
