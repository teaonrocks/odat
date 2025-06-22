"use client";
import { useState } from "react";
import { useRoom, useParticipants } from "@/lib/hooks";
import { updateScenario } from "@/utils/roomUtils";
import { scenarios } from "@/lib/scenarios";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardAction,
	CardDescription,
	CardTitle,
	CardContent,
} from "./ui/card";
import { DeleteRoomButton } from "./DeleteRoomBtn";

interface HostViewProps {
	roomId: string;
}

export default function HostView({ roomId }: HostViewProps) {
	const { room, loading } = useRoom(roomId);
	const participants = useParticipants(roomId);
	const [advancing, setAdvancing] = useState<boolean>(false);

	if (loading) {
		return <div className="text-center py-8">Loading room...</div>;
	}

	if (!room) {
		return <div className="text-center py-8 text-red-600">Room not found</div>;
	}

	const currentScenario = scenarios[`day${room.currentDay}`];
	const isWaiting = room.status === "waiting";
	const isFinished = room.currentDay >= 14;

	const handleStartSession = async (): Promise<void> => {
		setAdvancing(true);
		try {
			await updateScenario(roomId, 1);
		} catch (error) {
			console.error("Error starting session:", error);
		}
		setAdvancing(false);
	};

	const handleNextDay = async (): Promise<void> => {
		if (room.currentDay >= 14) return;

		setAdvancing(true);
		try {
			await updateScenario(roomId, room.currentDay + 1);
		} catch (error) {
			console.error("Error advancing day:", error);
		}
		setAdvancing(false);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			{/* Header */}
			<Card className="">
				<CardHeader>
					<CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
						Room: {roomId}
					</CardTitle>
					<CardDescription>
						{participants.length} participants connected
					</CardDescription>
					<CardAction>
						<div className="">
							<div className="">Current Status</div>
							<div className="">
								{isWaiting
									? "Waiting to Start"
									: isFinished
									? "Session Complete"
									: `Day ${room.currentDay}`}
							</div>
						</div>
					</CardAction>
				</CardHeader>
			</Card>

			{/* Participants List */}

			{/* <Card>
				<CardHeader>
					<CardTitle>
						<h2 className="text-xl font-semibold mb-4">Participants</h2>
					</CardTitle>
				</CardHeader>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{participants.map((participant) => (
						<div key={participant.id} className="bg-gray-50 p-4 rounded-lg">
							<div className="font-medium">{participant.name}</div>
							<div className="text-sm text-gray-600">
								Balance: ${participant.balance}
							</div>
							<div className="text-xs text-gray-500">
								Day {participant.choices?.length || 0} completed
							</div>
						</div>
					))}
				</div>
			</Card> */}

			{/* Current Scenario */}
			{!isWaiting && !isFinished && currentScenario && (
				<Card className="">
					<CardHeader>
						<CardTitle>
							<h2 className="text-xl font-semibold mb-4">
								{currentScenario.title}
							</h2>
						</CardTitle>
						<CardDescription>
							<p className="">{currentScenario.description}</p>
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						{currentScenario.options.map((option, index) => (
							<div key={option.id} className="border rounded-lg p-4">
								<div className="font-medium mb-2">
									Option {String.fromCharCode(65 + index)}: {option.text}
								</div>
								<div className="text-sm ">
									Cost:{" "}
									{option.cost === 0 ? "Free" : `$${Math.abs(option.cost)}`}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			)}

			{/* Controls */}
			<div className="">
				{isWaiting ? (
					<Button
						onClick={handleStartSession}
						disabled={advancing || participants.length === 0}
						className="w-full "
					>
						{advancing ? "Starting..." : "Start Session"}
					</Button>
				) : isFinished ? (
					<div className="text-center flex flex-col gap-4">
						<h3 className="text-xl font-semibold ">Session Complete!</h3>
						<p className="text-gray-600">All 14 days have been completed.</p>
						<DeleteRoomButton
							roomId={roomId}
							participantCount={participants.length}
						/>
					</div>
				) : (
					<Button
						onClick={handleNextDay}
						disabled={advancing}
						className="w-full "
					>
						{advancing
							? "Loading..."
							: `Continue to Day ${room.currentDay + 1}`}
					</Button>
				)}
			</div>
		</div>
	);
}
