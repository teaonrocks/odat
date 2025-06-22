import {
	doc,
	setDoc,
	updateDoc,
	increment,
	arrayUnion,
	getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { Choice } from "@/types";
import { scenarios } from "@/lib/scenarios";

export async function createRoom(): Promise<string> {
	const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

	await setDoc(doc(db, "rooms", roomId), {
		createdAt: new Date(),
		status: "waiting",
		currentDay: 0,
		hostId: uuidv4(),
		participantCount: 0,
	});

	return roomId;
}

export async function joinRoom(
	roomId: string,
	participantName: string
): Promise<string> {
	const participantId = uuidv4();
	const roomRef = doc(db, "rooms", roomId);

	// Get the room document to check if it exists
	const roomSnap = await getDoc(roomRef);

	// If the room document does not exist, throw an error
	if (!roomSnap.exists()) {
		console.error(`Attempted to join non-existent room: ${roomId}`);
		throw new Error("Room not found. Please check the code and try again.");
	}

	// If the room exists, proceed with creating the participant
	await setDoc(doc(db, `rooms/${roomId}/participants`, participantId), {
		name: participantName,
		balance: 800, // Starting balance
		choices: [],
		joinedAt: new Date(),
	});

	// Update the participant count in the existing room
	await updateDoc(roomRef, {
		participantCount: increment(1),
	});

	return participantId;
}

export async function updateScenario(
	roomId: string,
	day: number
): Promise<void> {
	await updateDoc(doc(db, "rooms", roomId), {
		currentDay: day,
		status: day >= 14 ? "finished" : "active",
	});
}

export async function makeChoice(
	roomId: string,
	participantId: string,
	day: number,
	optionId: string
): Promise<void> {
	const scenario = scenarios[`day${day}`];
	if (!scenario) throw new Error("Invalid scenario");

	const selectedOption = scenario.options.find((opt) => opt.id === optionId);
	if (!selectedOption) throw new Error("Invalid option");

	const choice: Choice = {
		day,
		optionId,
		timestamp: new Date(),
	};

	const participantRef = doc(db, `rooms/${roomId}/participants`, participantId);

	await updateDoc(participantRef, {
		choices: arrayUnion(choice),
		balance: increment(selectedOption.cost),
	});
}
