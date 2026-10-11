export type Group = 'Intelligence' | 'Design' | 'Research' | 'Trust';
export type Chapter = {
  id: string;
  number: string;
  title: string;
  kicker: string;
  group: Group;
  symbol: string;
  summary: string;
  essentials: {heading: string; body: string}[];
  practice: string;
  principle: string;
  resources: {label: string; url: string}[];
};

export const chapters: Chapter[] = [
  { id:'agents',number:'01',title:'AI Agent Architecture',kicker:'THINK · ACT · AUDIT',group:'Intelligence',symbol:'◎',summary:'Understand models, tools, retrieval, orchestration, memory, permissions, and evaluation as one governed system.',
    essentials:[
      {heading:'An agent is a system',body:'A model predicts and reasons over context. A runtime connects it to approved tools, data, state, and workflows. The model is only one part.'},
      {heading:'Control actions at the boundary',body:'Treat tool arguments and outputs as untrusted until validated. Require narrow permissions and human approval for irreversible effects.'},
      {heading:'Separate retrieval from memory',body:'Retrieval finds relevant external knowledge. Memory records selected context, preferences, or past outcomes with explicit retention rules.'}],
    practice:'Sketch a three-step assistant. Name every tool, its allowed scope, an approval point, and the receipt left behind.',
    principle:'More automation without more accountability is not progress.',
    resources:[{label:'NIST AI Risk Management Framework',url:'https://www.nist.gov/itl/ai-risk-management-framework'}]},
  { id:'ux',number:'02',title:'UX for Complex Dashboards',kicker:'ORIENT · DECIDE · ACT',group:'Design',symbol:'◈',summary:'Reduce cognitive load through orientation, progressive disclosure, useful warnings, and meaningful consent.',
    essentials:[
      {heading:'Orientation before control',body:'Show where a person is, what matters now, and the next safe step before offering advanced controls.'},
      {heading:'Layer complexity',body:'Begin with essentials. Reveal details, comparisons, and diagnostics as the user needs them.'},
      {heading:'Warnings should lead somewhere',body:'Communicate severity, explain impact, and provide a clear recommended action or recovery path.'}],
    practice:'Take a crowded dashboard and draw a three-level information hierarchy: essentials, context, and expert diagnostics.',
    principle:'A beautiful interface that hides consequences is a broken interface.',
    resources:[{label:'W3C WCAG 2.2',url:'https://www.w3.org/TR/WCAG22/'}]},
  { id:'product',number:'03',title:'Product Strategy',kicker:'DISCOVER · VALIDATE · SHIP',group:'Design',symbol:'↗',summary:'Find an urgent problem, test risky assumptions early, build a small useful product, and measure outcomes.',
    essentials:[
      {heading:'Start with a real pain',body:'Describe who struggles, how often, why alternatives fall short, and what failure costs.'},
      {heading:'MVP means experiment',body:'Build the smallest test that can meaningfully invalidate your riskiest assumption. Feature count is not the goal.'},
      {heading:'Outputs are not outcomes',body:'A feature shipped is an output. A measurable improvement in user experience is an outcome.'}],
    practice:'Write one problem statement, one falsifiable hypothesis, and one seven-day experiment with a measurable stopping rule.',
    principle:'A roadmap should track learning and outcomes, not wishful deadlines.',
    resources:[{label:'UK Government Service Manual',url:'https://www.gov.uk/service-manual'}]},
  { id:'evidence',number:'04',title:'Evidence & Claims',kicker:'SIGNAL · INTERPRET · TEST',group:'Research',symbol:'✳',summary:'Distinguish observations from interpretations, document provenance, and grade confidence without overclaiming.',
    essentials:[
      {heading:'A signal is not a conclusion',body:'One observation can support several explanations. Explicitly record the alternatives.'},
      {heading:'Confidence has a ceiling',body:'Weak sources, missing provenance, and absent replication constrain responsible confidence even when a story sounds convincing.'},
      {heading:'Ask what would change your mind',body:'Write a disconfirming test before interpreting results. Keep observation, inference, simulation, and verification separate.'}],
    practice:'Use the Evidence Lab to record a claim, its source, origin, independent signals, testability, and assumptions.',
    principle:'Ledger above ego: a claim earns confidence through evidence, not enthusiasm.',
    resources:[{label:'Stanford Encyclopedia: Scientific Method',url:'https://plato.stanford.edu/entries/scientific-method/'}]},
  { id:'information',number:'05',title:'Information Architecture',kicker:'FIND · UNDERSTAND · USE',group:'Design',symbol:'⌘',summary:'Design taxonomies, labels, metadata, knowledge maps, and retrieval paths that make complex information findable.',
    essentials:[
      {heading:'Organize for people',body:'Build structures around users’ tasks and mental models, not internal team names.'},
      {heading:'A schema is a promise',body:'Define entities, fields, constraints, and relationships so information stays understandable as a system grows.'},
      {heading:'Findability is engineered',body:'Navigation, metadata, search, and consistent labels reinforce each other.'}],
    practice:'Invent six categories for a document library; test whether five sample items can be filed and found without ambiguity.',
    principle:'Structure is useful when it survives growth.',
    resources:[{label:'W3C Data on the Web Best Practices',url:'https://www.w3.org/TR/dwbp/'}]},
  { id:'systems',number:'06',title:'Systems Thinking',kicker:'LOOPS · LIMITS · EFFECTS',group:'Research',symbol:'∞',summary:'See feedback loops, bottlenecks, incentives, and delayed second-order consequences instead of isolated features.',
    essentials:[
      {heading:'Follow the loop',body:'A reinforcing loop amplifies a change; a balancing loop counteracts one. Label the direction of each influence.'},
      {heading:'Find the constraint',body:'A system’s throughput is often limited by one bottleneck. Improving everything else may only pile up work.'},
      {heading:'Watch the delayed effects',body:'New alerts might improve short-term engagement while eventually causing fatigue. Record time delays and possible unintended outcomes.'}],
    practice:'Map one product change through an immediate output, a delayed outcome, and a second-order risk.',
    principle:'Changing one part changes the behavior of the whole.',
    resources:[{label:'MIT System Dynamics Group',url:'https://web.mit.edu/sysdyn/'}]},
  { id:'governance',number:'07',title:'Governance Design',kicker:'AUTHORITY · FAIRNESS · REVIEW',group:'Trust',symbol:'⚖',summary:'Define who decides what, how exceptions work, and how decisions are recorded, challenged, and improved.',
    essentials:[
      {heading:'Authority needs a boundary',body:'Write down who proposes, authorizes, implements, audits, and appeals every consequential decision.'},
      {heading:'Separate duties',body:'Do not let one actor propose, approve, and conceal a high-stakes action without oversight.'},
      {heading:'Make review real',body:'Give people a clear path to understand a decision, challenge it, and obtain a proportionate review.'}],
    practice:'Create a RACI table for a production release including owner, reviewer, security approver, and affected users.',
    principle:'Power without review is a design defect.',
    resources:[{label:'NIST AI RMF: GOVERN',url:'https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF/Foundational_Information/2-core'}]},
  { id:'research',number:'08',title:'Research Design',kicker:'HYPOTHESIZE · CONTROL · REPLICATE',group:'Research',symbol:'⌬',summary:'Test precise hypotheses with appropriate study designs, controls, reporting, and reproducibility.',
    essentials:[
      {heading:'Specify the question',body:'Distinguish independent variables, outcomes, confounders, and the population you can actually study.'},
      {heading:'Protect against false certainty',body:'Plan controls, sample size, missing-data handling, and analysis before looking at the outcome.'},
      {heading:'Replicate and bound',body:'Report effect size, uncertainty, limitations, and where the finding might not generalize.'}],
    practice:'Draft a preregistered test: hypothesis, outcome, control, sample plan, exclusion criteria, and what failure would mean.',
    principle:'A null or mixed result is useful when honestly reported.',
    resources:[{label:'EQUATOR Research Reporting Guidelines',url:'https://www.equator-network.org/'}]},
  { id:'security',number:'09',title:'Cybersecurity for AI & Ledgers',kicker:'PREVENT · DETECT · RECOVER',group:'Trust',symbol:'⬡',summary:'Threat-model assets and actors, enforce least privilege, protect secrets, and maintain observable, testable defenses.',
    essentials:[
      {heading:'Define trust boundaries',body:'Trace every input, tool, API, storage layer, and permission transition. Treat model output as untrusted until checked.'},
      {heading:'Protect integrity',body:'Use standard signatures, tamper-evident audit logs, access controls, and controlled rotation. Never treat logs alone as proof of authenticity.'},
      {heading:'Prepare for failure',body:'Backups, monitoring, incident handling, and recovery plans are part of the system, not afterthoughts.'}],
    practice:'Threat-model an agent that can read documents and send messages. Specify allowed resources and an approval gate.',
    principle:'An agent should have only the authority it actually needs.',
    resources:[{label:'NIST Cybersecurity Framework 2.0',url:'https://www.nist.gov/cyberframework'}]},
  { id:'data',number:'10',title:'Data Modeling & Ledgers',kicker:'ENTITY · EVENT · RECEIPT',group:'Intelligence',symbol:'▦',summary:'Model entities, relationships, schemas, events, and auditable records that survive change.',
    essentials:[
      {heading:'Model the real rules',body:'Choose clear identifiers and cardinalities; enforce constraints where data enters, not only in interface forms.'},
      {heading:'Events record what happened',body:'Capture actions in past tense, along with who, when, what, and relevant context. Events and current state answer different questions.'},
      {heading:'A ledger must reconcile',body:'Use immutable audit records and appropriate integrity checks; financial double-entry is a specific discipline, not merely a list of transactions.'}],
    practice:'Model a user, project, decision, approval, and audit receipt with keys, relationships, and validation rules.',
    principle:'Good data modeling makes disagreement and change inspectable.',
    resources:[{label:'W3C PROV Overview',url:'https://www.w3.org/TR/prov-overview/'}]},

  { id:'knowledge-management',number:'11',title:'Knowledge Management for Founders',kicker:'CAPTURE · ORGANIZE · RETRIEVE',group:'Intelligence',symbol:'▤',
    summary:'Turn scattered notes, decisions, and lessons into a searchable, maintained system with clear ownership and source history.',
    essentials:[
      {heading:'Capture context, not just content',body:'A decision without a date, owner, alternatives, and evidence is difficult to reuse. Store the reasoning and intended review date.'},
      {heading:'Prefer one trusted record',body:'Define canonical locations for specifications and decisions. Make drafts and historical versions discoverable without mistaking them for current policy.'},
      {heading:'Review what has expired',body:'Assign content stewards and refresh schedules. Use links, tags, and search to connect related work rather than creating redundant copies.'}],
    practice:'Create a five-field decision record: question, owner, evidence, decision, and review trigger.',
    principle:'A useful archive helps someone make a better decision today.',
    resources:[{label:'W3C PROV Overview',url:'https://www.w3.org/TR/prov-overview/'}]},
  { id:'knowledge-graphs',number:'12',title:'Knowledge Graphs & Ontologies',kicker:'ENTITIES · LINKS · MEANING',group:'Intelligence',symbol:'⌘',
    summary:'Model concepts as typed entities and relationships so people and software can traverse meaning beyond simple tags.',
    essentials:[
      {heading:'Identify things and relationships',body:'Choose stable identifiers for entities and define predicates that explain how entities relate.'},
      {heading:'Distinguish a graph from an ontology',body:'A knowledge graph stores statements and connections. An ontology formalizes classes, meanings, and constraints so relationships can be interpreted consistently.'},
      {heading:'Keep evidence connected',body:'Attach sources and provenance to claims and edges. Similarity or co-occurrence alone does not establish causality.'}],
    practice:'Draw eight entities from a project and define five named relationships, including source links and one disputed edge.',
    principle:'A connection becomes useful when its meaning and origin can be inspected.',
    resources:[{label:'W3C RDF 1.1 Concepts',url:'https://www.w3.org/TR/rdf11-concepts/'}]},
  { id:'rag-vector',number:'13',title:'RAG & Vector Databases',kicker:'RETRIEVE · GROUND · CITE',group:'Intelligence',symbol:'◇',
    summary:'Build retrieval systems that find relevant documents, manage context, and give answers grounded in inspectable sources.',
    essentials:[
      {heading:'Retrieval is not memory',body:'An index retrieves selected source passages in response to a question. Long-term agent memory follows different collection, retention, and authorization rules.'},
      {heading:'Vectors are one search tool',body:'Embedding similarity can surface related text; lexical search, metadata filters, reranking, and access checks remain important.'},
      {heading:'Evaluate grounding explicitly',body:'Measure retrieval recall, citation support, hallucination rate, latency, and permissions separately. A confident answer may still be unsupported.'}],
    practice:'Design a four-stage retrieval pipeline with access filtering, ranking, citation handling, and a no-answer outcome.',
    principle:'Never let a polished answer outrun its sources.',
    resources:[{label:'NIST AI Risk Management Framework',url:'https://www.nist.gov/itl/ai-risk-management-framework'}]},
  { id:'technical-spec-quick',number:'14',title:'Technical Specification: Quick Guide',kicker:'SCOPE · DEFINE · VERIFY',group:'Design',symbol:'▧',
    summary:'Write small specifications that turn vague ideas into explicit behaviors, boundaries, and acceptance checks.',
    essentials:[
      {heading:'Name the user and the problem',body:'State the outcome to change and the constraints that matter. Exclude unrelated goals rather than silently accumulating them.'},
      {heading:'Describe observable behavior',body:'Specify inputs, outputs, states, errors, and permissions in language a tester can verify.'},
      {heading:'Include acceptance criteria',body:'Describe what evidence makes work DONE and what blocks shipping. Name the rollback path for risky changes.'}],
    practice:'Write a one-page specification for a search feature with an edge case, failure state, and test plan.',
    principle:'A specification should make disagreement visible before code is written.',
    resources:[{label:'UK Government Service Manual',url:'https://www.gov.uk/service-manual'}]},
  { id:'technical-spec-full',number:'15',title:'Technical Specification: Full Framework',kicker:'REQUIREMENTS · RISKS · PROOFS',group:'Design',symbol:'▥',
    summary:'Extend a short specification into a reviewable implementation contract with architecture, testing, and release constraints.',
    essentials:[
      {heading:'Separate functional from quality needs',body:'Document core workflows alongside performance, availability, privacy, accessibility, and maintainability expectations.'},
      {heading:'Record decisions and tradeoffs',body:'Link requirements to design choices, alternatives, risk owners, data flows, and external dependencies.'},
      {heading:'Plan verification and change',body:'Define tests, migration strategy, observability, compatibility, deployment controls, and the evidence required to release.'}],
    practice:'Produce an implementation checklist that traces six requirements to tests, approval boundaries, and rollback criteria.',
    principle:'The strongest specifications connect every promise to a verification method.',
    resources:[{label:'OWASP Application Security Verification Standard',url:'https://owasp.org/www-project-application-security-verification-standard/'}]},
  { id:'human-oversight',number:'16',title:'Human-in-the-Loop Systems',kicker:'PROPOSE · APPROVE · ACCOUNT',group:'Trust',symbol:'⚖',
    summary:'Design human decisions as meaningful controls, not decorative confirmation buttons.',
    essentials:[
      {heading:'Classify action risk',body:'Differentiate read-only tasks, reversible edits, sensitive disclosures, and irreversible external actions. Gate the consequences, not the buzzwords.'},
      {heading:'Present reviewable evidence',body:'Before approval, show intended action, target, parameters, uncertainty, side effects, and a safe cancellation path.'},
      {heading:'Bind approval to the exact action',body:'Record who approved what, when, and under which conditions. Reapprove if the plan changes materially or approval expires.'}],
    practice:'Design an approval screen for a tool that can send an email. Specify what changes trigger a new approval.',
    principle:'Approval is only real when the reviewer can understand and refuse the action.',
    resources:[{label:'NIST AI RMF Playbook',url:'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook'}]},
  { id:'agent-evals',number:'17',title:'AI Evals & Observability',kicker:'MEASURE · TRACE · IMPROVE',group:'Research',symbol:'◉',
    summary:'Assess task quality, tool behavior, safety, cost, and reliability with reproducible evaluations and traces.',
    essentials:[
      {heading:'Start with failure cases',body:'Build representative datasets including ambiguous requests, missing information, tool errors, and adversarial inputs.'},
      {heading:'Separate signals from judgments',body:'Track exact tool calls, inputs, outputs, retry counts, latencies, and costs. Use transparent criteria for quality and safety.'},
      {heading:'Make regressions actionable',body:'Freeze evaluation versions, compare results across runs, inspect failures, and document the decisions before release.'}],
    practice:'Create an evaluation matrix for an agent with five test cases, expected behavior, severity, and evidence receipts.',
    principle:'An AI system that cannot be evaluated cannot be responsibly trusted.',
    resources:[{label:'NIST AI Risk Management Framework',url:'https://www.nist.gov/itl/ai-risk-management-framework'}]},
  { id:'event-ledgers',number:'18',title:'Event Sourcing & Append-Only Ledgers',kicker:'EVENT · REPLAY · RECONCILE',group:'Intelligence',symbol:'⎔',
    summary:'Represent changes as sequenced events and build verifiable histories without confusing a log with a tamperproof ledger.',
    essentials:[
      {heading:'Events capture committed facts',body:'Use past-tense event names, ordered identifiers, schema versions, and actor/time/context fields.'},
      {heading:'Rebuild state deliberately',body:'Project events into current views. Design idempotency, correction events, migrations, and snapshotting for deterministic replay.'},
      {heading:'Audit integrity is a separate control',body:'Append-only storage alone does not prevent privileged alteration. Use access control, hashes, independent backups, and reconciliation.'}],
    practice:'Model a two-step approval as events; replay them and show how a correction gets appended without erasing history.',
    principle:'The ledger should preserve what happened, even when it is inconvenient.',
    resources:[{label:'W3C PROV Overview',url:'https://www.w3.org/TR/prov-overview/'}]},
  { id:'threat-model',number:'19',title:'Threat Modeling for Product Builders',kicker:'BOUNDARIES · THREATS · MITIGATIONS',group:'Trust',symbol:'⬡',
    summary:'Identify assets, threats, trust boundaries, and practical mitigations before the dangerous surprises arrive.',
    essentials:[
      {heading:'Map assets and boundaries',body:'Identify data, credentials, users, storage, integrations, and the transitions where trust assumptions change.'},
      {heading:'Consider multiple attackers',body:'Test external and insider misuse, prompt injection, overscoped credentials, supply-chain compromise, and untrusted uploads.'},
      {heading:'Verify mitigations',body:'Assign ownership, choose prevention/detection/recovery controls, and document tests that demonstrate actual risk reduction.'}],
    practice:'Threat-model a file-upload-to-AI-summary pipeline and describe three abuse cases and their controls.',
    principle:'An entry point is a promise that someone will eventually test it.',
    resources:[{label:'OWASP Threat Modeling',url:'https://owasp.org/www-community/Threat_Modeling'}]},
];
