import { doc, collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function deleteRoom(roomId: string): Promise<void> {
	try {
		const batch = writeBatch(db);

		// Get all participants in the room
		const participantsRef = collection(db, `rooms/${roomId}/participants`);
		const participantsSnapshot = await getDocs(participantsRef);

		// Add participant deletions to batch
		participantsSnapshot.docs.forEach((participantDoc) => {
			batch.delete(participantDoc.ref);
		});

		// Add room deletion to batch
		const roomRef = doc(db, "rooms", roomId);
		batch.delete(roomRef);

		// Execute all deletions
		await batch.commit();

		console.log(`Room ${roomId} and all participant data deleted successfully`);
	} catch (error) {
		console.error("Error deleting room:", error);
		throw new Error("Failed to delete room data");
	}
}
