"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardDescription,
	CardTitle,
	CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { joinRoom } from "@/utils/roomUtils";
import { createRoom } from "@/utils/roomUtils";

export default function HomePage() {
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
		<div className="min-h-[90vh] flex items-center justify-center p-4">
			<Card>
				<CardHeader className="">
					<div className="flex-col flex justify-center">
						<CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
							One Day At A Time
						</CardTitle>
						<CardDescription>
							An interactive 14-day journey that helps participants understand
							the challenges faced by single parents living in poverty.
						</CardDescription>
					</div>
					<CardAction className="hidden md:block">
						<HostButtton />
					</CardAction>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleJoin} className="">
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label className="">Room Code</Label>
								<Input
									type="text"
									value={roomId}
									onChange={(e) => setRoomId(e.target.value.toUpperCase())}
									placeholder="Enter 6-digit code"
									maxLength={6}
									className=""
								/>
							</div>

							<div className="grid gap-2">
								<Label className="">Your Name</Label>
								<Input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter your name"
									className=""
								/>
							</div>

							{error && (
								<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
									{error}
								</div>
							)}
							<Button type="submit" disabled={loading} className="w-full">
								{loading ? "Joining..." : "Join Session"}
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-4">
					<span className="text-sm text-muted-foreground">
						This simulation is designed for educational purposes to build
						empathy and understanding.
					</span>
				</CardFooter>
			</Card>
		</div>
	);
}

const HostButtton = () => {
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
		<Button variant={"link"} onClick={handleCreateRoom} disabled={loading}>
			{loading ? "Creating Room..." : "Create New Session"}
		</Button>
	);
};
