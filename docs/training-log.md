# Training Log

This is the running journal of how training is actually going — not the plan itself.

## How this works

- **After a session (optional):** drop a quick note in the "Mid-week notes" section of the current week, especially if something stood out (felt great, missed a session, niggle, sleep was wrecked, etc.). One sentence + RPE 1–10 is enough.
- **Every Sunday at 19:00:** an automated review runs. It pulls last week's Strava activities and Whoop recovery/sleep/strain, compares against the plan, drafts the synthesis below, and prompts for any subjective notes worth capturing.
- **Plan changes** that come out of the review get applied to all five plan files and logged in the "Plan Adjustments Log" section at the bottom of `training-plan.md`.

## Adjustment triggers

The review will flag (and ask whether to act on) these:

1. **3+ consecutive days** of Whoop recovery <33% → consider pulling intensity back
2. **2+ key sessions in a row** missed or significantly under target pace → reassess zones or volume
3. **Subjective "this is becoming a slog"** for 2+ weeks → check load progression
4. **Phase boundary reached** (end of May, end of June, mid-July) → mandatory re-evaluation regardless of how things are going

---

## Weekly review template

Each Sunday review fills in this template, newest week at the top.

```markdown
## Week of YYYY-MM-DD (Phase X — Week N)

**Planned vs. actual**
| Day | Planned | Actual | Notes |
| --- | --- | --- | --- |
| Mon | | | |
| Tue | | | |
| Wed | | | |
| Thu | | | |
| Fri | | | |
| Sat | | | |
| Sun | | | |

**Load & recovery**
- Strava weekly volume: X km / Y h, Z sessions
- Whoop avg recovery: X% (range Y–Z%)
- Whoop avg sleep: X h
- Whoop weekly strain (avg / peak): X / Y
- HRV trend vs prior week: ±X ms

**Subjective notes (Simon)**
-

**Mid-week notes (captured during the week)**
-

**Trigger check**
- [ ] Recovery <33% for 3+ days
- [ ] 2+ key sessions missed/under-target
- [ ] Slog feeling 2+ weeks
- [ ] Phase boundary

**Synthesis & recommendation**
-

**Adjustments applied**
- (none / link to Plan Adjustments Log entry)
```

---

## Weekly reviews

<!-- Newest week goes directly below this line. -->

## Week of 2026-05-04 (Phase 1 — Week 1)

**Planned vs. actual**

| Day | Planned | Actual | Notes |
| --- | --- | --- | --- |
| Mon 05-04 | Upper + Core (gym) | Ride 47.2 km · 1:35:14 · 29.7 km/h · 162 W avg · HR 165/187 | Gym swapped for evening road ride |
| **Tue 05-05** | **Key run — threshold 3×8 min @ 4:19–4:30/km** | **3×8 min on treadmill @ 4:29 / 4:25 / 4:20 — bang on prescription** | See detailed notes below |
| Wed 05-06 | Lower body / race-specific (gym) | Done | Mild hamstring cramp on squats; otherwise fine |
| Thu 05-07 | Easy run (Z2, 45–60 min) | Run 9.89 km · 57:28 · 5:49/km · HR 152/167 | On-target Z2 |
| Fri 05-08 | Full body + stairmaster vert (gym) | Done | Stairmaster 20:21 · HR 166/177 logged on Strava |
| Sat 05-09 | Long run (90 min – 3h) | Ride 150.4 km · 5:42:08 moving (6:57:52 elapsed) · 26.4 km/h · 125 W avg · HR 138/176 · 473 m elev · Whoop strain 20.4 | Long run swapped for long ride — fueling test session, see notes below |
| Sun 05-10 | Rest + Sunday review | **Rest day — no run** (WHOOP recovery 22% 🔴) | Correct call after Saturday's autonomic hit; no chasing missed run volume |

**Load & recovery**

- Strava weekly run volume: **17.9 km / 1h 36m**, 2 run sessions; planned run volume was **45 km**.
- Total Strava logged endurance: **205.5 km cycling + 17.9 km running + 20:21 stair-stepper**, ~**9h 14m** moving time across 5 uploads.
- WHOOP recovery available from captured checks: **avg ~56%**, range **22–88%** (Mon 68, Tue 44, Sat 88, Sun 22). Direct WHOOP MCP pull was blocked by missing local token cache / non-interactive OAuth, so this uses the week's captured WHOOP notes rather than a full 7-day export.
- WHOOP sleep available from captured checks: roughly **8.0–8.7 h/night** on logged nights, with good efficiency; Saturday night showed high deep + REM as the body pushed repair after the long ride.
- WHOOP strain available: Tue **12.3**; Sat ride **20.4 peak** (very high/all-out tier). Weekly strain export unavailable from MCP.
- HRV trend: volatile and load-reactive — Tue **107 ms**, Sat **154 ms**, Sun **68 ms** vs. Simon baseline ~**130+ ms**. Sunday RHR **60 bpm** (+17 vs. baseline) confirmed a major autonomic hit.

**Subjective notes (Simon)**

- Saturday ride: first 6-hour fueling block; belly felt good, no GI issues; intake felt borderline overfueling for the low ride intensity.
- No explicit "slog" report this week.

**Trigger check**

- [ ] Recovery <33% for 3+ days — **no**; one red day captured (Sun 22%).
- [ ] 2+ key sessions missed/under-target — **no**; Tuesday key run was excellent, Saturday long run was modified/missed for run-specific load.
- [ ] Slog feeling 2+ weeks — **no evidence**; week 1 only, no slog note.
- [ ] Phase boundary — **no**; still Phase 1 Base.

**Synthesis & recommendation**

Week 1 produced a strong aerobic stimulus, but not the planned run-specific stimulus. Tuesday threshold was the clean win: prescribed paces hit exactly, and it gave useful zone-calibration evidence. Thursday Z2 and all gym/vert work were completed. The main miss is Saturday: the 150 km ride was a huge endurance + fueling session, but it does not replace the connective-tissue and fatigue-running purpose of the 26 km long run. Sunday's 22% recovery made rest non-negotiable.

Recommendation for Week 2: **do not chase the missed 26 km**. Keep the plan intact if Monday recovery rebounds, especially the Tuesday track stamina session because it is the next zone-check data point. If Monday/Tuesday WHOOP remains red or Simon feels flat, downgrade Monday gym and keep Tuesday controlled rather than forcing volume.

**Adjustments applied**

- None from this review. Existing approved Wk 2 track stamina and Wk 3 CV test substitutions remain in place.

**Mid-week notes (captured during the week)**

### 2026-05-10 — Recovery modalities

Simon did sauna, red light therapy, and Normatec massage today as recovery support after the 150 km ride / red WHOOP recovery morning.

### 2026-05-10 — Sunday morning recovery check (post-150 km ride)

**Whoop recovery (this morning):**

| Metric | Today | Sat (pre-ride) | Δ | Read |
| --- | --- | --- | --- | --- |
| Recovery | **22%** 🔴 | 88% 🟢 | −66 pts | Red — well below 33% threshold |
| HRV | **68 ms** | 154 ms | −56% | Far below ~130 baseline |
| RHR | **60 bpm** | 43 bpm | +17 bpm | Strongly elevated vs 44 baseline |
| Respiratory rate | 17.2 | 15.5 | +1.7 | Elevated — metabolic load signature |
| Skin temp | 33.4°C | 34.2°C | −0.8°C | Parasympathetic suppression |
| SpO2 | 96.6% | 97.9% | −1.3 pts | Within normal range |

**Sleep last night (Sat → Sun):**

- 8h 42m in bed, **97.5% efficiency**, only 13 min awake — body went hard into recovery
- Light 3:27 · **Deep 2:29** (elevated) · **REM 2:32** (elevated) · 5 sleep cycles
- Sleep performance 73% (Whoop wanted ~10h given strain) · consistency 92%
- Whoop added 75 min to baseline sleep need just from yesterday's strain

**Read:** classic post-big-effort autonomic profile. The 6h57 / strain-20.4 ride hit the autonomic system harder than the in-ride feel suggested — *exactly* the kind of dissociation between subjective effort and objective load that endurance work tends to produce. Sleep architecture (deep + REM both elevated) is the body actively repairing; that's good. But HRV at 68 (vs. 130+ baseline) and RHR up 17 bpm together are clear "do not stress further" signals.

**Decision: rest day. No run, no bike, no gym.**

Per the agreed tier mapping (≥60% → 75–90 min run; 40–59% → 45–60 min shakeout; <40% → rest), 22% is firmly in rest. Optional easy 30-min walk if movement appeals; otherwise full rest.

**Action items for today:**

- No structured training
- Carb-forward eating to refill glycogen + 1.5–1.8 g/kg protein across the day
- Hydrate (post-ride deficit + low fluid intake yesterday)
- Aim for 22:00 lights-out — Whoop wanted more sleep last night and didn't get it
- Recheck Whoop Monday morning to gate Monday's planned Upper + Core gym

**Implication for the rest of Phase 1, Week 1:**

- Sat long ride was a strong stimulus but not a 1:1 substitute for the long run (no bone/connective-tissue load, no run-specific muscle endurance, no gait-economy-at-fatigue work)
- **The week missed its key long-run session.** This isn't catastrophic in week 1 of a build, but the Sunday review (19:00) should:
  1. Decide whether to recover the volume in Week 2 (e.g., extending next Saturday's long run by 15–20 min)
  2. Decide whether to keep Tue 5/12 as the planned **stamina 25 min @ 4:42–4:50 on the track** (zone calibration data point) — likely yes if Mon recovery rebounds, but worth flagging as a data point dependent on midweek recovery trajectory
  3. Capture the long-ride / long-run swap in the Plan Adjustments Log if it's a pattern we expect to repeat (it shouldn't be — this was situational)

### 2026-05-09 — Saturday 150 km bike ride (long-run replacement + fueling test)

**Strava (Canyon road bike):**

| Metric | Value |
| --- | --- |
| Distance | 150.38 km |
| Moving time | 5:42:08 |
| Elapsed time | 6:57:52 |
| Avg speed | 26.4 km/h |
| Max speed | 44.3 km/h |
| Avg power | 125 W |
| Avg HR | 138 bpm |
| Max HR | 176 bpm |
| Elevation gain | 473 m |
| Calories (Strava) | 3,576 kcal |

**Whoop workout (cycling):**

| Metric | Value |
| --- | --- |
| Strain | **20.4** (very high — "all out" tier) |
| Avg HR | 128 bpm |
| Max HR | 176 bpm |
| Energy | 15,136 kJ (~3,620 kcal) |
| Z0 (below) | 49:26 |
| Z1 (recovery) | 3:02:35 |
| Z2 (aerobic) | 1:37:28 |
| Z3 (tempo) | 1:21:51 |
| Z4 (threshold) | 6:32 |
| Z5 (max) | 0 |

**Whoop morning recovery (pre-ride):**

- Recovery: **88%** (green — strong day to push)
- HRV: **154 ms** (above ~130 baseline — well-recovered)
- RHR: **43 bpm** (on baseline 44)
- SpO2: 97.9%, skin temp 34.2 °C

**Sleep last night (Fri → Sat):**

- 8h 17min in bed, 93.2% efficiency
- Light 3:50 · Deep 1:57 · REM 1:55 · 6 sleep cycles
- Sleep performance 91%, consistency 92%, respiratory rate 15.5

**Verdict — strong long ride, set up by genuinely good recovery.** Distinct contrast to Tuesday's 44%-recovery threshold session. Pacing was sensible: HR avg 138 sat in mid-Z1/low-Z2, only 6 min in Z4 — endurance-paced rather than ride-the-edge. Strain 20.4 reflects duration more than intensity. Aerobic stimulus is comparable to (or larger than) the prescribed 26 km long run; what's missing is run-specific bone/connective-tissue load and gait economy at fatigue.

**Fueling test (recorded for marathon prep):**

*Consumed during the ride (timing not logged — review on next ride to capture intake-per-hour):*

| Item | Qty | Carbs (g) | Notes |
| --- | --- | --- | --- |
| Pink-packet gels/chews (40g each) | 2 | ~50 | Brand not captured — log next time for tracking |
| MyProtein carb gel (60ml, raspberry lemonade) | 2 | 60 | 30g carbs/gel; maltodextrin + fructose + electrolytes |
| Orange bar (35g) | 1 | 15 | Low-sugar/high-fibre — better as recovery than mid-ride |
| Other bar (40g) | 1 | ~22 | 13g sugars; reasonable mid-ride bar |
| AH AM Triple Choco cookie | ½ | ~10 | Half of one cookie |
| Carb drink (1.5 L mix) | — | 70 | Per Simon's mix |
| Chocolate milk (300 ml) | 1 | 36 | Per label |
| Full-sugar Coke (250 ml) | 1 | ~26 | Standard Coke ~10.6g/100ml |
| Protein shake (25 g protein) | 1 | ~5–10 | Carb count depends on product |
| AH appelflap | 1 | ~27 | Standard AH appelflap ~85g |
| Gummi bears (3–4 handfuls, ~80–90 g) | — | ~60–70 | Roughly 77g carbs/100g |
| **Total carbs (mid-range estimate)** | | **~385 g** | |

**Fluids:** 3 L total = 1.5 L carb drink + 0.75 L electrolytes + 0.75 L plain water.

**Intake rate analysis:**

- Carb rate vs. moving time (5:42:08 → 5.70 h): **~67 g/h**
- Carb rate vs. elapsed time (6:57:52 → 6.96 h): **~55 g/h**
- Fluid rate vs. elapsed time: 3000 ml / 6.96 h = **~430 ml/h**
- Target was **80–100 g/h carbs and 500–750 ml/h fluids** for endurance fueling and marathon-prep gut training.

**Subjective notes (Simon, post-ride):**

- **First time fueling across a 6-hour session** — prior long efforts have been 3–4 hour long runs. Notable as a duration-tolerance milestone.
- **Belly felt good throughout** — zero GI issues across 7 hours elapsed and ~385g carbs in. Wide variety of products (gels, bars, cookie, appelflap, Coke, chocolate milk, gummies) all sat fine.
- **Intake felt borderline overfueling** — not "couldn't eat more," more "didn't really need this much." Appetite/effort wasn't pushing for more carbs. *This is consistent with the ride intensity (see verdict).*

**Verdict — appropriate fueling for the ride intensity; intentionally restrained gut-training stimulus.**

The "67 g/h vs. 80–100 g/h target" headline is misleading without intensity context. **At today's intensity (avg HR 128 / Whoop, mostly Z1, only 6 min Z4), the body's actual carb requirement was ~62–85 g/h** — fat oxidation does much more of the work in Z1/Z2. Simon's 67 g/h essentially matched real demand, hence "felt fine but slightly unnecessary."

- **Belly tolerance:** ✅ confirmed across 6+ hours with diverse food types. No products to blacklist on this evidence.
- **Duration tolerance:** ✅ first 6-hour session — feeding cadence held throughout, no late-ride aversion or palate fatigue.
- **Gut training adaptation:** ⚠️ partial — the carb rate wasn't high enough to push absorption-transporter upregulation. To genuinely train the gut, intake needs to exceed energy demand at the time, which means either (a) higher intensity sessions, or (b) deliberate over-intake during shorter, more intense efforts.
- **Hydration:** 430 ml/h is on the low side for 5+ hours; push to 500–600 ml/h next time, especially as temps rise into summer.
- **Composition note:** the orange bar was 7.4g protein / 15g carbs / 8.1g fibre — that's a recovery/snack bar, not a fueling bar. Save protein-heavy items for post-ride next time; mid-ride bars should target carbs:protein ≥ 4:1.

**Reframing — two distinct fueling modes (added to mental model):**

| Mode | Session type | Target rate | Goal |
| --- | --- | --- | --- |
| **Match-the-burn** | Long Z1/Z2 endurance (today) | 50–70 g/h | Fuel what you're burning; don't force-feed |
| **Gut training** | Marathon-pace long runs, tempo bricks | 90–110 g/h | Push absorption ceiling; expect mild stimulus |

A 5+ hour Z1 ride is a poor venue for gut training because intake feels artificial — the body isn't asking for the calories. **Marathon-pace long runs later in the build are the right venue** for high-intake practice.

**Marathon-relevant takeaways:**

1. **Gut tolerance baseline established at 67 g/h × 6 h with no GI issues** — solid floor. Race-day target (~75 g/h) is well within tolerance even before further training.
2. **Real gut-training test still TBD** — schedule one 90-min tempo brick or marathon-pace long run with deliberate ~100 g/h intake to find the ceiling. Most useful around mid-build (4 weeks out from a sharpening block).
3. **Duration tolerance** at 6+ hours is a positive signal for any future ultra-distance ambitions, separate from the marathon prep.

**Action for next long ride/run:**

- **If Z1/Z2 endurance:** keep ~60–70 g/h. Don't force more.
- **If race-pace or tempo (>90 min):** mix bottles to **80g carbs / 750ml** + **1 gel every 45 min** → ~95 g/h. This is where to gut-train.
- Drop protein bars from on-bike fueling; reserve for post.
- Push fluid intake to **~600 ml/h** regardless of intensity.
- Capture **timing** (timestamps per item) on next ride for sharper analysis.

**Action for tomorrow (Sun 5/10):** short Z2 shakeout 45–60 min if morning Whoop ≥ 50%, otherwise rest/walk. Don't force it.

*Update — actual call (Sun morning):* **Rest day, no run.** Whoop recovery came in at 22% (red). See Sunday morning entry below.

### 2026-05-06 — Wednesday lower body gym

Session completed as planned. Mild hamstring cramp during squats — eased off, finished the lift, no lingering issue. Worth watching on Thursday's easy run and Saturday's long run; flag if it recurs.

### 2026-05-05 — Tuesday threshold session (treadmill)

**Workout structure (splits from Apple Fitness — treadmill belt distance, authoritative):**

| Segment | Distance | Pace | HR avg | HR max |
| --- | --- | --- | --- | --- |
| Warmup | 1.35 km | 5:55/km | 126 | 138 |
| **Interval 1** | **1.78 km** | **4:29/km** | 153 | 160 |
| Recovery | 0.33 km | 5:55/km | 146 | 155 |
| **Interval 2** | **1.81 km** | **4:25/km** | 157 | 161 |
| Recovery | 0.34 km | 5:55/km | 151 | 161 |
| **Interval 3** | **1.84 km** | **4:20/km** | 162 | 168 |
| Cooldown | 0.54 km | 5:57/km | 146 | 165 |

**Verdict — textbook execution.** All three reps inside the threshold pace band (4:19–4:30/km). Negative-split structure (4:29 → 4:25 → 4:20), HR climbing in lockstep (153 → 157 → 162), max touching the bottom of the threshold HR zone (168) on rep 3 only. 24 minutes of quality work — solid stimulus. Total session 39 min vs. 45–60 min target — should extend warmup/cooldown next time to fill the window.

**Key technical findings from today's analysis:**

1. **Strava treadmill distance is wrong.** The Apple Watch was paired to the GymKit treadmill, so Apple Fitness shows the actual treadmill belt distance (truth). The Apple Health → Strava export discards the GymKit number and substitutes the watch's accelerometer estimate, which **overshoots by ~12%**. Strava reported the intervals at ~2.01 km / 3:57/km when the actual was ~1.81 km / 4:25/km. **Always use Apple Fitness splits for treadmill sessions.**

2. **HR ran 6–10 bpm below the pace-predicted threshold zone** (rep 3 max 168 vs. predicted 168–183, sustained). Initial guess that "low recovery suppressed HR" was wrong — incomplete recovery normally *raises* HR at given workload (and indeed RHR was elevated 7 bpm). Most likely cause: **the marathon-derived Karvonen zones are conservative at faster-than-marathon paces.** Karvonen extrapolation from a 4:41/km marathon HR average tends to inflate predicted HRs at threshold/VO2max paces.

3. **HRV 107 ms is *low* for Simon** (correction logged — earlier read "fine in absolute terms" was wrong; baseline is ~130+). The 44% recovery reflects genuinely incomplete recovery from the 87 + 47 km weekend rides, not just accumulated load.

**Operating rule going forward:**

- **Threshold/tempo sessions:** pace is the primary controller, HR is the monitor.
- **Easy/Z2 sessions:** HR is the primary controller (HR drift is a better fatigue signal than pace at low intensities).

**Zone calibration plan — next two Tuesdays:**

| Wk | Date | Original | Updated | Purpose |
| --- | --- | --- | --- | --- |
| 2 | Tue 2026-05-12 | Stamina 25 min @ 4:42–4:50 (any surface) | **Stamina 25 min @ 4:42–4:50 on the track** | Clean outdoor HR data point — predicted HR 160–170. Sub-160 across the rep = zones confirmed conservative. |
| 3 | Tue 2026-05-19 | VO2max 6×2 min @ 3:39–4:00 | **CV test on the track** (15' WU → 3 min all-out → 30 min easy → 12 min all-out → 15' CD) | Recalibrate zones. Outputs: Critical Velocity (true threshold pace), threshold HR (avg HR mins 4–12 of the 12-min effort), D' (anaerobic reserve). |

These swaps are already applied to all five plan files (training-plan.md, training-plan.html, training-dashboard data + running.html, training-calendar.ics) and logged in the Plan Adjustments Log at the bottom of `training-plan.md`.

**Subjective notes (Simon)**

- *(placeholder — Simon to fill in when he sees this)*

**Trigger check**

*(Full Sunday review will run this checklist against the whole week. Today's flags so far:)*

- [ ] Recovery <33% for 3+ days — *44% today, watch tomorrow*
- [ ] 2+ key sessions missed/under-target — *no, today was on prescription*
- [ ] Slog feeling 2+ weeks — *n/a, week 1 of build*
- [ ] Phase boundary — *end of May = next phase boundary*

**Synthesis & recommendation (provisional, to be finalized Sunday)**

Strong start to the build. Tuesday's quality session was executed cleanly despite a low-recovery morning, which is a good sign for fitness even though it raises a question about zone calibration. Two-week monitoring plan in place via Wk 2 stamina (data point) → Wk 3 CV test (recalibration). No plan changes needed for the rest of this week — keep the gym + easy + long run schedule as-is. **Watch Wed morning Whoop:** if recovery is still <33%, consider swapping the Wed lower-body gym for upper body or a recovery walk.

**Adjustments applied this week**

- Wk 2 Tue and Wk 3 Tue substitutions (stamina → track; VO2max → CV test) — see Plan Adjustments Log entry dated 2026-05-05 in `training-plan.md`.

