import { defineCollection, defineContentConfig, z, property } from "@nuxt/content";

// currently not supported; will break the editor

// const domainTags = [
// 	"anthropology",
// 	"archaeology",
// 	"cultural-heritage",
// 	"epigraphy",
// 	"history",
// 	"prosopography",
// ] as const;

// const statusTags = ["ongoing", "concluded", "presentation-site", "archive", "cooperation"] as const;

export default defineContentConfig({
	collections: {
		pages: defineCollection({
			type: "page",
			source: {
				include: "*.md",
			},
			schema: z.object({
				title: z.string(),
			}),
		}),
		team: defineCollection({
			type: "page",
			source: "team/team-members/*.md",
			schema: z.object({
				name: z.string(),
				role: z.string(),
				email: z.string().optional(),
				image: z.string().optional(),
				credit: z.string().optional(),
				order: z.number().optional(),
			}),
		}),
		support: defineCollection({
			type: "page",
			source: "team/support/*.md",
			schema: z.object({
				name: z.string(),
				role: z.string(),
				email: z.string().optional(),
				image: z.string().optional(),
				credit: z.string().optional(),
				order: z.number().optional(),
			}),
		}),
		contributors: defineCollection({
			type: "data",
			source: "team/contributors/*.yaml",
			schema: z.object({
				contributors: z.array(
					z.object({
						name: z.string(),
					}),
				),
			}),
		}),
		software: defineCollection({
			type: "data",
			source: "software/*.yaml",
			schema: z.object({
				name: z.string(),
				description: z.string(),
				image: z.string().optional(),
				link: z.string(),
				license: z.string(),
			}),
		}),
		projects: defineCollection({
			type: "data",
			source: "projects/*.yaml",
			schema: z.object({
				title: z.string(),
				description: property(z.string()).editor({ input: "textarea" }),
				image: z.string(),
				credit: z.string(),
				yearStart: z.string(),
				yearEnd: z.string().optional(),
				presentationSite: z.string().optional(),
				// currently enums / sinlge and multiple selects are not supported by nuxt studio must revisited
				domainTags: z.array(z.string()),
				statusTags: z.array(z.string()),
				pi: z.string(),
				logos: z
					.array(
						z.object({
							imageSource: z.string(),
							imageLink: z.string().optional(),
						}),
					)
					.optional(),
			}),
		}),
		news: defineCollection({
			type: "page",
			source: "news/**/*.md",
			schema: z.object({
				date: z.string(),
				title: z.string(),
				link: z.string().optional(),
			}),
		}),
		events: defineCollection({
			type: "data",
			source: "events/**/*.yaml",
			schema: z.object({
				date: z.string(),
				event: z.string(),
				eventLink: z.string().optional(),
				eventTitle: z.string().optional(),
				titles: z.array(z.string()).optional(),
				country: z.string().optional(),
				city: z.string().optional(),
				institution: z.string().optional(),
				documents: z.array(
					z.object({
						label: z.string(),
						url: z.string(),
					}),
				),
			}),
		}),
	},
});
