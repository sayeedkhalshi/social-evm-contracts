import { reportReasons } from "./userManagerSettings";

// Utility function to randomly get a username
export function getRandomUsername(): string {
    const randomIndex = Math.floor(Math.random() * reportReasons.length);
    return reportReasons[randomIndex];
}
