import { useEffect, useMemo, useState } from 'react';
import { chapters, type Chapter, type Group } from './data';
import { createReceipt, evaluateEvidence, type EvidenceInput } from './evidence';

type View = { page: 'library' | 'chapter' | 'lab' | 'map'; chapter?: string };
type Filter = 'All topics' | Group;
const filters: Filter[] = ['All topics', 'Intelligence', 'Design', 'Research', 'Trust'];

const initialEvidence: EvidenceInput = {
  claim: 'A shorter onboarding flow improves week-one activation.',
  source: '',
  quality: 3,
  independentSignals: 1,
  falsifiable: true,
  provenance: 'inferred',
  risk: 'moderate',
  assumptions: 'The same user population is compared across equivalent time periods.',
};
function parseRoute(): View {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash === 'lab') return {page:'lab'};
  if (hash === 'map') return {page:'map'};
  if (hash.startsWith('chapter/')) {
    const chapter = hash.slice(8);
    if (chapters.some(item => item.id === chapter)) return {page:'chapter', chapter};
  }
  return {page:'library'};
}
function readProgress(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('fm369-studied-v1') || '[]');
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && chapters.some(c => c.id === item)) : [];
  } catch { return []; }
}
function SideNav({ view, navigate, progress }: {view:View; navigate:(view:View)=>void; progress:string[]}) {
  return <aside className="sidebar">
    <button className="brand" onClick={() => navigate({page:'library'})} aria-label="FieldManual369 home">
      <span className="brand-icon">✳</span>
      <span><strong>FIELD<span className="brand-accent">MANUAL</span></strong><small>369 / KNOWLEDGE SYSTEMS</small></span>
    </button>
    <div className="nav-caption">THE FIELD GUIDE</div>
    <nav className="main-nav" aria-label="Primary navigation">
      <button className={view.page === 'library' || view.page === 'chapter' ? 'active' : ''} onClick={() => navigate({page:'library'})}><span>▦</span> Chapter Library <i>10</i></button>
      <button className={view.page === 'lab' ? 'active' : ''} onClick={() => navigate({page:'lab'})}><span>✳</span> Evidence Lab <i className="live">LIVE</i></button>
      <button className={view.page === 'map' ? 'active' : ''} onClick={() => navigate({page:'map'})}><span>⌘</span> Learning Map</button>
    </nav>
    <div className="side-rule" />
    <div className="nav-caption">FIELD NOTES</div>
    <p className="side-description">A practical learning environment for engineering systems that deserve to be trusted.</p>
    <div className="side-progress">
      <div className="side-progress-head"><span>Chapters studied</span><b>{progress.length}/10</b></div>
      <div className="progress-track"><div style={{width: (progress.length / chapters.length * 100) + '%'}} /></div>
      <small>Saved privately in this browser</small>
    </div>
    <div className="sidebar-bottom">
      <span className="signal-dot" /> OPEN SOURCE · v0.1
      <a href="https://github.com/MichaelWave369/FieldManual369" target="_blank" rel="noopener noreferrer">VIEW ON GITHUB ↗</a>
    </div>
  </aside>;
}
function ProgressTag({ done }: {done:boolean}) {
  return <span className={'progress-tag ' + (done ? 'done' : '')}>{done ? '✓ STUDIED' : '○ NOT STUDIED'}</span>;
}
function Card({ chapter, done, onOpen }: {chapter:Chapter; done:boolean; onOpen:()=>void}) {
  return <article className="chapter-card">
    <div className="card-top"><span className="chapter-num">{chapter.number} / MANUAL</span><span className="chapter-symbol">{chapter.symbol}</span></div>
    <span className="group-tag">{chapter.group.toUpperCase()}</span>
    <h3>{chapter.title}</h3>
    <p>{chapter.summary}</p>
    <div className="card-foot"><ProgressTag done={done}/><button onClick={onOpen} aria-label={'Read ' + chapter.title}>EXPLORE <span aria-hidden="true">↗</span></button></div>
  </article>;
}
function Library({navigate,progress}:{navigate:(view:View)=>void;progress:string[]}) {
  const [query,setQuery] = useState('');
  const [filter,setFilter] = useState<Filter>('All topics');
  const matches=useMemo(() => chapters.filter(item =>
    (filter === 'All topics' || item.group === filter) &&
    (item.title + ' ' + item.summary + ' ' + item.kicker).toLowerCase().includes(query.trim().toLowerCase())
  ),[query,filter]);
  return <>
    <div className="breadcrumb">FIELD MANUAL / <strong>OVERVIEW</strong></div>
    <header className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="tiny-sun">✳</span> THE INTERACTIVE FIELD MANUAL · VOL. 001</span>
        <h1>Build systems<br/><em>worth trusting.</em></h1>
        <p>Explore the architecture of intelligent products. Test assumptions, trace decisions, and turn complex ideas into grounded engineering.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => document.getElementById('chapter-grid')?.scrollIntoView({behavior:'smooth'})}>EXPLORE THE MANUAL <span>↗</span></button>
          <button className="secondary-button" onClick={() => navigate({page:'lab'})}>OPEN EVIDENCE LAB <span>→</span></button>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
        <div className="orbit-center">✳<small>369</small></div>
        <div className="orbit-point point-a">◈</div><div className="orbit-point point-b">◇</div><div className="orbit-point point-c">◎</div><div className="orbit-point point-d">⌬</div>
        <span className="orbit-note note-one">SIGNAL → EVIDENCE</span><span className="orbit-note note-two">DECISION → RECEIPT</span>
      </div>
    </header>
    <div className="stat-row">
      <div><b>10</b><span>CORE CHAPTERS</span></div>
      <div><b>01</b><span>INTERACTIVE LAB</span></div>
      <div><b>∞</b><span>QUESTIONS TO TEST</span></div>
      <div className="stat-mantra"><span>THE METHOD</span><strong>Learn. Test. Build. Verify.</strong></div>
    </div>
    <section className="library-section" id="chapter-grid">
      <div className="section-head"><div><span className="eyebrow">01 / THE KNOWLEDGE BASE</span><h2>Explore the field<span className="period">.</span></h2><p>Ten interconnected disciplines. One more thoughtful way to build.</p></div><span className="section-meta">LIBRARY / 001—010</span></div>
      <div className="searchbar"><label className="search-input"><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search chapters, concepts, or skills…" aria-label="Search chapters"/></label><span className="search-count">{matches.length} RESULTS</span></div>
      <div className="filters" aria-label="Filter chapters">{filters.map(item=><button key={item} onClick={()=>setFilter(item)} className={filter===item?'selected':''} aria-pressed={filter===item}>{item}</button>)}</div>
      <div className="chapter-grid">{matches.map(chapter=><Card key={chapter.id} chapter={chapter} done={progress.includes(chapter.id)} onOpen={()=>navigate({page:'chapter',chapter:chapter.id})}/>)}</div>
      {matches.length===0 && <div className="empty-state"><h3>No chapters found</h3><p>Try a broader term or choose All topics.</p><button className="secondary-button" onClick={()=>{setQuery('');setFilter('All topics');}}>CLEAR FILTERS</button></div>}
    </section>
    <section className="lower-banner"><span className="eyebrow">BUILT FOR CURIOUS MINDS</span><h2>Question everything.<br/><em>Document what survives.</em></h2><p>The Evidence Lab gives every claim a transparent, exportable self-assessment. No mysterious truth scores. No claims of verification we cannot actually perform.</p><button className="primary-button" onClick={()=>navigate({page:'lab'})}>ENTER THE LAB ↗</button></section>
  </>;
}
function ChapterPage({chapter,done,toggle,navigate}:{chapter:Chapter;done:boolean;toggle:()=>void;navigate:(view:View)=>void}) {
  const index=chapters.findIndex(item=>item.id===chapter.id);
  const next=chapters[(index+1)%chapters.length];
  return <>
    <div className="breadcrumb"><button onClick={()=>navigate({page:'library'})}>FIELD MANUAL</button> / <strong>CHAPTER {chapter.number}</strong></div>
    <div className="chapter-hero"><span className="eyebrow">CHAPTER {chapter.number} / {chapter.group.toUpperCase()}</span><div className="chapter-hero-title"><div><h1>{chapter.title}<span className="period">.</span></h1><p>{chapter.summary}</p></div><div className="big-glyph" aria-hidden="true">{chapter.symbol}</div></div><div className="chapter-info"><span>FIELD NOTE · {chapter.kicker}</span><ProgressTag done={done}/></div></div>
    <div className="chapter-layout"><div>
      <div className="section-head small"><div><span className="eyebrow">THE ESSENTIALS</span><h2>Three things to know<span className="period">.</span></h2></div></div>
      <div className="lesson-stack">{chapter.essentials.map((lesson,i)=><div className="lesson" key={lesson.heading}><div className="lesson-number">{String(i+1).padStart(2,'0')}</div><div><h3>{lesson.heading}</h3><p>{lesson.body}</p></div></div>)}</div>
      <div className="practice-card"><span className="eyebrow">YOUR FIELD EXERCISE</span><h3>Apply what you learned</h3><p>{chapter.practice}</p>{chapter.id === 'evidence' && <button className="primary-button" onClick={()=>navigate({page:'lab'})}>LAUNCH EVIDENCE LAB ↗</button>}</div>
    </div><aside className="chapter-aside"><span className="eyebrow">THE PRINCIPLE</span><blockquote>“{chapter.principle}”</blockquote><hr/><span className="eyebrow">SOURCE TO EXPLORE</span>{chapter.resources.map(item=><a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}<p className="reference-note">Sources provide broader background. The original chapter summaries are not endorsements by those organizations.</p><hr/><button className={'complete-button '+(done?'completed':'')} onClick={toggle}>{done?'✓ MARKED AS STUDIED':'○ MARK AS STUDIED'}</button><small>Progress is saved on this device only.</small></aside></div>
    <div className="next-chapter"><div><span className="eyebrow">CONTINUE EXPLORING</span><h3>{next.number} / {next.title}</h3></div><button onClick={()=>navigate({page:'chapter',chapter:next.id})}>NEXT CHAPTER →</button></div>
  </>;
}
function EvidenceLab() {
  const [input,setInput]=useState<EvidenceInput>(initialEvidence);
  const result=useMemo(()=>evaluateEvidence(input),[input]);
  function update<K extends keyof EvidenceInput>(field:K,value:EvidenceInput[K]) {
    setInput(prev=>({...prev,[field]:value}));
  }
  function exportReceipt() {
    const payload=JSON.stringify(createReceipt(input),null,2);
    const url=URL.createObjectURL(new Blob([payload],{type:'application/json'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='fieldmanual369-evidence-receipt.json';anchor.click();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  return <>
    <div className="breadcrumb">FIELD MANUAL / <strong>EVIDENCE LAB</strong></div>
    <div className="lab-heading"><span className="eyebrow">EXPERIMENT 001 · SIGNAL / CLAIM / CONCLUSION</span><h1>Test the claim<span className="period">.</span><br/><em>Not your conviction.</em></h1><p>This local, educational worksheet exposes confidence limits. It does not browse sources, prove claims, or calculate statistical probabilities.</p></div>
    <div className="lab-layout">
      <section className="lab-form"><div className="panel-title"><span>01 / RECORD THE SIGNAL</span><span>SELF-REPORTED</span></div>
        <div className="form-grid">
          <label className="field full">Claim to evaluate<textarea rows={3} value={input.claim} onChange={e=>update('claim',e.target.value)} placeholder="A specific, testable claim"/></label>
          <label className="field full">Source or reference<input type="text" value={input.source} onChange={e=>update('source',e.target.value)} placeholder="URL, DOI, experiment ID, or original document"/></label>
          <label className="field">Signal provenance<select value={input.provenance} onChange={e=>update('provenance',e.target.value as EvidenceInput['provenance'])}><option value="unknown">Unknown</option><option value="observed">Observed</option><option value="verified">Verified (self-reported)</option><option value="inferred">Inferred</option><option value="simulated">Simulated</option></select></label>
          <label className="field">Decision risk<select value={input.risk} onChange={e=>update('risk',e.target.value as EvidenceInput['risk'])}><option value="low">Low</option><option value="moderate">Moderate</option><option value="high">High</option></select></label>
          <label className="field full">Evidence quality <span className="field-value">{input.quality}/5</span><input type="range" min="1" max="5" step="1" value={input.quality} onChange={e=>update('quality',Number(e.target.value))}/><span className="range-labels"><span>Weak / anecdotal</span><span>Replicated / low bias</span></span></label>
          <label className="field full">Independent corroborating signals <span className="field-value">{input.independentSignals}</span><input type="range" min="0" max="5" step="1" value={input.independentSignals} onChange={e=>update('independentSignals',Number(e.target.value))}/><span className="range-labels"><span>None</span><span>Five or more</span></span></label>
          <label className="field full">Assumptions / limitations<textarea rows={3} value={input.assumptions} onChange={e=>update('assumptions',e.target.value)} placeholder="What are we assuming to be true?"/></label>
          <label className="checkbox-field full"><input type="checkbox" checked={input.falsifiable} onChange={e=>update('falsifiable',e.target.checked)}/><span><strong>There is a possible disconfirming test</strong><small>Can you name an observation that would change your conclusion?</small></span></label>
        </div>
      </section>
      <section className="lab-output" aria-live="polite"><div className="panel-title"><span>02 / ASSESS THE CLAIM</span><span>HEURISTIC ONLY</span></div>
        <div className="score-stage"><span className="eyebrow">CURRENT CONFIDENCE CEILING</span><div className="score-circle"><strong>{result.level}</strong><small>/ 5</small></div><h2>{result.label}</h2><p>Assessment ceiling based on self-reported inputs. This is not a probability that the claim is true.</p></div>
        <div className="score-steps">{[1,2,3,4,5].map(n=><span key={n} className={n<=result.level?'on':''} aria-label={'Level '+n}/>)}</div>
        <div className="limitations"><h3>What holds confidence back?</h3>{result.limitations.length ? <ul>{result.limitations.map(item=><li key={item}>{item}</li>)}</ul> : <p>No automatic ceilings beyond the stated evidence quality. Independent verification is still required.</p>}</div>
        <div className="next-checks"><h3>Before making a decision</h3><ul>{result.checks.map(item=><li key={item}>{item}</li>)}</ul></div>
        <button className="primary-button export-button" onClick={exportReceipt}>↓ EXPORT JSON RECEIPT</button>
        <div className="receipt-note">Nothing is transmitted or automatically saved. Exported receipts preserve your declared provenance, not third-party verification.</div>
      </section>
    </div>
    <p className="lab-footnote">{result.basis}</p>
  </>;
}
function LearningMap({navigate,progress}:{navigate:(view:View)=>void;progress:string[]}) {
  const phases:[string,string,string[]][]=[
    ['01','FOUNDATIONS',['ux','information','data']],
    ['02','DESIGN & ENGINEERING',['product','agents','systems']],
    ['03','PROVE & PROTECT',['evidence','research','security','governance']],
  ];
  return <>
    <div className="breadcrumb">FIELD MANUAL / <strong>LEARNING MAP</strong></div>
    <div className="lab-heading"><span className="eyebrow">THREE PHASES · TEN DISCIPLINES</span><h1>See the whole<span className="period">.</span><br/><em>Learn the parts.</em></h1><p>A suggested route, not a prerequisite chain. Move between ideas whenever a project gives you a reason.</p></div>
    <div className="roadmap">{phases.map(([num,title,ids])=><section key={num} className="roadmap-phase"><div className="phase-heading"><span>{num}</span><h2>{title}</h2><small>{ids.length} CHAPTERS</small></div><div className="map-items">{ids.map(id=>{const chapter=chapters.find(ch=>ch.id===id)!;return <button key={id} onClick={()=>navigate({page:'chapter',chapter:id})} className={'map-chapter '+(progress.includes(id)?'map-done':'')}><span className="map-glyph">{chapter.symbol}</span><span><small>{chapter.number} / {chapter.group}</small><strong>{chapter.title}</strong></span><span aria-hidden="true">{progress.includes(id)?'✓':'↗'}</span></button>;})}</div></section>)}</div>
    <section className="lower-banner compact"><span className="eyebrow">A RESPONSIBLE BUILD CYCLE</span><h2>Learn → Test → Build → Verify</h2><p>Every phase loops back when new evidence arrives. Curiosity opens the door; explicit tests keep us honest.</p><button className="primary-button" onClick={()=>navigate({page:'lab'})}>PRACTICE EVIDENCE GRADING ↗</button></section>
  </>;
}
export default function App() {
  const [view,setView]=useState<View>(parseRoute);
  const [progress,setProgress]=useState<string[]>(readProgress);
  useEffect(()=>{const sync=()=>setView(parseRoute());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
  useEffect(()=>{try{localStorage.setItem('fm369-studied-v1',JSON.stringify(progress));}catch{/* Storage can be disabled. */}},[progress]);
  function navigate(next:View) {
    const fragment=next.page==='chapter' ? 'chapter/'+next.chapter : next.page==='library'?'':next.page;
    window.location.hash=fragment;
    setView(next);
    window.scrollTo({top:0,behavior:'instant'});
  }
  const chapter=chapters.find(item=>item.id===view.chapter);
  return <div className="app-shell">
    <SideNav view={view} navigate={navigate} progress={progress}/>
    <main id="main-content" className="main-content">
      <div className="topbar"><span><span className="status-light"/> KNOWLEDGE IS A PRACTICE</span><div>THE FIELD IS OPEN <b>✳</b></div></div>
      {view.page==='library' && <Library navigate={navigate} progress={progress}/>}
      {view.page==='chapter' && chapter && <ChapterPage chapter={chapter} done={progress.includes(chapter.id)} toggle={()=>setProgress(prev=>prev.includes(chapter.id)?prev.filter(id=>id!==chapter.id):[...prev,chapter.id])} navigate={navigate}/>}
      {view.page==='lab' && <EvidenceLab/>}
      {view.page==='map' && <LearningMap navigate={navigate} progress={progress}/>}
      <footer className="footer"><div><strong>✳ FIELDMANUAL369</strong><p>LEARN THE CONCEPT. TEST THE CLAIM. BUILD THE SYSTEM. VERIFY THE RESULT.</p></div><div><span>ORIGINAL WORK · OPEN SOURCE</span><a href="https://github.com/MichaelWave369/FieldManual369" target="_blank" rel="noopener noreferrer">GITHUB ↗</a></div></footer>
    </main>
  </div>;
}
