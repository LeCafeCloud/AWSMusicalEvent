import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SymphonyPageProps {
	params: {
		id: string;
	};
}

export default async function SymphonyPage({ params }: SymphonyPageProps) {
	const { id } = await params;

	return (
		<div className="mx-auto max-w-5xl space-y-8 py-8">
			{/* Header */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Badge variant="secondary">Symphony #{id}</Badge>
					<Badge variant="outline">Live</Badge>
				</div>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Beethoven&apos;s Symphony No. 9
				</h1>
				<p className="text-xl text-muted-foreground">
					&quot;Ode to Joy&quot; - A monumental work in the history of classical music
				</p>
			</div>

			<Separator />

			{/* Event Details */}
			<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<div className="space-y-2 rounded-lg border p-4">
					<h3 className="text-sm font-medium text-muted-foreground">Date</h3>
					<p className="text-lg font-semibold">December 15, 2024</p>
					<p className="text-sm text-muted-foreground">8:00 PM - 10:30 PM</p>
				</div>
				<div className="space-y-2 rounded-lg border p-4">
					<h3 className="text-sm font-medium text-muted-foreground">Venue</h3>
					<p className="text-lg font-semibold">Concert Hall</p>
					<p className="text-sm text-muted-foreground">123 Music Street, City</p>
				</div>
				<div className="space-y-2 rounded-lg border p-4">
					<h3 className="text-sm font-medium text-muted-foreground">Conductor</h3>
					<p className="text-lg font-semibold">Maestro Smith</p>
					<p className="text-sm text-muted-foreground">Principal Conductor</p>
				</div>
			</section>

			{/* About */}
			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">About</h2>
				<div className="rounded-lg border p-6">
					<p className="leading-relaxed text-muted-foreground">
						Beethoven&apos;s Ninth Symphony is one of the best-known works in common practice music.
						It was the first example of a major composer using voices in a symphony. The words are
						sung during the final movement by four vocal soloists and a chorus. They were taken from
						the &quot;Ode to Joy&quot;, a poem written by Friedrich Schiller in 1785 and revised in
						1803.
					</p>
				</div>
			</section>

			{/* Program */}
			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Program</h2>
				<div className="space-y-3">
					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center justify-between">
							<h3 className="font-semibold">Movement I: Allegro ma non troppo</h3>
							<Badge variant="secondary">15 min</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							The opening movement introduces the main themes with dramatic intensity and sets the
							stage for the entire symphony.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center justify-between">
							<h3 className="font-semibold">Movement II: Molto vivace</h3>
							<Badge variant="secondary">12 min</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							A scherzo movement featuring rhythmic energy and playful orchestration.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center justify-between">
							<h3 className="font-semibold">Movement III: Adagio molto e cantabile</h3>
							<Badge variant="secondary">16 min</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							A slow, lyrical movement showcasing the orchestra&apos;s melodic capabilities.
						</p>
					</div>
					<div className="rounded-lg border p-4 border-primary/50 bg-primary/5">
						<div className="mb-2 flex items-center justify-between">
							<h3 className="font-semibold">Movement IV: Presto - &quot;Ode to Joy&quot;</h3>
							<Badge>24 min</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							The iconic finale featuring choir and soloists, celebrating unity and brotherhood
							through Schiller&apos;s poetry.
						</p>
					</div>
				</div>
			</section>

			{/* Performers */}
			<section className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight">Performers</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div className="rounded-lg border p-4 text-center">
						<div className="mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
							<span className="text-2xl font-bold text-primary">S</span>
						</div>
						<h3 className="font-semibold">Soprano</h3>
						<p className="text-sm text-muted-foreground">Jane Doe</p>
					</div>
					<div className="rounded-lg border p-4 text-center">
						<div className="mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
							<span className="text-2xl font-bold text-primary">A</span>
						</div>
						<h3 className="font-semibold">Alto</h3>
						<p className="text-sm text-muted-foreground">Mary Smith</p>
					</div>
					<div className="rounded-lg border p-4 text-center">
						<div className="mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
							<span className="text-2xl font-bold text-primary">T</span>
						</div>
						<h3 className="font-semibold">Tenor</h3>
						<p className="text-sm text-muted-foreground">John Brown</p>
					</div>
					<div className="rounded-lg border p-4 text-center">
						<div className="mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
							<span className="text-2xl font-bold text-primary">B</span>
						</div>
						<h3 className="font-semibold">Bass</h3>
						<p className="text-sm text-muted-foreground">Robert Johnson</p>
					</div>
				</div>
			</section>

			{/* Tickets */}
			<section className="rounded-lg border bg-muted/50 p-8">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold">Get Your Tickets</h2>
						<p className="text-muted-foreground">
							Experience this magnificent performance live. Limited seats available.
						</p>
						<div className="flex flex-wrap gap-2">
							<Badge variant="outline">VIP: $150</Badge>
							<Badge variant="outline">Premium: $100</Badge>
							<Badge variant="outline">Standard: $50</Badge>
						</div>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row">
						<Button size="lg" asChild>
							<Link href="/login">Purchase Tickets</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/">Back to Home</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
