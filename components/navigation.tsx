"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function Navigation() {
	const [isOpen, setIsOpen] = React.useState(false);
	const pathname = usePathname();

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Host Session", href: "/host" },
		{ name: "Join Session", href: "/join" },
	];

	const isActive = (href: string) => {
		if (href === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<nav className="bg-background border-b sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link
							href="/"
							className="text-xl font-bold text-foreground hover:text-primary transition-colors"
						>
							One Day At A Time
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-4">
						{navigation.slice(1).map((item) => (
							<Button
								key={item.name}
								asChild
								variant={isActive(item.href) ? "secondary" : "ghost"}
								size="sm"
							>
								<Link href={item.href}>{item.name}</Link>
							</Button>
						))}
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="sm" className="p-2">
									<Menu className="h-6 w-6" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-72">
								<SheetHeader>
									<SheetTitle className="text-left">
										One Day At A Time
									</SheetTitle>
								</SheetHeader>
								<Separator className="my-4" />
								<div className="flex flex-col space-y-2">
									{navigation.map((item) => (
										<Button
											key={item.name}
											asChild
											variant={isActive(item.href) ? "secondary" : "ghost"}
											className="justify-start"
											onClick={() => setIsOpen(false)}
										>
											<Link href={item.href}>{item.name}</Link>
										</Button>
									))}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
}
