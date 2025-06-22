"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoom } from "@/utils/deleteRoom";

interface DeleteRoomButtonProps {
	roomId: string;
	participantCount: number;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
}

export function DeleteRoomButton({
	roomId,
	participantCount,
	variant = "destructive",
	size = "default",
	className,
}: DeleteRoomButtonProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setIsDeleting(true);

		try {
			await deleteRoom(roomId);

			toast.success("Room Deleted", {
				description: `Room ${roomId} and all participant data have been permanently deleted.`,
			});

			// Navigate back to host page
			router.push("/");
		} catch (error) {
			toast.error("Deletion Failed", {
				description: "Failed to delete room data. Please try again.",
			});
			console.error("Delete room error:", error);
		} finally {
			setIsDeleting(false);
			setIsOpen(false);
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant={variant}
					size={size}
					className={className}
					disabled={isDeleting}
				>
					{isDeleting ? (
						<Loader2 className="h-4 w-4 animate-spin mr-2" />
					) : (
						<Trash2 className="h-4 w-4 mr-2" />
					)}
					Delete Room Data
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Room Data?</AlertDialogTitle>
					<AlertDialogDescription asChild>
						<div className="space-y-3">
							<div>
								This will permanently delete all data for room{" "}
								<strong>{roomId}</strong>, including:
							</div>
							<ul className="list-disc list-inside space-y-1 text-sm">
								<li>All participant responses and choices</li>
								<li>Participant balances and progress</li>
								<li>Room session history</li>
								<li>
									Data for {participantCount} participant
									{participantCount !== 1 ? "s" : ""}
								</li>
							</ul>
							<div className="font-medium text-destructive">
								This action cannot be undone.
							</div>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin mr-2" />
								Deleting...
							</>
						) : (
							<>
								<Trash2 className="h-4 w-4 mr-2" />
								Delete Room Data
							</>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
