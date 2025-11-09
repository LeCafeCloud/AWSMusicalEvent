import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
	return (
		<div className="mx-auto max-w-4xl space-y-8 py-8">
			<div className="space-y-4">
				<Badge variant="secondary">About Us</Badge>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Building the Future of Musical Events
				</h1>
				<p className="text-xl text-muted-foreground">
					A modern platform designed to revolutionize how musical events are organized and
					experienced.
				</p>
			</div>

			<Separator />

			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
				<p className="text-lg leading-relaxed text-muted-foreground">
					We believe that organizing and attending musical events should be seamless, engaging, and
					accessible to everyone. Our platform leverages cutting-edge cloud technology to provide
					event organizers and attendees with the tools they need to create unforgettable musical
					experiences.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Technology Stack</h2>
				<div className="grid gap-6 sm:grid-cols-2">
					<div className="space-y-2 rounded-lg border p-4">
						<h3 className="font-semibold">Frontend</h3>
						<ul className="space-y-1 text-muted-foreground">
							<li>Next.js 15 with App Router</li>
							<li>React 19 for modern UI</li>
							<li>shadcn/ui components</li>
							<li>Tailwind CSS for styling</li>
						</ul>
					</div>
					<div className="space-y-2 rounded-lg border p-4">
						<h3 className="font-semibold">Backend & Infrastructure</h3>
						<ul className="space-y-1 text-muted-foreground">
							<li>AWS Cloud Services</li>
							<li>Better Auth for authentication</li>
							<li>Drizzle ORM for database</li>
							<li>SST for infrastructure</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Core Features</h2>
				<div className="space-y-3">
					<div className="rounded-lg border p-4">
						<h3 className="mb-2 font-semibold">Symphony Management</h3>
						<p className="text-muted-foreground">
							Create and manage symphonies with detailed information, performer lineups, and
							scheduling capabilities.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="mb-2 font-semibold">User Authentication</h3>
						<p className="text-muted-foreground">
							Secure authentication system allowing users to manage their events and preferences
							safely.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="mb-2 font-semibold">Real-time Collaboration</h3>
						<p className="text-muted-foreground">
							Work together with team members to organize events efficiently with real-time updates.
						</p>
					</div>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="space-y-2 text-center">
						<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
							<span className="text-2xl font-bold text-primary">=�</span>
						</div>
						<h3 className="font-semibold">Fast & Reliable</h3>
						<p className="text-sm text-muted-foreground">
							Built on AWS for maximum performance and uptime
						</p>
					</div>
					<div className="space-y-2 text-center">
						<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
							<span className="text-2xl font-bold text-primary">=</span>
						</div>
						<h3 className="font-semibold">Secure</h3>
						<p className="text-sm text-muted-foreground">
							Enterprise-grade security for your data and events
						</p>
					</div>
					<div className="space-y-2 text-center">
						<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
							<span className="text-2xl font-bold text-primary">=�</span>
						</div>
						<h3 className="font-semibold">Intuitive</h3>
						<p className="text-sm text-muted-foreground">
							User-friendly interface designed for everyone
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
