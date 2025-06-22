"use client";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import HostView from "@/components/HostView";
import ParticipantView from "@/components/ParticipantView";

interface RoomPageProps {
	params: Promise<{
		roomId: string;
	}>;
}

export default function RoomPage({ params }: RoomPageProps) {
	const searchParams = useSearchParams();
	const { roomId } = use(params); // Unwrap the Promise
	const role = searchParams.get("role");
	const participantId = searchParams.get("id");

	if (role === "host") {
		return <HostView roomId={roomId} />;
	} else if (role === "participant" && participantId) {
		return <ParticipantView roomId={roomId} participantId={participantId} />;
	}

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Invalid Access</h1>
				<p className="text-muted-foreground">
					Please join through the proper link.
				</p>
			</div>
		</div>
	);
}
