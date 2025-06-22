export interface Scenario {
	title: string;
	description: string;
	options: ScenarioOption[];
}

export interface ScenarioOption {
	id: string;
	text: string;
	cost: number;
	consequence: string;
}

export interface Room {
	id: string;
	createdAt: Date;
	status: "waiting" | "active" | "finished";
	currentDay: number;
	hostId: string;
	participantCount: number;
}

export interface Participant {
	id: string;
	name: string;
	balance: number;
	choices: Choice[];
	joinedAt: Date;
}

export interface Choice {
	day: number;
	optionId: string;
	timestamp: Date;
}

export interface Scenarios {
	[key: string]: Scenario;
}
