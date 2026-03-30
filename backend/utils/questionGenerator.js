/**
 * AptiSmart – Question Generator
 * Generates multi-step, scenario-based aptitude questions dynamically.
 * Each call returns a fresh question with randomised values.
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns a random integer between min and max (inclusive) */
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Round to N decimal places */
const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;

/** Pick a random element from an array */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Generate 3 wrong options that are close to correct answer */
const generateOptions = (correct, spread = 5) => {
  const correctStr = String(correct);
  const offsets    = [-spread * 2, -spread, spread, spread * 2].sort(() => Math.random() - 0.5).slice(0, 3);
  const wrongs     = offsets.map((o) => {
    const val = typeof correct === 'number' ? round(correct + o) : correct;
    return String(val);
  });
  // ensure no duplicates with correct answer
  const filtered = [...new Set(wrongs.filter((w) => w !== correctStr))].slice(0, 3);
  while (filtered.length < 3) filtered.push(String(round((typeof correct === 'number' ? correct : 0) + rand(1, 3) * spread)));
  const all = [correctStr, ...filtered].sort(() => Math.random() - 0.5);
  return all;
};

const formatRs = (n) => `₹${n}`;

// ─── PROFIT & LOSS TEMPLATES ──────────────────────────────────────────────────

const profitLossTemplates = {

  // ── Difficulty 1 (Easy) ────────────────────────────────────────────────────

  pl_easy_1: () => {
    const cp   = rand(100, 500) * 10;
    const profP= rand(5, 25);
    const sp   = round(cp * (1 + profP / 100));
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      text: `A trader buys an article for ${formatRs(cp)} and sells it at a profit of ${profP}%. What is the selling price?`,
      steps: ['SP = CP × (1 + Profit%/100)', `SP = ${cp} × ${(1 + profP / 100).toFixed(2)}`],
      answer: round(sp),
      unit: '₹',
      explanation: `SP = CP × (1 + ${profP}/100) = ${cp} × ${(1 + profP / 100).toFixed(2)} = ₹${sp}`,
      options: generateOptions(round(sp), cp * 0.05),
    };
  },

  pl_easy_2: () => {
    const sp   = rand(200, 800) * 5;
    const lossP= rand(5, 20);
    const cp   = round(sp / (1 - lossP / 100));
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      text: `A shopkeeper sells a bag for ${formatRs(sp)} at a loss of ${lossP}%. Find the cost price of the bag.`,
      steps: ['CP = SP / (1 – Loss%/100)', `CP = ${sp} / ${(1 - lossP / 100).toFixed(2)}`],
      answer: round(cp),
      unit: '₹',
      explanation: `CP = ${sp} / (1 – ${lossP}/100) = ${sp} / ${(1 - lossP / 100).toFixed(2)} = ₹${round(cp)}`,
      options: generateOptions(round(cp), sp * 0.06),
    };
  },

  pl_easy_3: () => {
    const cp = rand(200, 600) * 5;
    const sp = rand(1, 2) === 1 ? round(cp * (1 + rand(5, 30) / 100)) : round(cp * (1 - rand(5, 20) / 100));
    const isProfit = sp > cp;
    const pct = round(Math.abs(sp - cp) / cp * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      text: `An item is bought for ${formatRs(cp)} and sold for ${formatRs(sp)}. What is the ${isProfit ? 'profit' : 'loss'} percentage?`,
      steps: [
        `${isProfit ? 'Profit' : 'Loss'} = |SP – CP| = |${sp} – ${cp}| = ₹${Math.abs(sp - cp)}`,
        `${isProfit ? 'Profit' : 'Loss'}% = (${Math.abs(sp - cp)} / ${cp}) × 100`,
      ],
      answer: pct,
      unit: '%',
      explanation: `${isProfit ? 'Profit' : 'Loss'} = ₹${Math.abs(sp - cp)}. Percentage = (${Math.abs(sp - cp)} / ${cp}) × 100 = ${pct}%`,
      options: generateOptions(pct, 3),
    };
  },

  // ── Difficulty 2 (Medium) ──────────────────────────────────────────────────

  pl_med_1: () => {
    const mp      = rand(50, 200) * 10;
    const discount= rand(10, 30);
    const profitP = rand(5, 20);
    const sp      = round(mp * (1 - discount / 100));
    const cp      = round(sp / (1 + profitP / 100));
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      text: `A shopkeeper marks an article at ${formatRs(mp)} and gives a discount of ${discount}%. Despite this, he makes a profit of ${profitP}%. Find the cost price of the article.`,
      steps: [
        `SP = MP × (1 – Discount%/100) = ${mp} × ${(1 - discount / 100).toFixed(2)} = ₹${sp}`,
        `CP = SP / (1 + Profit%/100) = ${sp} / ${(1 + profitP / 100).toFixed(2)} = ₹${round(cp)}`,
      ],
      answer: round(cp),
      unit: '₹',
      explanation: `SP = ₹${sp}. CP = SP/(1 + ${profitP}/100) = ${sp}/${(1 + profitP / 100).toFixed(2)} = ₹${round(cp)}`,
      options: generateOptions(round(cp), mp * 0.07),
    };
  },

  pl_med_2: () => {
    const n1    = rand(5, 15);
    const n2    = rand(5, 15);
    const pprice= rand(10, 50) * 10;   // price per batch sold
    const qty1  = n1 + n2;             // buys n1+n2 for pprice each purchase
    const buy   = n1 + n2;
    const cp    = rand(40, 100) * 5;
    const sp    = rand(40, 100) * 5;
    const profP = round((sp - cp) / cp * 100);
    const items = pick(['pens', 'notebooks', 'erasers', 'books', 'toys']);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      text: `A stationery shop buys ${buy} ${items} at ₹${cp} each. The shopkeeper sells ${n1} ${items} at ₹${sp} each and the remaining ${n2} at ₹${Math.round(sp * 0.8)} each. Find the overall profit or loss percentage.`,
      steps: [
        `Total CP = ${buy} × ${cp} = ₹${buy * cp}`,
        `Revenue from ${n1} items = ${n1} × ${sp} = ₹${n1 * sp}`,
        `Revenue from ${n2} items = ${n2} × ${Math.round(sp * 0.8)} = ₹${n2 * Math.round(sp * 0.8)}`,
        `Total SP = ₹${n1 * sp + n2 * Math.round(sp * 0.8)}`,
      ],
      answer: (() => {
        const totalCp = buy * cp;
        const totalSp = n1 * sp + n2 * Math.round(sp * 0.8);
        return round((totalSp - totalCp) / totalCp * 100);
      })(),
      unit: '%',
      explanation: (() => {
        const totalCp = buy * cp;
        const totalSp = n1 * sp + n2 * Math.round(sp * 0.8);
        const diff    = totalSp - totalCp;
        const pct     = round(diff / totalCp * 100);
        return `Total CP=₹${totalCp}, Total SP=₹${totalSp}. ${diff >= 0 ? 'Profit' : 'Loss'}% = ${Math.abs(pct)}%`;
      })(),
      options: (() => {
        const totalCp = buy * cp;
        const totalSp = n1 * sp + n2 * Math.round(sp * 0.8);
        const ans     = round((totalSp - totalCp) / totalCp * 100);
        return generateOptions(ans, 5);
      })(),
    };
  },

  pl_med_3: () => {
    const cp1 = rand(100, 500) * 5;
    const cp2 = cp1;                       // equal CP for classic problem
    const gP  = rand(10, 30);
    const lP  = gP;                        // equal % gain and loss → always 2% net loss
    const sp1 = round(cp1 * (1 + gP / 100));
    const sp2 = round(cp2 * (1 - lP / 100));
    const totalCp = cp1 + cp2;
    const totalSp = sp1 + sp2;
    const netPct  = round((totalSp - totalCp) / totalCp * 100);
    const items   = pick(['mobile phones', 'laptops', 'watches', 'cameras']);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      text: `A trader sells two ${items}, each costing ₹${cp1}. He sells the first at ${gP}% profit and the second at ${lP}% loss. What is the overall profit or loss percentage on the entire transaction?`,
      steps: [
        `SP of first = ${cp1} × ${(1 + gP / 100).toFixed(2)} = ₹${sp1}`,
        `SP of second = ${cp2} × ${(1 - lP / 100).toFixed(2)} = ₹${sp2}`,
        `Total CP = ₹${totalCp}, Total SP = ₹${totalSp}`,
        `Net = ${netPct}% (${totalSp < totalCp ? 'Loss' : 'Profit'})`,
      ],
      answer: Math.abs(netPct),
      unit: `% ${totalSp < totalCp ? 'Loss' : 'Profit'}`,
      explanation: `Total CP=₹${totalCp}, Total SP=₹${totalSp}. Net ${totalSp < totalCp ? 'Loss' : 'Profit'}% = ${Math.abs(netPct)}% (Hint: equal % gain & loss on equal CP always gives a net loss of (P²/100)% = ${round(gP * gP / 100)}%)`,
      options: generateOptions(Math.abs(netPct), 2),
    };
  },

  // ── Difficulty 3 (Hard) ────────────────────────────────────────────────────

  pl_hard_1: () => {
    const cpA  = rand(20, 60) * 50;
    const profA= rand(15, 35);
    const lossB= rand(10, 25);
    const spA  = round(cpA * (1 + profA / 100));
    // B sells to C at a loss; A sold to B, so B's CP = spA
    const cpB  = spA;
    const spB  = round(cpB * (1 - lossB / 100));
    const overallProfit = round((spB - cpA) / cpA * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      text: `A manufactures a product at ₹${cpA} and sells it to B at a profit of ${profA}%. B then sells it to C at a loss of ${lossB}%. Find: (i) What does C pay? (ii) What is A's overall profit/loss % compared to C's price?`,
      steps: [
        `A→B: SP = ${cpA} × (1 + ${profA}/100) = ₹${spA}  [B's CP = ₹${spA}]`,
        `B→C: SP = ${spA} × (1 – ${lossB}/100) = ₹${spB}  [C pays ₹${spB}]`,
        `A's cost vs C's price: (${spB} – ${cpA}) / ${cpA} × 100`,
      ],
      answer: Math.abs(overallProfit),
      unit: `% ${overallProfit >= 0 ? 'Profit' : 'Loss'} for A vs C`,
      explanation: `C pays ₹${spB}. Compared to A's cost of ₹${cpA}, A effectively ${overallProfit >= 0 ? 'gained' : 'lost'} ${Math.abs(overallProfit)}% overall.`,
      options: generateOptions(Math.abs(overallProfit), 4),
    };
  },

  pl_hard_2: () => {
    const markup   = rand(20, 50);
    const discount = rand(10, 20);
    const profit   = round(((1 + markup / 100) * (1 - discount / 100) - 1) * 100);
    const sp       = rand(50, 200) * 10;
    const cp       = round(sp / (1 + markup / 100) / (1 - discount / 100));
    const items    = pick(['refrigerators', 'televisions', 'air conditioners', 'washing machines']);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      text: `A dealer marks his ${items} at ${markup}% above cost price and allows a discount of ${discount}% on the marked price. If the selling price is ₹${sp}, find the cost price and the actual profit percentage.`,
      steps: [
        `Let CP = x. MP = x × ${(1 + markup / 100).toFixed(2)}`,
        `SP = MP × (1 – ${discount}/100) = x × ${(1 + markup / 100).toFixed(2)} × ${(1 - discount / 100).toFixed(2)}`,
        `${sp} = x × ${round((1 + markup / 100) * (1 - discount / 100), 4)}`,
        `CP = ₹${round(cp)}, Profit% = ${profit}%`,
      ],
      answer: round(cp),
      unit: '₹',
      explanation: `CP = ₹${round(cp)}. Actual profit = ${profit}% (Markup ${markup}% – Discount ${discount}% – Markup×Discount/100)`,
      options: generateOptions(round(cp), sp * 0.08),
    };
  },

  pl_hard_3: () => {
    const totalRevenue  = rand(50, 200) * 100;
    const items         = pick(['books', 'garments', 'electronics', 'jewellery']);
    const profitOnFirst = rand(15, 30);
    const lossOnSecond  = rand(10, 20);
    // x sold at profit, (totalRevenue - x) at loss, net profit = profitTarget
    const profitTarget  = rand(5, 15);
    // x/totalRevenue * profitOnFirst - (1-x/totalRevenue)*lossOnSecond = profitTarget
    // x*(profitOnFirst + lossOnSecond) = totalRevenue*(profitTarget + lossOnSecond)
    const fractionX     = (profitTarget + lossOnSecond) / (profitOnFirst + lossOnSecond);
    const x             = round(totalRevenue * fractionX);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      text: `A merchant has ${items} worth ₹${totalRevenue} in total cost. He wants to make an overall profit of ${profitTarget}%. He sells a portion at ${profitOnFirst}% profit and the rest at ${lossOnSecond}% loss. How much (at cost price) must he sell at profit to achieve his target?`,
      steps: [
        `Let cost of items sold at profit = x`,
        `Profit from x = ${profitOnFirst}% of x; Loss from rest = ${lossOnSecond}% of (${totalRevenue}−x)`,
        `Net profit equation: ${profitOnFirst}x/100 − ${lossOnSecond}(${totalRevenue}−x)/100 = ${profitTarget}×${totalRevenue}/100`,
        `x = ₹${x}`,
      ],
      answer: x,
      unit: '₹',
      explanation: `x(${profitOnFirst} + ${lossOnSecond}) = ${totalRevenue}(${profitTarget} + ${lossOnSecond}) → x = ₹${x}`,
      options: generateOptions(x, totalRevenue * 0.07),
    };
  },
};

// ─── PERCENTAGES TEMPLATES ────────────────────────────────────────────────────

const percentagesTemplates = {

  // ── Difficulty 1 (Easy) ────────────────────────────────────────────────────

  pct_easy_1: () => {
    const base = rand(200, 1000) * 5;
    const pct  = rand(5, 40) * 5;
    const ans  = round(base * pct / 100);
    return {
      topic: 'Percentages',
      difficulty: 1,
      text: `What is ${pct}% of ${base}?`,
      steps: [`${pct}% of ${base} = (${pct}/100) × ${base}`],
      answer: ans,
      unit: '',
      explanation: `(${pct}/100) × ${base} = ${ans}`,
      options: generateOptions(ans, base * 0.05),
    };
  },

  pct_easy_2: () => {
    const part  = rand(20, 300) * 5;
    const total = rand(500, 2000) * 5;
    const ans   = round(part / total * 100);
    return {
      topic: 'Percentages',
      difficulty: 1,
      text: `${part} is what percentage of ${total}?`,
      steps: [`(${part} / ${total}) × 100`],
      answer: ans,
      unit: '%',
      explanation: `(${part}/${total}) × 100 = ${ans}%`,
      options: generateOptions(ans, 5),
    };
  },

  pct_easy_3: () => {
    const pct  = rand(5, 50) * 5;
    const part = rand(50, 500) * 2;
    const total= round(part * 100 / pct);
    return {
      topic: 'Percentages',
      difficulty: 1,
      text: `${pct}% of a number is ${part}. What is the number?`,
      steps: [`Number = ${part} × 100 / ${pct}`],
      answer: total,
      unit: '',
      explanation: `Number = (${part} × 100) / ${pct} = ${total}`,
      options: generateOptions(total, total * 0.08),
    };
  },

  // ── Difficulty 2 (Medium) ──────────────────────────────────────────────────

  pct_med_1: () => {
    const xMore = rand(10, 50) * 5;   // A's salary is xMore% more than B
    const salB  = rand(20, 80) * 500;
    const salA  = round(salB * (1 + xMore / 100));
    const bLessA= round(xMore / (100 + xMore) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      text: `A's salary is ${xMore}% more than B's salary. B's monthly salary is ₹${salB}. By what percentage is B's salary less than A's salary?`,
      steps: [
        `A's salary = ${salB} × (1 + ${xMore}/100) = ₹${salA}`,
        `Difference = ₹${salA - salB}`,
        `% by which B is less than A = (${salA - salB} / ${salA}) × 100`,
      ],
      answer: bLessA,
      unit: '%',
      explanation: `A = ₹${salA}. B is less than A by (${salA - salB}/${salA})×100 = ${bLessA}%. Formula: x/(100+x)×100 = ${xMore}/${100 + xMore}×100 = ${bLessA}%`,
      options: generateOptions(bLessA, 4),
    };
  },

  pct_med_2: () => {
    const pop    = rand(50, 200) * 1000;
    const inc1   = rand(5, 20);
    const dec2   = rand(5, 15);
    const popY1  = Math.round(pop * (1 + inc1 / 100));
    const popY2  = Math.round(popY1 * (1 - dec2 / 100));
    const netPct = round((popY2 - pop) / pop * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      text: `The population of a town is ${pop.toLocaleString()}. It increases by ${inc1}% in the first year and decreases by ${dec2}% in the second year. What is the population at the end of two years and the net % change?`,
      steps: [
        `After Year 1: ${pop} × (1 + ${inc1}/100) = ${popY1}`,
        `After Year 2: ${popY1} × (1 – ${dec2}/100) = ${popY2}`,
        `Net % change = (${popY2 - pop} / ${pop}) × 100 = ${netPct}%`,
      ],
      answer: popY2,
      unit: '',
      explanation: `Population after 2 years = ${popY2.toLocaleString()}. Net change = ${netPct}% (${netPct >= 0 ? 'increase' : 'decrease'}).`,
      options: generateOptions(popY2, pop * 0.05),
    };
  },

  pct_med_3: () => {
    const totalVoters   = rand(10, 50) * 1000;
    const voterTurnout  = rand(60, 90);
    const winnerPct     = rand(55, 75);
    const votesCast     = Math.round(totalVoters * voterTurnout / 100);
    const winnerVotes   = Math.round(votesCast * winnerPct / 100);
    const margin        = winnerVotes - (votesCast - winnerVotes);
    return {
      topic: 'Percentages',
      difficulty: 2,
      text: `In a local election, there are ${totalVoters.toLocaleString()} registered voters. ${voterTurnout}% of them cast their votes. The winning candidate received ${winnerPct}% of the votes cast. By how many votes did the winner beat the runner-up?`,
      steps: [
        `Votes cast = ${totalVoters} × ${voterTurnout}/100 = ${votesCast}`,
        `Winner's votes = ${votesCast} × ${winnerPct}/100 = ${winnerVotes}`,
        `Runner-up's votes = ${votesCast - winnerVotes}`,
        `Margin = ${winnerVotes} – ${votesCast - winnerVotes} = ${margin}`,
      ],
      answer: margin,
      unit: 'votes',
      explanation: `Margin of victory = ${winnerVotes} – ${votesCast - winnerVotes} = ${margin} votes`,
      options: generateOptions(margin, totalVoters * 0.04),
    };
  },

  pct_med_4: () => {
    const original = rand(200, 800) * 5;
    const inc1     = rand(10, 30);
    const inc2     = rand(5, 25);
    const after1   = round(original * (1 + inc1 / 100));
    const after2   = round(after1 * (1 + inc2 / 100));
    const netPct   = round((after2 - original) / original * 100);
    const item     = pick(['a car', 'property', 'gold', 'a house', 'land']);
    return {
      topic: 'Percentages',
      difficulty: 2,
      text: `The value of ${item} is ₹${original}. It appreciates by ${inc1}% in the first year and by ${inc2}% in the second year. What is the net percentage increase in value over two years?`,
      steps: [
        `Value after Year 1 = ${original} × (1 + ${inc1}/100) = ₹${after1}`,
        `Value after Year 2 = ${after1} × (1 + ${inc2}/100) = ₹${after2}`,
        `Net % increase = (${after2 - original} / ${original}) × 100 = ${netPct}%`,
      ],
      answer: netPct,
      unit: '%',
      explanation: `Net % increase = ${inc1} + ${inc2} + (${inc1}×${inc2}/100) = ${netPct}% (successive %)`,
      options: generateOptions(netPct, 4),
    };
  },

  // ── Difficulty 3 (Hard) ────────────────────────────────────────────────────

  pct_hard_1: () => {
    const milkPct  = rand(60, 80);
    const total    = rand(40, 120) * 5;
    const water    = Math.round(total * (100 - milkPct) / 100);
    const milk     = total - water;
    const addWater = rand(5, 20) * 5;
    const newTotal = total + addWater;
    const newMilkPct = round(milk / newTotal * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      text: `A container holds ${total} litres of a mixture where ${milkPct}% is milk and the rest is water. ${addWater} litres of water are added to the container. What is the new percentage of milk in the mixture?`,
      steps: [
        `Milk = ${total} × ${milkPct}/100 = ${milk} litres`,
        `Original water = ${water} litres. New water = ${water + addWater} litres`,
        `New total = ${newTotal} litres`,
        `New milk% = (${milk} / ${newTotal}) × 100 = ${newMilkPct}%`,
      ],
      answer: newMilkPct,
      unit: '%',
      explanation: `Milk remains ${milk} L. New total = ${newTotal} L. Milk% = ${milk}/${newTotal} × 100 = ${newMilkPct}%`,
      options: generateOptions(newMilkPct, 5),
    };
  },

  pct_hard_2: () => {
    const salary   = rand(40, 100) * 1000;
    const houseRent= rand(20, 30);
    const food     = rand(25, 40);
    const edu      = rand(10, 20);
    // ensure total <= 90 so savings are positive
    const safeEdu  = Math.min(edu, 90 - houseRent - food);
    const savings  = round(salary * (1 - (houseRent + food + safeEdu) / 100));
    return {
      topic: 'Percentages',
      difficulty: 3,
      text: `Ramesh earns ₹${salary.toLocaleString()} per month. He spends ${houseRent}% on house rent, ${food}% on food, and ${safeEdu}% on education. The rest is saved. What is the amount he saves each month, and what percentage of his salary is saved?`,
      steps: [
        `House rent = ${houseRent}% of ${salary} = ₹${Math.round(salary * houseRent / 100)}`,
        `Food = ${food}% of ${salary} = ₹${Math.round(salary * food / 100)}`,
        `Education = ${safeEdu}% of ${salary} = ₹${Math.round(salary * safeEdu / 100)}`,
        `Savings = (100 – ${houseRent} – ${food} – ${safeEdu})% = ${100 - houseRent - food - safeEdu}% of ₹${salary}`,
      ],
      answer: savings,
      unit: '₹',
      explanation: `Savings = (100 – ${houseRent + food + safeEdu})% of ₹${salary} = ${100 - houseRent - food - safeEdu}% × ${salary} = ₹${savings}`,
      options: generateOptions(savings, salary * 0.05),
    };
  },

  pct_hard_3: () => {
    const students   = rand(100, 500) * 5;
    const passPct    = rand(55, 80);
    const girlPct    = rand(40, 55);
    const passGirlPct= rand(60, 90);
    const girls      = Math.round(students * girlPct / 100);
    const boys       = students - girls;
    const totalPass  = Math.round(students * passPct / 100);
    const passGirls  = Math.round(girls * passGirlPct / 100);
    const passBoys   = totalPass - passGirls;
    const passBoyPct = round(passBoys / boys * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      text: `In a school exam, ${students} students appeared. ${passPct}% passed overall. ${girlPct}% of the students are girls, and ${passGirlPct}% of the girls passed. What percentage of boys passed?`,
      steps: [
        `Girls = ${students} × ${girlPct}/100 = ${girls}; Boys = ${boys}`,
        `Total passed = ${students} × ${passPct}/100 = ${totalPass}`,
        `Girls who passed = ${girls} × ${passGirlPct}/100 = ${passGirls}`,
        `Boys who passed = ${totalPass} – ${passGirls} = ${passBoys}`,
        `Boys' pass% = (${passBoys} / ${boys}) × 100 = ${passBoyPct}%`,
      ],
      answer: passBoyPct,
      unit: '%',
      explanation: `Boys passed = ${passBoys} out of ${boys} boys. Pass% = ${passBoyPct}%`,
      options: generateOptions(passBoyPct, 5),
    };
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

const plKeys  = Object.keys(profitLossTemplates);
const pctKeys = Object.keys(percentagesTemplates);

/**
 * Generate a single question
 * @param {'Profit & Loss'|'Percentages'|'Mixed'} topic
 * @param {1|2|3} difficulty  1=Easy 2=Medium 3=Hard
 */
const generateQuestion = (topic, difficulty = 2) => {
  const useTopic = topic === 'Mixed' ? (Math.random() > 0.5 ? 'Profit & Loss' : 'Percentages') : topic;

  let pool;
  if (useTopic === 'Profit & Loss') {
    pool = plKeys.filter((k) => {
      if (difficulty === 1) return k.includes('_easy_');
      if (difficulty === 3) return k.includes('_hard_');
      return k.includes('_med_');
    });
    if (!pool.length) pool = plKeys.filter((k) => k.includes('_med_'));
  } else {
    pool = pctKeys.filter((k) => {
      if (difficulty === 1) return k.includes('_easy_');
      if (difficulty === 3) return k.includes('_hard_');
      return k.includes('_med_');
    });
    if (!pool.length) pool = pctKeys.filter((k) => k.includes('_med_'));
  }

  const templateKey = pick(pool);
  const template    = useTopic === 'Profit & Loss'
    ? profitLossTemplates[templateKey]
    : percentagesTemplates[templateKey];

  const q = template();

  // Normalise options
  const correctStr = String(q.answer);
  if (!q.options || q.options.length < 4) {
    q.options = generateOptions(q.answer, typeof q.answer === 'number' ? Math.max(q.answer * 0.1, 5) : 5);
  }
  // Ensure correct answer is always in options
  if (!q.options.includes(correctStr)) {
    q.options[0] = correctStr;
    q.options = q.options.sort(() => Math.random() - 0.5);
  }
  q.options = q.options.slice(0, 4);

  return {
    id:           `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    topic:        q.topic,
    difficulty:   q.difficulty,
    text:         q.text,
    steps:        q.steps || [],
    options:      q.options.map(String),
    correctAnswer: correctStr,
    explanation:  q.explanation || '',
    unit:         q.unit || '',
  };
};

/**
 * Generate a full quiz set
 * @param {string} topic
 * @param {number} count  Number of questions (default 10)
 * @param {number} startDifficulty  1|2|3
 */
const generateQuiz = (topic = 'Mixed', count = 10, startDifficulty = 2) => {
  const questions = [];
  let diff = Math.max(1, Math.min(3, startDifficulty));
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(topic, diff));
  }
  return questions;
};

/**
 * Adjust difficulty based on answer correctness
 */
const adjustDifficulty = (current, isCorrect) => {
  if (isCorrect && current < 3) return current + 1;
  if (!isCorrect && current > 1) return current - 1;
  return current;
};

/**
 * Map numeric difficulty to label
 */
const difficultyLabel = (d) => ({ 1: 'Easy', 2: 'Medium', 3: 'Hard' }[d] || 'Medium');

/**
 * Map score to performance level
 */
const performanceLevel = (accuracy) => {
  if (accuracy >= 80) return 'Advanced';
  if (accuracy >= 50) return 'Intermediate';
  return 'Beginner';
};

module.exports = { generateQuestion, generateQuiz, adjustDifficulty, difficultyLabel, performanceLevel };