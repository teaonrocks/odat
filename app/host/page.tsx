"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/utils/roomUtils";

export default function HostPage() {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleCreateRoom = async (): Promise<void> => {
		setLoading(true);
		try {
			const roomId = await createRoom();
			router.push(`/room/${roomId}?role=host`);
		} catch (error) {
			console.error("Error creating room:", error);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Poverty Simulation
					</h1>
					<p className="text-gray-600 mb-8">
						Host a 14-day single parent experience
					</p>

					<button
						onClick={handleCreateRoom}
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
					>
						{loading ? "Creating Room..." : "Create New Session"}
					</button>

					<div className="mt-6 text-sm text-gray-500">
						<p>Share the room code with participants to let them join</p>
					</div>
				</div>
			</div>
		</div>
	);
}
