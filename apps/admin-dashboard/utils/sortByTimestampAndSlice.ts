interface ObjectWithTimestamp {
	timestamp: string;
}

export function sortByTimestampAndSlice<Type extends ObjectWithTimestamp[]>(
	array: Type,
	limit = 5
): Type {
	const result = [...array]
		.sort((a, b) => {
			return (
				new Date(b.timestamp).getTime() -
				new Date(a.timestamp).getTime()
			);
		})
		.slice(0, limit);
	return result as Type;
}
