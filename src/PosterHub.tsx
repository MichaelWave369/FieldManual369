import { useEffect, useRef, useState } from 'react';
import { categories, posters, posterAssetUrl, type Poster } from './posters';
import { chapters } from './data';

type Props = {
  poster?: number;
  navigate: (page: 'posters' | 'poster', number?: number) => void;
  openChapter: (id: string) => void;
};

function Artwork({poster}: {poster:Poster}) {
  const [missing,setMissing]=useState(false);
  useEffect(()=>setMissing(false),[poster.number]);
  return <div className="poster-artwork">
    {missing ? <div className="poster-awaiting"><span>▤</span><strong>Artwork awaiting publication</strong><small>Install the companion poster assets to view this illustration.</small></div>
      : <img src={posterAssetUrl(poster.file)} loading="lazy" alt={poster.title} onError={()=>setMissing(true)}/>}
  </div>;
}

function Collection({navigate}:Props) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All collections');
  const list=posters.filter(p=>(category==='All collections'||p.category===category) &&
    (p.title+' '+p.category).toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="breadcrumb">FIELD MANUAL / <strong>POSTER COLLECTION</strong></div>
    <div className="lab-heading"><span className="eyebrow">THE PARALLAX BUILDER CURRICULUM · 21 POSTERS</span><h1>See the ideas<span className="period">.</span><br/><em>Connect the dots.</em></h1><p>A recovered visual field guide in six collections. Each illustration connects to a deeper lesson and a hands-on exercise.</p></div>
    <div className="poster-warning"><strong>CURATED ORIGINAL ARCHIVE</strong><p>The poster images ship as a separate asset bundle until they are uploaded to the repository. These educational infographics may contain simplifications or errors. Use chapter references to check technical claims.</p></div>
    <div className="poster-toolbar"><label className="search-input"><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a poster or concept…" aria-label="Search posters"/></label><label className="poster-select"><span>COLLECTION</span><select value={category} onChange={e=>setCategory(e.target.value)}><option>All collections</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label></div>
    <div className="poster-count">{list.length} / {posters.length} POSTERS</div>
    <div className="poster-grid">{list.map(p=><button key={p.number} className="poster-tile" onClick={()=>navigate('poster',p.number)}>
      <Artwork poster={p}/><div className="poster-tile-info"><span>PBC-{String(p.number).padStart(2,'0')} / {p.category}</span><strong>{p.title}</strong><small>OPEN POSTER ↗</small></div>
    </button>)}</div>
    {list.length===0 && <div className="empty-state"><h3>No posters match</h3><p>Try a different search or collection.</p><button className="secondary-button" onClick={()=>{setQuery('');setCategory('All collections');}}>SHOW ALL</button></div>}
  </>;
}
function Reader({poster:posterNumber,navigate,openChapter}:Props) {
  const poster=posters.find(p=>p.number===posterNumber) ?? posters[0];
  const chapter=chapters.find(c=>c.id===poster.chapterId);
  const dialogRef=useRef<HTMLDialogElement>(null);
  const [missing,setMissing]=useState(false);
  useEffect(()=>setMissing(false),[poster.number]);
  const previous=posters[(posters.indexOf(poster)+posters.length-1)%posters.length];
  const next=posters[(posters.indexOf(poster)+1)%posters.length];
  return <>
    <div className="breadcrumb"><button onClick={()=>navigate('posters')}>POSTER COLLECTION</button> / <strong>PBC-{String(poster.number).padStart(2,'0')}</strong></div>
    <div className="poster-reader-head"><div><span className="eyebrow">{poster.category.toUpperCase()} · POSTER {poster.number} OF {posters.length}</span><h1>{poster.title}<span className="period">.</span></h1><p>Visual reference from the Parallax Builder Curriculum. Follow its related chapter for independent sources and practical exercises.</p></div><button className="secondary-button" onClick={()=>navigate('posters')}>← ALL POSTERS</button></div>
    <div className="poster-reader-layout"><div className="poster-reader-image">
      {missing?<div className="poster-awaiting large"><span>▤</span><strong>Artwork not published yet</strong><small>Import the companion package's public/posters assets to enable this illustration.</small></div>:
      <button className="poster-zoom-trigger" onClick={()=>dialogRef.current?.showModal()} title="Open full-screen zoom" aria-label={'Zoom poster '+poster.title}><img alt={poster.title} src={posterAssetUrl(poster.file)} onError={()=>setMissing(true)}/></button>}
      <div className="image-caption">{missing?'ASSET IMPORT PENDING':'SELECT THE POSTER TO ZOOM'} · PBC-{String(poster.number).padStart(2,'0')}</div>
    </div><aside className="poster-reader-side"><span className="eyebrow">FIELD NOTES</span><h2>Go beyond the infographic.</h2><p>A reference poster is a beginning, not proof. The companion chapter adds original explanations and a hands-on task.</p>
      {chapter&&<button className="primary-button" onClick={()=>openChapter(chapter.id)}>READ {chapter.number} · {chapter.title} ↗</button>}
      {!missing&&<a className="poster-download" href={posterAssetUrl(poster.file)} download={poster.file}>↓ SAVE WEB-READY POSTER</a>}
      <div className="poster-context"><strong>PROVENANCE</strong><p>Illustration from the user's curated 2026 archive. Verify technical facts against current primary sources.</p></div>
    </aside></div>
    <div className="poster-pagination"><button onClick={()=>navigate('poster',previous.number)}>← PBC-{String(previous.number).padStart(2,'0')} / PREVIOUS</button><button onClick={()=>navigate('poster',next.number)}>NEXT / PBC-{String(next.number).padStart(2,'0')} →</button></div>
    <dialog ref={dialogRef} className="poster-dialog" aria-label={'Poster zoom: '+poster.title}><div className="poster-dialog-head"><strong>{poster.title}</strong><button onClick={()=>dialogRef.current?.close()}>✕ CLOSE</button></div>{!missing&&<img src={posterAssetUrl(poster.file)} alt={poster.title+' full-size'} onError={()=>setMissing(true)}/>}</dialog>
  </>;
}
export default function PosterHub(props:Props) {
  return props.poster===undefined ? <Collection {...props}/> : <Reader {...props}/>;
}
