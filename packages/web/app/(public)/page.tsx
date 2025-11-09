import Link from "next/link";
import { Resource } from "sst";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<div className="flex flex-col gap-16 py-8 md:py-16">
			{/* Hero Section */}
			<section className="flex flex-col items-center gap-6 text-center">
				<Badge variant="secondary" className="w-fit">
					{Resource.Config.name} Platform
				</Badge>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
					Create and Manage
					<br />
					<span className="text-primary">Symphonies</span>
				</h1>
				<p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
					A powerful platform to organize, manage, and experience musical events. Built with modern
					cloud technology for seamless performance.
				</p>
				<div className="flex flex-col gap-3 sm:flex-row">
					<Button size="lg" asChild>
						<Link href="/login">Get Started</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href="/about">Learn More</Link>
					</Button>
				</div>
			</section>

			{/* Features Section */}
			<section className="grid gap-8 md:grid-cols-3">
				<div className="flex flex-col gap-3 rounded-lg border p-6">
					<h3 className="text-xl font-semibold">Event Management</h3>
					<p className="text-muted-foreground">
						Create and manage musical events with ease. Track attendees, schedules, and performances
						all in one place.
					</p>
				</div>
				<div className="flex flex-col gap-3 rounded-lg border p-6">
					<h3 className="text-xl font-semibold">Real-time Updates</h3>
					<p className="text-muted-foreground">
						Stay informed with real-time notifications and updates about your events, performers,
						and schedule changes.
					</p>
				</div>
				<div className="flex flex-col gap-3 rounded-lg border p-6">
					<h3 className="text-xl font-semibold">Cloud-Powered</h3>
					<p className="text-muted-foreground">
						Built on AWS infrastructure for reliable, scalable, and secure event management at any
						scale.
					</p>
				</div>
			</section>

			{/* CTA Section */}
			<section className="flex flex-col items-center gap-6 rounded-lg border bg-muted/50 p-8 text-center md:p-12">
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
				<p className="max-w-xl text-lg text-muted-foreground">
					Join us today and start creating amazing musical experiences for your audience.
				</p>
				<Button size="lg" asChild>
					<Link href="/login">Create Your First Event</Link>
				</Button>
			</section>
		</div>
	);
}
