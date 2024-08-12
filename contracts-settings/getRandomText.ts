// Utility function to randomly get a bio
import { userBios } from "./userManagerSettings";
export function getRandomText(): string {
    const randomIndex = Math.floor(Math.random() * userBios.length);
    return userBios[randomIndex];
}
