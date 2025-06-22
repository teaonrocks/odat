import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Poverty Simulation App",
	description:
		"An interactive 14-day single parent poverty simulation experience",
	keywords: ["poverty simulation", "education", "single parent", "interactive"],
	authors: [{ name: "Your Name" }],
	viewport: "width=device-width, initial-scale=1",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="min-h-screen bg-background flex flex-col">
						<Navigation />

						{/* Main Content */}
						<main className="flex-1">{children}</main>

						{/* Footer */}
						<footer className="bg-background border-t mt-auto">
							<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
								<div className="text-center text-muted-foreground text-sm">
									<p>2025 One Day At A Time. Built for educational purposes.</p>
								</div>
							</div>
						</footer>
					</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
