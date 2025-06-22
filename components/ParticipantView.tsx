"use client";
import { useRoom, useParticipant } from "@/lib/hooks";
import { scenarios } from "@/lib/scenarios";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { ScenarioCard } from "./ScenarioCard"; // <-- Import the new component

interface ParticipantViewProps {
	roomId: string;
	participantId: string;
}

export default function ParticipantView({
	roomId,
	participantId,
}: ParticipantViewProps) {
	const { room, loading: roomLoading } = useRoom(roomId);
	const participant = useParticipant(roomId, participantId);

	// Notice we removed all the state from this component!

	if (roomLoading || !room || !participant) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
					<div>Loading...</div>
				</div>
			</div>
		);
	}

	const currentScenario = scenarios[`day${room.currentDay}`];
	const isWaiting = room.status === "waiting";
	const isFinished = room.currentDay > 14;
	const hasChosenToday = participant.choices?.length >= room.currentDay;

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			{/* Header */}
			<Card>
				<CardHeader className="flex-row items-center justify-between">
					<CardTitle>
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
							Welcome, {participant.name}
						</h1>
					</CardTitle>
					<CardAction className="">
						<div className="text-2xl font-bold text-green-600">
							${participant.balance}
						</div>
						<div className="text-sm text-muted-foreground">Current Balance</div>
					</CardAction>
					<CardDescription>Room: {roomId}</CardDescription>
				</CardHeader>
			</Card>

			{/* Status */}
			{isWaiting && (
				<Card>
					<CardContent className="p-6 text-center">
						<h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
							Waiting for host to start...
						</h2>
						<p className="text-yellow-700 dark:text-yellow-400">
							The session will begin shortly.
						</p>
					</CardContent>
				</Card>
			)}

			{isFinished && (
				<Card>
					<CardContent className="p-6 text-center">
						<h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
							Simulation Complete!
						</h2>
						<p className="text-green-700 dark:text-green-400">
							Final Balance: ${participant.balance}
						</p>
					</CardContent>
				</Card>
			)}

			{/* Current Scenario */}
			{!isWaiting && !isFinished && currentScenario && (
				// THE KEY IS NOW ON THE COMPONENT THAT OWNS THE STATE
				<ScenarioCard
					key={room.currentDay}
					roomId={roomId}
					participantId={participantId}
					currentDay={room.currentDay}
					scenario={currentScenario}
					hasChosenToday={hasChosenToday}
				/>
			)}
		</div>
	);
}
