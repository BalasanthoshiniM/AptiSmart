#!/usr/bin/env node

/**
 * Comprehensive Ratio & Proportion test - Generate 15 questions
 */

const gen = require('./utils/advancedQuestionGenerator_V2_COMPLETE');

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║   Ratio & Proportion - Comprehensive Quality Test             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let correctCount = 0;
const issues = [];

// Generate 15 random questions
for (let i = 1; i <= 15; i++) {
  const q = gen.generateAdvancedQuestion('Ratio & Proportion');
  
  console.log(`Q${i}: [${q.difficulty === 1 ? 'EASY' : q.difficulty === 2 ? 'MED' : 'HARD'}] ${q.text.substring(0, 60)}...`);
  
  // Check answer format
  const answerStr = String(q.answer);
  let answerOk = true;
  
  // Verify answer is in options
  const foundAnswer = q.options.includes(answerStr);
  if (!foundAnswer) {
    answerOk = false;
    issues.push(`Q${i}: Answer "${q.answer}" not found in options: ${q.options.join(', ')}`);
  }
  
  // Check options are diverse
  const uniqueOptions = [...new Set(q.options)];
  if (uniqueOptions.length < 4) {
    answerOk = false;
    issues.push(`Q${i}: Options not unique: ${q.options.join(', ')}`);
  }
  
  // Check for negative numbers in ratio/currency context
  if ((answerStr.includes(':') || answerStr > 100) && q.options.some(o => parseFloat(o) < 0)) {
    answerOk = false;
    issues.push(`Q${i}: Negative options for currency/ratio question: ${q.options.join(', ')}`);
  }
  
  if (answerOk) {
    correctCount++;
    console.log(`  ✓ Answer: ${q.answer} | Options: ${q.options.join(', ')}`);
  } else {
    console.log(`  ✗ ISSUE FOUND`);
  }
}

console.log(`\n${'═'.repeat(70)}`);
console.log(`\n📊 RESULTS: ${correctCount}/15 questions passed quality checks`);

if (issues.length > 0) {
  console.log(`\n⚠️  Issues Found:\n`);
  issues.forEach(issue => console.log(`  • ${issue}`));
} else {
  console.log(`\n✅ All questions pass quality checks!`);
}

console.log('\n' + '═'.repeat(70) + '\n');
