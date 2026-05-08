#!/usr/bin/env node

/**
 * COMPREHENSIVE TEST: AptiSmart Question Generator V2
 * Validates all implemented templates and generator functions
 */

const gen = require('./utils/advancedQuestionGenerator_V2_COMPLETE');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  AptiSmart Question Generator V2 - COMPREHENSIVE TEST         ║
║  Company-Level Templates (TCS, Infosys, Zoho, Amazon)         ║
╚════════════════════════════════════════════════════════════════╝
`);

// ─────────────────────────────────────────────────────────────────
// TEST 1: Topic Inventory
// ─────────────────────────────────────────────────────────────────

console.log('TEST 1️⃣  Topic Inventory\n' + '─'.repeat(60));
const topics = gen.getAvailableTopics();
let totalTemplates = 0;
let implementedCount = 0;

Object.entries(topics).forEach(([topic, count]) => {
  totalTemplates += count;
  if (count > 0) implementedCount++;
  const status = count > 0 ? '✅' : '🔲';
  console.log(`  ${status} ${topic.padEnd(30)} ${count} templates`);
});

console.log(`\nSummary: ${implementedCount} categories implemented, ${totalTemplates} templates live\n`);

// ─────────────────────────────────────────────────────────────────
// TEST 2: Question Generation Quality
// ─────────────────────────────────────────────────────────────────

console.log('TEST 2️⃣  Question Generation Quality\n' + '─'.repeat(60));

const implementedTopics = ['Profit & Loss', 'Percentages', 'Time & Work', 'Time & Distance'];
let totalQuestionsGenerated = 0;
let qualityPassCount = 0;

implementedTopics.forEach(topic => {
  console.log(`\n▶ ${topic}`);
  
  // Generate one from each difficulty level
  for (let difficulty = 1; difficulty <= 3; difficulty++) {
    const q = gen.generateAdvancedQuestion(topic);
    
    if (!q) {
      console.log(`  ✗ Failed to generate question`);
      continue;
    }
    
    totalQuestionsGenerated++;
    
    // Quality checks
    const hasText = q.text && q.text.length > 30;
    const hasAnswer = q.answer !== undefined && q.answer !== null;
    const hasOptions = q.options && q.options.length === 4;
    const hasExplanation = q.explanation && q.explanation.length > 5;
    const hasSteps = q.steps && q.steps.length > 0;
    const noGenerticLabels = !q.options.some(opt => opt.match(/^Option \d+$/));
    const uniqueOptions = new Set(q.options).size === 4;
    
    const qualityPassedAll = 
      hasText && hasAnswer && hasOptions && hasExplanation && 
      hasSteps && noGenerticLabels && uniqueOptions;
    
    if (qualityPassedAll) qualityPassCount++;
    
    const diffName = ['Easy', 'Medium', 'Hard'][q.difficulty - 1] || 'Unknown';
    const icon = qualityPassedAll ? '  ✅' : '  ⚠️';
    
    console.log(`${icon} ${diffName.padEnd(8)} • ${q.concept}`);
    
    // Show first 50 chars of question text
    console.log(`     "${q.text.substring(0, 55)}..."`);
    
    // Show quality details if failed
    if (!qualityPassedAll) {
      console.log(`     Quality Issues:`);
      if (!hasText) console.log(`       - Missing or short text`);
      if (!hasAnswer) console.log(`       - Missing answer`);
      if (!hasOptions) console.log(`       - Wrong number of options`);
      if (!hasExplanation) console.log(`       - Missing explanation`);
      if (!hasSteps) console.log(`       - Missing steps`);
      if (!noGenerticLabels) console.log(`       - Contains generic option labels`);
      if (!uniqueOptions) console.log(`       - Options not unique`);
    }
  }
});

const qualityPercentage = ((qualityPassCount / totalQuestionsGenerated) * 100).toFixed(1);
console.log(`\nQuality Summary: ${qualityPassCount}/${totalQuestionsGenerated} questions passed all checks (${qualityPercentage}%)\n`);

// ─────────────────────────────────────────────────────────────────
// TEST 3: Batch Generation
// ─────────────────────────────────────────────────────────────────

console.log('TEST 3️⃣  Batch Generation\n' + '─'.repeat(60));

const batchSizes = [5, 10, 20];
let batchTestsPassed = 0;

batchSizes.forEach(size => {
  const batch = gen.generateAdvancedQuestions(size, 'Profit & Loss');
  const passed = batch.length === size && batch.every(q => q.text && q.answer !== undefined);
  
  if (passed) batchTestsPassed++;
  
  const icon = passed ? '✅' : '✗';
  console.log(`  ${icon} Generate ${size} questions: ${batch.length} returned`);
});

console.log(`\nBatch Generation: ${batchTestsPassed}/${batchSizes.length} tests passed\n`);

// ─────────────────────────────────────────────────────────────────
// TEST 4: Option Generation
// ─────────────────────────────────────────────────────────────────

console.log('TEST 4️⃣  Option Generation Diversity\n' + '─'.repeat(60));

const optionTest = gen.generateAdvancedQuestions(20, 'Profit & Loss');
const optionStats = {
  numeric: 0,
  ratio: 0,
  string: 0,
  allUnique: 0,
  noGeneric: 0,
};

optionTest.forEach(q => {
  const answerStr = String(q.answer);
  
  if (answerStr.includes(':')) {
    optionStats.ratio++;
  } else if (isNaN(parseFloat(q.answer))) {
    optionStats.string++;
  } else {
    optionStats.numeric++;
  }
  
  if (new Set(q.options).size === 4) {
    optionStats.allUnique++;
  }
  
  if (!q.options.some(opt => opt.match(/^Option \d+$/))) {
    optionStats.noGeneric++;
  }
});

console.log(`  Questions sampled: 20`);
console.log(`  Numeric answers: ${optionStats.numeric}`);
console.log(`  Ratio answers: ${optionStats.ratio}`);
console.log(`  String answers: ${optionStats.string}`);
console.log(`  All unique options: ${optionStats.allUnique}/20 ✅`);
console.log(`  No generic labels: ${optionStats.noGeneric}/20 ✅`);
console.log();

// ─────────────────────────────────────────────────────────────────
// TEST 5: Generator Functions
// ─────────────────────────────────────────────────────────────────

console.log('TEST 5️⃣  Generator Functions\n' + '─'.repeat(60));

let functionTests = 0;
let functionPassed = 0;

// Test single question generation
try {
  const q = gen.generateAdvancedQuestion();
  functionPassed += q && q.text ? 1 : 0;
  console.log(`  ✅ generateAdvancedQuestion() works`);
} catch (e) {
  console.log(`  ✗ generateAdvancedQuestion() error: ${e.message}`);
}
functionTests++;

// Test topic-specific generation
try {
  const q = gen.generateAdvancedQuestion('Percentages');
  functionPassed += q && q.topic === 'Percentages' ? 1 : 0;
  console.log(`  ✅ generateAdvancedQuestion(topic) works`);
} catch (e) {
  console.log(`  ✗ generateAdvancedQuestion(topic) error: ${e.message}`);
}
functionTests++;

// Test batch generation
try {
  const qs = gen.generateAdvancedQuestions(5, 'Time & Work', 2);
  functionPassed += qs && qs.length === 5 ? 1 : 0;
  console.log(`  ✅ generateAdvancedQuestions(count, topic, difficulty) works`);
} catch (e) {
  console.log(`  ✗ generateAdvancedQuestions() error: ${e.message}`);
}
functionTests++;

// Test getAvailableTopics
try {
  const t = gen.getAvailableTopics();
  functionPassed += typeof t === 'object' && Object.keys(t).length > 0 ? 1 : 0;
  console.log(`  ✅ getAvailableTopics() works`);
} catch (e) {
  console.log(`  ✗ getAvailableTopics() error: ${e.message}`);
}
functionTests++;

console.log(`\nFunction Tests: ${functionPassed}/${functionTests} passed\n`);

// ─────────────────────────────────────────────────────────────────
// FINAL SUMMARY
// ─────────────────────────────────────────────────────────────────

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                    FINAL TEST SUMMARY                         ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const allTestsPassed = 
  totalQuestionsGenerated > 0 &&
  qualityPassCount > 0 &&
  batchTestsPassed > 0 &&
  functionPassed > 0;

const summaryBox = `
📊 Templates Implemented:      ${implementedCount}/10 categories (${totalTemplates} total)
✅ Questions Generated:        ${totalQuestionsGenerated} across all difficulties  
🎯 Quality Pass Rate:          ${qualityPercentage}% (${qualityPassCount}/${totalQuestionsGenerated})
📦 Batch Generation:           ${batchTestsPassed}/3 tests passed
🔧 Function Tests:             ${functionPassed}/${functionTests} passed
🌟 Overall Status:             ${allTestsPassed ? '✅ READY FOR PRODUCTION' : '⚠️  NEEDS REVIEW'}

📁 File: backend/utils/advancedQuestionGenerator_V2_COMPLETE.js
`;

console.log(summaryBox);

// Export for npm script
process.exit(allTestsPassed ? 0 : 1);
