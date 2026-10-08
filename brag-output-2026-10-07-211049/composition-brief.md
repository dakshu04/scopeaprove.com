# Hyperframes Composition Brief: ScopeYes

## Objective
Create a polished 20-second launch-style brag video for ScopeYes that demonstrates its real change-request-to-client-approval workflow.

## Output
- Composition directory: `brag-output-2026-10-07-211049/composition/`
- Rendered video: `brag-output-2026-10-07-211049/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: `C:\SaaS\scopeaprove.com`
- Primary files read: `README.md`, `config/siteConfig.ts`, `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `app/approve/[token]/page.tsx`, `components/approval/approval-decision-form.tsx`
- Product name: ScopeYes
- Tagline / strongest claim: “Stop doing extra work for free.”
- Key UI or visual moment to recreate: a change request for an Analytics dashboard with `$750` additional cost and `+5 days`, followed by the client pressing “Approve request” and the decision becoming “Approved — ready to move forward.”
- Copy that must appear verbatim:
  - “Stop doing extra work for free.”
  - “Add customer analytics dashboard”
  - “Additional cost” / “$750”
  - “Timeline impact” / “+5 days”
  - “Approve request”
  - “Approved — ready to move forward”

## Creative Direction
- Tone preset: polished
- Creative direction: quiet premium product film for a calm, professional boundary-setting tool
- Interpretation: confident editorial pacing, generous holds, brand-faithful UI, and restrained sound design.
- Angle: turn the awkward, scattered scope-creep conversation into one calm, visible decision, shown through the working product flow.
- Hook: “Stop doing extra work for free.” with the project’s editorial green emphasis and a real request card.
- Outro / punchline: “A clear decision before work begins.” followed by ScopeYes and “Control scope creep.”
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Invented metrics or capabilities
  - Overly glossy dark-tech styling

## Visual Identity
- Background: `#f8f8f4`
- Text: `#1b1c18`
- Accent: `#176b55`
- Secondary green: `#e7f2ed`
- Muted text: `#666760`
- Border: `#deded5`
- Display font: Instrument Serif for editorial emphasis; local compatible asset if available, otherwise Georgia as a close editorial fallback
- Body font: Inter; local compatible asset if available, otherwise Arial/system sans fallback
- Visual references from the project: rounded white approval card, forest-green actions, pale green status surfaces, generous ivory whitespace, fine warm-gray borders, compact monospace request IDs

## Storyboard
Use the storyboard in `brag-output-2026-10-07-211049/brag-plan.md` as the creative contract.

Scene summary:
1. The boundary — 3.27s — branded hook plus a rising change-request card.
2. Put the decision in one place — 5.47s — real request form fields reveal in reading order.
3. One focused client decision — 5.46s — client review UI and a simulated approval click.
4. Recorded. Ready. — 5.80s — approval success state and the ScopeYes brand close.

## Audio
- Audio role: sparse professional accents over a steady warm bed
- Audio arc: gentle fade-in, steady support through the flow, clear space around the click, then a warm resolve and fade-out.
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: static bed around 0.32, 0→full fade over 0.6s, full through 18.56s, then fade to zero at 20s.
- Music cue guidance: bundled preset copied to `assets/music/cues/`; use 8.74s for the client-review reveal, 13.11s for approval press, and 17.47s for the final brand landing. Use every-other-beat spacing for readable form rows.
- Audio-reactive treatment: subtle RMS/bass-driven change to an existing background wash and product-card shadow only; no waveform or equalizer graphics.
- Audio-coupled moments:
  - 0.56s — hook settles
  - 4.39–7.64s — readable form sequence
  - 13.11s — approval click
  - 17.47s — final ScopeYes lockup
- SFX selection guidance: use low-risk warm/transient sounds from the bundled analysis; keep the palette to one soft impact, one clean click, and one warm final accent.
- SFX analysis guidance: `C:\SaaS\scopeaprove.com\.agents\skills\brag\assets\sfx\sfx-analysis.md`
- Exact SFX choice: Hyperframes selects filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music and selected SFX into the composition’s `assets/` tree.

## Hyperframes Instructions
Use the current HyperFrames composition, animation, creative, keyframe, audio, registry, and CLI contracts. `/brag` owns the story, tone, source material, and audio direction; implementation details belong to HyperFrames.

Requirements:
- Show real product UI and copy from the source project.
- Keep all readable text settled long enough to read.
- Keep the root duration exactly 20 seconds.
- Include the planned music and three restrained SFX cues.
- Use local media/runtime assets wherever possible.
- Audio-reactive extraction attempt: unavailable because the local Python environment does not include NumPy. Continue with the bundled cue grid and deterministic ambient motion; do not block the preview.
- Beat-lock the 8.74s client review, 13.11s approval press, and 17.47s brand close where readability permits.
- Use `success-check` styling for the approval payoff and the `press-ripple` interaction idea for the button, adapted to the actual ScopeYes UI.
- Run `hyperframes check --snapshots` before preview.
- Keep creation and review local. Do not publish or render before explicit review approval.
