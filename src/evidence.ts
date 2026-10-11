/**
 * A transparent educational heuristic, NOT a calibrated probability or
 * automated determination that a claim is true. Never silently infer provenance.
 */
export type Provenance = 'verified' | 'observed' | 'inferred' | 'simulated' | 'unknown';
export type Risk = 'low' | 'moderate' | 'high';
export type EvidenceInput = {
  claim: string;
  source: string;
  quality: number;
  independentSignals: number;
  falsifiable: boolean;
  provenance: Provenance;
  risk: Risk;
  assumptions: string;
};
export type EvidenceResult = {
  level: number;
  label: string;
  limitations: string[];
  checks: string[];
  basis: string;
};
const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, Math.round(Number.isFinite(value) ? value : low)));

export function evaluateEvidence(input: EvidenceInput): EvidenceResult {
  const quality = clamp(input.quality, 1, 5);
  const signals = clamp(input.independentSignals, 0, 5);
  const provenanceCeiling: Record<Provenance, number> = {
    verified: 5, observed: 4, inferred: 3, simulated: 2, unknown: 1,
  };
  const riskCeiling: Record<Risk, number> = {low: 5, moderate: 4, high: 3};
  const signalCeiling = signals === 0 ? 2 : signals === 1 ? 3 : signals === 2 ? 4 : 5;
  const level = Math.min(
    quality,
    signalCeiling,
    provenanceCeiling[input.provenance] ?? 1,
    riskCeiling[input.risk] ?? 3,
    input.source.trim() ? 5 : 2,
    input.falsifiable ? 5 : 2,
    input.claim.trim() ? 5 : 1,
  );
  const names = ['','Very tentative','Tentative','Moderate','Strong','Very strong'];
  const limitations: string[] = [];
  if (!input.source.trim()) limitations.push('No identifiable source has been supplied.');
  if (signals < 2) limitations.push('Independent corroboration is limited.');
  if (input.provenance === 'unknown') limitations.push('The signal origin is unknown.');
  if (input.provenance === 'simulated') limitations.push('Simulation is not real-world validation.');
  if (input.provenance === 'inferred') limitations.push('This is an interpretation, not a direct observation.');
  if (!input.falsifiable) limitations.push('No clear way to challenge or disconfirm this claim was supplied.');
  if (!input.assumptions.trim()) limitations.push('Underlying assumptions have not been documented.');
  if (input.risk === 'high') limitations.push('High-stakes decisions require independent expert review.');
  if (!input.claim.trim()) limitations.push('Enter a specific, testable claim.');
  return {
    level,
    label: names[level],
    limitations,
    checks: [
      'Verify original source and how the evidence was collected.',
      'Look for independent evidence and plausible alternative explanations.',
      'Document disconfirming observations and what would change this assessment.',
    ],
    basis: 'Heuristic level 1–5, capped by source, provenance, corroboration, testability and decision risk; not a statistical probability.',
  };
}

export function createReceipt(input: EvidenceInput, now = new Date()) {
  return {
    schema: 'fieldmanual369.evidence-receipt.v1',
    generatedAt: now.toISOString(),
    note: 'Self-assessed educational exercise. Source authenticity is NOT verified by this tool.',
    input,
    assessment: evaluateEvidence(input),
  };
}
