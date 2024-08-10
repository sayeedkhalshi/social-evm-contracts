import { TEST_LOCAL } from "../../settings";

export function getRandomWeightedNumber(): number {
    const rand = Math.random(); // Generate a random number between 0 and 1

    let min: number;
    let max: number;

    if (rand < 0.8) {
        // 80% of the time: Return between 3 and 8
        min = 5;
        max = 8;
    } else if (rand < 0.9) {
        // 10% of the time: Return between 8 and 12
        min = 8;
        max = 12;
    } else {
        // 10% of the time: Return between 12 and 50
        min = 12;
        max = 50;
    }

    // Generate a random number between min and max
    const res = Math.floor(Math.random() * (max - min + 1)) + min;
    return res * 1000;
}

export async function waitForRandomTime(): Promise<void> {
    const wait = !TEST_LOCAL;

    if (wait) {
        const randomTime = getRandomWeightedNumber();
        return await new Promise((resolve) => {
            setTimeout(resolve, randomTime);
        });
    } else {
        return await new Promise((resolve) => {
            setTimeout(resolve, 1);
        });
    }
}

// Example usage
console.log(waitForRandomTime());
