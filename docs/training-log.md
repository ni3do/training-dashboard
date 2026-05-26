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

## Week of 2026-05-25 (Phase 1 — Week 4)

**Planned vs. actual**

| Day | Planned | Actual | Notes |
| --- | --- | --- | --- |
| Mon 05-25 | Upper + Core (gym) | Missed | Do not catch up; preserve the down week and give the knee a break |
| Tue 05-26 | Easy Z2 — 7 km | Pending | Swapped with Thursday threshold for knee management |
| Wed 05-27 | Lower Body / Deadlift week (gym) | Pending | Keep conservative if the knee is still talking |
| Thu 05-28 | Threshold: 2×8 min @ 4:25–4:30 | Pending | Moved from Tuesday; reduced-volume down-week key session |
| Fri 05-29 | Full Body + Stairmaster 30 min | Pending | |
| Sat 05-30 | Long Run: Steady 24 km | Pending | Down-week long run |
| Sun 05-31 | Rest day | Pending | |

**Mid-week notes (captured during the week)**

### 2026-05-26 — Week 4 knee-management swap

Simon asked to switch today's threshold session with Thursday's Z2 run to give the knee a bit of a break. Applied: Tuesday becomes easy Z2 7 km; Thursday becomes the reduced-volume threshold session. Monday's upper-body/core gym session was marked missed.

Read: sensible down-week adjustment. Do not catch up Monday's gym. Keep Tuesday genuinely easy and use Thursday threshold only if the knee is quiet through warm-up; otherwise downgrade to easy aerobic work.

## Week of 2026-05-18 (Phase 1 — Week 3)

**Planned vs. actual**

| Day | Planned | Actual | Notes |
| --- | --- | --- | --- |
| Mon 05-18 | Upper + Core (gym) | Skipped due to logistics/time | Low concern; protected Tuesday key run |
| **Tue 05-19** | **CV test — 3 min + 12 min all-out on track** | **Run 12.20 km · 1:10:21 · HR 157/186; 3 min 0.903 km @ 3:19/km; 12 min 2.974 km @ 4:02/km** | Strong execution; CV estimate ~4:21/km, threshold HR estimate ~178 bpm |
| Wed 05-20 | Lower body / squat week (gym) | Upper body + core completed; hamstring stretching done | Modified from lower body due to hamstring awareness; session felt good |
| Thu 05-21 | Easy Z2 — 9 km | Missed — no Strava/WHOOP workout recorded | WHOOP green, but no catch-up volume recommended |
| Fri 05-22 | Full body + Stairmaster 25 min | Skipped; WHOOP captured only a short 15 min walk | Low concern by itself; no catch-up before the long run |
| Sat 05-23 | Fast-finish long run — 33 km | Run 28.72 km · 2:49:41 moving / 3:34:06 elapsed · HR 156/180 · 231 W avg | Modified: large endurance stimulus, but fast-finish block abandoned due to heat/sun, early knee feedback, and rising HR cost |
| Sun 05-24 | Rest day | Rest day — no Strava activity recorded by review time | Correct default after Saturday's strain 20+ long run |

**Load & recovery**

- Strava weekly run volume: **40.92 km / 4h 00m moving**, 2 run sessions; planned run volume was **55 km**.
- WHOOP captured Thu 05-21: recovery **75%**, HRV **137.9 ms**, RHR **41 bpm**, sleep performance **96%**, sleep consistency **91%**, sleep efficiency **93.7%**, current day strain **4.4**; no WHOOP workout recorded.
- WHOOP before Saturday's long run was strongly green: **95% recovery**, HRV **167 ms**, RHR **43 bpm**, sleep performance **100%**.
- Saturday long run produced another very large load: WHOOP workout strain **20.3**, day strain **20.5**, HR **150 avg / 180 max**.
- Full 7-day WHOOP export was unavailable in this cron run because the direct MCP server was offline and no local token cache was present at `~/.whoop-mcp/tokens.json`; this review uses the captured in-week WHOOP notes.
- Context entering the workout: Saturday 05-16 was a **30.45 km progressive long run** with WHOOP workout strain **20.3** / day strain **20.5**, so this CV test came on a meaningful fatigue background.

**Subjective notes (Simon)**

- Wed 05-20: Simon reports he can feel his hamstring a bit after the CV test / recent load stack.
- Wed 05-20 after gym: completed the Monday upper-body session plus hamstring stretching. Session was good.
- Sat 05-23: long run felt rough in heat and direct sun. Gels seemed fine; honey felt unpleasant/pasty in the mouth. Knee felt bad for the first few km, then improved. Simon walked a bit in the first 20 km and skipped the proper final 10 km fast-finish block.

**Mid-week notes (captured during the week)**

### 2026-05-18 — Skipped Monday upper/core gym

Planned: Upper Body + Core.

Actual: skipped due to logistics/time. Simon decided to focus on Tuesday's key run instead.

Read: low concern. Do not catch this up on Tuesday; keep the CV test protected. Track is preferred for this specific session because clean distance makes the 3-minute and 12-minute efforts useful for calibration. Treadmill is acceptable only as a fallback if the track would cause the workout to be skipped or rushed; use Apple Fitness/GymKit as truth if treadmill is used.

### 2026-05-19 — Tuesday CV test

Planned: Tuesday Key Run, **13 km**, on the track: 15 min Z2 warmup + drills + 4x100 m strides; **3 min all-out**; 30 min easy jog recovery; **12 min all-out**; 15 min Z2 cooldown. Purpose: recalibrate threshold pace and HR zones.

Actual: Lunch Run, **12.20 km** in **1:10:21 moving** / 1:14:48 elapsed, **16 m elevation**, **HR 157 avg / 186 max**, cadence **79.3**, power **241 W avg**, HOKA Clifton 10.

Key test outputs:

| Segment | Result | Pace | Avg HR | Max HR | Avg power |
| --- | ---: | ---: | ---: | ---: | ---: |
| 3 min all-out | 0.903 km | 3:19/km | 171 | 185 | 406 W |
| 12 min all-out | 2.974 km | 4:02/km | 176 | 186 | 334 W |
| Threshold HR estimate | min 4-12 of 12-min effort | - | ~178 | 186 | ~327 W |

CV calculation: **(2974 m - 903 m) / 540 s = 3.84 m/s**, or about **4:21/km**. D' estimate: about **213 m**.

Read: strong execution. The 3-minute effort was properly hard without ruining the 12-minute effort. The 12-minute pace is faster than threshold and should not become a training target by itself; the useful training anchor is the CV estimate around **4:21/km**. This confirms the earlier suspicion that the marathon-derived HR zones were conservative at faster work. Updated guidance: threshold intervals should center around **4:20-4:25/km** with HR often **174-184**, stamina remains **4:42-4:50/km**, and easy runs stay governed by easy HR/feel rather than by ego.

Immediate plan adjustment: **keep the Week 3 structure intact but reduce recovery risk**. Wednesday lower-body gym should be maintenance-level if done at all: no grinding squats, no heavy eccentric hero work, and stop if knees/right hamstring speak up. Thursday stays easy Z2. Saturday's 33 km fast-finish long run remains on the plan, but it should be gated by WHOOP/recovery and leg feel because this key session plus Saturday's prior 30 km long run is a real load stack.

### 2026-05-20 — Hamstring feedback / Wednesday gym adjustment

Planned: Lower Body / Squat week.

Subjective: Simon reports he can feel his hamstring a bit and asked whether to do the skipped Monday upper-body session or continue with lower body carefully.

Read: take the hamstring seriously. This is not a panic signal, but it is exactly the kind of small warning that becomes expensive if loaded with squats, split squats, RDL/deadlift patterns, walking lunges, or hard eccentric calf/hamstring work two days after a max CV test and four days after a 30 km progressive long run.

Adjustment: do **upper body + core today** instead of lower body. Keep it clean: presses/rows/pull-ups/arms/shoulders plus anti-rotation/core. Avoid loaded carries if they make the hamstring brace hard, and avoid any lower-body accessories. Thursday remains easy Z2 only if the hamstring is quiet while warming up; otherwise replace it with 30-45 min easy bike or rest. Friday should stay upper/full-body light and skip lunges/KB swings if the hamstring is still noticeable. Saturday's fast-finish long run is now gated: do the full 33 km only if the hamstring is quiet by Friday/Saturday warm-up.

Actual: Simon completed the Monday upper-body session and did some hamstring stretching. Session was good.

### 2026-05-21 — Thursday easy run missed

Planned: Easy Z2 run, **9 km** at **5:35–6:10/km**, target HR **138–153**.

Actual: Missed. Strava shows no 2026-05-21 activity and WHOOP shows no workout for the day.

WHOOP context: recovery **75%**, HRV **137.9 ms**, RHR **41 bpm**, sleep performance **96%**, sleep consistency **91%**, sleep efficiency **93.7%**, respiratory rate **16.1**, current day strain **4.4**, average HR **52**, max HR **135**.

Read: recovery telemetry is solid, but the missed easy run should stay missed. Do not stack catch-up volume onto Friday/Saturday, especially with hamstring awareness. Preserve Saturday's long-run option; downgrade it if the hamstring is still clearly present.

### 2026-05-23 — Saturday fast-finish long run

Planned: **33 km** long run: easy for roughly 70%, then the last 30% at stamina pace (**4:42-4:50/km**).

Actual: Morning Run, **28.72 km** in **2:49:41 moving** / **3:34:06 elapsed**, **5:54/km moving average**, **33 m elevation**, **HR 156 avg / 180 max**, cadence **81.1**, power **231 W avg**, HOKA Clifton 10.

WHOOP: pre-run recovery was excellent: **95%**, HRV **167 ms**, RHR **43 bpm**, sleep performance **100%**. Workout strain was **20.3** and day strain reached **20.5**.

Split read: first 20 km were controlled enough by long-run standards (**5 km lap HRs 149 / 157 / 155 / 153**). The final recorded 5 km block rose to **166 avg HR / 180 max** while power sat lower than early miles, which points to heat/cardiac drift rather than simply under-fitness. The planned final 10 km quality block was not completed.

Subjective: rough day with too much heat and sun. Gels seemed fine. Honey did not feel good in the mouth, described as pasty. Knee felt bad for the first few km and improved later. Some walking in the first 20 km.

Read: count this as a **modified long run with a large aerobic/endurance stimulus**, not as a successful fast-finish session. Abandoning the final 10 km quality block was the right call once heat cost and knee feedback were both present. Do not chase the missed 4-5 km or the missed quality block on Sunday/Monday.

**Trigger check**

- [ ] Recovery <33% for 3+ days — **no**. Recent recoveries: 75%, 71%, 95%.
- [ ] 2+ key sessions missed/under-target — **borderline but not a formal trigger**. Tuesday CV test was completed well; Saturday long run was under-target/modified. Thursday and Friday were missed support sessions, not key sessions.
- [ ] Slog feeling 2+ weeks — no evidence.
- [ ] Phase boundary — no. Down week starts 2026-05-25, but the Base → Build phase boundary is after Week 4.

**Synthesis & recommendation**

The CV test did its job: it gives a better threshold anchor without requiring a wholesale plan rewrite. Saturday then added another huge long-run load, but heat turned the fast-finish prescription into the wrong target. The next risk is not aerobic fitness; it is musculoskeletal tolerance after repeated high-strain Saturdays plus knee/hamstring signals.

Recommendation for Week 4: treat the scheduled down week as real. Preserve Tuesday's 2x8 min threshold session only if knee/hamstring feel normal and recovery is at least acceptable; otherwise convert it to easy Z2 and do not chase the missed Week 3 volume. Keep Saturday's 24 km steady long run easy, with no fast-finish makeup. No formal plan change applied without Simon's approval.

**Adjustments applied**

- Updated dashboard zone calibration from the May 19 CV test: threshold anchor **~4:21/km**, threshold HR estimate **~178 bpm**.
- Logged Thursday missed run, Friday skipped gym/Stairmaster, and Saturday modified long run.
- No weekly volume changes applied.

## Week of 2026-05-11 (Phase 1 — Week 2)

**Planned vs. actual**

| Day | Planned | Actual | Notes |
| --- | --- | --- | --- |
| Mon 05-11 | Upper + Core (gym) | Not captured in Strava | No gym note available in the log |
| **Tue 05-12** | **Key run — stamina 25 min @ 4:42–4:50/km on track, target HR 160–170** | **Run 9.01 km · 45:48 · 5:05/km · HR 153/170; 25:00 stamina block HR 163/170** | Key physiological block completed as prescribed on 0.5% treadmill incline; RPE 7–8/10 |
| Wed 05-13 | Lower body / deadlift week (gym) | Ride 52.74 km · 2:03:21 · 25.7 km/h · 115 W avg · HR 126 avg | Lower-body gym not completed; ride was chill aerobic load, max HR spike likely sensor artifact |
| Thu 05-14 | Easy Z2 — 9 km | Run 9.63 km · 54:58 · 5:43/km · HR 146/161 | On-target Z2; lower-body catch-up skipped due to time, legs felt fine |
| Fri 05-15 | Full body + Stairmaster 22 min | Stair-stepper 22:00 · HR 163/172 | Stairmaster completed; full gym work not captured in Strava/log |
| Sat 05-16 | Long run — progressive 29 km, start 5:50 → finish 5:00/km | Run 30.45 km · 2:48:06 · 5:31/km · HR 157/175 · WHOOP workout strain 20.3 | Progressive structure executed well; slight knee/right hamstring awareness late but no post-run issue reported |
| Sun 05-17 | Rest day | Rest day — no Strava activity | Correct default after the 30 km / strain 20+ long run |

**Load & recovery**

- Strava weekly run volume: **49.1 km / 4h 29m**, 3 run sessions; planned run volume was **50 km**.
- Total Strava logged endurance: **49.1 km running + 52.7 km cycling + 22:00 stair-stepper**, ~**6h 54m** moving time across 5 uploads.
- WHOOP recovery captured in-week: Thu **71%** (HRV 136 ms, RHR 46) and Sat pre-long-run **48%** (HRV 105 ms, RHR 43, sleep performance 93%). Full 7-day export was unavailable because direct MCP found no ~/.whoop-mcp/tokens.json and fell into interactive OAuth.
- WHOOP strain captured in-week: Thu cycle strain **13.2** after the easy run; Sat workout strain **20.3**, day strain **20.5** after the progressive long run.
- HRV trend from captured checks: **136 ms Thu → 105 ms Sat**, showing accumulated fatigue before the long run despite normal RHR and good sleep.

**Subjective notes (Simon)**

- Tue stamina: RPE **7–8/10**.
- Wed ride: **very chill**.
- Thu after skipped lower-body catch-up: **legs feel fine**.
- Sat long run: **legs felt pretty good throughout**; harder toward the end but manageable. Slight knee/right hamstring awareness before the last faster section; post-run legs felt fine.
- No explicit "slog" report captured.

**Mid-week notes (captured during the week)**

### 2026-05-12 — Tuesday stamina run

Planned: 12 km with 25 min sustained at 4:42–4:50/km, target HR 160–170.

Actual: Morning Run, 45:48 total; Strava summary shows 9.01 km. The key workout block was completed as prescribed: **25:00 stamina segment**, using the recommended **0.5% treadmill incline**, with lap HR **162.8 avg / 170 max**. Subjective RPE: **7–8/10**.

Read: successful key session despite slightly lower total distance. Do not judge this one by the whole-upload average; the prescribed physiological stimulus was the 25-minute stamina block, and that landed in the intended HR band. RPE 7–8 is appropriate for a controlled stamina session: hard enough to be meaningful, not so hard that it becomes threshold/race-day stupidity. This supports keeping the Week 2 plan intact unless WHOOP recovery or leg feedback says otherwise.

### 2026-05-13 — Wednesday ride instead of lower-body gym

Planned: Lower-body gym, deadlift week.

Actual: Afternoon Ride, **52.74 km** in **2:03:21 moving** / 2:11:35 elapsed, **25.7 km/h**, **91 m elevation**, **115 W avg**, **HR 126 avg**, calories 1,133. Laps were mostly steady/easy: HR generally 110–138 by 5 km split. Strava summary max HR 228 is almost certainly sensor artifact; stream max was 155 and the late lap spikes are physiologically inconsistent.

Subjective note: **very chill**.

Read: good aerobic addition, not a smashfest. This adds endurance load after Tuesday's key run but does not replace lower-body strength. Recommendation: Thursday should stay easy and controlled; if doing both run + gym tomorrow, run first and keep lower-body gym maintenance-level rather than heavy.


### 2026-05-14 — Thursday easy Z2 run

Planned: Easy Z2 run, **9 km** at **5:35–6:10/km**, target HR **138–153**.

Actual: Lunch Run, **9.63 km** in **54:58 moving** / 56:02 elapsed, **5:43/km**, **17 m elevation**, **HR 146 avg / 161 max**, cadence **79.9**, power **241 W avg**, HOKA Clifton 10. Laps: first 5.00 km at **HR 145 avg**, final 4.63 km at **HR 147 avg**. WHOOP recovery before the run was **71%** with **HRV 136 ms** and **RHR 46**; current cycle strain after the run was **13.2**.

Read: exactly the kind of boring useful run we want. Slightly long (+0.63 km), pace centered in the easy range, HR average safely in Z2, and only mild upward drift. The max HR/late uptick is not a problem, but after Tuesday's stamina run plus Wednesday's 52.7 km ride, do not turn Friday into a hero session. Keep gym/stairmaster controlled and preserve Saturday's progressive long run.

### 2026-05-14 — Skipped catch-up lower-body gym

Planned/carryover: Lower-body gym from Wednesday was still theoretically available as a catch-up after the Thursday run.

Actual: **Skipped due to time**, not due to soreness or recovery concern. Subjective note from Simon: **legs feel fine**.

Read: low concern. This is a logistics miss, not a body-warning signal. Do not try to cram the missed lower-body session into Friday if it compromises the stairmaster/full-body work or Saturday's 29 km progressive long run. If anything gets protected this week, protect Saturday.

### 2026-05-16 — Saturday progressive long run

Planned: Saturday long run, **29 km progressive**, start around **5:50/km** and finish around **5:00/km**.

Actual: Morning Run, **30.45 km** in **2:48:06 moving** / 2:57:15 elapsed, **5:31/km avg**, **37 m elevation**, **HR 157 avg / 175 max** on Strava (WHOOP max 179), cadence **82.2**, power **247 W avg**, HOKA Clifton 10. WHOOP logged the workout at **20.3 strain**; current day strain reached **20.5**.

Lap/progression read:

| Segment | Distance | Moving pace | Avg HR | Avg power | Read |
| --- | ---: | ---: | ---: | ---: | --- |
| Lap 1 | 10.00 km | ~5:45/km | 149 | 237 W | Controlled opening, broadly easy/Z2 |
| Lap 2 | 11.00 km | ~5:25/km | 160 | 252 W | Clear progression into steady/stamina effort |
| Lap 3 | 4.00 km | ~5:14/km | 162 | 261 W | First faster finish block, controlled |
| Lap 4 | 4.00 km | ~5:08/km | 163 | 267 W | Strongest block; HR rose but did not explode |
| Lap 5 | 1.45 km | ~6:37/km | 156 | 206 W | Cooldown / easing off |

Recovery context before the run: WHOOP recovery **48%**, HRV **105 ms**, RHR **43 bpm**, sleep performance **93%**. This was not a green-light day, but sleep was solid and RHR was normal. The run therefore counts as a successful session with a high recovery cost, not a casual mileage day.

Fueling during the run, rough estimate from Simon:

| Item | Estimated carbs |
| --- | ---: |
| Carb drink | ~60 g |
| Gummy bears, ~2 handfuls | unmeasured |
| Gel | ~30 g |
| Bars / other food | ~30 g |
| **Known minimum** | **~120 g + gummies** |

Intake rate: over **2.8 h moving**, known minimum is roughly **43 g/h + gummies**. Depending on the gummy amount, likely closer to the lower-middle endurance range. For future long runs with progressive or race-specific finish work, aim to make this more deliberate: roughly **60–75 g/h** as the next practical step, then later gut-training sessions can push higher.

Subjective notes from Simon: **legs felt pretty good throughout**. Toward the end it got harder, but still felt fine and manageable. Before the last increasing-pace section there was slight awareness in the knees and right hamstring, but nothing severe and nothing that changed the session; post-run, legs feel fine.

Read: excellent completion and good pacing shape — slightly over target distance, with a real progressive finish. The main caveat is cost: HR averaged high for a long run and WHOOP strain hit **20+**, so this is a major endurance stimulus. Protect the adaptation. Sunday stays a true rest day. Monday upper/core is acceptable only if legs still feel normal; avoid sneaky lower-body loading. Tuesday's CV test should be gated by recovery and leg feel — run it only if HRV/recovery and subjective freshness rebound.

### 2026-05-18 — Skipped Monday upper/core gym

Planned: Upper Body + Core.

Actual: skipped due to logistics/time. Simon decided to focus on Tuesday's key run instead.

Read: low concern. Do not catch this up on Tuesday; keep the CV test protected. Track is preferred for this specific session because clean distance makes the 3-minute and 12-minute efforts useful for calibration. Treadmill is acceptable only as a fallback if the track would cause the workout to be skipped or rushed; use Apple Fitness/GymKit as truth if treadmill is used.

### 2026-05-16 — Recovery modalities after progressive long run

Simon did **sauna**, **Normatec**, and **red light therapy** today as recovery support after the 30.45 km progressive long run / WHOOP strain 20+ day.

Read: good recovery hygiene. These are supportive modalities, not permission to add extra training load; Sunday still stays rest or, at most, a very easy recovery spin if morning recovery and legs look good.

**Trigger check**

- [ ] Recovery <33% for 3+ days — **no evidence from captured checks**. Available WHOOP recovery values were 71% and 48%; full 7-day export was unavailable.
- [ ] 2+ key sessions missed/under-target — **no**. Tuesday's key stamina block landed in the target HR band; Saturday's progressive long run was completed.
- [ ] Slog feeling 2+ weeks — **no evidence**. Week 2 subjective notes were mostly positive/controlled.
- [ ] Phase boundary — **no**. Still Phase 1 Base; next boundary is end of May.

**Synthesis & recommendation**

Week 2 restored the run-specific stimulus that Week 1 missed, without chasing extra volume. Tuesday's key session delivered the intended 25-minute stamina block, Thursday was a clean Z2 run, and Saturday's 30.45 km progressive long run was the week's biggest success. The main cost signal is Saturday: WHOOP recovery was only 48% beforehand and strain reached 20+, so this should be treated as a major adaptation stimulus rather than a casual long run.

Recommendation for Week 3: **keep the plan intact only if recovery and leg feel rebound**, especially before Tuesday's CV test. Monday upper/core is fine if legs feel normal, but avoid sneaky lower-body loading. If WHOOP is <40% or the right hamstring/knees are still noticeable, downgrade Tuesday to easy running and reschedule the CV test. No extra volume.

**Adjustments applied**

- None. No plan/dashboard/calendar changes applied.

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
