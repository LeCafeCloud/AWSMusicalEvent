import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex h-14 items-center">
					<div className="mr-4 flex">
						<Link href="/" className="mr-6 flex items-center space-x-2">
							<span className="font-bold text-xl">Musical Event</span>
						</Link>
						<NavigationMenu viewport={false}>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="/" className={navigationMenuTriggerStyle()}>
											Home
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="/about" className={navigationMenuTriggerStyle()}>
											About
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="/docs" className={navigationMenuTriggerStyle()}>
											Documentation
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
					<div className="flex flex-1 items-center justify-end space-x-2">
						<nav className="flex items-center">
							<Link href="/login" className={navigationMenuTriggerStyle()}>
								Login
							</Link>
						</nav>
					</div>
				</div>
			</header>
			<main className="container mx-auto py-6">{children}</main>
			<footer className="border-t py-6 md:py-0">
				<div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built with Next.js, AWS, and shadcn/ui
					</p>
				</div>
			</footer>
		</div>
	);
}
