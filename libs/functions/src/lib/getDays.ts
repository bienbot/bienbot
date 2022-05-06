interface DateObject {
    start: Date;
    end?: Date;
}

export function getDays(x: number): Date[];
export function getDays(x: DateObject): Date[];
export function getDays(x: number | DateObject): Date[] {
    if (typeof x === "number") {
        return Array.from(
            { length: x },
            (_, i) =>
                new Date(new Date().setDate(new Date().getDate() - x + i + 1))
        );
    } else {
        const days: Date[] = [];
        let current = x.start;
        const endTime = x.end ? x.end.getTime() : new Date().getTime();
        while (current.getTime() <= endTime) {
            days.push(current);
            current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
        }
        return days;
    }
}
