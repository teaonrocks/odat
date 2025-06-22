"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { makeChoice } from "@/utils/roomUtils";
import { Scenario } from "@/types";

interface ScenarioCardProps {
	roomId: string;
	participantId: string;
	currentDay: number;
	scenario: Scenario;
	hasChosenToday: boolean;
}

export function ScenarioCard({
	roomId,
	participantId,
	currentDay,
	scenario,
	hasChosenToday,
}: ScenarioCardProps) {
	// All the state now lives inside this component
	const [selectedChoice, setSelectedChoice] = useState<string>("");
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [showConsequence, setShowConsequence] = useState<boolean>(false);

	const handleChoiceSelect = (optionId: string): void => {
		setSelectedChoice(optionId);
		setShowConsequence(false);
	};

	const handleSubmitChoice = async (): Promise<void> => {
		if (!selectedChoice) return;

		setSubmitting(true);
		try {
			await makeChoice(roomId, participantId, currentDay, selectedChoice);
			setShowConsequence(true);
		} catch (error) {
			console.error("Error submitting choice:", error);
		}
		setSubmitting(false);
	};

	const selectedOption = scenario.options.find(
		(opt) => opt.id === selectedChoice
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h2 className="text-xl font-semibold mb-2">{scenario.title}</h2>
				</CardTitle>
				<CardDescription>
					<p className=" mb-6">{scenario.description}</p>
				</CardDescription>
			</CardHeader>

			{!hasChosenToday ? (
				<CardContent>
					<div className="space-y-4 mb-6">
						{scenario.options.map((option) => (
							<div key={option.id}>
								<Label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
									<input
										type="radio"
										name="choice"
										value={option.id}
										checked={selectedChoice === option.id}
										onChange={() => handleChoiceSelect(option.id)}
										className="mr-4"
									/>
									<div className="flex-1">
										<div className="font-medium mb-1">{option.text}</div>
										<div className="text-sm text-muted-foreground">
											Cost:{" "}
											{option.cost === 0 ? "Free" : `$${Math.abs(option.cost)}`}
										</div>
									</div>
								</Label>
							</div>
						))}
					</div>

					<Button
						onClick={handleSubmitChoice}
						disabled={!selectedChoice || submitting}
						className="w-full"
					>
						{submitting ? "Submitting..." : "Submit Choice"}
					</Button>
				</CardContent>
			) : (
				<CardContent>
					<div className="text-green-600 font-semibold mb-2">
						✓ Choice submitted for Day {currentDay}
					</div>
					<div className="text-muted-foreground">
						Waiting for next scenario...
					</div>
				</CardContent>
			)}

			{/* Show consequence after choice */}
			{showConsequence && selectedOption && (
				<CardContent className="pt-4 border-t mt-6">
					<h4 className="font-semibold mb-2">Consequence:</h4>
					<p className="text-muted-foreground">{selectedOption.consequence}</p>
				</CardContent>
			)}
		</Card>
	);
}
