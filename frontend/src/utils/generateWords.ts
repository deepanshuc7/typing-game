export function generateWords(source: readonly string[], count: number): string[] {
    if (count < 0) {
        throw new Error("Word count cannot be negative");
    }

    if (count === 0) {
        return [];
    }

    if (source.length === 0) {
        throw new Error("Cannot generate words from an empty word list");
    }

    return Array.from({length: count}, () => {
        const randomIndex = Math.floor(Math.random() * source.length);

        return source[randomIndex];
    });
}
