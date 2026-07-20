/* Spec rows moved up into Proof's open grid cell (2026-07-21); Foundation is
   now a single centered statement. The header is split per-character for the
   ink pass (App.jsx) — screen readers get the aria-label, not the char soup,
   and the static em color on "engineers." is the animation's end state. */

const inkChars = (word, hold) =>
  [...word].map((c, i) => (
    <span key={i} data-ch {...(hold ? { 'data-hold': true } : {})}>
      {c}
    </span>
  ))

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
              {HEADING.map((w) => (
                <span key={w} className="inline-block whitespace-nowrap">
                  {inkChars(w, false)}
                </span>
              )).reduce((acc, el, i) => (i ? [...acc, ' ', el] : [el]), [])}{' '}
              <span className="inline-block whitespace-nowrap">
                <em>{inkChars('engineers', true)}</em>
                {inkChars('.', true)}
              </span>
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
