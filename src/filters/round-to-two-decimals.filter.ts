export default function roundToTwoDecimals(value: number) {
	return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
}
