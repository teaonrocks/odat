import { Scenarios } from "@/types";

export const scenarios: Scenarios = {
	day1: {
		title: "Day 1: Getting Started",
		description:
			"You're a single parent with $800 for the month. Your child needs school supplies.",
		options: [
			{
				id: "a",
				text: "Buy name-brand supplies ($50)",
				cost: -50,
				consequence: "Your child is happy but your budget is tight.",
			},
			{
				id: "b",
				text: "Buy generic supplies ($25)",
				cost: -25,
				consequence:
					"You saved money but your child feels different from classmates.",
			},
			{
				id: "c",
				text: "Skip some supplies for now ($10)",
				cost: -10,
				consequence: "Your child's teacher notices missing supplies.",
			},
		],
	},
	day2: {
		title: "Day 2: Transportation Issue",
		description: "Your car breaks down. You need to get to work.",
		options: [
			{
				id: "a",
				text: "Pay for expensive repair ($200)",
				cost: -200,
				consequence: "Car is fixed but you're behind on bills.",
			},
			{
				id: "b",
				text: "Take public transport ($5/day)",
				cost: -5,
				consequence: "Longer commute, less time with your child.",
			},
			{
				id: "c",
				text: "Walk to work (free)",
				cost: 0,
				consequence: "You're often late and exhausted.",
			},
		],
	},
	day3: {
		title: "Day 3: Medical Emergency",
		description: "Your child has a fever and needs medical attention.",
		options: [
			{
				id: "a",
				text: "Go to emergency room ($300)",
				cost: -300,
				consequence: "Child gets immediate care but creates huge debt.",
			},
			{
				id: "b",
				text: "Visit urgent care clinic ($100)",
				cost: -100,
				consequence: "Good care with reasonable cost.",
			},
			{
				id: "c",
				text: "Wait and monitor at home ($0)",
				cost: 0,
				consequence: "Fever worsens, miss work to care for child.",
			},
		],
	},
	day4: {
		title: "Day 4: Childcare Crisis",
		description: "Your regular babysitter is sick and you have to work today.",
		options: [
			{
				id: "a",
				text: "Hire emergency childcare ($80)",
				cost: -80,
				consequence: "Child is safe but it's expensive and unfamiliar.",
			},
			{
				id: "b",
				text: "Take child to work with you ($0)",
				cost: 0,
				consequence: "Boss is unhappy, productivity suffers.",
			},
			{
				id: "c",
				text: "Miss work to stay home ($0)",
				cost: 0,
				consequence: "No pay today, job security at risk.",
			},
		],
	},
	day5: {
		title: "Day 5: Grocery Shopping",
		description: "You need food for the week but money is running low.",
		options: [
			{
				id: "a",
				text: "Buy healthy, fresh foods ($120)",
				cost: -120,
				consequence: "Good nutrition but strains budget significantly.",
			},
			{
				id: "b",
				text: "Buy processed, cheap foods ($60)",
				cost: -60,
				consequence: "Affordable but less nutritious for your family.",
			},
			{
				id: "c",
				text: "Visit food bank ($10 gas)",
				cost: -10,
				consequence: "Free food but limited choices and long wait.",
			},
		],
	},
	day6: {
		title: "Day 6: Utility Bill",
		description:
			"The electricity bill is due today. It's higher than expected.",
		options: [
			{
				id: "a",
				text: "Pay the full bill ($150)",
				cost: -150,
				consequence: "Lights stay on but other bills will be late.",
			},
			{
				id: "b",
				text: "Pay partial amount ($75)",
				cost: -75,
				consequence: "Avoid shut-off for now but late fees will apply.",
			},
			{
				id: "c",
				text: "Skip payment this month ($0)",
				cost: 0,
				consequence: "Risk of power being shut off next week.",
			},
		],
	},
	day7: {
		title: "Day 7: Work Opportunity",
		description:
			"You're offered overtime work this weekend. Your child has a birthday party to attend.",
		options: [
			{
				id: "a",
				text: "Work overtime, hire babysitter ($40 net gain)",
				cost: 40,
				consequence: "Extra money but child misses social event.",
			},
			{
				id: "b",
				text: "Work overtime, child stays alone ($80 gain)",
				cost: 80,
				consequence: "More money but child feels neglected and unsafe.",
			},
			{
				id: "c",
				text: "Skip overtime, attend party ($15 gift)",
				cost: -15,
				consequence: "Child is happy but you lose needed income.",
			},
		],
	},
	day8: {
		title: "Day 8: Housing Problem",
		description: "Your landlord says rent will increase by $100 next month.",
		options: [
			{
				id: "a",
				text: "Accept increase, stay here ($0 now)",
				cost: 0,
				consequence: "Familiar home but future budgets will be tighter.",
			},
			{
				id: "b",
				text: "Look for cheaper place ($50 search costs)",
				cost: -50,
				consequence: "Might find savings but moving costs and uncertainty.",
			},
			{
				id: "c",
				text: "Ask family for help ($0)",
				cost: 0,
				consequence: "Family helps but you feel embarrassed and dependent.",
			},
		],
	},
	day9: {
		title: "Day 9: Educational Needs",
		description:
			"Your child needs a calculator for math class and the school's are all broken.",
		options: [
			{
				id: "a",
				text: "Buy a good calculator ($35)",
				cost: -35,
				consequence: "Child has proper tools but money is tight.",
			},
			{
				id: "b",
				text: "Buy a basic calculator ($15)",
				cost: -15,
				consequence: "Child has something but it may not be adequate.",
			},
			{
				id: "c",
				text: "Ask teacher for alternatives ($0)",
				cost: 0,
				consequence: "Child feels singled out as 'the poor kid'.",
			},
		],
	},
	day10: {
		title: "Day 10: Social Pressure",
		description:
			"Your child's friends are going to a movie. Your child really wants to go.",
		options: [
			{
				id: "a",
				text: "Pay for movie and snacks ($25)",
				cost: -25,
				consequence: "Child fits in socially but budget suffers.",
			},
			{
				id: "b",
				text: "Pay for movie only ($12)",
				cost: -12,
				consequence: "Child goes but feels left out without snacks.",
			},
			{
				id: "c",
				text: "Child stays home ($0)",
				cost: 0,
				consequence: "Money saved but child feels excluded and sad.",
			},
		],
	},
	day11: {
		title: "Day 11: Unexpected Expense",
		description:
			"Your child's shoes have a hole and it's raining. They need new ones.",
		options: [
			{
				id: "a",
				text: "Buy new shoes ($60)",
				cost: -60,
				consequence: "Child has dry feet but major budget impact.",
			},
			{
				id: "b",
				text: "Buy used shoes ($20)",
				cost: -20,
				consequence: "Affordable solution but child feels embarrassed.",
			},
			{
				id: "c",
				text: "Use duct tape temporarily ($3)",
				cost: -3,
				consequence: "Very cheap but child is teased at school.",
			},
		],
	},
	day12: {
		title: "Day 12: Health Insurance",
		description:
			"You receive a medical bill that insurance didn't fully cover.",
		options: [
			{
				id: "a",
				text: "Pay the full bill ($180)",
				cost: -180,
				consequence: "Debt cleared but severe budget strain.",
			},
			{
				id: "b",
				text: "Set up payment plan ($45 first payment)",
				cost: -45,
				consequence: "Manageable now but ongoing monthly burden.",
			},
			{
				id: "c",
				text: "Try to negotiate later ($0)",
				cost: 0,
				consequence: "Avoid payment now but debt grows with interest.",
			},
		],
	},
	day13: {
		title: "Day 13: End of Month Struggles",
		description: "You're running very low on money with bills still due.",
		options: [
			{
				id: "a",
				text: "Borrow from payday loan ($100 loan, $125 due)",
				cost: 100,
				consequence: "Immediate relief but expensive debt next month.",
			},
			{
				id: "b",
				text: "Ask family for loan ($50 loan)",
				cost: 50,
				consequence: "Help from family but strain on relationships.",
			},
			{
				id: "c",
				text: "Sell some belongings ($30)",
				cost: 30,
				consequence: "Some cash but losing things you might need.",
			},
		],
	},
	day14: {
		title: "Day 14: Looking Forward",
		description:
			"It's the end of the month. You need to prepare for next month's challenges.",
		options: [
			{
				id: "a",
				text: "Apply for government assistance ($0)",
				cost: 0,
				consequence: "Might get help but long process and uncertainty.",
			},
			{
				id: "b",
				text: "Look for a second job ($15 application fees)",
				cost: -15,
				consequence: "Potential for more income but less time with child.",
			},
			{
				id: "c",
				text: "Focus on budgeting what you have ($0)",
				cost: 0,
				consequence: "No additional income but better money management.",
			},
		],
	},
};
