/**
 * Expanded Question Templates for AptiSmart
 * 30+ unique question types per topic per difficulty level
 * Covers: Time & Work, Time & Distance, Ratio & Proportion, Interest, Averages
 * Real company interview patterns (TCS, Infosys, Wipro, Amazon, etc.)
 */

// Utility functions (same as main file)
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const formatRs = (n) => `₹${n}`;

// ═══════════════════════════════════════════════════════════════════════════════
// TIME & WORK – 33 TEMPLATES (12 EASY, 11 MEDIUM, 10 HARD)
// ═══════════════════════════════════════════════════════════════════════════════

const timeWorkTemplates = [
  // EASY (12)
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Basic Work Rate', text: `A finishes job in ${rand(5,15)} days. Work/day?`, answer: round(100/rand(5,15)), explanation: 'Rate = Total / Days'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Combined Work Simple', text: `A: ${rand(4,8)}d, B: ${rand(5,10)}d, together?`, answer: round(1/(1/rand(4,8)+1/rand(5,10))), explanation: 'Combined = 1/(1/A + 1/B)'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Work Completion', text: `${rand(50,200)}units in ${rand(5,15)}days. Units/day?`, answer: round(rand(50,200)/rand(5,15)), explanation: 'Rate = Units/Days'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Days from Rate', text: `Rate ${rand(10,25)}/day, ${rand(100,300)}units. Days?`, answer: round(rand(100,300)/rand(10,25)), explanation: 'Days = Units/Rate'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Partial Work', text: `A does ${rand(30,70)}% in ${rand(3,8)}d. Total?`, answer: rand(5,15), explanation: 'If X% done in D days, full = 100D/X'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Worker Efficiency', text: `${rand(1,3)}workers × ${rand(8,15)}d = ${rand(100,400)}units. Per worker?`, answer: round(rand(100,400)/(rand(1,3)*rand(8,15))), explanation: 'Per unit = Total/(Workers×Days)'}),
  () => {{topic: 'Time & Work', difficulty: 1, concept: 'Efficiency Difference', text: `A: ${rand(4,10)}d, B: ${rand(6,15)}d. Who's faster?`, answer: 'A', explanation: 'Less days = More efficient'}),
  () => ({topic:'Time & Work', difficulty: 1, concept: 'Cumulative Work', text: `${rand(20,60)}/day for ${rand(3,10)}d. Total?`, answer: rand(20,60)*rand(3,10), explanation: 'Total = Rate × Days'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Work Left', text: `${rand(30,70)}% done. Remaining?`, answer: 100-rand(30,70), explanation: '100% - Done% = Remaining%'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Individual vs Combined', text: `Combined ${rand(5,10)}d. A alone?`, answer: rand(8,12), explanation: 'Combined < Individual time'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Rate Comparison', text: `A: ${rand(10,25)}/d, B: ${rand(15,30)}/d. Faster?`, answer: 'B', explanation: 'Higher rate = Faster'}),
  () => ({topic: 'Time & Work', difficulty: 1, concept: 'Time Calculation', text: `${rand(200,500)}units at ${rand(20,50)}/d. Time?`, answer: round(rand(200,500)/rand(20,50)), explanation: 'Time = Units/Rate'}),

  // MEDIUM (11)
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Multi-Step Work', text: `A+B ${rand(5,10)}d, then B alone ${rand(5,8)}d. Total?`, answer: rand(10,18), explanation: 'Add separate times'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Partial then Swap', text: `A:${rand(6,10)}d (${rand(30,60)}%), B:${rand(8,12)}d (rest)`, answer: rand(10,18), explanation: 'Calculate work portions'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Three Workers', text: `A:${rand(5,12)}d, B:${rand(6,15)}d, C:${rand(8,18)}d, together?`, answer: round(1/(1/rand(5,12)+1/rand(6,15)+1/rand(8,18))), explanation: 'Add all three rates'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Efficiency Ratio', text: `A twice as fast as B. B:${rand(10,20)}d. A?`, answer: round(rand(10,20)/2), explanation: 'If 2× fast, time is half'}),
  () => {{topic: 'Time & Work', difficulty: 2, concept: 'Work Distribution', text: `${rand(100,400)}units, rate ratio ${rand(2,4)}:${rand(1,3)}. Share?`, answer: 'Proportional distribution', explanation: 'Divide by ratio'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Interrupted Work', text: `${rand(200,500)}units. ${rand(20,40)}/d for ${rand(5,10)}d, then stop ${rand(1,3)}d. Complete in?`, answer: round((rand(200,500)-rand(20,40)*rand(5,10))/rand(15,30)), explanation: 'Work - Pause - Resume'}),
  () => {{topic: 'Time & Work', difficulty: 2, concept: 'Efficiency Change', text: `Early ${rand(30,50)}/d, later ${rand(50,80)}/d. ${rand(100,300)}units total?`, answer: 'Variable rate problem', explanation: 'Use average or segment'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Worker Addition', text: `${rand(200,400)}units. ${rand(15,25)}/d, add another worker at ${rand(10,20)}/d. Time?`, answer: round(rand(200,400)/(rand(15,25)+rand(10,20))), explanation: 'Worker addition increases rate'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Deadline Pressure', text: `${rand(300,600)}units, ${rand(5,10)}days. ${rand(15,30)}/d currently. Need?`, answer: round(rand(300,600)/rand(5,10)), explanation: 'Calculate required rate'}),
  () => {{topic: 'Time & Work', difficulty: 2, concept: 'Shift Work', text: `2-person team. Shift 1: ${rand(40,70)}/d, Shift 2: ${rand(50,80)}/d. Day?`, answer: rand(90,150), explanation: 'Add shifts for daily total'}),
  () => ({topic: 'Time & Work', difficulty: 2, concept: 'Batch Processing', text: `Batch ${rand(20,50)}units, ${rand(3,7)} batches. ${rand(15,30)}/d rate. Time?`, answer: round(rand(20,50)*rand(3,7)/rand(15,30)), explanation: 'Total units = Batch × Qty'}),

  // HARD (10)
  () => {{topic: 'Time & Work', difficulty: 3, concept: 'Variable Efficiency', text: `Day 1-${rand(3,5)}: ${rand(20,40)}/d, Day ${rand(6,10)}: ${rand(50,70)}/d. ${rand(200,400)}u total?`, answer: 'Complex calculation', explanation: 'Segment-wise calculation'}),
  () => ({topic: 'Time & Work', difficulty: 3, concept: 'Team Optimization', text: `Need ${rand(300,600)}u in ${rand(5,10)}days. Min team size if ${rand(15,30)}/d/person?`, answer: Math.ceil(rand(300,600)/(rand(5,10)*rand(15,30))), explanation: 'Team = Total/(Days×Rate)'}),
  () => {{topic: 'Time & Work', difficulty: 3, concept: 'Overlapping Work', text: `A starts ${rand(2,5)}d early, B joins. Together finish in ${rand(3,7)}d. Without A?`, answer: 'Algebraic solution needed', explanation: 'Set up equations'}),
  () => ({topic: 'Time & Work', difficulty: 3, concept: 'Skill Levels', text: `Expert: ${rand(50,80)}/d, Novice: ${rand(20,40)}/d. ${rand(200,300)}u with mixed team. Time?`, answer: 'Weighted average', explanation: 'Average team rate'}),
  () => {{topic: 'Time & Work', difficulty: 3, concept: 'Deadline Optimization', text: `Deadline ${rand(5,10)}d. ${rand(200,400)}u. Current pace ${rand(30,50)}/d. Percentage boost needed?`, answer: 'Percentage calculation', explanation: '(Need - Current)/Current × 100'}),
  () => ({topic: 'Time & Work', difficulty: 3, concept: 'Multi-Phase Project', text: `Phase1: ${rand(100,200)}u in ${rand(3,5)}d. Phase2: ${rand(150,250)}u. If same rate?`, answer: round(rand(150,250)/(rand(100,200)/rand(3,5))), explanation: 'Apply phase 1 rate to phase 2'}),
  () => {{topic: 'Time & Work', difficulty: 3, concept: 'Resource Allocation', text: `${rand(200,400)}u. Split between ${rand(2,4)} teams in ratio ${rand(2,3)}:${rand(2,3)}. Team 1 time?`, answer: 'Ratio-based allocation', explanation: 'Work = Ratio share × Total'}),
  () => ({topic: 'Time & Work', difficulty: 3, concept: 'Quality Impact', text: `${rand(200,400)}u at quality 100%: ${rand(5,10)}d. At 95% quality, ${rand(20,30)}% faster?`, answer: round(rand(5,10)*0.7), explanation: 'Quality affects time-rate'}),
  () => {{topic: 'Time & Work', difficulty: 3, concept: 'Contingency Planning', text: `Plan: ${rand(5,10)}d. Buffer: ${rand(20,35)}%. Actual deadline?`, answer: round(rand(5,10)*1.25), explanation: 'Include contingency buffer'}),
  () => ({topic: 'Time & Work', difficulty: 3, concept: 'Capacity Constraint', text: `Max capacity ${rand(100,200)}/d. ${rand(400,800)}u total. Days?`, answer: round(rand(400,800)/rand(100,200)), explanation: 'Limited by capacity'})
];

// ═════════════════════════════════════════════════════════════════════════════
// TIME & DISTANCE – 32 TEMPLATES (11 EASY, 11 MEDIUM, 10 HARD)
// ═════════════════════════════════════════════════════════════════════════════

const timeDistanceTemplates = [
  // EASY (11)
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Basic Distance', text: `Speed ${rand(30,60)} km/h, time ${rand(2,8)}h. Distance?`, answer: rand(30,60)*rand(2,8), explanation: 'Distance = Speed × Time'}),
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Speed Calculation', text: `Distance ${rand(100,300)} km, time ${rand(2,8)}h. Speed?`, answer: round(rand(100,300)/rand(2,8)), explanation: 'Speed = Distance / Time'}),
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Time Calculation', text: `Distance ${rand(100,300)} km, speed ${rand(40,80)} km/h. Time?`, answer: round(rand(100,300)/rand(40,80)), explanation: 'Time = Distance / Speed'}),
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Unit Conversion', text: `${rand(20,60)}m/s = ? km/h`, answer: rand(20,60)*3.6, explanation: 'm/s to km/h: multiply by 3.6'}),
  () => {{topic: 'Time & Distance', difficulty: 1, concept: 'Average Speed', text: `${rand(100,200)}km in ${rand(2,6)}h. Average?`, answer: round(rand(100,200)/rand(2,6)), explanation: 'Avg = Total Distance / Total Time'}),
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Relative Speed Same Dir', text: `A: ${rand(40,60)} km/h, B: ${rand(50,70)} km/h (same). Relative?`, answer: Math.abs(rand(50,70)-rand(40,60)), explanation: 'Same direction: Subtract'}),
  () => {{topic: 'Time & Distance', difficulty: 1, concept: 'Relative Speed Opposite', text: `A: ${rand(40,60)} km/h, B: ${rand(50,70)} km/h (opposite). Relative?`, answer: rand(40,60)+rand(50,70), explanation: 'Opposite direction: Add'}),
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Distance Change', text: `${rand(100,300)} km more. Same speed ${rand(45,75)}/h. Time diff?`, answer: round(rand(100,300)/rand(45,75)), explanation: 'Extra time = Extra distance / Speed'}),
  () => {{topic: 'Time & Distance', difficulty: 1, concept: 'Speed Comparison', text: `A: ${rand(40,70)}/h, B: ${rand(50,90)}/h. Who faster?`, answer: 'B', explanation: 'Higher speed = Faster'}),
  () => ({topic: 'Time & Distance', difficulty: 1, concept: 'Journey Segments', text: `Part 1: ${rand(50,100)}km@${rand(40,60)}/h, Part 2: ${rand(50,100)}km@${rand(50,70)}/h`, answer: 'Multi-part calculation', explanation: 'Add times for each segment'}),
  () => {{topic: 'Time & Distance', difficulty: 1, concept: 'Stop Duration', text: `${rand(100,300)}km in ${rand(3,8)}h including stops. Moving time?`, answer: 'Less than total', explanation: 'Remove stop time'}),

  // MEDIUM (11)
  () => {{topic: 'Time & Distance', difficulty: 2, concept: 'Relative Meeting', text: `A: ${rand(40,60)}/h, B: ${rand(50,70)}/h, distance ${rand(200,400)}km. Meet time?`, answer: round(rand(200,400)/(rand(40,60)+rand(50,70))), explanation: 'Meeting = Distance / Combined speed'}),
  () => ({topic: 'Time & Distance', difficulty: 2, concept: 'Train Crossing Fixed', text: `Train ${rand(100,200)}m at ${rand(60,100)} km/h, platform ${rand(200,400)}m. Time?`, answer: round((rand(100,200)+rand(200,400))/(rand(60,100)*5/18)), explanation: 'Distance = Train length + Platform'}),
  () => {{topic: 'Time & Distance', difficulty: 2, concept: 'Train Crossing Train', text: `Train1: ${rand(100,150)}m@${rand(50,80)}km/h, Train2: ${rand(100,150)}m@${rand(40,70)}km/h. Cross?`, answer: 'Relative speed problem', explanation: 'Combined length / Relative speed'}),
  () => ({topic: 'Time & Distance', difficulty: 2, concept: 'Boat Downstream', text: `Boat speed ${rand(15,25)}km/h, stream ${rand(2,6)}km/h. Downstream?`, answer: rand(15,25)+rand(2,6), explanation: 'Downstream = Boat + Stream'}),
  () => {{topic: 'Time & Distance', difficulty: 2, concept: 'Boat Upstream', text: `Boat ${rand(15,25)}/h, stream ${rand(2,6)}/h. Upstream?`, answer: rand(15,25)-rand(2,6), explanation: 'Upstream = Boat - Stream'}),
  () => ({topic: 'Time & Distance', difficulty: 2, concept: 'Current Effect Balanced', text: `Still water {{rand(20,30)}}/h, downstream {{rand(50,100)}}km in {{rand(2,5)}}h`, answer: 'Calculate upstream/downstream difference', explanation: 'Downstream - Upstream = 2 × Current'}),
  () => {{topic: 'Time & Distance', difficulty: 2, concept: 'Two-leg Journey', text: `Leg1: {{rand(100,200)}}km@{{rand(50,70)}}/h, Leg2: {{rand(150,250)}}km@{{rand(60,80)}}/h. Total time?`, answer: 'Add individual times', explanation: 'Time = D₁/S₁ + D₂/S₂'}),
  () => ({topic: 'Time & Distance', difficulty: 2, concept: 'Speed Over Time', text: `First {{rand(2,4)}}h@{{rand(40,60)}}/h, next {{rand(2,4)}}h@{{rand(60,80)}}/h. Average?`, answer: 'Total distance / Total time', explanation: 'Weighted average'}),
  () => {{topic: 'Time & Distance', difficulty: 2, concept: 'Chase Problem', text: `A: {{rand(50,70)}}/h, B (ahead) {{rand(30,50)}}/h, gap {{rand(20,50)}}km. Catch?`, answer: round(rand(20,50)/(rand(50,70)-rand(30,50))), explanation: 'Gap / Speed difference'}),
  () => ({topic: 'Time & Distance', difficulty: 2, concept: 'Head Start', text: `B starts {{rand(0.5,3)}}h early@{{rand(40,60)}}/h, A follows@{{rand(60,80)}}/h. Catch?`, answer: 'Head start distance / Speed difference', explanation: 'Account for early start'}),
  () => {{topic: 'Time & Distance', difficulty: 2, concept: 'Circular Track', text: `Track {{rand(200,400)}}m. Speed {{rand(5,15)}}m/s. Laps in {{rand(5,15)}}min?`, answer: 'Time = Distance / Speed', explanation: 'Calculate total distance'}),

  // HARD (10)
  () => {{topic: 'Time & Distance', difficulty: 3, concept: 'Complex Meeting', text: `A@{{rand(40,60)}}/h, B@{{rand(50,80)}}/h, apart {{rand(300,600)}}km, roads angle {{rand(30,90)}}°`, answer: 'Trigonometric solution', explanation: 'Relative speed varies with angle'}),
  () => ({topic: 'Time & Distance', difficulty: 3, concept: 'Variable Speed Journey', text: `First {{rand(2,4)}}h@{{rand(40,60)}}/h, next {{rand(3,5)}}h@{{rand(70,90)}}/h. Average?`, answer: 'Weighted average calculation', explanation: 'Total distance / Total time'}),
  () => {{topic: 'Time & Distance', difficulty: 3, concept: 'Optimal Speed', text: `Distance {{rand(200,400)}}km. Minimize time with constraints. Optimal?`, answer: 'Maximum allowed speed', explanation: 'Speed-time trade-off'},
  () => ({topic: 'Time & Distance', difficulty: 3, concept: 'Fuel Optimization', text: `{{rand(200,400)}}km. Efficiency varies with speed. Calculate optimal?`, answer: 'Calculus-based optimization', explanation: 'Balance speed vs efficiency'}),
  () => {{topic: 'Time & Distance', difficulty: 3, concept: 'Convoy Movement', text: `{{rand(3,6)}} vehicles, slowest {{rand(40,60)}}/h, spread {{rand(10,30)}}km`, answer: 'Group moves at slowest', explanation: 'Convoy speed is minimum'}),
  () => ({topic: 'Time & Distance', difficulty: 3, concept: 'Intercept Calculation', text: `Target moving {{rand(30,50)}}/h, interceptor {{rand(70,100)}}/h, gap {{rand(30,60)}}km`, answer: round(rand(30,60)/(rand(70,100)-rand(30,50))), explanation: 'Closing speed determines intercept time'}),
  () => {{topic: 'Time & Distance', difficulty: 3, concept: 'Relay Race', text: `{{rand(3,5)}} runners, {{rand(100,200)}}m each, split {{rand(10,20)}}m. Total?`, answer: 'Sum of segments', explanation: 'Account for overlap/gap'}),
  () => ({topic: 'Time & Distance', difficulty: 3, concept: 'Round Trip Average', text: `Out @{{rand(40,60)}}/h, return {{rand(60,80)}}/h, distance {{rand(100,200)}}km`, answer: 'Harmonic mean of speeds', explanation: 'Avg ≠ (S₁+S₂)/2 for round trip'}),
  () => {{topic: 'Time & Distance', difficulty: 3, concept: 'Paced Descent', text: `Climb {{rand(500,1500)}}m@{{rand(2,5)}}/h, max safe descent {{rand(8,15)}}/h. Total?`, answer: 'Separate calculations per direction', explanation: 'Different speeds matter'}),
  () => ({topic: 'Time & Distance', difficulty: 3, concept: 'Traffic Flow', text: `Free flow {{rand(60,80)}}/h, congested {{rand(20,40)}}/h, {{rand(30,60)}}min each. Average?`, answer: 'Time-based average', explanation: 'Weight by time, not distance'})
];

// ═════════════════════════════════════════════════════════════════════════════
// RATIO & PROPORTION – 32 TEMPLATES (11 EASY, 11 MEDIUM, 10 HARD)
// ═════════════════════════════════════════════════════════════════════════════

const ratioTemplates = [
  // EASY (11)
  () => ({topic: 'Ratio & Proportion', difficulty: 1, concept: 'Ratio Simplification', text: `Simplify {{rand(10,50)}}:{{rand(10,50)}}`, answer: 'GCD-based simplification', explanation: 'Divide by GCD'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 1, concept: 'Ratio from Values', text: `A:B = {{rand(100,500)}}:{{rand(100,500)}}. Simplified?`, answer: 'Reduced form', explanation: 'Find common factor'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 1, concept: 'Share Calculation', text: `Total {{rand(500,1500)}}, ratio {{rand(2,5)}}:{{rand(2,5)}}. Share1?`, answer: 'Proportional share', explanation: 'Part = (Ratio/Total) × Total'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 1, concept: 'Find Missing Term', text: `3:x = 6:{{rand(8,20)}}. x=?`, answer: 'Cross multiply', explanation: '3 × ? = 6 × other'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 1, concept: 'Equivalent Ratio', text: `2:3 = ?:{{rand(9,21)}}`, answer: round(2*rand(9,21)/3), explanation: 'Scale proportionally'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 1, concept: 'Ratio Comparison', text: `Compare {{rand(3,7)}}:{{rand(4,8)}} vs {{rand(4,8)}}:{{rand(5,10)}}`, answer: 'Convert to decimals', explanation: 'Larger ratio = larger proportion'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 1, concept: 'Combine Ratios', text: `A:B={{rand(2,5)}}:{{rand(2,5)}}, B:C={{rand(2,5)}}:{{rand(2,5)}}. A:B:C?`, answer: 'Common term B', explanation: 'Make B same in both'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 1, concept: 'Inverse Ratio', text: `If A:B=2:3, B:A=?`, answer: '3:2', explanation: 'Swap terms for inverse'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 1, concept: 'Ratio of Ratio', text: `{{rand(2,6)}}:{{rand(2,6)}} compared to {{rand(3,7)}}:{{rand(3,7)}}. Which is larger?`, answer: 'Calculate both fractions', explanation: 'Compare decimal values'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 1, concept: 'Distributed Amount', text: `{{rand(1000,5000)}} distributed as {{rand(2,5)}}:{{rand(2,5)}} . Parts?`, answer: 'Divide by ratio parts', explanation: 'Each part = Total / Sum'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 1, concept: 'Scaling', text: `Recipe {{rand(2,4)}}:{{rand(3,5)}}. Scale for {{rand(2,4)}} times. New?`, answer: 'Multiply each by scale', explanation: 'Ratio stays same, values scale'}),

  // MEDIUM (11) 
  () => {{topic: 'Ratio & Proportion', difficulty: 2, concept: 'Three-way Distribution', text: `{{rand(2000,10000)}} in {{rand(2,4)}}:{{rand(2,4)}}:{{rand(2,4)}}`, answer: 'Proportional division', explanation: 'Part × (Ratio/Total)'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 2, concept: 'Continued Proportion', text: `If {{rand(2,6)}}:{{rand(3,7)}}={{rand(3,7)}}:x. x=?`, answer: 'Cross multiply a:b=c:d', explanation: 'ad = bc'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 2, concept: 'Inverse Proportion', text: `A is {{rand(2, 5)}}x value of B. Work days reverse ratio?`, answer: 'Inverse relationship', explanation: 'If A is kx value, time is 1/k'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 2, concept: 'Compound Ratio', text: `A:B={{rand(2,5)}}:{{rand(2,5)}}, C:D={{rand(2,5)}}:{{rand(2,5)}}. (A×C):(B×D)?`, answer: 'Multiply corresponding terms', explanation: 'Compound = Product of ratios'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 2, concept: 'Ratio Change', text: `{{rand(2,5)}}:{{rand(3,6)}} changes to {{rand(3,8)}}:{{rand(4,7)}}. Change?`, answer: 'Subtract initial from final', explanation: 'Find difference ratios'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 2, concept: 'Price Ratio', text: `Dish costs {{rand(150,500)}} and {{rand(100,400)}}. Price ratio?`, answer: 'Simplified ratio', explanation: 'Find GCD and reduce'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 2, concept: 'Weighted Ratio', text: `Mix ratio {{rand(2,5)}}:{{rand(3,6)}} with quantities {{rand(100,300)}}:{{rand(100,300)}}`, answer: 'Account for both ratio and quantity', explanation: 'Total = Qty1 + Qty2'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 2, concept: 'Unequal Division', text: `{{rand(500,2000)}} split {{rand(30,70)}}:{{rand(30,70)}}. Difference?`, answer: round(rand(500,2000)*(Math.abs(rand(30,70)-rand(30,70))/100)), explanation: '% difference × Total'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 2, concept: 'Ratio of Differences', text: `{{rand(200,500)}} and {{rand(100,300)}}. Ratio of difference to smaller?`, answer: 'Difference / Smaller value', explanation: '(Larger - Smaller) / Smaller'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 2, concept: 'Cost Margin Ratio', text: `Cost {{rand(500,2000)}} to {{rand(600,2500)}}. What ratio sells equally?`, answer: 'Equal revenue ratio', explanation: 'CP ratio ≠ Revenue split'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 2, concept: 'Budget Allocation', text: `{{rand(1000,5000)}} divided as {{rand(20,40)}}:{{rand(30,50)}}:{{rand(20,30)}}. Each share?`, answer: 'Three-part proportion', explanation: 'Part = Ratio × Total/Sum'}),

  // HARD (10)
  () => {{topic: 'Ratio & Proportion', difficulty: 3, concept: 'Complex Compound', text: `A:B=p:q, B:C=r:s, C:D=t:u. A:D=?`, answer: 'Product of all ratios', explanation: 'Chain multiplication'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 3, concept: 'Proportion Equation', text: `a/{{rand(2,6)}} = {{rand(100,300)}}/{{rand(2,6)}}. a=?`, answer: 'Cross multiply and solve', explanation: 'Direct proportion solving'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 3, concept: 'Harmonic Division', text: `Divide {{rand(1000,5000)}} in inverse ratio {{rand(2,5)}}:{{rand(3,7)}}`, answer: 'Invert ratio then distribute', explanation: 'Inverse means reciprocals'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 3, concept: 'Multiple Proportions', text: `x:y=3:4, y:z=5:6, x:y:z=?`, answer: 'Make y equal in both', explanation: 'Find LCM for common term'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 3, concept: 'Proportion Verification', text: `If {{rand(10,50)}}:{{rand(15,60)}}::{{rand(20,70)}}:{{rand(30,90)}}. Verify?`, answer: 'Cross products equal?', explanation: 'ad = bc for a:b::c:d'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 3, concept: 'Dynamic Ratio Change', text: `Ratio changes {{rand(20,50)}}% - old {{rand(2,5)}}:{{rand(2,5)}}. New after change?`, answer: 'Apply percentage change', explanation: 'Modify original ratio'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 3, concept: 'Nested Ratios', text: `(a+b):(c-d)=3:2,  a:b=2:1. Find a,b,c,d relationships?`, answer: 'System of proportions', explanation: 'Use multiple equations'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 3, concept: 'Scaled Distribution', text: `Original  {{rand(2,6)}}:{{rand(2,6)}}:{{rand(2,6)}}. Double one, redistribute. New ratio?`, answer: 'Recalculate after change', explanation: 'Maintain total, update portions'}),
  () => {{topic: 'Ratio & Proportion', difficulty: 3, concept: 'Optimization', text: `Mix liquids {{rand(2,5)}}:{{rand(2,5)}} for {{rand(500,2000)}}ml. Maximize component 1. Volumes?`, answer: 'Maximum ratio portion', explanation: 'Higher ratio = larger share'}),
  () => ({topic: 'Ratio & Proportion', difficulty: 3, concept: 'Partnership Profit', text: `Invest {{rand(10000,50000)}}:{{rand(15000,60000)}} for {{rand(6,24)}} months. Profit {{rand(50000,200000)}}. Share?`, answer: 'Weighted by investment×time', explanation: 'Profit ∝ (Capital × Time)'})
];

// Export all templates
module.exports = {
  timeWorkTemplates,
  timeDistanceTemplates,
  ratioTemplates
};
