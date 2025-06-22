"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { joinRoom } from "@/utils/roomUtils";

export default function JoinPage() {
	const [roomId, setRoomId] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const handleJoin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		if (!roomId.trim() || !name.trim()) {
			setError("Please fill in all fields");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const participantId = await joinRoom(roomId.toUpperCase(), name);
			router.push(
				`/room/${roomId.toUpperCase()}?role=participant&id=${participantId}`
			);
		} catch (error) {
			console.error("Error joining room:", error);
			setError("Could not join room. Check the room code and try again.");
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-700 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Join Session
					</h1>
					<p className="text-gray-600">Enter the room code to participate</p>
				</div>

				<form onSubmit={handleJoin} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Room Code
						</label>
						<input
							type="text"
							value={roomId}
							onChange={(e) => setRoomId(e.target.value.toUpperCase())}
							placeholder="Enter 6-digit code"
							maxLength={6}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Your Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter your name"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
					>
						{loading ? "Joining..." : "Join Session"}
					</button>
				</form>
			</div>
		</div>
	);
}
