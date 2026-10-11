/**
 * Curated educational posters from the user-provided Parallax Builder Curriculum.
 *
 * Binary poster assets are distributed separately until reviewed and imported
 * into /public/posters. Keeping metadata in source means missing artwork never
 * silently becomes a broken experience.
 *
 * The poster artwork is not automatically covered by the repository MIT license.
 */
export type PosterCategory = 'Foundations & Thinking' | 'Knowledge Systems' | 'Product Building' | 'AI Systems' | 'Ledgers & Trust' | 'Security & Abuse Prevention';
export type Poster = {
  number: number;
  slug: string;
  title: string;
  category: PosterCategory;
  chapterId: string;
  file: string;
};
const record = (number: number, slug: string, title: string, category: PosterCategory, chapterId: string): Poster => ({
  number, slug, title, category, chapterId,
  file: 'PBC-' + String(number).padStart(2, '0') + '-' + slug + '.webp',
});
export const posters: Poster[] = [
  record(1,'Systems-Thinking-for-Product-Builders','Systems Thinking for Product Builders','Foundations & Thinking','systems'),
  record(2,'Evidence-Grading-Claims-vs-Signals','How to Grade Evidence and Separate Claims from Signals','Foundations & Thinking','evidence'),
  record(3,'Research-Design-Without-Overclaiming','Research Design: How to Test Ideas Without Overclaiming','Foundations & Thinking','research'),
  record(4,'Governance-Design-Roles-Rules-Accountability','Governance Design: Rules, Roles, and Accountability','Foundations & Thinking','governance'),
  record(5,'Information-Architecture-Complex-Ideas','Information Architecture: Complex Ideas','Knowledge Systems','information'),
  record(6,'Data-Modeling-Entities-Relationships-Schemas','Data Modeling: Entities, Relationships, and Schemas','Knowledge Systems','data'),
  record(7,'Knowledge-Management-for-Founders','Knowledge Management for Founders','Knowledge Systems','knowledge-management'),
  record(8,'Knowledge-Graphs-and-Ontologies','Knowledge Graphs and Ontologies','Knowledge Systems','knowledge-graphs'),
  record(9,'RAG-and-Vector-Databases','RAG and Vector Databases','Knowledge Systems','rag-vector'),
  record(10,'Product-Strategy-Ideas-to-Software','Product Strategy: Ideas to Software','Product Building','product'),
  record(11,'Technical-Spec-Writing-Quick-Guide','Technical Spec Writing: Quick Guide','Product Building','technical-spec-quick'),
  record(12,'Technical-Spec-Writing-Full-Framework','Technical Spec Writing: Full Framework','Product Building','technical-spec-full'),
  record(13,'UX-Design-Complex-Dashboards-AI-Tools','UX Design for Complex Dashboards and AI Tools','Product Building','ux'),
  record(14,'AI-Agent-Architecture-Builder-Checklist','AI Agent Architecture: Builder Checklist','AI Systems','agents'),
  record(15,'AI-Agent-Architecture-Full-Reference-Map','AI Agent Architecture: Full Reference Map','AI Systems','agents'),
  record(16,'Human-in-the-Loop-System-Design','Human-in-the-Loop System Design','AI Systems','human-oversight'),
  record(17,'AI-Evals-and-Observability','AI Evals and Observability','AI Systems','agent-evals'),
  record(18,'Event-Sourcing-and-Append-Only-Ledgers','Event Sourcing and Append-Only Ledgers','Ledgers & Trust','event-ledgers'),
  record(19,'Cybersecurity-AI-Ledger-Systems-Main','Cybersecurity Basics: AI and Ledger Systems','Security & Abuse Prevention','security'),
  record(20,'Cybersecurity-AI-Ledger-Systems-Incident-Response','Cybersecurity: Incident Response','Security & Abuse Prevention','security'),
  record(21,'Threat-Modeling-for-Product-Builders','Threat Modeling for Product Builders','Security & Abuse Prevention','threat-model'),
];
export const categories: PosterCategory[] = [
  'Foundations & Thinking','Knowledge Systems','Product Building',
  'AI Systems','Ledgers & Trust','Security & Abuse Prevention',
];
export function posterAssetUrl(file: string, base = import.meta.env.BASE_URL): string {
  return base + 'posters/' + file;
}
