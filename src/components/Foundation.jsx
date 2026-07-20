/* Spec rows moved up into Proof's open grid cell (2026-07-21); Foundation is
   now a single centered statement. The header words are dual-layered for the
   beam fill (App.jsx): an ink layer plus an accent layer clipped to zero
   width; the beam animates the clip. Screen readers get the aria-label.
   Static CSS un-clips the hold word's fill, so the no-JS / reduced-motion
   document shows the finished state. */

const beamWord = (word, hold, italic) => (
  <span className="beam-word" {...(hold ? { 'data-hold': true } : {})}>
    <span>{italic ? <em>{word}</em> : word}</span>
    <span className="beam-fill" aria-hidden="true">
      {italic ? <em>{word}</em> : word}
    </span>
  </span>
)

const HEADING = ['Led', 'and', 'designed', 'by']

export default function Foundation() {
  return (
    <section id="foundation" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <p className="kicker" data-reveal>
          <b>B/02</b>&ensp;—&ensp;Foundation
        </p>

        <div className="mt-10 text-center">
          <h2
            className="f-display mx-auto text-[clamp(2.5rem,5.4vw,4.6rem)]"
            data-reveal
            data-inkpass
            aria-label="Led and designed by engineers."
          >
            <span aria-hidden="true">
              {HEADING.map((w, i) => (
                <span key={w}>
                  {i > 0 && ' '}
                  {beamWord(w, false, false)}
                </span>
              ))}{' '}
              {beamWord('engineers.', true, true)}
            </span>
          </h2>
          <p
            className="body-copy mx-auto mt-8 max-w-[56ch] text-[16.5px]"
            data-reveal
          >
            Invention is central to our engineering. Where traditional
            practice accepts a limitation, we treat it as a design problem —
            and build the system that ends it. Every build carries the
            attention of engineers with genuine pride in the craft.
          </p>
        </div>
      </div>
    </section>
  )
}
