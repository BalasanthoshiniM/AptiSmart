/**
 * AptiSmart – Advanced Aptitude Question Generator
 * Company-level (TCS, Infosys, Zoho) dynamic question generation
 * Covers: Profit & Loss, Percentages, Time & Work, Time & Distance, 
 *         Ratio & Proportion, Interest, Averages
 */

// ─── UTILITIES ─────────────────────────────────────────────────────────────

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const formatRs = (n) => `₹${n}`;

const generateOptions = (correct, spread = 5, type = 'number') => {
  const correctStr = String(correct);
  
  // Handle ratio answers (e.g., '6:4:5', '3:2', '15:20:24')
  if (correctStr.includes(':')) {
    const parts = correctStr.split(':').map(p => parseInt(p));
    if (parts.length === 2) {
      // Two-part ratio: generate variations
      const [a, b] = parts;
      const options = [
        `${a}:${b}`,
        `${b}:${a}`,  // inverse
        `${a}:${a+b}`,  // different base
        `${a+b}:${b}`   // different base
      ];
      return options.sort(() => Math.random() - 0.5);
    } else if (parts.length === 3) {
      // Three-part ratio: generate variations
      const [a, b, c] = parts;
      const options = [
        `${a}:${b}:${c}`,
        `${c}:${b}:${a}`,  // reversed
        `${a*2}:${b*2}:${c*2}`,  // scaled
        `${a}:${b}:${b+c}`   // variation
      ];
      return options.sort(() => Math.random() - 0.5);
    }
  }
  
  // Handle string answers (e.g., 'A', 'B', 'Yes', 'No')
  if (isNaN(parseFloat(correct))) {
    // For string answers, return meaningful alternatives
    const stringAnswers = {
      'A': ['A', 'B', 'C', 'D'],
      'B': ['A', 'B', 'C', 'D'],
      'C': ['A', 'B', 'C', 'D'],
      'D': ['A', 'B', 'C', 'D'],
      'Yes': ['Yes', 'No', 'Maybe', 'Unclear'],
      'No': ['Yes', 'No', 'Maybe', 'Unclear'],
    };
    
    const options = stringAnswers[correctStr] || [correctStr, 'Option 2', 'Option 3', 'Option 4'];
    return options.sort(() => Math.random() - 0.5);
  }
  
  // Original logic for numeric answers
  const offsets = [-spread * 2, -spread, spread, spread * 2]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const wrongs = offsets.map(o => {
    const val = round(correct + o);
    return String(val);
  });
  
  const filtered = [...new Set(wrongs.filter(w => w !== correctStr))].slice(0, 3);
  while (filtered.length < 3) {
    filtered.push(String(round(correct + rand(1, 3) * spread)));
  }
  
  return [correctStr, ...filtered].sort(() => Math.random() - 0.5);
};

// ─── PERFORMANCE LEVEL CALCULATOR ──────────────────────────────────────────

const performanceLevel = (accuracy) => {
  if (accuracy >= 75) return 'Advanced';
  if (accuracy >= 40) return 'Intermediate';
  return 'Beginner';
};

// ─────────────────────────────────────────────────────────────────────────────
// PROFIT & LOSS – 33 TEMPLATES (12 EASY, 11 MEDIUM, 10 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const profitLossTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (12 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Simple Profit Calculation
  () => {
    const cp = rand(100, 500) * 10;
    const profitP = rand(10, 30);
    const profit = round((cp * profitP) / 100);
    const sp = cp + profit;
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Simple Profit %',
      text: `A shopkeeper buys an item for ${formatRs(cp)}. He wants to sell it at a profit of ${profitP}%. What is the selling price?`,
      answer: round(sp),
      explanation: `SP = CP × (1 + Profit%/100) = ${cp} × ${(1 + profitP/100).toFixed(2)} = ${round(sp)}`
    };
  },

  // E2: Simple Loss Calculation
  () => {
    const cp = rand(100, 500) * 10;
    const lossP = rand(5, 20);
    const loss = round((cp * lossP) / 100);
    const sp = cp - loss;
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Simple Loss %',
      text: `A merchant buys goods for ${formatRs(cp)} but has to sell them at a loss of ${lossP}%. What is the selling price?`,
      answer: round(sp),
      explanation: `SP = CP × (1 - Loss%/100) = ${cp} × ${(1 - lossP/100).toFixed(2)} = ${round(sp)}`
    };
  },

  // E3: Find Profit/Loss Amount
  () => {
    const cp = rand(100, 400) * 10;
    const sp = rand(150, 500) * 10;
    const isProfit = sp > cp;
    const amount = isProfit ? sp - cp : cp - sp;
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Profit/Loss Amount',
      text: `Cost price is ${formatRs(cp)} and selling price is ${formatRs(sp)}. Find the ${isProfit ? 'profit' : 'loss'}.`,
      answer: amount,
      explanation: `${isProfit ? 'Profit' : 'Loss'} = |SP - CP| = |${sp} - ${cp}| = ${amount}`
    };
  },

  // E4: Profit % Calculation
  () => {
    const cp = rand(100, 400) * 10;
    const profitAmount = rand(50, 300) * 10;
    const sp = cp + profitAmount;
    const profitP = round((profitAmount / cp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Profit % Calculation',
      text: `If CP is ${formatRs(cp)} and profit is ${formatRs(profitAmount)}, what is the profit percentage?`,
      answer: profitP,
      explanation: `Profit% = (Profit / CP) × 100 = (${profitAmount} / ${cp}) × 100 = ${profitP}%`
    };
  },

  // E5: Loss % Calculation
  () => {
    const cp = rand(100, 500) * 10;
    const lossAmount = rand(50, 200) * 10;
    const sp = cp - lossAmount;
    const lossP = round((lossAmount / cp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Loss % Calculation',
      text: `CP is ${formatRs(cp)} and loss is ${formatRs(lossAmount)}. Find loss percentage.`,
      answer: lossP,
      explanation: `Loss% = (Loss / CP) × 100 = (${lossAmount} / ${cp}) × 100 = ${lossP}%`
    };
  },

  // E6: SP from CP and Profit %
  () => {
    const cp = rand(200, 800) * 10;
    const profitP = rand(15, 40);
    const sp = round(cp * (1 + profitP/100));
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'SP from CP',
      text: `An item costs ${formatRs(cp)}. A trader sells it with ${profitP}% profit. Find SP.`,
      answer: round(sp),
      explanation: `SP = CP × (1 + Profit%/100)`
    };
  },

  // E7: CP from SP and Profit %
  () => {
    const sp = rand(200, 1000) * 10;
    const profitP = rand(10, 30);
    const cp = round(sp / (1 + profitP/100));
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'CP from SP',
      text: `An item is sold for ${formatRs(sp)} with ${profitP}% profit. Find the cost price.`,
      answer: round(cp),
      explanation: `CP = SP / (1 + Profit%/100)`
    };
  },

  // E8: Single Discount
  () => {
    const mp = rand(200, 1000) * 10;
    const discountP = rand(10, 30);
    const discount = round((mp * discountP) / 100);
    const sp = mp - discount;
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Single Discount',
      text: `An item marked at ${formatRs(mp)} is given a discount of ${discountP}%. Find the selling price.`,
      answer: round(sp),
      explanation: `SP = MP - Discount = MP × (1 - Discount%/100)`
    };
  },

  // E9: Profit % with Multiple Items
  () => {
    const qty = rand(5, 20);
    const cpPerUnit = rand(50, 200);
    const totalCp = qty * cpPerUnit;
    const profitPerUnit = rand(20, 100);
    const totalSp = qty * (cpPerUnit + profitPerUnit);
    const totalProfit = totalSp - totalCp;
    const profitP = round((totalProfit / totalCp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Multiple Items',
      text: `A merchant buys ${qty} items at ${formatRs(cpPerUnit)} each and sells them at ${formatRs(cpPerUnit + profitPerUnit)} each. Find profit%.`,
      answer: profitP,
      explanation: `Total CP = ${totalCp}, Total SP = ${totalSp}, Profit% = (${totalProfit}/${totalCp})×100`
    };
  },

  // E10: Break-Even Point
  () => {
    const cp = rand(100, 500) * 10;
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Break-Even',
      text: `An item costs ${formatRs(cp)}. At what price should it be sold to have zero profit or loss?`,
      answer: cp,
      explanation: `Break-even means SP = CP. No profit, no loss.`
    };
  },

  // E11: Profit Amt with Profit %
  () => {
    const cp = rand(100, 500) * 10;
    const profitP = rand(10, 30);
    const profitAmt = round((cp * profitP) / 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Profit Amount',
      text: `CP is ${formatRs(cp)} with ${profitP}% profit. Find the profit amount.`,
      answer: profitAmt,
      explanation: `Profit Amount = (CP × Profit%) / 100`
    };
  },

  // E12: Loss Amt with Loss %
  () => {
    const cp = rand(100, 500) * 10;
    const lossP = rand(5, 25);
    const lossAmt = round((cp * lossP) / 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 1,
      concept: 'Loss Amount',
      text: `CP is ${formatRs(cp)} with ${lossP}% loss. Find the loss amount.`,
      answer: lossAmt,
      explanation: `Loss Amount = (CP × Loss%) / 100`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: Successive Discounts
  () => {
    const mp = rand(200, 1000) * 10;
    const d1 = rand(10, 25);
    const d2 = rand(5, 20);
    const sp = round(mp * (1 - d1/100) * (1 - d2/100));
    const totalDiscount = round(((mp - sp) / mp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Successive Discounts',
      text: `Marked price is ${formatRs(mp)}. Discounts of ${d1}% and ${d2}% are offered. Find equivalent single discount.`,
      answer: totalDiscount,
      explanation: `Equivalent = (d₁ + d₂ - d₁d₂/100)% = ${totalDiscount}%` 
    };
  },

  // M2: Markup and Discount
  () => {
    const cp = rand(100, 500) * 10;
    const markupP = rand(30, 60);
    const mp = round(cp * (1 + markupP/100));
    const discountP = rand(10, 25);
    const sp = round(mp * (1 - discountP/100));
    const netProfit = round(sp - cp);
    const netProfitP = round((netProfit / cp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Markup & Discount',
      text: `Cost price is ${formatRs(cp)}. Marked up by ${markupP}% with ${discountP}% discount. Find net profit%.`,
      answer: netProfitP,
      explanation: `MP = ${mp}, SP = ${sp}, Profit% = ${netProfitP}%`
    };
  },

  // M3: Profit/Loss with Increased Quantity
  () => {
    const cpPerUnit = rand(50, 200);
    const spPerUnit = rand(80, 300);
    const qty1 = rand(5, 15);
    const qty2 = rand(20, 50);
    const totalCp = qty1 * cpPerUnit;
    const totalSp = qty1 * spPerUnit;
    const totalProfit = totalSp - totalCp;
    const profitP = round((totalProfit / totalCp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Quantity Scale',
      text: `Buying at ${formatRs(cpPerUnit)} and selling at ${formatRs(spPerUnit)} per unit. Profit% on ${qty1} units?`,
      answer: profitP,
      explanation: `Profit% is same regardless of quantity: (${spPerUnit - cpPerUnit})/${cpPerUnit} × 100`
    };
  },

  // M4: Reverse SP Calculation
  () => {
    const sp = rand(300, 1500) * 10;
    const lossP = rand(5, 20);
    const cp = round(sp / (1 - lossP/100));
    const loss = round(cp - sp);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'CP from SP (Loss)',
      text: `Selling price is ${formatRs(sp)} with ${lossP}% loss. Find cost price.`,
      answer: round(cp),
      explanation: `CP = SP / (1 - Loss%/100)`
    };
  },

  // M5: Mixed Profit/Loss
  () => {
    const cp1 = rand(100, 300) * 10;
    const sp1 = round(cp1 * 1.25);
    const cp2 = rand(100, 300) * 10;
    const sp2 = round(cp2 * 0.8);
    const totalCp = cp1 + cp2;
    const totalSp = sp1 + sp2;
    const totalProfit = totalSp - totalCp;
    const netP = round((totalProfit / totalCp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Mixed Transactions',
      text: `Buy item1 at ${formatRs(cp1)}, sell at 25% profit. Buy item2 at ${formatRs(cp2)}, sell at 20% loss. Overall profit/loss%?`,
      answer: netP,
      explanation: `Total CP = ${totalCp}, Total SP = ${totalSp}, Net% = ${netP}%`
    };
  },

  // M6: Profit Percentage Changes
  () => {
    const cp = rand(100, 500) * 10;
    const oldProfitP = rand(15, 30);
    const newProfitP = rand(35, 50);
    const oldSp = round(cp * (1 + oldProfitP/100));
    const newSp = round(cp * (1 + newProfitP/100));
    const increase = newSp - oldSp;
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Profit % Change',
      text: `CP is ${formatRs(cp)}. Profit increased from ${oldProfitP}% to ${newProfitP}%. By how much did SP increase?`,
      answer: increase,
      explanation: `Old SP = ${oldSp}, New SP = ${newSp}, Increase = ${increase}`
    };
  },

  // M7: Discount Chain
  () => {
    const mp = rand(500, 2000) * 10;
    const d1 = rand(10, 20);
    const d2 = rand(10, 20);
    const d3 = rand(5, 15);
    const sp = round(mp * (1 - d1/100) * (1 - d2/100) * (1 - d3/100));
    const totalDiscount = round(((mp - sp) / mp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Triple Discounts',
      text: `MP is ${formatRs(mp)} with discounts ${d1}%, ${d2}%, ${d3}%. Find final SP.`,
      answer: round(sp),
      explanation: `SP = MP × (1-d₁%)×(1-d₂%)×(1-d₃%)`
    };
  },

  // M8: Profit with Discount on MP
  () => {
    const cp = rand(200, 800) * 10;
    const markupP = rand(25, 50);
    const mp = round(cp * (1 + markupP/100));
    const discountP = rand(5, 20);
    const sp = round(mp * (1 - discountP/100));
    const profit = sp - cp;
    const profitP = round((profit / cp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Profit with Discount',
      text: `CP ${formatRs(cp)}, marked up ${markupP}%, discounted ${discountP}%. Profit% = ?`,
      answer: profitP,
      explanation: `MP = ${mp}, SP = ${sp}, Profit% = ${profitP}%`
    };
  },

  // M9: Selling Multiple Items at Different Margins
  () => {
    const qty = rand(10, 30);
    const cpPerUnit = rand(100, 300);
    const profitP = rand(10, 25);
    const spPerUnit = round(cpPerUnit * (1 + profitP/100));
    const totalProfit = qty * (spPerUnit - cpPerUnit);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Bulk Transaction',
      text: `Buy ${qty} items at ${formatRs(cpPerUnit)} each, sell at ${profitP}% profit. Total profit?`,
      answer: totalProfit,
      explanation: `Profit per unit = ${spPerUnit - cpPerUnit}, Total = ${qty} × ${spPerUnit - cpPerUnit}`
    };
  },

  // M10: Find Marked Price
  () => {
    const cp = rand(200, 800) * 10;
    const markupP = rand(30, 50);
    const mp = round(cp * (1 + markupP/100));
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Find Marked Price',
      text: `CP is ${formatRs(cp)}, marked up ${markupP}%. Find marked price.`,
      answer: round(mp),
      explanation: `MP = CP × (1 + Markup%/100)`
    };
  },

  // M11: Effective Discount
  () => {
    const mp = rand(500, 2000) * 10;
    const d1 = rand(10, 20);
    const d2 = rand(10, 20);
    const sp = round(mp * (1 - d1/100) * (1 - d2/100));
    const effectiveDiscount = round(((mp - sp) / mp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 2,
      concept: 'Effective Discount',
      text: `Two successive discounts ${d1}% and ${d2}% on MP ${formatRs(mp)}. Effective discount%?`,
      answer: effectiveDiscount,
      explanation: `Eff% = d₁ + d₂ - (d₁×d₂)/100`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD (10 TEMPLATES) 
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Complex Markup and Discount with Profit Target
  () => {
    const cp = rand(500, 1500) * 10;
    const targetProfitP = rand(40, 60);
    const discountP = rand(15, 30);
    const targetProfit = round((cp * targetProfitP) / 100);
    const requiredSp = cp + targetProfit;
    const requiredMp = round(requiredSp / (1 - discountP/100));
    const markup = round(((requiredMp - cp) / cp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Markup for Target',
      text: `To achieve ${targetProfitP}% profit after ${discountP}% discount on CP ${formatRs(cp)}, what markup%?`,
      answer: markup,
      explanation: `Need SP = ${requiredSp}, so MP = ${requiredMp}, Markup = ${markup}%`
    };
  },

  // H2: Profit/Loss Swap Scenario
  () => {
    const originalCp = rand(200, 800) * 10;
    const originalProfitP = rand(15, 30);
    const originalSp = round(originalCp * (1 + originalProfitP/100));
    const newCp = rand(100, 400) * 10;
    const costIncrease = newCp - originalCp;
    const newProfit = originalSp - newCp;
    const newProfitP = round((newProfit / newCp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Cost Increase Impact',
      text: `Originally CP ${formatRs(originalCp)}, profit ${originalProfitP}%. If CP becomes ${formatRs(newCp)} but SP remains same, new profit%?`,
      answer: newProfitP,
      explanation: `New profit% = ((${originalSp} - ${newCp}) / ${newCp}) × 100 = ${newProfitP}%`
    };
  },

  // H3: Multiple Stores with Different Margins
  () => {
    const cpA = rand(300, 1000) * 10;
    const profitPA = rand(20, 35);
    const profitA = round((cpA * profitPA) / 100);
    const cpB = rand(300, 1000) * 10;
    const lossB = rand(10, 20);
    const lossAmtB = round((cpB * lossB) / 100);
    const totalCp = cpA + cpB;
    const totalSp = (cpA + profitA) + (cpB - lossAmtB);
    const netProfit = totalSp - totalCp;
    const netP = round((netProfit / totalCp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Mixed Stores',
      text: `Store A: CP=${formatRs(cpA)}, ${profitPA}% profit. Store B: CP=${formatRs(cpB)}, ${lossB}% loss. Combined profit%?`,
      answer: netP,
      explanation: `Total SP = ${totalSp}, Total CP = ${totalCp}, Net% = ${netP}%`
    };
  },

  // H4: Discounted Series
  () => {
    const initialPrice = rand(1000, 5000) * 10;
    const discounts = [rand(10, 20), rand(10, 20), rand(5, 15)];
    let finalPrice = initialPrice;
    discounts.forEach(d => {
      finalPrice = round(finalPrice * (1 - d/100));
    });
    const totalDiscount = round(((initialPrice - finalPrice) / initialPrice) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Cascading Discounts',
      text: `Price ${formatRs(initialPrice)} with successive discounts ${discounts[0]}%, ${discounts[1]}%, ${discounts[2]}%. Final price?`,
      answer: round(finalPrice),
      explanation: `Final = ${initialPrice} × ${(1-discounts[0]/100).toFixed(3)} × ${(1-discounts[1]/100).toFixed(3)} × ${(1-discounts[2]/100).toFixed(3)}`
    };
  },

  // H5: Break-even with Recovery
  () => {
    const initialCp = rand(500, 2000) * 10;
    const initialLoss = rand(15, 25);
    const initialSp = round(initialCp * (1 - initialLoss/100));
    const additionalCost = rand(200, 800) * 10;
    const totalCp = initialCp + additionalCost;
    const targetProfitP = rand(10, 20);
    const requiredSp = round(totalCp * (1 + targetProfitP/100));
    const priceIncrease = requiredSp - initialSp;
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Recovery Pricing',
      text: `Initial CP ${formatRs(initialCp)} with ${initialLoss}% loss. After adding ${formatRs(additionalCost)}, need ${targetProfitP}% profit. SP?`,
      answer: round(requiredSp),
      explanation: `Total CP = ${totalCp}, Required SP = ${requiredSp}`
    };
  },

  // H6: Bulk vs Retail
  () => {
    const bulkQty = rand(100, 500);
    const retailQty = rand(10, 50);
    const bulkPrice = rand(20, 80);
    const retailPrice = rand(100, 300);
    const totalCostBulk = bulkQty * bulkPrice;
    const totalRevenueRetail = retailQty * retailPrice;
    const costPerRetailUnit = round(totalCostBulk / retailQty);
    const profitPerRetailUnit = retailPrice - costPerRetailUnit;
    const profitP = round((profitPerRetailUnit / costPerRetailUnit) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Bulk Trading',
      text: `Buy ${bulkQty} units at ${formatRs(bulkPrice)} each, sell in batches of ${retailQty} at ${formatRs(retailPrice)} each. Profit%?`,
      answer: profitP,
      explanation: `Cost/retail = ${costPerRetailUnit}, Profit/batch = ${profitPerRetailUnit} each, Profit% = ${profitP}%`
    };
  },

  // H7: Price Adjustment Rounds
  () => {
    const cp = rand(500, 2000) * 10;
    const round1ProfitP = rand(10, 20);
    const round1Price = round(cp * (1 + round1ProfitP/100));
    const round2LossP = rand(5, 15);
    const round2Price = round(round1Price * (1 - round2LossP/100));
    const netProfit = round2Price - cp;
    const netProfitP = round((netProfit / cp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Sequential Pricing',
      text: `CP ${formatRs(cp)}, 1st round: ${round1ProfitP}% profit, 2nd round: ${round2LossP}% loss on new price. Final profit%?`,
      answer: netProfitP,
      explanation: `After round 1: ${round1Price}, After round 2: ${round2Price}, Net% = ${netProfitP}%`
    };
  },

  // H8: Market Dynamics
  () => {
    const competitorCp = rand(300, 1200) * 10;
    const competitorProfit = rand(20, 35);
    const competitorSp = round(competitorCp * (1 + competitorProfit/100));
    const ourCp = rand(200, 800) * 10;
    const ourProfitP = rand(25, 40);
    const ourSp = round(ourCp * (1 + ourProfitP/100));
    const priceComparison = ourSp - competitorSp;
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Competitive Pricing',
      text: `Competitor: CP=${formatRs(competitorCp)}, profit=${competitorProfit}%. Ours: CP=${formatRs(ourCp)}, profit=${ourProfitP}%. Price diff?`,
      answer: Math.abs(priceComparison),
      explanation: `Competitor SP = ${competitorSp}, Our SP = ${ourSp}, Difference = ${Math.abs(priceComparison)}`
    };
  },

  // H9: Conditional Discounts
  () => {
    const basePrice = rand(2000, 8000) * 10;
    const d1Threshold = rand(50000, 100000);
    const d1Rate = rand(10, 20);
    const d2Threshold = rand(150000, 300000);
    const d2Rate = rand(20, 30);
    const units = rand(15, 40);
    const totalPrice = units * basePrice;
    let discount = 0;
    if (totalPrice >= d2Threshold) discount = (totalPrice * d2Rate) / 100;
    else if (totalPrice >= d1Threshold) discount = (totalPrice * d1Rate) / 100;
    const finalPrice = totalPrice - discount;
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Tiered Pricing',
      text: `Base price ${formatRs(basePrice)} per unit. Buy ${units} units. Discount ${d1Rate}% >${formatRs(d1Threshold)}, ${d2Rate}% >${formatRs(d2Threshold)}. Total?`,
      answer: round(finalPrice),
      explanation: `Total = ${totalPrice}, Applied ${totalPrice >= d2Threshold ? d2Rate : d1Rate}% discount = ${round(finalPrice)}`
    };
  },

  // H10: Profit Optimization
  () => {
    const cp1 = rand(100, 300) * 10;
    const sp1 = rand(150, 400) * 10;
    const profitP1 = round(((sp1 - cp1) / cp1) * 100);
    const cp2 = rand(100, 300) * 10;
    const sp2 = rand(150, 400) * 10;
    const profitP2 = round(((sp2 - cp2) / cp2) * 100);
    const totalCp = cp1 + cp2;
    const totalSp = sp1 + sp2;
    const avgProfitP = round(((totalSp - totalCp) / totalCp) * 100);
    return {
      topic: 'Profit & Loss',
      difficulty: 3,
      concept: 'Portfolio Profit',
      text: `Item 1: CP=${formatRs(cp1)}, SP=${formatRs(sp1)}. Item 2: CP=${formatRs(cp2)}, SP=${formatRs(sp2)}. Overall profit%?`,
      answer: avgProfitP,
      explanation: `Total CP = ${totalCp}, Total SP = ${totalSp}, Overall% = ${avgProfitP}%`
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PERCENTAGES – 34 TEMPLATES (12 EASY, 11 MEDIUM, 11 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const percentageTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (12 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Simple Percentage
  () => ({
    topic: 'Percentages',
    difficulty: 1,
    concept: 'Simple Percentage',
    text: `What is ${rand(5, 25)}% of ${rand(200, 500) * 10}?`,
    answer: round((rand(200, 500) * 10 * rand(5, 25)) / 100),
    explanation: `X% of Y = (X/100) × Y`
  }),

  // E2: Percentage Increase
  () => {
    const original = rand(100, 500) * 10;
    const increaseP = rand(10, 30);
    const newValue = round(original * (1 + increaseP/100));
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Percentage Increase',
      text: `${original} increases by ${increaseP}%. New value?`,
      answer: newValue,
      explanation: `New = Original × (1 + %/100)`
    };
  },

  // E3: Percentage Decrease
  () => {
    const original = rand(100, 500) * 10;
    const decreaseP = rand(10, 30);
    const newValue = round(original * (1 - decreaseP/100));
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Percentage Decrease',
      text: `${original} decreases by ${decreaseP}%. New value?`,
      answer: newValue,
      explanation: `New = Original × (1 - %/100)`
    };
  },

  // E4: Find Percentage
  () => {
    const part = rand(50, 200) * 5;
    const whole = rand(200, 500) * 10;
    const percent = round((part / whole) * 100);
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Find Percentage',
      text: `${part} is what % of ${whole}?`,
      answer: percent,
      explanation: `Percent = (Part / Whole) × 100`
    };
  },

  // E5: Find Original Value
  () => {
    const increaseP = rand(10, 30);
    const newValue = rand(150, 600) * 10;
    const original = round(newValue / (1 + increaseP/100));
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Find Original',
      text: `A value increased by ${increaseP}% to become ${newValue}. Original value?`,
      answer: round(original),
      explanation: `Original = New ÷ (1 + %/100)`
    };
  },

  // E6: Percentage Point (Integer Amount)
  () => {
    const base = rand(100, 500) * 100;
    const increasePts = rand(10, 50);
    const increase = round((increasePts / 100) * base);
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: '%Amount Change',
      text: `${increasePts}% increase on ${base}, what's the amount added?`,
      answer: increase,
      explanation: `Amount = (${increasePts}/100) × ${base} = ${increase}`
    };
  },

  // E7: Simple Percentage of Percentage
  () => {
    const base = rand(1000, 5000) * 10;
    const p1 = rand(10, 25);
    const p2 = rand(10, 25);
    const result = round((p1/100) * (p2/100) * base);
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: '% of %',
      text: `${p1}% of ${p2}% of ${base} = ?`,
      answer: result,
      explanation: `(P₁/100) × (P₂/100) × Base`
    };
  },

  // E8: Comparative Percentage
  () => {
    const val1 = rand(200, 600) * 5;
    const val2 = rand(100, 400) * 5;
    const higher = Math.max(val1, val2);
    const lower = Math.min(val1, val2);
    const percent = round(((higher - lower) / lower) * 100);
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Percentage Comparison',
      text: `${higher} is what % more than ${lower}?`,
      answer: percent,
      explanation: `% More = ((Larger - Smaller) / Smaller) × 100`
    };
  },

  // E9: Reverse Percentage
  () => {
    const decreaseP = rand(10, 30);
    const finalValue = rand(100, 400) * 10;
    const original = round(finalValue / (1 - decreaseP/100));
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Reverse Decrease',
      text: `After ${decreaseP}% decrease, value is ${finalValue}. Original?`,
      answer: round(original),
      explanation: `Original = Final ÷ (1 - %/100)`
    };
  },

  // E10: Percentage of Sum
  () => {
    const totalAmount = rand(1000, 3000) * 10;
    const percentA = rand(30, 50);
    const amountA = round((percentA / 100) * totalAmount);
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: '% Share',
      text: `If total is ${totalAmount} and A gets ${percentA}%, how much does A get?`,
      answer: amountA,
      explanation: `Amount = (Percent/100) × Total`
    };
  },

  // E11: Percentage Markup Simple
  () => {
    const cost = rand(200, 800) * 10;
    const markupP = rand(20, 50);
    const markup = round((markupP/100) * cost);
    const price = cost + markup;
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Markup Amount',
      text: `Cost ${cost}, markup ${markupP}%. Selling price?`,
      answer: round(price),
      explanation: `Price = Cost + (Cost × Markup% /100)`
    };
  },

  // E12: Percentage Discount Simple
  () => {
    const marked = rand(300, 1000) * 10;
    const discountP = rand(10, 30);
    const discount = round((discountP/100) * marked);
    const selling = marked - discount;
    return {
      topic: 'Percentages',
      difficulty: 1,
      concept: 'Discount Amount',
      text: `Marked ${marked}, discount ${discountP}%. Selling price?`,
      answer: round(selling),
      explanation: `SP = MP - (MP × Discount%/100)`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: Successive Percentage Changes
  () => {
    const initial = rand(1000, 5000) * 10;
    const p1 = rand(10, 25);
    const p2 = rand(10, 25);
    const final = round(initial * (1 + p1/100) * (1 + p2/100));
    const netP = round(((final - initial) / initial) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Successive % Increase',
      text: `Value ${initial} increases by ${p1}% then ${p2}%. Net percentage increase?`,
      answer: netP,
      explanation: `Final = Initial × (1 + P₁%) × (1 + P₂%)`
    };
  },

  // M2: Increase then Decrease
  () => {
    const initial = rand(1000, 5000) * 10;
    const incP = rand(15, 35);
    const decP = rand(10, 25);
    const final = round(initial * (1 + incP/100) * (1 - decP/100));
    const netP = round(((final - initial) / initial) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Inc then Dec %',
      text: `${initial} increases ${incP}% then decreases ${decP}%. Final %change?`,
      answer: netP,
      explanation: `Final = Initial × (1 + Inc%) × (1 - Dec%)`
    };
  },

  // M3: Percentage Difference Between Two Values
  () => {
    const val1 = rand(200, 800) * 10;
    const val2 = rand(200, 800) * 10;
    const greater = Math.max(val1, val2);
    const smaller = Math.min(val1, val2);
    const pDiff = round(((greater - smaller) / smaller) *100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Percentage Difference',
      text: `Two values: ${val1}, ${val2}. Larger is what % more?`,
      answer: pDiff,
      explanation: `% More = ((Larger - Smaller) / Smaller) × 100`
    };
  },

  // M4: Percentage Change from Percentage
  () => {
    const base = rand(1000, 5000) * 10;
    const oldPercent = rand(30, 50);
    const newPercent = rand(40, 60);
    const oldAmount = round((oldPercent/100) * base);
    const newAmount = round((newPercent/100) * base);
    const change = newAmount - oldAmount;
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Percent Change Impact',
      text: `Total ${base}. Share increased from ${oldPercent}% to ${newPercent}%. Amount increase?`,
      answer: change,
      explanation: `New amount - Old amount`
    };
  },

  // M5: Population Percentage Growth
  () => {
    const initialPop = rand(100, 500) * 1000;
    const growthP = rand(10, 20);
    const years = rand(2, 4);
    let finalPop = initialPop;
    for(let i = 0; i < years; i++) {
      finalPop = round(finalPop * (1 + growthP/100));
    }
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Compound Growth',
      text: `Population ${initialPop} grows ${growthP}% annually for ${years} years. Final?`,
      answer: round(finalPop),
      explanation: `Compound: Final = Initial × (1 + Rate%)^Years`
    };
  },

  // M6: Percentage Profit with Discount
  () => {
    const cost = rand(200, 800) * 10;
    const profitMarkupP = rand(40, 60);
    const mp = round(cost * (1 + profitMarkupP/100));
    const discountP = rand(10, 25);
    const sp = round(mp * (1 - discountP/100));
    const actualProfitP = round(((sp - cost) / cost) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Profit After Discount',
      text: `Cost ${cost}, markup ${profitMarkupP}%, discount ${discountP}%. Actual profit%?`,
      answer: actualProfitP,
      explanation: `Profit% = ((SP - Cost) / Cost) × 100`
    };
  },

  // M7: Percentage Distribution Among Three
  () => {
    const total = rand(5000, 20000) * 10;
    const pA = rand(20, 35);
    const pB = rand(20, 35);
    const pC = 100 - pA - pB;
    const amountA = round((pA/100) * total);
    const amountB = round((pB/100) * total);
    const amountC = round((pC/100) * total);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Three-way Split',
      text: `Distribute ${total} as ${pA}%, ${pB}%, rest. A gets ${pA}%, B gets?`,
      answer: amountB,
      explanation: `Amount = (Percent/100) × Total`
    };
  },

  // M8: Net Percentage After Multiple Changes
  () => {
    const initial = rand(1000, 5000) * 10;
    const p1 = rand(15, 30);
    const p2 = rand(5, 20);
    const p3 = rand(5, 15);
    const final = round(initial * (1 + p1/100) * (1 - p2/100) * (1 + p3/100));
    const netP = round(((final - initial) / initial) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Triple Change',
      text: `${initial} → +${p1}% → -${p2}% → +${p3}%. Net %change?`,
      answer: netP,
      explanation: `Apply each change sequentially multiplicatively`
    };
  },

  // M9: Reversing a Percentage Change
  () => {
    const increased = rand(500, 2000) * 10;
    const increaseP = rand(15, 30);
    const original = round(increased / (1 + increaseP/100));
    const decrease = increased - original;
    const decreaseNeeded = round((decrease / increased) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Reverse Operation',
      text: `After ${increaseP}% increase to ${increased}, what % decrease returns to original?`,
      answer: round(decreaseNeeded),
      explanation: `Different % needed to reverse due to different base value`
    };
  },

  // M10: Percentage with Mixed Operations
  () => {
    const base = rand(2000, 8000) * 10;
    const p1 = rand(20, 35);
    const add = rand(5000, 20000) * 10;
    const newTotal = round(base * (1 + p1/100) + add);
    const pChange = round(((newTotal - base) / base) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Mixed Operations',
      text: `${base} increases ${p1}%, then add ${add}. % change from original?`,
      answer: pChange,
      explanation: `Final = (Base × (1 + P%)) + Additional`
    };
  },

  // M11: Percentage Comparison in Ratio
  () => {
    const qtyA = rand(50, 200);
    const qtyB = qtyA + rand(10, 50);
    const pMore = round(((qtyB - qtyA) / qtyA) * 100);
    return {
      topic: 'Percentages',
      difficulty: 2,
      concept: 'Comparative %',
      text: `A has ${qtyA}, B has ${qtyB}. B is what % more?`,
      answer: pMore,
      explanation: `% More = ((B - A) / A) × 100`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Complex Multi-Step Percentage
  () => {
    const base = rand(5000, 20000) * 10;
    const step1P = rand(20, 35);
    const step2P = rand(15, 30);
    const step3P = rand(10, 25);
    const after1 = round(base * (1 + step1P/100));
    const after2 = round(after1 * (1 - step2P/100));
    const final = round(after2 * (1 + step3P/100));
    const overall = round(((final - base) / base) * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Multi-Step Complex',
      text: `${base} → +${step1P}% → -${step2P}% → +${step3P}%. Overall %?`,
      answer: overall,
      explanation: `Apply each sequentially to compounding values, not original`
    };
  },

  // H2: Percentage Distribution with Constraints
  () => {
    const total = rand(10000, 50000) * 10;
    const aPercent = rand(25, 40);
    const bPercent = rand(20, 35);
    const cPercent = 100 - aPercent - bPercent;
    const aAmount = round((aPercent/100) * total);
    const constraint = aAmount > 150000;
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Constrained Split',
      text: `Distribute ${total} as A:B:C = ${aPercent}:${bPercent}:${cPercent}. A gets?`,
      answer: aAmount,
      explanation: `Percentage distribution with multiple constraints`
    };
  },

  // H3: Percentage Yield Calculation
  () => {
    const invested = rand(50000, 200000) * 10;
    const returnPercentage = rand(12, 25);
    const profit = round((returnPercentage / 100) * invested);
    const totalReturn = invested + profit;
    const yieldPercent = round(((profit) / invested) * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Investment Yield',
      text: `Invest ${invested} at ${returnPercentage}% yield. Profit?`,
      answer: profit,
      explanation: `Yield: Profit = Investment × Yield%/100`
    };
  },

  // H4: Percentage with Interest Compounds
  () => {
    const principal = rand(50000, 200000) * 10;
    const rate = rand(8, 15);
    const years = rand(2, 4);
    let amount = principal;
    for(let i = 0; i < years; i++) {
      amount = round(amount * (1 + rate/100));
    }
    const compound = amount - principal;
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Compound Interest %',
      text: `${principal} at ${rate}% for ${years} yrs compound. Interest?`,
      answer: round(compound),
      explanation: `Compound returns exponentially grow with each period`
    };
  },

  // H5: Percentage Share Dynamics
  () => {
    const totalBefore = rand(100000, 500000) * 10;
    const shareBefore = rand(25, 45);
    const totalAfter = round(totalBefore * 1.3);
    const shareAfter = rand(25, 45);
    const amountBefore = round((shareBefore/100) * totalBefore);
    const amountAfter = round((shareAfter/100) * totalAfter);
    const change = amountAfter - amountBefore;
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Share Value Change',
      text: `Total before: ${totalBefore} (share ${shareBefore}%), after: ${totalAfter} (share ${shareAfter}%). Share change?`,
      answer: change,
      explanation: `Amount = (Percent/100) × Total at each stage`
    };
  },

  // H6: Percentage Efficiency Loss
  () => {
    const input = rand(1000, 5000) * 10;
    const efficiencyLoss = rand(15, 35);
    const output = round(input * (1 - efficiencyLoss/100));
    const wasted = input - output;
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Efficiency Loss',
      text: `Input ${input} with ${efficiencyLoss}% loss. Output & waste?`,
      answer: output,
      explanation: `Output = Input × (1 - Loss%) identifies efficiency impact`
    };
  },

  // H7: Percentage Variance in Performance
  () => {
    const targetedP = rand(40, 60);
    const actualP = rand(30, 70);
    const variance = Math.abs(actualP - targetedP);
    const variancePercent = round((variance / targetedP) * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Performance Variance',
      text: `Target ${targetedP}%, actual ${actualP}%. Variance %?`,
      answer: variancePercent,
      explanation: `Variance = |Actual - Target| / Target × 100`
    };
  },

  // H8: Percentage Allocation Optimization
  () => {
    const budget = rand(100000, 500000) * 10;
    const teamA = rand(30, 50);
    const teamB = rand(20, 35);
    const teamC = 100 - teamA - teamB;
    const allocA = round((teamA/100) * budget);
    const increase = rand(10, 25);
    const newBudget = round(budget * (1 + increase/100));
    const newAllocA = round((teamA/100) * newBudget);
    const aGain = newAllocA - allocA;
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Budget Allocation',
      text: `Budget ${budget}, teamA ${teamA}%. Budget grows ${increase}%. A's gain?`,
      answer: aGain,
      explanation: `New allocation minus old allocation under percentage split`
    };
  },

  // H9: Cascading Percentages
  () => {
    const startValue = rand(100000, 500000) * 10;
    const p1 = rand(15, 30);
    const p2 = rand(15, 30);
    const p3 = rand(10, 25);
    const p4 = rand(5, 15);
    let value = startValue;
    value = round(value * (1 + p1/100));
    value = round(value * (1 - p2/100));
    value = round(value * (1 + p3/100));
    value = round(value * (1 - p4/100));
    const final = round(((value - startValue) / startValue) * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Cascading %',
      text: `${startValue} → +${p1}% → -${p2}% → +${p3}% → -${p4}%. Final%?`,
      answer: final,
      explanation: `Each operation references previous value, not original`
    };
  },

  // H10: Differential Percentage Impact
  () => {
    const baseAmount = rand(50000, 200000) * 10;
    const increaseP = rand(20, 40);
    const newAmount = round(baseAmount * (1 + increaseP/100));
    const percentOfNew = rand(40, 60);
    const amountFromNew = round((percentOfNew/100) * newAmount);
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Differential Impact',
      text: `${baseAmount} increases ${increaseP}%. Take ${percentOfNew}% of new. Amount?`,
      answer: amountFromNew,
      explanation: `Always apply percentage to current value, track changes carefully`
    };
  },

  // H11: Percentage Reconciliation
  () => {
    const total = rand(100000, 500000) * 10;
    const partA = rand(200000, 400000) * 10;
    const partB = total - partA;
    const pA = round((partA / total) * 100);
    const pB = round((partB / total) * 100);
    return {
      topic: 'Percentages',
      difficulty: 3,
      concept: 'Percentage Reconcile',
      text: `Total ${total} = ${partA} + rest. What% is rest?`,
      answer: round(pB),
      explanation: `If A is pA%, then B is (100-pA)%`
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// TIME & WORK – 3 TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

// TIME & WORK – 33 TEMPLATES (12 EASY, 11 MEDIUM, 10 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const timeWorkTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (12 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Basic Work Rate
  () => {
    const days = rand(5, 15);
    const rate = round(100 / days);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Basic Work Rate',
      text: `A finishes job in ${days} days. Work per day?`,
      answer: rate,
      explanation: 'Rate = Total / Days'
    };
  },

  // E2: Combined Work Simple
  () => {
    const daysA = rand(4, 8);
    const daysB = rand(5, 10);
    const combined = round(1 / (1/daysA + 1/daysB));
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Combined Work Simple',
      text: `A: ${daysA}d, B: ${daysB}d, together?`,
      answer: combined,
      explanation: 'Combined = 1/(1/A + 1/B)'
    };
  },

  // E3: Work Completion
  () => {
    const units = rand(50, 200);
    const days = rand(5, 15);
    const rate = round(units / days);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Work Completion',
      text: `${units} units in ${days} days. Units/day?`,
      answer: rate,
      explanation: 'Rate = Units/Days'
    };
  },

  // E4: Days from Rate
  () => {
    const rate = rand(10, 25);
    const units = rand(100, 300);
    const days = round(units / rate);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Days from Rate',
      text: `Rate ${rate}/day, ${units} units. Days?`,
      answer: days,
      explanation: 'Days = Units/Rate'
    };
  },

  // E5: Partial Work
  () => {
    const percent = rand(30, 70);
    const givenDays = rand(3, 8);
    const totalDays = round(100 * givenDays / percent);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Partial Work',
      text: `A does ${percent}% in ${givenDays}d. Total?`,
      answer: totalDays,
      explanation: 'If X% done in D days, full = 100D/X'
    };
  },

  // E6: Worker Efficiency
  () => {
    const workers = rand(1, 3);
    const days = rand(8, 15);
    const total = rand(100, 400);
    const perWorker = round(total / (workers * days));
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Worker Efficiency',
      text: `${workers}workers × ${days}d = ${total} units. Per worker?`,
      answer: perWorker,
      explanation: 'Per unit = Total/(Workers×Days)'
    };
  },

  // E7: Efficiency Comparison
  () => {
    const daysA = rand(4, 10);
    const daysB = rand(6, 15);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Efficiency Comparison',
      text: `A: ${daysA}d, B: ${daysB}d. Who's faster?`,
      answer: 'A',
      explanation: 'Less days = More efficient'
    };
  },

  // E8: Cumulative Work
  () => {
    const rate = rand(20, 60);
    const days = rand(3, 10);
    const total = rate * days;
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Cumulative Work',
      text: `${rate}/day for ${days}d. Total?`,
      answer: total,
      explanation: 'Total = Rate × Days'
    };
  },

  // E9: Work Left
  () => {
    const done = rand(30, 70);
    const remaining = 100 - done;
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Work Left',
      text: `${done}% done. Remaining?`,
      answer: remaining,
      explanation: '100% - Done% = Remaining%'
    };
  },

  // E10: Individual vs Combined
  () => {
    const combined = rand(5, 10);
    const alone = rand(8, 12);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Individual vs Combined',
      text: `Combined ${combined}d. A alone ~?`,
      answer: alone,
      explanation: 'Combined < Individual time'
    };
  },

  // E11: Rate Comparison
  () => {
    const rateA = rand(10, 25);
    const rateB = rand(15, 30);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Rate Comparison',
      text: `A: ${rateA}/d, B: ${rateB}/d. Faster?`,
      answer: 'B',
      explanation: 'Higher rate = Faster'
    };
  },

  // E12: Time Calculation
  () => {
    const units = rand(200, 500);
    const rate = rand(20, 50);
    const time = round(units / rate);
    return {
      topic: 'Time & Work',
      difficulty: 1,
      concept: 'Time Calculation',
      text: `${units} units at ${rate}/d. Time?`,
      answer: time,
      explanation: 'Time = Units/Rate'
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: Multi-Step Work
  () => {
    const combined = rand(5, 10);
    const solo = rand(5, 8);
    const total = combined + solo;
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Multi-Step Work',
      text: `A+B ${combined}d, then B alone ${solo}d. Total?`,
      answer: total,
      explanation: 'Add separate times'
    };
  },

  // M2: Partial then Swap
  () => {
    const daysA = rand(6, 10);
    const percentA = rand(30, 60);
    const daysB = rand(8, 12);
    const total = round((daysA * percentA / 100) + (daysB * (100 - percentA) / 100));
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Partial then Swap',
      text: `A:${daysA}d (${percentA}%), B:${daysB}d (rest)`,
      answer: total,
      explanation: 'Calculate work portions'
    };
  },

  // M3: Three Workers
  () => {
    const daysA = rand(5, 12);
    const daysB = rand(6, 15);
    const daysC = rand(8, 18);
    const combined = round(1 / (1/daysA + 1/daysB + 1/daysC));
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Three Workers',
      text: `A:${daysA}d, B:${daysB}d, C:${daysC}d, together?`,
      answer: combined,
      explanation: 'Add all three rates'
    };
  },

  // M4: Efficiency Ratio
  () => {
    const daysB = rand(10, 20);
    const ratio = 2;
    const daysA = round(daysB / ratio);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Efficiency Ratio',
      text: `A ${ratio}× faster than B. B:${daysB}d. A?`,
      answer: daysA,
      explanation: 'If 2× fast, time is half'
    };
  },

  // M5: Work Distribution
  () => {
    const total = rand(100, 400);
    const ratioA = rand(2, 4);
    const ratioB = rand(1, 3);
    const shareA = round((ratioA / (ratioA + ratioB)) * total);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Work Distribution',
      text: `${total} units, ratio ${ratioA}:${ratioB}. Share A?`,
      answer: shareA,
      explanation: 'Divide by ratio'
    };
  },

  // M6: Interrupted Work
  () => {
    const totalUnits = rand(200, 500);
    const rate1 = rand(20, 40);
    const days1 = rand(5, 10);
    const worked = rate1 * days1;
    const remaining = totalUnits - worked;
    const rate2 = rand(15, 30);
    const daysRemaining = round(remaining / rate2);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Interrupted Work',
      text: `${totalUnits}u, then stop. ${rate1}/d for ${days1}d. Complete in ${daysRemaining}d more?`,
      answer: daysRemaining,
      explanation: 'Work - Pause - Resume'
    };
  },

  // M7: Efficiency Change
  () => {
    const rate1 = rand(30, 50);
    const rate2 = rand(50, 80);
    const units = rand(100, 300);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Efficiency Change',
      text: `Early ${rate1}/d, later ${rate2}/d. ${units}u total?`,
      answer: 'Variable calculation',
      explanation: 'Use average or segment'
    };
  },

  // M8: Worker Addition
  () => {
    const rate1 = rand(15, 25);
    const rate2 = rand(10, 20);
    const units = rand(200, 400);
    const combinedRate = rate1 + rate2;
    const time = round(units / combinedRate);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Worker Addition',
      text: `${units}u at ${rate1}/d, add ${rate2}/d. Time?`,
      answer: time,
      explanation: 'Worker addition increases rate'
    };
  },

  // M9: Deadline Pressure
  () => {
    const units = rand(300, 600);
    const days = rand(5, 10);
    const neededRate = round(units / days);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Deadline Pressure',
      text: `${units}u, ${days}d. Current ${rand(15,30)}/d. Need?`,
      answer: neededRate,
      explanation: 'Calculate required rate'
    };
  },

  // M10: Shift Work
  () => {
    const shift1 = rand(40, 70);
    const shift2 = rand(50, 80);
    const daily = shift1 + shift2;
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Shift Work',
      text: `Shift 1: ${shift1}/d, Shift 2: ${shift2}/d. Daily?`,
      answer: daily,
      explanation: 'Add shifts for daily total'
    };
  },

  // M11: Batch Processing
  () => {
    const batchSize = rand(20, 50);
    const batches = rand(3, 7);
    const rate = rand(15, 30);
    const totalUnits = batchSize * batches;
    const time = round(totalUnits / rate);
    return {
      topic: 'Time & Work',
      difficulty: 2,
      concept: 'Batch Processing',
      text: `Batch ${batchSize}u, ${batches} batches. ${rate}/d rate. Time?`,
      answer: time,
      explanation: 'Total units = Batch × Qty'
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD (10 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Variable Efficiency
  () => {
    const rate1 = rand(20, 40);
    const days1 = rand(3, 5);
    const rate2 = rand(50, 70);
    const units = rand(200, 400);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Variable Efficiency',
      text: `Day 1-${days1}: ${rate1}/d, Day ${days1+1}: ${rate2}/d. ${units}u total?`,
      answer: 'Segment calculation',
      explanation: 'Segment-wise calculation'
    };
  },

  // H2: Team Optimization
  () => {
    const units = rand(300, 600);
    const days = rand(5, 10);
    const ratePerPerson = rand(15, 30);
    const teamSize = Math.ceil(units / (days * ratePerPerson));
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Team Optimization',
      text: `Need ${units}u in ${days}d. ${ratePerPerson}/d/person. Min team?`,
      answer: teamSize,
      explanation: 'Team = Total/(Days×Rate)'
    };
  },

  // H3: Overlapping Work
  () => {
    const earlyDays = rand(2, 5);
    const togetherDays = rand(3, 7);
    const totalDays = earlyDays + togetherDays;
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Overlapping Work',
      text: `A starts ${earlyDays}d early, B joins. Together ${togetherDays}d. Total?`,
      answer: totalDays,
      explanation: `Total = Early days + Together days = ${earlyDays} + ${togetherDays} = ${totalDays}`
    };
  },

  // H4: Skill Levels
  () => {
    const expertRate = rand(50, 80);
    const noviceRate = rand(20, 40);
    const units = rand(200, 300);
    const avgRate = round((expertRate + noviceRate) / 2);
    const time = round(units / avgRate);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Skill Levels',
      text: `Expert: ${expertRate}/d, Novice: ${noviceRate}/d. Time for ${units}u?`,
      answer: time,
      explanation: `Avg rate = (${expertRate} + ${noviceRate}) / 2 = ${avgRate}. Time = ${units} / ${avgRate} = ${time}d`
    };
  },

  // H5: Deadline Optimization
  () => {
    const deadline = rand(5, 10);
    const units = rand(200, 400);
    const currentPace = rand(30, 50);
    const needed = round((units / deadline) - currentPace);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Deadline Optimization',
      text: `${deadline}d deadline. ${units}u. Current ${currentPace}/d. Extra?`,
      answer: needed,
      explanation: 'Rate = Units/Days'
    };
  },

  // H6: Multi-Phase Project
  () => {
    const phase1Units = rand(100, 200);
    const phase1Days = rand(3, 5);
    const phase2Units = rand(150, 250);
    const rate = round(phase1Units / phase1Days);
    const phase2Days = round(phase2Units / rate);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Multi-Phase Project',
      text: `Phase1: ${phase1Units}u in ${phase1Days}d. Phase2: ${phase2Units}u. Same rate?`,
      answer: phase2Days,
      explanation: 'Apply phase 1 rate to phase 2'
    };
  },

  // H7: Resource Allocation
  () => {
    const units = rand(200, 400);
    const teams = rand(2, 4);
    const ratio1 = rand(2, 3);
    const ratio2 = rand(2, 3);
    const share1 = round((ratio1 / (ratio1 + ratio2)) * units);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Resource Allocation',
      text: `${units}u between ${teams} teams ${ratio1}:${ratio2}. Team 1?`,
      answer: share1,
      explanation: 'Work = Ratio share × Total'
    };
  },

  // H8: Quality Impact
  () => {
    const units = rand(200, 400);
    const normalDays = rand(5, 10);
    const qualityBoost = 0.7; // 30% faster at 95% quality
    const fastDays = round(normalDays * qualityBoost);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Quality Impact',
      text: `${units}u at 100%: ${normalDays}d. At 95%: ${round(30)}% faster?`,
      answer: fastDays,
      explanation: 'Quality affects time-rate'
    };
  },

  // H9: Contingency Planning
  () => {
    const plannedDays = rand(5, 10);
    const bufferPercent = rand(20, 35);
    const actualDays = round(plannedDays * (1 + bufferPercent / 100));
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Contingency Planning',
      text: `Plan: ${plannedDays}d. Buffer: ${bufferPercent}%. Actual deadline?`,
      answer: actualDays,
      explanation: 'Include contingency'
    };
  },

  // H10: Capacity Constraint
  () => {
    const maxCapacity = rand(100, 200);
    const totalUnits = rand(400, 800);
    const days = round(totalUnits / maxCapacity);
    return {
      topic: 'Time & Work',
      difficulty: 3,
      concept: 'Capacity Constraint',
      text: `Max capacity ${maxCapacity}/d. ${totalUnits}u total. Days?`,
      answer: days,
      explanation: 'Limited by capacity'
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// TIME & DISTANCE – 32 TEMPLATES (11 EASY, 11 MEDIUM, 10 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const timeDistanceTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Basic Distance
  () => {
    const speed = rand(30, 60);
    const time = rand(2, 8);
    const distance = speed * time;
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Basic Distance',
      text: `Speed ${speed} km/h, time ${time}h. Distance?`,
      answer: distance,
      explanation: 'Distance = Speed × Time'
    };
  },

  // E2: Speed Calculation
  () => {
    const distance = rand(100, 300);
    const time = rand(2, 8);
    const speed = round(distance / time);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Speed Calculation',
      text: `Distance ${distance} km, time ${time}h. Speed?`,
      answer: speed,
      explanation: 'Speed = Distance / Time'
    };
  },

  // E3: Time Calculation
  () => {
    const distance = rand(100, 300);
    const speed = rand(40, 80);
    const time = round(distance / speed);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Time Calculation',
      text: `Distance ${distance} km, speed ${speed} km/h. Time?`,
      answer: time,
      explanation: 'Time = Distance / Speed'
    };
  },

  // E4: Unit Conversion
  () => {
    const mps = rand(20, 60);
    const kmh = round(mps * 3.6);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Unit Conversion',
      text: `${mps}m/s = ? km/h`,
      answer: kmh,
      explanation: 'm/s to km/h: multiply by 3.6'
    };
  },

  // E5: Average Speed
  () => {
    const totalDistance = rand(100, 200);
    const totalTime = rand(2, 6);
    const avgSpeed = round(totalDistance / totalTime);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Average Speed',
      text: `${totalDistance}km in ${totalTime}h. Average?`,
      answer: avgSpeed,
      explanation: 'Avg = Total Distance / Total Time'
    };
  },

  // E6: Relative Speed Same Direction
  () => {
    const speedA = rand(40, 60);
    const speedB = rand(50, 70);
    const relative = Math.abs(speedB - speedA);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Relative Speed Same Dir',
      text: `A: ${speedA} km/h, B: ${speedB} km/h (same). Relative?`,
      answer: relative,
      explanation: 'Same direction: Subtract'
    };
  },

  // E7: Relative Speed Opposite
  () => {
    const speedA = rand(40, 60);
    const speedB = rand(50, 70);
    const relative = speedA + speedB;
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Relative Speed Opposite',
      text: `A: ${speedA} km/h, B: ${speedB} km/h (opposite). Relative?`,
      answer: relative,
      explanation: 'Opposite direction: Add'
    };
  },

  // E8: Distance Change
  () => {
    const extraDistance = rand(100, 300);
    const speed = rand(45, 75);
    const extraTime = round(extraDistance / speed);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Distance Change',
      text: `${extraDistance} km more. Same speed ${speed}/h. Time diff?`,
      answer: extraTime,
      explanation: 'Extra time = Extra distance / Speed'
    };
  },

  // E9: Speed Comparison
  () => {
    const speedA = rand(40, 70);
    const speedB = rand(50, 90);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Speed Comparison',
      text: `A: ${speedA}/h, B: ${speedB}/h. Who faster?`,
      answer: 'B',
      explanation: 'Higher speed = Faster'
    };
  },

  // E10: Journey Segments
  () => {
    const dist1 = rand(50, 100);
    const speed1 = rand(40, 60);
    const dist2 = rand(50, 100);
    const speed2 = rand(50, 70);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Journey Segments',
      text: `Part 1: ${dist1}km@${speed1}/h, Part 2: ${dist2}km@${speed2}/h`,
      answer: 'Multi-part calculation',
      explanation: 'Add times for each segment'
    };
  },

  // E11: Stop Duration
  () => {
    const totalDistance = rand(100, 300);
    const totalTime = rand(3, 8);
    return {
      topic: 'Time & Distance',
      difficulty: 1,
      concept: 'Stop Duration',
      text: `${totalDistance}km in ${totalTime}h including stops. Moving time?`,
      answer: 'Less than total',
      explanation: 'Remove stop time'
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: Relative Meeting
  () => {
    const speedA = rand(40, 60);
    const speedB = rand(50, 70);
    const distance = rand(200, 400);
    const meetTime = round(distance / (speedA + speedB));
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Relative Meeting',
      text: `A: ${speedA}/h, B: ${speedB}/h, distance ${distance}km. Meet time?`,
      answer: meetTime,
      explanation: 'Meeting = Distance / Combined speed'
    };
  },

  // M2: Train Crossing Fixed
  () => {
    const trainLen = rand(100, 200);
    const platformLen = rand(200, 400);
    const speed = rand(60, 100);
    const totalDist = trainLen + platformLen;
    const speedMs = speed * 5 / 18;
    const time = round(totalDist / speedMs);
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Train Crossing Fixed',
      text: `Train ${trainLen}m at ${speed} km/h, platform ${platformLen}m. Time?`,
      answer: time,
      explanation: 'Distance = Train length + Platform'
    };
  },

  // M3: Train Crossing Train
  () => {
    const train1 = rand(100, 150);
    const speed1 = rand(50, 80);
    const train2 = rand(100, 150);
    const speed2 = rand(40, 70);
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Train Crossing Train',
      text: `Train1: ${train1}m@${speed1}km/h, Train2: ${train2}m@${speed2}km/h. Cross?`,
      answer: 'Relative speed problem',
      explanation: 'Combined length / Relative speed'
    };
  },

  // M4: Boat Downstream
  () => {
    const boatSpeed = rand(15, 25);
    const streamSpeed = rand(2, 6);
    const downstreamSpeed = boatSpeed + streamSpeed;
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Boat Downstream',
      text: `Boat speed ${boatSpeed}km/h, stream ${streamSpeed}km/h. Downstream?`,
      answer: downstreamSpeed,
      explanation: 'Downstream = Boat + Stream'
    };
  },

  // M5: Boat Upstream
  () => {
    const boatSpeed = rand(15, 25);
    const streamSpeed = rand(2, 6);
    const upstreamSpeed = boatSpeed - streamSpeed;
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Boat Upstream',
      text: `Boat ${boatSpeed}/h, stream ${streamSpeed}/h. Upstream?`,
      answer: upstreamSpeed,
      explanation: 'Upstream = Boat - Stream'
    };
  },

  // M6: Current Effect Balanced
  () => {
    const stillWater = rand(20, 30);
    const downSpeed = rand(12, 18);
    const upSpeed = rand(8, 14);
    const diff = downSpeed - upSpeed;
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Current Effect Balanced',
      text: `Downstream ${downSpeed}/h, Upstream ${upSpeed}/h. Current speed?`,
      answer: round(diff / 2),
      explanation: `Current = (Downstream - Upstream) / 2 = (${downSpeed} - ${upSpeed}) / 2 = ${round(diff / 2)}`
    };
  },

  // M7: Two-leg Journey
  () => {
    const dist1 = rand(100, 200);
    const speed1 = rand(50, 70);
    const dist2 = rand(150, 250);
    const speed2 = rand(60, 80);
    const time1 = round(dist1 / speed1);
    const time2 = round(dist2 / speed2);
    const totalTime = round(time1 + time2);
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Two-leg Journey',
      text: `Leg1: ${dist1}km@${speed1}/h, Leg2: ${dist2}km@${speed2}/h. Total time (h)?`,
      answer: totalTime,
      explanation: `Time = D₁/S₁ + D₂/S₂ = ${dist1}/${speed1} + ${dist2}/${speed2} = ${time1} + ${time2} = ${totalTime}h`
    };
  },

  // M8: Speed Over Time
  () => {
    const time1 = rand(2, 4);
    const speed1 = rand(40, 60);
    const time2 = rand(2, 4);
    const speed2 = rand(60, 80);
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Speed Over Time',
      text: `First ${time1}h@${speed1}/h, next ${time2}h@${speed2}/h. Average?`,
      answer: 'Total distance / Total time',
      explanation: 'Weighted average'
    };
  },

  // M9: Chase Problem
  () => {
    const speedA = rand(50, 70);
    const speedB = rand(30, 50);
    const gap = rand(20, 50);
    const catchTime = round(gap / (speedA - speedB));
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Chase Problem',
      text: `A: ${speedA}/h, B (ahead) ${speedB}/h, gap ${gap}km. Catch?`,
      answer: catchTime,
      explanation: 'Gap / Speed difference'
    };
  },

  // M10: Head Start
  () => {
    const startHours = rand(0.5, 3);
    const speedB = rand(40, 60);
    const speedA = rand(60, 80);
    const headDist = startHours * speedB;
    const catchTime = round(headDist / (speedA - speedB));
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Head Start',
      text: `B starts ${startHours}h early@${speedB}/h, A follows@${speedA}/h. Time for A to catch B?`,
      answer: catchTime,
      explanation: `Head distance = ${startHours} × ${speedB} = ${headDist}. Catch time = ${headDist} / (${speedA} - ${speedB}) = ${catchTime}h`
    };
  },

  // M11: Circular Track
  () => {
    const trackLen = rand(200, 400);
    const speed = rand(5, 15);
    const time = rand(5, 15);
    return {
      topic: 'Time & Distance',
      difficulty: 2,
      concept: 'Circular Track',
      text: `Track ${trackLen}m. Speed ${speed}m/s. Laps in ${time}min?`,
      answer: 'Time = Distance / Speed',
      explanation: 'Calculate total distance'
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD (10 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Complex Meeting (Angle)
  () => {
    const speedA = rand(40, 60);
    const speedB = rand(50, 80);
    const distance = rand(300, 600);
    const angle = rand(30, 90);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Complex Meeting',
      text: `A@${speedA}/h, B@${speedB}/h, apart ${distance}km, angle ${angle}°`,
      answer: 'Trigonometric solution',
      explanation: 'Relative speed varies with angle'
    };
  },

  // H2: Variable Speed Journey
  () => {
    const time1 = rand(2, 4);
    const speed1 = rand(40, 60);
    const time2 = rand(3, 5);
    const speed2 = rand(70, 90);
    const distance1 = time1 * speed1;
    const distance2 = time2 * speed2;
    const totalDist = distance1 + distance2;
    const totalTime = time1 + time2;
    const avgSpeed = round(totalDist / totalTime);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Variable Speed Journey',
      text: `First ${time1}h@${speed1}/h, next ${time2}h@${speed2}/h. Average speed?`,
      answer: avgSpeed,
      explanation: `Total distance = ${distance1} + ${distance2} = ${totalDist}. Avg = ${totalDist}/${totalTime} = ${avgSpeed}/h`
    };
  },

  // H3: Optimal Speed
  () => {
    const distance = rand(200, 400);
    const maxSpeed = rand(80, 120);
    const minTime = round(distance / maxSpeed);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Optimal Speed',
      text: `Distance ${distance}km, max speed ${maxSpeed}/h. Min time?`,
      answer: minTime,
      explanation: `Min time = Distance / Max speed = ${distance} / ${maxSpeed} = ${minTime}h`
    };
  },

  // H4: Fuel Optimization
  () => {
    const distance = rand(200, 400);
    const economicalSpeed = rand(50, 70);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Fuel Optimization',
      text: `${distance}km. Most fuel efficient at ${economicalSpeed}/h. Time taken?`,
      answer: round(distance / economicalSpeed),
      explanation: `Time = Distance / Speed = ${distance} / ${economicalSpeed} = ${round(distance / economicalSpeed)}h`
    };
  },

  // H5: Convoy Movement
  () => {
    const numVehicles = rand(3, 6);
    const slowestSpeed = rand(40, 60);
    const spread = rand(10, 30);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Convoy Movement',
      text: `${numVehicles} vehicles, slowest ${slowestSpeed}/h. Convoy speed?`,
      answer: slowestSpeed,
      explanation: `Convoy speed equals slowest vehicle: ${slowestSpeed}/h`
    };
  },

  // H6: Intercept Calculation
  () => {
    const targetSpeed = rand(30, 50);
    const interceptorSpeed = rand(70, 100);
    const gap = rand(30, 60);
    const interceptTime = round(gap / (interceptorSpeed - targetSpeed));
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Intercept Calculation',
      text: `Target ${targetSpeed}/h, interceptor ${interceptorSpeed}/h, gap ${gap}km`,
      answer: interceptTime,
      explanation: 'Closing speed determines intercept time'
    };
  },

  // H7: Relay Race
  () => {
    const runners = rand(3, 5);
    const distanceEach = rand(100, 200);
    const overlap = rand(10, 20);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Relay Race',
      text: `${runners} runners, ${distanceEach}m each, split ${overlap}m. Total?`,
      answer: 'Sum of segments',
      explanation: 'Account for overlap/gap'
    };
  },

  // H8: Round Trip Average
  () => {
    const outSpeed = rand(40, 60);
    const returnSpeed = rand(60, 80);
    const distance = rand(100, 200);
    const harmonicMean = round(2 * (outSpeed * returnSpeed) / (outSpeed + returnSpeed));
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Round Trip Average',
      text: `Out @${outSpeed}/h, return ${returnSpeed}/h, distance ${distance}km`,
      answer: harmonicMean,
      explanation: 'Avg ≠ (S₁+S₂)/2 for round trip'
    };
  },

  // H9: Paced Descent
  () => {
    const climbHeight = rand(500, 1500);
    const climbSpeed = rand(2, 5);
    const maxDescentSpeed = rand(8, 15);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Paced Descent',
      text: `Climb ${climbHeight}m@${climbSpeed}/h, max descent ${maxDescentSpeed}/h. Total?`,
      answer: 'Separate calculations per direction',
      explanation: 'Different speeds matter'
    };
  },

  // H10: Traffic Flow
  () => {
    const freeSpeed = rand(60, 80);
    const congestedSpeed = rand(20, 40);
    const freeTime = rand(30, 60);
    const congestedTime = rand(30, 60);
    return {
      topic: 'Time & Distance',
      difficulty: 3,
      concept: 'Traffic Flow',
      text: `Free flow ${freeSpeed}/h, congested ${congestedSpeed}/h, ${freeTime}min each. Average?`,
      answer: 'Time-based average',
      explanation: 'Weight by time, not distance'
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// RATIO & PROPORTION – 32 TEMPLATES (11 EASY, 11 MEDIUM, 10 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const ratioTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Ratio Simplification
  () => {
    const a = rand(10, 50);
    const b = rand(10, 50);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Ratio Simplification',
      text: `Simplify ${a}:${b}`,
      answer: 'GCD-based simplification',
      explanation: 'Divide by GCD'
    };
  },

  // E2: Ratio from Values
  () => {
    const a = rand(100, 500);
    const b = rand(100, 500);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Ratio from Values',
      text: `A:B = ${a}:${b}. Simplified?`,
      answer: 'Reduced form',
      explanation: 'Find common factor'
    };
  },

  // E3: Share Calculation
  () => {
    const total = rand(500, 1500);
    const ratioA = rand(2, 5);
    const ratioB = rand(2, 5);
    const share = round((ratioA / (ratioA + ratioB)) * total);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Share Calculation',
      text: `Total ${total}, ratio ${ratioA}:${ratioB}. Share1?`,
      answer: share,
      explanation: 'Part = (Ratio/Total) × Total'
    };
  },

  // E4: Find Missing Term
  () => {
    const a = 3;
    const b = rand(8, 20);
    const c = 6;
    const x = (c * b) / a;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Find Missing Term',
      text: `3:x = 6:${b}. x=?`,
      answer: x,
      explanation: '3 × ? = 6 × other'
    };
  },

  // E5: Equivalent Ratio
  () => {
    const scale = rand(3, 7);
    const a = 2;
    const b = 3;
    const newVal = a * scale;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Equivalent Ratio',
      text: `2:3 = ?:${b * scale}`,
      answer: newVal,
      explanation: 'Scale proportionally'
    };
  },

  // E6: Ratio Comparison
  () => {
    const ratioA1 = rand(3, 7);
    const ratioA2 = rand(4, 8);
    const ratioB1 = rand(4, 8);
    const ratioB2 = rand(5, 10);
    const valA = round(ratioA1 / ratioA2);
    const valB = round(ratioB1 / ratioB2);
    const larger = valA > valB ? `${ratioA1}:${ratioA2}` : `${ratioB1}:${ratioB2}`;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Ratio Comparison',
      text: `Which is larger: ${ratioA1}:${ratioA2} or ${ratioB1}:${ratioB2}?`,
      answer: larger,
      explanation: `Compare as decimals: ${valA} vs ${valB}. Larger is ${larger}`
    };
  },

  // E7: Combine Ratios
  () => {
    const aVal = rand(2, 5);
    const bVal = rand(2, 5);
    const cVal = rand(2, 5);
    const a = aVal * bVal;
    const b = bVal * bVal;
    const c = bVal * cVal;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Combine Ratios',
      text: `A:B=${aVal}:${bVal}, B:C=${bVal}:${cVal}. A:B:C?`,
      answer: `${a}:${b}:${c}`,
      explanation: `Make B same: A:B:C = (${aVal}×${bVal}):(${bVal}×${bVal}):(${bVal}×${cVal}) = ${a}:${b}:${c}`
    };
  },

  // E8: Inverse Ratio
  () => {
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Inverse Ratio',
      text: `If A:B=2:3, B:A=?`,
      answer: '3:2',
      explanation: 'Swap terms for inverse'
    };
  },

  // E9: Ratio of Ratio
  () => {
    const a = rand(2, 6);
    const b = rand(2, 6);
    const c = rand(3, 7);
    const d = rand(3, 7);
    const val1 = round(a / b);
    const val2 = round(c / d);
    const larger = val1 > val2 ? `${a}:${b}` : `${c}:${d}`;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Ratio of Ratio',
      text: `${a}:${b} compared to ${c}:${d}. Which larger?`,
      answer: larger,
      explanation: `${a}/${b}=${val1}, ${c}/${d}=${val2}. Larger is ${larger}`
    };
  },

  // E10: Distributed Amount
  () => {
    const total = rand(1000, 5000);
    const ratioA = rand(2, 5);
    const ratioB = rand(2, 5);
    const parts = ratioA + ratioB;
    const share = round((ratioA / parts) * total);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Distributed Amount',
      text: `${total} distributed as ${ratioA}:${ratioB} . Parts?`,
      answer: share,
      explanation: 'Each part = Total / Sum'
    };
  },

  // E11: Scaling
  () => {
    const scale = rand(2, 4);
    const a = rand(2, 4);
    const b = rand(3, 5);
    const newA = a * scale;
    const newB = b * scale;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 1,
      concept: 'Scaling',
      text: `Recipe ${a}:${b}. Scale ×${scale}. New?`,
      answer: `${newA}:${newB}`,
      explanation: 'Multiply each by scale'
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: Three-way Distribution
  () => {
    const total = rand(2000, 10000);
    const r1 = rand(2, 4);
    const r2 = rand(2, 4);
    const r3 = rand(2, 4);
    const sum = r1 + r2 + r3;
    const share1 = round((r1 / sum) * total);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Three-way Distribution',
      text: `${total} in ${r1}:${r2}:${r3}. First share?`,
      answer: share1,
      explanation: 'Part × (Ratio/Total)'
    };
  },

  // M2: Continued Proportion
  () => {
    const a = rand(2, 6);
    const b = rand(3, 7);
    const c = rand(3, 7);
    const x = round((b * b) / a);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Continued Proportion',
      text: `If ${a}:${b}=${b}:x. x=?`,
      answer: x,
      explanation: 'Cross multiply a:b=c:d'
    };
  },

  // M3: Inverse Proportion
  () => {
    const ratio = rand(2, 5);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Inverse Proportion',
      text: `A is ${ratio}× value of B. Work days inverse?`,
      answer: 'Inverse relationship',
      explanation: 'If A is kx value, time is 1/k'
    };
  },

  // M4: Compound Ratio
  () => {
    const a = rand(2, 5);
    const b = rand(2, 5);
    const c = rand(2, 5);
    const d = rand(2, 5);
    const numAnswer = a * c;
    const denAnswer = b * d;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Compound Ratio',
      text: `A:B=${a}:${b}, C:D=${c}:${d}. (A×C):(B×D)?`,
      answer: `${numAnswer}:${denAnswer}`,
      explanation: `Multiply: (${a}×${c}):(${b}×${d}) = ${numAnswer}:${denAnswer}`
    };
  },

  // M5: Ratio Change
  () => {
    const oldA = rand(2, 5);
    const oldB = rand(3, 6);
    const newA = rand(3, 8);
    const newB = rand(4, 7);
    const changeA = newA - oldA;
    const changeB = newB - oldB;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Ratio Change',
      text: `${oldA}:${oldB} changes to ${newA}:${newB}. Change in first component?`,
      answer: changeA,
      explanation: `Change = ${newA} - ${oldA} = ${changeA}`
    };
  },

  // M6: Price Ratio
  () => {
    const price1 = rand(150, 500);
    const price2 = rand(100, 400);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Price Ratio',
      text: `Dish costs ${price1} and ${price2}. Ratio?`,
      answer: 'Simplified ratio',
      explanation: 'Find GCD and reduce'
    };
  },

  // M7: Weighted Ratio
  () => {
    const ratioA = rand(2, 5);
    const ratioB = rand(3, 6);
    const qtyA = rand(100, 300);
    const qtyB = rand(100, 300);
    const total = qtyA + qtyB;
    const pctA = round((qtyA / total) * 100);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Weighted Ratio',
      text: `Mix ratio ${ratioA}:${ratioB} with quantities ${qtyA}:${qtyB}. Total?`,
      answer: total,
      explanation: `Total = Qty1 + Qty2 = ${qtyA} + ${qtyB} = ${total}`
    };
  },

  // M8: Unequal Division
  () => {
    const total = rand(500, 2000);
    const percent1 = rand(30, 70);
    const percent2 = 100 - percent1;
    const diff = round(total * Math.abs(percent1 - percent2) / 100);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Unequal Division',
      text: `${total} split ${percent1}:${percent2}. Difference?`,
      answer: diff,
      explanation: '% difference × Total'
    };
  },

  // M9: Ratio of Differences
  () => {
    const a = rand(200, 500);
    const b = rand(100, 300);
    const diff = a - b;
    const ratio = round(diff / b);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Ratio of Differences',
      text: `${a} and ${b}. Ratio of difference to smaller?`,
      answer: ratio,
      explanation: `Ratio = (${a} - ${b}) / ${b} = ${diff} / ${b} = ${ratio}`
    };
  },

  // M10: Cost Margin Ratio
  () => {
    const cost = rand(500, 2000);
    const selling = rand(600, 2500);
    const margin = selling - cost;
    const ratio = round(cost / selling);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Cost Margin Ratio',
      text: `Cost ${cost}, Selling ${selling}. Cost:Total ratio?`,
      answer: ratio,
      explanation: `Ratio = Cost/Selling = ${cost}/${selling} = ${ratio}`
    };
  },

  // M11: Budget Allocation
  () => {
    const budget = rand(1000, 5000);
    const r1 = rand(20, 40);
    const r2 = rand(30, 50);
    const r3 = rand(20, 30);
    const sum = r1 + r2 + r3;
    const share1 = round((r1 / sum) * budget);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 2,
      concept: 'Budget Allocation',
      text: `${budget} split as ${r1}:${r2}:${r3}. First share?`,
      answer: share1,
      explanation: `Share1 = (${r1} / ${sum}) × ${budget} = ${share1}`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD (10 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Complex Compound
  () => {
    const p = rand(2, 4);
    const q = rand(2, 4);
    const r = rand(2, 4);
    const s = rand(2, 4);
    const t = rand(2, 4);
    const u = rand(2, 4);
    const answerNum = p * r * t;
    const answerDen = q * s * u;
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Complex Compound',
      text: `A:B=${p}:${q}, B:C=${r}:${s}, C:D=${t}:${u}. A:D=?`,
      answer: `${answerNum}:${answerDen}`,
      explanation: `A:D = (${p}×${r}×${t}):(${q}×${s}×${u}) = ${answerNum}:${answerDen}`
    };
  },

  // H2: Proportion Equation
  () => {
    const num = rand(100, 300);
    const denom1 = rand(2, 6);
    const denom2 = rand(2, 6);
    const a = round((num * denom1) / denom2);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Proportion Equation',
      text: `a/${denom1} = ${num}/${denom2}. a=?`,
      answer: a,
      explanation: `a = (${num} × ${denom1}) / ${denom2} = ${a}`
    };
  },

  // H3: Harmonic Division
  () => {
    const total = rand(1000, 5000);
    const ratioA = rand(2, 5);
    const ratioB = rand(3, 7);
    const invA = 1 / ratioA;
    const invB = 1 / ratioB;
    const share1 = round((invA / (invA + invB)) * total);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Harmonic Division',
      text: `Divide ${total} in inverse ratio ${ratioA}:${ratioB}. Share1?`,
      answer: share1,
      explanation: `Inverse: 1/${ratioA}:1/${ratioB}. Share1 = ${share1}`
    };
  },

  // H4: Multiple Proportions
  () => {
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Multiple Proportions',
      text: `x:y=3:4, y:z=5:6, x:y:z=?`,
      answer: '15:20:24',
      explanation: 'x:y:z = (3×5):(4×5):(4×6) = 15:20:24'
    };
  },

  // H5: Proportion Verification
  () => {
    const a = rand(10, 50);
    const b = rand(15, 60);
    const c = rand(20, 70);
    const d = rand(30, 90);
    const isEqual = (a * d) === (b * c) ? 'Yes' : 'No';
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Proportion Verification',
      text: `If ${a}:${b}::${c}:${d}. Are they equal?`,
      answer: isEqual,
      explanation: `Check: ${a}×${d}=${a*d}, ${b}×${c}=${b*c}. Equal? ${isEqual}`
    };
  },

  // H6: Dynamic Ratio Change
  () => {
    const percentChange = rand(20, 50);
    const oldA = rand(2, 5);
    const oldB = rand(2, 5);
    const newA = round(oldA * (1 + percentChange / 100));
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Dynamic Ratio Change',
      text: `Old ratio ${oldA}:${oldB}, increase by ${percentChange}%. New A?`,
      answer: newA,
      explanation: `${oldA} × (1 + ${percentChange}/100) = ${newA}`
    };
  },

  // H7: Nested Ratios
  () => {
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Nested Ratios',
      text: `(a+b):(c-d)=3:2, a:b=2:1. Find a:c?`,
      answer: '3:5',
      explanation: 'From a:b=2:1, if a=2k, b=k. From (a+b):(c-d)=3:2, 3k:(c-d)=3:2, so c-d=2k'
    };
  },

  // H8: Scaled Distribution
  () => {
    const original1 = rand(2, 6);
    const original2 = rand(2, 6);
    const original3 = rand(2, 6);
    const total = original1 + original2 + original3;
    const newTotal = total + original2; // double one
    const new1 = round((original1 / total) * newTotal);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Scaled Distribution',
      text: `Original ${original1}:${original2}:${original3}. Double comp2. New comp1?`,
      answer: new1,
      explanation: `Scale factor = ${newTotal}/${total}. Comp1 = ${original1} × ${newTotal}/${total} = ${new1}`
    };
  },

  // H9: Optimization
  () => {
    const ratioA = rand(2, 5);
    const ratioB = rand(2, 5);
    const volume = rand(500, 2000);
    const share1 = round((ratioA / (ratioA + ratioB)) * volume);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Optimization',
      text: `Mix liquids ${ratioA}:${ratioB} for ${volume}ml total. Volume of comp1?`,
      answer: share1,
      explanation: `Comp1 = (${ratioA}/(${ratioA}+${ratioB})) × ${volume} = ${share1}ml`
    };
  },

  // H10: Partnership Profit
  () => {
    const invest1 = rand(10000, 50000);
    const invest2 = rand(15000, 60000);
    const months = rand(6, 24);
    const profit = rand(50000, 200000);
    const totalCapital = invest1 + invest2;
    const share1 = round((invest1 / totalCapital) * profit);
    return {
      topic: 'Ratio & Proportion',
      difficulty: 3,
      concept: 'Partnership Profit',
      text: `Invest ${invest1}:${invest2}. Profit ${profit}. Partner1 share?`,
      answer: share1,
      explanation: `Profit sharing = Investment ratio. Share1 = (${invest1}/${totalCapital}) × ${profit} = ${share1}`
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// SIMPLE & COMPOUND INTEREST – 33 TEMPLATES (12 EASY, 11 MEDIUM, 10 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const interestTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (12 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Simple Interest Basic
  () => {
    const p = rand(5000, 50000) * 10;
    const r = rand(5, 15);
    const t = rand(1, 10);
    const si = round((p * r * t) / 100);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Simple Interest',
      text: `Principal ${formatRs(p)}, rate ${r}%, time ${t} years. SI?`,
      answer: si,
      explanation: `SI = (P × R × T) / 100`
    };
  },

  // E2: Find Principal
  () => {
    const si = rand(5, 30) * 1000;
    const r = rand(5, 15);
    const t = rand(1, 5);
    const p = round((si * 100) / (r * t));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Find Principal',
      text: `SI ${formatRs(si)}, rate ${r}%, time ${t}y. Principal?`,
      answer: p,
      explanation: `P = (SI × 100) / (R × T)`
    };
  },

  // E3: Find Rate
  () => {
    const p = rand(5000, 50000) * 10;
    const si = rand(2000, 20000) * 10;
    const t = rand(1, 5);
    const r = round((si * 100) / (p * t));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Find Rate',
      text: `Principal ${p}, SI ${si}, time ${t}y. Rate?`,
      answer: r,
      explanation: `R = (SI × 100) / (P × T)`
    };
  },

  // E4: Find Time
  () => {
    const p = rand(5000, 50000) * 10;
    const r = rand(5, 15);
    const si = rand(5000, 50000) * 10;
    const t = round((si * 100) / (p * r));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Find Time',
      text: `Principal ${p}, SI ${si}, rate ${r}%. Time?`,
      answer: t,
      explanation: `T = (SI × 100) / (P × R)`
    };
  },

  // E5: Amount Calculation
  () => {
    const p = rand(5000, 50000) * 10;
    const r = rand(5, 15);
    const t = rand(1, 8);
    const si = round((p * r * t) / 100);
    const amount = p + si;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Total Amount',
      text: `P ${p} at ${r}% for ${t}y. Amount?`,
      answer: amount,
      explanation: `Amount = P + SI`
    };
  },

  // E6: Compound Interest Basic
  () => {
    const p = rand(5000, 20000) * 10;
    const r = rand(8, 15);
    const t = rand(1, 3);
    const ci = round(p * Math.pow(1 + r/100, t) - p);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Compound Interest',
      text: `P ${p}, rate ${r}%, time ${t}y. CI?`,
      answer: ci,
      explanation: `CI = P(1 + R/100)^T - P`
    };
  },

  // E7: Double Money Rule
  () => {
    const r = rand(8, 20);
    const years = round(72 / r);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Rule of 72',
      text: `At ${r}% CI, money doubles in ? years`,
      answer: years,
      explanation: `Rule of 72: Years = 72 / Rate`
    };
  },

  // E8: CI vs SI Difference
  () => {
    const p = rand(2000, 10000) * 10;
    const r = rand(10, 20);
    const si = round((p * r * 2) / 100);
    const ci = round(p * Math.pow(1 + r/100, 2) - p);
    const diff = ci - si;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'CI > SI',
      text: `P ${p}, rate ${r}%, 2 years. CI - SI?`,
      answer: diff,
      explanation: `CI > SI because interest earns interest`
    };
  },

  // E9: Annual Effective Rate
  () => {
    const r = rand(10, 20);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Effective Rate',
      text: `At ${r}% annual CI, is it more than ${r}% SI?`,
      answer: 'Yes',
      explanation: `CI compounds, earning interest on interest`
    };
  },

  // E10: Simple vs Compound
  () => {
    const p = rand(5000, 20000) * 10;
    const r = rand(10, 20);
    const siYear1 = (p * r) / 100;
    const ciYear1 = p * (1 + r/100) - p;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Year 1 Comparison',
      text: `Year 1: At ${r}%, SI = CI?`,
      answer: 'Yes',
      explanation: `Year 1, SI = CI. They diverge after year 1`
    };
  },

  // E11: Interest Multiple Years
  () => {
    const p = rand(5000, 30000) * 10;
    const r = rand(5, 15);
    const si1 = round((p * r) / 100);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Interest Per Year',
      text: `P ${p}, rate ${r}%. Interest per year?`,
      answer: si1,
      explanation: `Annual SI = P × R / 100`
    };
  },

  // E12: Loan Repayment Introduction
  () => {
    const p = rand(10000, 50000) * 10;
    const r = rand(8, 15);
    const t = rand(1, 3);
    const si = round((p * r * t) / 100);
    const repay = p + si;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 1,
      concept: 'Total Repayment',
      text: `Loan ${p} at ${r}% for ${t}y. Total to repay?`,
      answer: repay,
      explanation: `Total = Principal + SI`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: CI with Different Compounding
  () => {
    const p = rand(5000, 20000) * 10;
    const rAnnual = rand(10, 20);
    const rHalf = rAnnual / 2;
    const t = 2; // half-yearly for 2 years = 4 periods
    const ciAnnual = round(p * Math.pow(1 + rAnnual/100, t) - p);
    const ciHalf = round(p * Math.pow(1 + rHalf/100, 4) - p);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Compounding Frequency',
      text: `P ${p}, rate ${rAnnual}% annual vs half-yearly. CI difference?`,
      answer: Math.abs(ciHalf - ciAnnual),
      explanation: `More frequent compounding = Higher CI`
    };
  },

  // M2: Mixed SI and CI Period
  () => {
    const p = rand(5000, 20000) * 10;
    const r = rand(8, 15);
    const siYears = rand(2, 3);
    const ciYears = rand(2, 3);
    const si = round((p * r * siYears) / 100);
    const ci = round(p * Math.pow(1 + r/100, ciYears) - p);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Compare SI vs CI',
      text: `P ${p}, ${r}%. SI for ${siYears}y vs CI for ${ciYears}y. Which more?`,
      answer: 'Usually CI for same period',
      explanation: `Compare same time periods for accuracy`
    };
  },

  // M3: Rate of Interest Finding
  () => {
    const p = rand(10000, 50000) * 10;
    const amount = Math.round(p * 1.5);
    const t = rand(2, 5);
    const rNeeded = round((((amount - p) / p) * 100) / t);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Required Rate',
      text: `P ${p} to become ${amount} in ${t}y SI. Rate?`,
      answer: rNeeded,
      explanation: `R = (SI × 100) / (P × T)`
    };
  },

  // M4: Partial Year Interest
  () => {
    const p = rand(10000, 50000) * 10;
    const r = rand(8, 15);
    const months = rand(6, 18);
    const years = round(months / 12, 2);
    const si = round((p * r * years) / 100);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Partial Year',
      text: `P ${p}, rate ${r}%, time ${months} months. SI?`,
      answer: si,
      explanation: `Use fraction of year for time`
    };
  },

  // M5: Investment Growth Comparison
  () => {
    const p1 = rand(10000, 50000) * 10;
    const r1 = rand(10, 15);
    const p2 = rand(10000, 50000) * 10;
    const r2 = rand(8, 12);
    const t = rand(2, 5);
    const amount1 = p1 + round((p1 * r1 * t) / 100);
    const amount2 = p2 + round((p2 * r2 * t) / 100);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Investment Comparison',
      text: `Investment 1: P ${p1} @${r1}%. Investment 2: P ${p2} @${r2}%. After ${t}y?`,
      answer: 'Greater of amount1, amount2',
      explanation: `Compare final amounts`
    };
  },

  // M6: Effective Interest Rate
  () => {
    const rNominal = rand(10, 18);
    const effective = rNominal; // Simplified for display
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Effective Rate',
      text: `${rNominal}% nominal = ? effective quarterly?`,
      answer: 'Slightly higher due to compounding',
      explanation: `Effective rate > Nominal rate with compounding`
    };
  },

  // M7: Future Value Calculation  
  () => {
    const p = rand(10000, 50000) * 10;
    const r = rand(8, 16);
    const t = rand(3, 7);
    const fv = round(p * Math.pow(1 + r/100, t));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Future Value',
      text: `P ${p}, rate ${r}% CI for ${t}y. Future value?`,
      answer: fv,
      explanation: `FV = P × (1 + R/100)^T`
    };
  },

  // M8: Debt Growth Over Time
  () => {
    const loan = rand(100000, 500000) * 10;
    const rate = rand(10, 18);
    const years = rand(3, 8);
    const owed = round(loan * Math.pow(1 + rate/100, years));
    const interest = owed - loan;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Debt Accumulation',
      text: `Loan ${loan} at ${rate}% for ${years}y. Amount owed?`,
      answer: owed,
      explanation: `Debt grows with compound interest`
    };
  },

  // M9: Multiple Investments
  () => {
    const p1 = rand(20000, 50000) * 10;
    const p2 = rand(20000, 50000) * 10;
    const r = rand(10, 15);
    const t = rand(2, 5);
    const total = (p1 + p2) + round(((p1 + p2) * r * t) / 100);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Combined Investments',
      text: `Two investments ${p1} and ${p2} at ${r}% for ${t}y. Total amount?`,
      answer: total,
      explanation: `Combined P earns interest as single amount`
    };
  },

  // M10: Interest Comparison Simple vs Compound
  () => {
    const p = rand(10000, 50000) * 10;
    const r = rand(10, 18);
    const t = 3;
    const si = round((p * r * t) / 100);
    const ci = round(p * Math.pow(1 + r/100, t) - p);
    const extra = ci - si;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Extra CI Benefit',
      text: `P ${p}, rate ${r}%, 3 years. Extra benefit of CI?`,
      answer: extra,
      explanation: `CI extra = CI - SI, grows each year`
    };
  },

  // M11: Loan Amortization Intro
  () => {
    const principal = rand(100000, 500000) * 10;
    const rate = rand(8, 15);
    const years = rand(2, 5);
    const ci = round(principal * Math.pow(1 + rate/100, years) - principal);
    const totalPayable = principal + ci;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 2,
      concept: 'Loan Total Cost',
      text: `Loan ${principal} @${rate}% CI for ${years}y. Total cost?`,
      answer: totalPayable,
      explanation: `Total = Principal + CI`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════ 
  // HARD (10 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Complex CI Calculation
  () => {
    const p = rand(50000, 200000) * 10;
    const r1 = rand(10, 15);
    const r2 = rand(12, 18);
    const t1 = rand(2, 3);
    const t2 = rand(2, 3);
    const amt1 = round(p * Math.pow(1 + r1/100, t1));
    const amt2 = round(amt1 * Math.pow(1 + r2/100, t2));
    const totalCI = amt2 - p;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Varying Rates',
      text: `P ${p}, ${r1}% for ${t1}y then ${r2}% for ${t2}y. Total CI?`,
      answer: totalCI,
      explanation: `Apply each rate sequentially to compounding amount`
    };
  },

  // H2: Discount Problem (Interest Reverse)
  () => {
    const fv = rand(100000, 500000) * 10;
    const r = rand(8, 15);
    const t = rand(2, 5);
    const pv = round(fv / Math.pow(1 + r/100, t));
    const discount = fv - pv;
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Present Value',
      text: `Future amount ${fv} discounted ${r}% for ${t}y. Present value?`,
      answer: pv,
      explanation: `PV = FV / (1 + R/100)^T`
    };
  },

  // H3: Algebraic Interest Problem
  () => {
    const ratio = rand(3, 6);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Amount Ratio',
      text: `If amount becomes ${ratio}x in ${rand(2,4)}y @SI. Rate?`,
      answer: 'Algebraic solution',
      explanation: `A = P(1 + rt), solve for r`
    };
  },

  // H4: Continuous Compounding
  () => {
    const p = rand(50000, 200000) * 10;
    const r = rand(8, 15);
    const t = rand(2, 5);
    const eCont = Math.exp((r/100)*t);
    const amount = round(p * eCont);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Continuous Compounding',
      text: `P ${p}, rate ${r}%, continuous compounding ${t}y. Amount?`,
      answer: amount,
      explanation: `A = P × e^(rt), uses 'e' constant`
    };
  },

  // H5: Effective Annual Rate (EAR)
  () => {
    const nominal = rand(10, 20);
    const compoundingFreq = rand(2, 4);
    const ear = round(Math.pow(1 + nominal/(100*compoundingFreq), compoundingFreq) * 100 - 100);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Effective Annual Rate',
      text: `Nominal ${nominal}% compounded ${compoundingFreq}x/year. EAR?`,
      answer: ear,
      explanation: `EAR = (1 + r/n)^n - 1`
    };
  },

  // H6: Loan Payoff Strategy
  () => {
    const principal = rand(200000, 1000000) * 10;
    const rate = rand(8, 15);
    const years = rand(5, 10);
    const totalInterest = round(principal * rate * years / 100);
    const monthlyPayment = round((principal + totalInterest) / (years * 12));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Monthly Repayment',
      text: `Loan ${principal} @${rate}% SI for ${years}y. Monthly payment?`,
      answer: monthlyPayment,
      explanation: `Simplified: (Principal + Interest) / (Months)`
    };
  },

  // H7: Investment with Regular Deposits
  () => {
    const monthlyDeposit = rand(5000, 20000) * 10;
    const rate = rand(8, 15);
    const months = rand(24, 60);
    // Simplified FV of annuity
    const fv = round(monthlyDeposit * (Math.pow(1 + rate/(100*12), months) - 1) / (rate/(100*12)));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Annuity Future Value',
      text: `Monthly deposit ${monthlyDeposit} at ${rate}% for ${months/12}y. Total?`,
      answer: fv,
      explanation: `FV of Annuity = P × [((1+r)^n - 1) / r]`
    };
  },

  // H8: Break-Even Interest Rate
  () => {
    const invest1 = rand(100000, 500000) * 10;
    const invest2 = rand(100000, 500000) * 10;
    const r2 = rand(10, 15);
    // Find r1 such that both grow equally
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Equilibrium Rate',
      text: `${invest1} @r1% = ${invest2} @${r2}% after 5y. r1?`,
      answer: 'Requires algebra',
      explanation: `Set up equations and solve for unknown rate`
    };
  },

  // H9: Pension/Retirement Calculation
  () => {
    const monthlyContribution = rand(10000, 50000) * 10;
    const employerMatch = round(monthlyContribution * 0.5);
    const totalMonthly = monthlyContribution + employerMatch;
    const rate = rand(8, 12);
    const years = rand(25, 40);
    const fv = round(totalMonthly * (Math.pow(1 + rate/(100*12), years*12) - 1) / (rate/(100*12)));
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'Retirement Fund',
      text: `Monthly ${monthlyContribution} + 50% employer @ ${rate}% for ${years}y. Corpus?`,
      answer: fv,
      explanation: `Long-term compounding with regular contributions`
    };
  },

  // H10: Cross-Currency Interest Comparison
  () => {
    const currencyA_rate = rand(8, 12);
    const currencyB_rate = rand(10, 15);
    const exchangeRate = rand(70, 90);
    return {
      topic: 'Simple & Compound Interest',
      difficulty: 3,
      concept: 'International Investment',
      text: `Currency A: ${currencyA_rate}%, B: ${currencyB_rate}%, exchange @${exchangeRate}. Better choice?`,
      answer: 'Requires currency consideration',
      explanation: `Must factor in currency risk and fluctuation`
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// AVERAGES – 32 TEMPLATES (11 EASY, 11 MEDIUM, 10 HARD)
// ─────────────────────────────────────────────────────────────────────────────

const averageTemplates = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EASY (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // E1: Simple Average
  () => {
    const nums = [rand(20, 50), rand(30, 60), rand(25, 55)];
    const avg = round(nums.reduce((a,b) => a+b) / nums.length);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Simple Average',
      text: `Average of ${nums.join(', ')}?`,
      answer: avg,
      explanation: `Avg = Sum / Count = ${nums.reduce((a,b) => a+b)} / 3`
    };
  },

  // E2: Find Total
  () => {
    const count = rand(4, 8);
    const avg = rand(30, 80);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Total from Average',
      text: `Average of ${count} numbers is ${avg}. Total?`,
      answer: count * avg,
      explanation: `Total = Avg × Count`
    };
  },

  // E3: Missing Value
  () => {
    const total = rand(100, 300);
    const count = rand(3, 6);
    const avg = round(total / count);
    const known = total - rand(20, 80);
    const missing = total - known;
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Find Missing Value',
      text: `Avg of ${count} is ${avg}, known sum ${known}. Missing?`,
      answer: missing,
      explanation: `Missing = (Avg × Count) - Known`
    };
  },

  // E4: Number from Average
  () => {
    const avg = rand(40, 80);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Count from Total',
      text: `Total ${avg * rand(3, 8)} at average ${avg}. Count?`,
      answer: 'Total / Avg',
      explanation: `Count = Total / Average`
    };
  },

  // E5: Simple Mean
  () => {
    const n1 = rand(20, 60);
    const n2 = rand(30, 70);
    const n3 = rand(25, 65);
    const avg = round((n1 + n2 + n3) / 3);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Mean Calculation',
      text: `${n1}, ${n2}, ${n3}. Mean?`,
      answer: avg,
      explanation: `Mean = Sum of all / Number of values`
    };
  },

  // E6: Average Change
  () => {
    const original = rand(50, 100);
    const change = rand(10, 30);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Avg Change',
      text: `Avg from ${original} changes by +${change}. New?`,
      answer: original + change,
      explanation: `New Avg = Old Avg ± Change`
    };
  },

  // E7: Equal Distribution
  () => {
    const total = rand(1000, 5000) * 10;
    const count = rand(4, 10);
    const each = round(total / count);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Equal Share',
      text: `Distribute ${total} equally among ${count}. Each?`,
      answer: each,
      explanation: `Each = Total / People`
    };
  },

  // E8: Average Score
  () => {
    const scores = [rand(60, 90), rand(70, 95), rand(65, 90), rand(75, 100)];
    const avg = round(scores.reduce((a,b) => a+b) / scores.length);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Avg Score',
      text: `Scores: ${scores.join(', ')}. Average?`,
      answer: avg,
      explanation: `Avg = Sum of scores / Number of subjects`
    };
  },

  // E9: Check Average
  () => {
    const avg = rand(50, 100);
    const count = rand(3, 6);
    const total = avg * count;
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Verify Average',
      text: `Is ${total} the total if avg is ${avg} for ${count}?`,
      answer: 'Yes',
      explanation: `Verify: Avg × Count = Total`
    };
  },

  // E10: Simple Fraction Average
  () => {
    const n1 = rand(10, 50);
    const n2 = rand(20, 60);
    const avg = round((n1 + n2) / 2);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Two Number Average',
      text: `Average of ${n1} and ${n2}?`,
      answer: avg,
      explanation: `Avg of 2 = (n1 + n2) / 2`
    };
  },

  // E11: Counting Averages
  () => {
    const range = rand(1, 20);
    const avg = round((1 + range) / 2);
    return {
      topic: 'Averages',
      difficulty: 1,
      concept: 'Range Average',
      text: `Average of 1 to ${range}?`,
      answer: avg,
      explanation: `Avg of consecutive = (First + Last) / 2`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM (11 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // M1: Weighted Average
  () => {
    const q1 = rand(10, 40);
    const p1 = rand(20, 60);
    const q2 = rand(10, 40);
    const p2 = rand(30, 80);
    const weighted = round((q1*p1 + q2*p2) / (q1+q2));
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Weighted Avg',
      text: `${q1}kg@${p1} mixed with ${q2}kg@${p2}. Avg price?`,
      answer: weighted,
      explanation: `Weighted = (w1×v1 + w2×v2) / (w1+w2)`
    };
  },

  // M2: Group Averages
  () => {
    const g1cnt = rand(15, 30);
    const g1avg = rand(60, 80);
    const g2cnt = rand(15, 30);
    const g2avg = rand(50, 70);
    const combined = round((g1cnt*g1avg + g2cnt*g2avg) / (g1cnt+g2cnt));
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Combined Group',
      text: `Group1: ${g1cnt}@${g1avg}, Group2: ${g2cnt}@${g2avg}. Combined avg?`,
      answer: combined,
      explanation: `Combined = Total of all / Total count`
    };
  },

  // M3: Altered Average
  () => {
    const original_count = rand(4, 10);
    const original_avg = rand(50, 100);
    const new_member = rand(80, 150);
    const new_avg = round((original_count * original_avg + new_member) / (original_count + 1));
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'New Member Impact',
      text: `${original_count} members avg ${original_avg}. Add member with ${new_member}. New avg?`,
      answer: new_avg,
      explanation: `New Avg = (Old Sum + New) / (Count + 1)`
    };
  },

  // M4: Removal Impact
  () => {
    const count = rand(8, 15);
    const avg = rand(60, 100);
    const removed = rand(150, 200);
    const new_avg = round(((count * avg) - removed) / (count - 1));
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Removing Member',
      text: `${count} members avg ${avg}. Remove one with ${removed}. New avg?`,
      answer: new_avg,
      explanation: `New Avg = (Old Sum - Removed) / (Count - 1)`
    };
  },

  // M5: Average Speed
  () => {
    const d1 = rand(50, 150);
    const s1 = rand(40, 60);
    const d2 = rand(50, 150);
    const s2 = rand(50, 80);
    const total_dist = d1 + d2;
    const total_time = d1/s1 + d2/s2;
    const avg_speed = round(total_dist / total_time);
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Average Speed',
      text: `${d1}km@${s1}km/h, then ${d2}km@${s2}km/h. Avg speed?`,
      answer: avg_speed,
      explanation: `Avg Speed = Total Distance / Total Time (not average of speeds)`
    };
  },

  // M6: Three Way Distribution
  () => {
    const total = rand(3000, 9000) * 10;
    const a_ratio = rand(2, 4);
    const b_ratio = rand(2, 4);
    const c_ratio = rand(2, 4);
    const sum_ratio = a_ratio + b_ratio + c_ratio;
    const a_share = round((a_ratio / sum_ratio) * total);
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Ratio Distribution',
      text: `${total} in ratio ${a_ratio}:${b_ratio}:${c_ratio}. First share?`,
      answer: a_share,
      explanation: `Share = (Ratio / Total Ratio) × Total`
    };
  },

  // M7: Progressive Average
  () => {
    const prev_count = rand(10, 20);
    const prev_avg = rand(50, 80);
    const new_count = rand(5, 10);
    const new_member_avg = rand(70, 110);
    const curr_sum = prev_count * prev_avg + new_count * new_member_avg;
    const curr_total = prev_count + new_count;
    const curr_avg = round(curr_sum / curr_total);
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Adding Group',
      text: `${prev_count} avg ${prev_avg}, add ${new_count} avg ${new_member_avg}. Overall?`,
      answer: curr_avg,
      explanation: `Overall = (Sum1 + Sum2) / (Count1 + Count2)`
    };
  },

  // M8: Salary Average
  () => {
    const emp1_count = rand(10, 30);
    const emp1_salary = rand(30000, 60000) * 10;
    const emp2_count = rand(5, 15);
    const emp2_salary = rand(50000, 100000) * 10;
    const avg_salary = round((emp1_count * emp1_salary + emp2_count * emp2_salary) / (emp1_count + emp2_count));
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Weighted Salary',
      text: `${emp1_count} earning ${formatRs(emp1_salary)}, ${emp2_count} earning ${formatRs(emp2_salary)}. Avg?`,
      answer: avg_salary,
      explanation: `Avg = Total Salary / Total Employees`
    };
  },

  // M9: Moving Average
  () => {
    const window = rand(3, 5);
    const values = Array(7).fill(0).map(() => rand(30, 100));
    const moving_avg = round((values[0] + values[1] + values[2]) / 3);
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Moving Average',
      text: `Values: ${values.join(', ')}. ${window}-point moving avg?`,
      answer: moving_avg,
      explanation: `Moving Avg = Avg of consecutive n values`
    };
  },

  // M10: Exclude Outlier
  () => {
    const scores = [rand(70, 90), rand(75, 95), rand(80, 100), rand(10, 30), rand(65, 85)];
    const with_outlier = round(scores.reduce((a,b) => a+b) / scores.length);
    const without = round((scores.reduce((a,b) => a+b) - Math.min(...scores)) / (scores.length - 1));
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Exclude Outlier',
      text: `Scores: ${scores.join(', ')}. Avg excluding lowest?`,
      answer: without,
      explanation: `Remove outlier before averaging`
    };
  },

  // M11: Index Average
  () => {
    const base_year = 100;
    const indices = [100, 110, 120, 130, 125];
    const avg_index = round(indices.reduce((a,b) => a+b) / indices.length);
    return {
      topic: 'Averages',
      difficulty: 2,
      concept: 'Index Average',
      text: `Indices: ${indices.join(', ')}. Average index?`,
      answer: avg_index,
      explanation: `Avg of indices calculated normally`
    };
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD (10 TEMPLATES)
  // ═══════════════════════════════════════════════════════════════════════════

  // H1: Complex Weighted Average
  () => {
    const catA_count = rand(20, 40);
    const catA_price = rand(100, 300);
    const catB_count = rand(15, 35);
    const catB_price = rand(200, 500);
    const catC_count = rand(10, 30);
    const catC_price = rand(300, 600);
    const weighted = round((catA_count*catA_price + catB_count*catB_price + catC_count*catC_price) / (catA_count + catB_count + catC_count));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Triple Weighted',
      text: `Cat A: ${catA_count}@${formatRs(catA_price)}, B: ${catB_count}@${formatRs(catB_price)}, C: ${catC_count}@${formatRs(catC_price)}. Avg?`,
      answer: weighted,
      explanation: `Weighted = (Sum of weighted values) / (Sum of weights)`
    };
  },

  // H2: Multiple Group Consolidation
  () => {
    const dept1_emp = rand(10, 30);
    const dept1_salary = rand(40000, 80000) * 10;
    const dept2_emp = rand(15, 35);
    const dept2_salary = rand(50000, 100000) * 10;
    const dept3_emp = rand(5, 20);
    const dept3_salary = rand(80000, 150000) * 10;
    const overall = round((dept1_emp*dept1_salary + dept2_emp*dept2_salary + dept3_emp*dept3_salary) / (dept1_emp + dept2_emp + dept3_emp));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Organization Avg',
      text: `Dept1: ${dept1_emp}@${formatRs(dept1_salary)}, Dept2: ${dept2_emp}@${formatRs(dept2_salary)}, Dept3: ${dept3_emp}@${formatRs(dept3_salary)}. Overall avg?`,
      answer: overall,
      explanation: `Consolidate all, then divide by total count`
    };
  },

  // H3: Harmonic Mean (Average Speed)
  () => {
    const s1 = rand(30, 60);
    const s2 = rand(40, 80);
    const harmonic = round(2 * (s1 * s2) / (s1 + s2));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Harmonic Mean',
      text: `Equal distance at ${s1} and ${s2} km/h. Average speed?`,
      answer: harmonic,
      explanation: `Harmonic Mean = 2/(1/x + 1/y) for equal distances`
    };
  },

  // H4: Geometric Mean
  () => {
    const v1 = rand(100, 300);
    const v2 = rand(300, 600);
    const geometric = round(Math.sqrt(v1 * v2));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Geometric Mean',
      text: `Between ${v1} and ${v2}, geometric mean?`,
      answer: geometric,
      explanation: `Geometric Mean = √(ab) when growth/multiplicative`
    };
  },

  // H5: Distribution Requirement
  () => {
    const needed_avg = rand(70, 85);
    const count = rand(5, 10);
    const needed_total = needed_avg * count;
    const current_total = rand(needed_total - 500, needed_total - 100) * 10;
    const needed_score = (needed_total - current_total / 10) * 10;
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Target Score',
      text: `Need avg ${needed_avg} in ${count} subjects. Already have ${round(current_total/10*10)}. Need?`,
      answer: round(needed_score),
      explanation: `Target Score = (Needed Avg × Count) - Current Sum`
    };
  },

  // H6: Change in Composition
  () => {
    const old_count = rand(10, 20);
    const old_avg = rand(60, 100);
    const removed_count = rand(2, 5);
    const removed_avg = rand(30, 60);
    const remaining_sum = (old_count * old_avg) - (removed_count * removed_avg);
    const new_avg = round(remaining_sum / (old_count - removed_count));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Composition Change',
      text: `${old_count} avg ${old_avg}. Remove ${removed_count} avg ${removed_avg}. New avg?`,
      answer: new_avg,
      explanation: `Remove lower/higher performers changes overall average`
    };
  },

  // H7: Weighted with Proportions
  () => {
    const ratio_a = rand(3, 6);
    const ratio_b = rand(2, 5);
    const ratio_c = rand(2, 4);
    const total_ratio = ratio_a + ratio_b + ratio_c;
    const val_a = rand(100, 300);
    const val_b = rand(200, 400);
    const val_c = rand(300, 500);
    const weighted = round(((ratio_a/total_ratio)*val_a + (ratio_b/total_ratio)*val_b + (ratio_c/total_ratio)*val_c));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Ratio Weighted',
      text: `Mix ratio ${ratio_a}:${ratio_b}:${ratio_c} with values ${val_a}, ${val_b}, ${val_c}. Avg?`,
      answer: weighted,
      explanation: `Calculate weighted by ratio proportions`
    };
  },

  // H8: Conditional Average
  () => {
    const all_scores = [rand(40, 60), rand(50, 70), rand(60, 80), rand(70, 90), rand(80, 100), rand(20, 40)];
    const passing = all_scores.filter(s => s >= 50);
    const avg_passing = round(passing.reduce((a,b) => a+b) / passing.length);
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Conditional Avg',
      text: `Scores: ${all_scores.join(', ')}. Average of passing (≥50)?`,
      answer: avg_passing,
      explanation: `Filter to condition, then calculate average`
    };
  },

  // H9: Cumulative Average Change
  () => {
    const initial_avg = rand(60, 80);
    const initial_count = rand(10, 20);
    const new_member_1 = rand(95, 100);
    const after_1 = round((initial_avg * initial_count + new_member_1) / (initial_count + 1));
    const new_member_2 = rand(30, 50);
    const after_2 = round((after_1 * (initial_count + 1) + new_member_2) / (initial_count + 2));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Cumulative Change',
      text: `Start: ${initial_count} avg ${initial_avg}. Add ${new_member_1}, then ${new_member_2}. Final avg?`,
      answer: after_2,
      explanation: `Apply changes sequentially, recalculating each time`
    };
  },

  // H10: Portfolio Average Performance
  () => {
    const stock_count = rand(3, 6);
    const stock_values = Array(stock_count).fill(0).map(() => rand(50, 200));
    const weights = Array(stock_count).fill(0).map((_, i) => rand(10, 30));
    const total_weight = weights.reduce((a,b) => a+b);
    const weighted_return = round(stock_values.reduce((sum, val, i) => sum + val * (weights[i]/total_weight), 0));
    return {
      topic: 'Averages',
      difficulty: 3,
      concept: 'Portfolio Avg',
      text: `${stock_count} stocks with values and weights. Weighted return = ?`,
      answer: weighted_return,
      explanation: `Portfolio return = Σ(Stock Return × Weight/Total Weight)`
    };
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// MASTER GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

const allTopics = {
  'Profit & Loss': profitLossTemplates,
  'Percentages': percentageTemplates,
  'Time & Work': timeWorkTemplates,
  'Time & Distance': timeDistanceTemplates,
  'Ratio & Proportion': ratioTemplates,
  'Simple & Compound Interest': interestTemplates,
  'Averages': averageTemplates
};

/**
 * Generate a random company-level aptitude question
 * @param {string} topic - Optional: specific topic name. If undefined, randomly selects.
 * @param {number} difficulty - Optional: 1=Easy, 2=Medium, 3=Hard. If undefined, includes all.
 * @returns {object} Question object with text, answer, explanation, steps, concept, difficulty
 */
function generateAdvancedQuestion(topic, difficulty, attempts = 0) {
  // Max attempts to prevent infinite recursion
  if (attempts > 10) {
    console.warn(`[Generator] Max attempts reached for topic: ${topic}, difficulty: ${difficulty}. Generating any difficulty.`);
    return generateAdvancedQuestion(topic, null, attempts + 1);
  }

  // Select random topic if not specified
  const selectedTopic = topic && allTopics[topic] 
    ? topic 
    : pick(Object.keys(allTopics));
  
  // Get templates for selected topic
  const templates = allTopics[selectedTopic];
  
  // Pick random template and execute it
  const templateFn = pick(templates);
  const question = templateFn();
  
  // Filter by difficulty if specified
  if (difficulty && question.difficulty !== difficulty) {
    // Recursively try again with attempt counter
    return generateAdvancedQuestion(topic, difficulty, attempts + 1);
  }
  
  // Generate multiple choice options
  const options = generateOptions(question.answer, 5);
  
  return {
    topic: question.topic,
    text: question.text,
    options,
    correctAnswer: String(question.answer),
    explanation: question.explanation,
    steps: question.steps,
    difficulty: question.difficulty,
    concept: question.concept,
    difficultyLabel: question.difficulty === 1 ? 'Easy' : question.difficulty === 2 ? 'Medium' : 'Hard'
  };
}

/**
 * Generate multiple questions
 * @param {number} count - Number of questions to generate
 * @param {string} topic - Optional topic filter
 * @param {number} difficulty - Optional difficulty filter (1, 2, or 3)
 * @returns {array} Array of question objects
 */
function generateAdvancedQuestions(count, topic, difficulty) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateAdvancedQuestion(topic, difficulty));
  }
  return questions;
}

/**
 * Get all available topics
 * @returns {array} List of topic names
 */
function getAvailableTopics() {
  return Object.keys(allTopics).map(topicName => ({
    name: topicName,
    description: `Company-level ${topicName} problems`,
    templates: allTopics[topicName].length
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  generateAdvancedQuestion,
  generateAdvancedQuestions,
  getAvailableTopics,
  performanceLevel,
  // Helper functions for external use
  rand,
  round,
  pick,
  generateOptions,
  formatRs
};
