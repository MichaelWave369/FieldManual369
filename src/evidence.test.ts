import { describe, expect, it } from 'vitest';
import { evaluateEvidence, createReceipt, type EvidenceInput } from './evidence';

const example: EvidenceInput = {
  claim: 'Hypothesis that a redesign improves usability',
  source: 'https://example.org/study',
  quality: 5, independentSignals: 4, falsifiable: true,
  provenance: 'verified', risk: 'low', assumptions: 'Comparable audiences',
};
describe('Evidence heuristic safeguards', () => {
  it('cannot claim high confidence without a source', () => {
    expect(evaluateEvidence({...example, source: ''}).level).toBeLessThanOrEqual(2);
  });
  it('caps unknown provenance', () => {
    expect(evaluateEvidence({...example, provenance: 'unknown'}).level).toBe(1);
  });
  it('does not treat a simulated result as real-world verification', () => {
    expect(evaluateEvidence({...example, provenance: 'simulated'}).level).toBeLessThanOrEqual(2);
  });
  it('limits single-source and unfalsifiable claims', () => {
    expect(evaluateEvidence({...example, independentSignals: 1, falsifiable: false}).level).toBeLessThanOrEqual(2);
  });
  it('limits high-risk use', () => {
    expect(evaluateEvidence({...example, risk: 'high'}).level).toBeLessThanOrEqual(3);
  });
  it('returns a fully labeled receipt, not a verified truth verdict', () => {
    const receipt = createReceipt(example, new Date('2026-10-11T12:00:00Z'));
    expect(receipt.generatedAt).toBe('2026-10-11T12:00:00.000Z');
    expect(receipt.note).toContain('NOT verified');
  });
});
