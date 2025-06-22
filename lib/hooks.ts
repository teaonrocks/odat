import { useEffect, useState } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "./firebase";
import { Room, Participant } from "@/types";

interface UseRoomReturn {
	room: Room | null;
	loading: boolean;
	error: string | null;
}

export function useRoom(roomId: string): UseRoomReturn {
	const [room, setRoom] = useState<Room | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!roomId) {
			setLoading(false);
			return;
		}

		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId),
			(doc) => {
				if (doc.exists()) {
					const data = doc.data();
					setRoom({
						id: doc.id,
						...data,
						createdAt: data.createdAt?.toDate() || new Date(),
					} as Room);
				} else {
					setRoom(null);
				}
				setLoading(false);
				setError(null);
			},
			(error) => {
				console.error("Error listening to room:", error);
				setError(error.message);
				setLoading(false);
			}
		);

		return unsubscribe;
	}, [roomId]);

	return { room, loading, error };
}

export function useParticipants(roomId: string): Participant[] {
	const [participants, setParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		if (!roomId) return;

		const unsubscribe = onSnapshot(
			collection(db, `rooms/${roomId}/participants`),
			(snapshot) => {
				const participantsList: Participant[] = snapshot.docs.map((doc) => {
					const data = doc.data();
					return {
						id: doc.id,
						...data,
						joinedAt: data.joinedAt?.toDate() || new Date(),
						choices: data.choices || [],
					} as Participant;
				});
				setParticipants(participantsList);
			}
		);

		return unsubscribe;
	}, [roomId]);

	return participants;
}

export function useParticipant(
	roomId: string,
	participantId: string
): Participant | null {
	const [participant, setParticipant] = useState<Participant | null>(null);

	useEffect(() => {
		if (!roomId || !participantId) return;

		const unsubscribe = onSnapshot(
			doc(db, `rooms/${roomId}/participants`, participantId),
			(doc) => {
				if (doc.exists()) {
					const data = doc.data();
					setParticipant({
						id: doc.id,
						...data,
						joinedAt: data.joinedAt?.toDate() || new Date(),
						choices: data.choices || [],
					} as Participant);
				}
			}
		);

		return unsubscribe;
	}, [roomId, participantId]);

	return participant;
}
