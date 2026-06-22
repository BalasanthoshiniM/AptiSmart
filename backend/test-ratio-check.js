#!/usr/bin/env node

/**
 * Quick test to check Ratio & Proportion question options
 */

const gen = require('./utils/advancedQuestionGenerator_V2_COMPLETE');

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║         Checking Ratio & Proportion Question Options          ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Generate 5 random Ratio & Proportion questions to check options
for (let i = 1; i <= 5; i++) {
  const q = gen.generateAdvancedQuestion('Ratio & Proportion');
  
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`Question ${i}:`);
  console.log(`${'─'.repeat(70)}`);
  console.log(`Text: ${q.text}`);
  console.log(`\nDifficulty: ${q.difficulty} | Topic: ${q.topic}`);
  console.log(`\nCorrect Answer: ${q.answer}`);
  console.log(`\nOptions:`);
  q.options.forEach((opt, idx) => {
    const marker = opt === String(q.answer) ? '✓ CORRECT' : '✗ Wrong';
    console.log(`  ${idx + 1}. ${opt} ${marker}`);
  });
  console.log(`\nExplanation: ${q.explanation}`);
}

console.log('\n' + '═'.repeat(70) + '\n');
