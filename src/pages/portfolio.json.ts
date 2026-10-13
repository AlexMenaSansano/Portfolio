import { sitePath } from '../lib/paths';
import type { APIRoute } from 'astro';
import { collections, person, projects } from '../data/portfolio';

export const GET: APIRoute = () => new Response(JSON.stringify({
  name: person.name,
  role: person.role,
  evidenceAsOf: '2026-09',
  projects: projects.map(project => ({
    client: project.client,
    title: project.title,
    description: project.description,
    years: project.year,
    status: project.status,
    evidence: `${project.proof} ${project.proofLabel}`,
    outcome: project.outcome,
    limits: project.limits,
    lenses: project.lenses,
    path: sitePath(`/work/${project.slug}/`),
  })),
  selections: collections.map(collection => ({
    label: collection.label,
    path: sitePath(`/focus/${collection.slug}/`),
    projectPaths: collection.ids.map(id => sitePath(`/work/${id}/`)),
  })),
}, null, 2), {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
