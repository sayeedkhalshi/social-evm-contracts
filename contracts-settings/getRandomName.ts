import { userBios } from "./userManagerSettings";

// Utility function to randomly get a username
export function getRandomUsername(): string {
    const randomIndex = Math.floor(Math.random() * userBios.length);
    return userBios[randomIndex];
}
