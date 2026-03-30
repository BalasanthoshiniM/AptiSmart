/**
 * DEMO: Advanced Aptitude Question Generator
 * Run this to see example questions from all 7 topics
 */

const { generateAdvancedQuestion, generateAdvancedQuestions, getAvailableTopics } = require('./advancedQuestionGenerator');

console.log('═══════════════════════════════════════════════════════════════');
console.log('        APTISMART - ADVANCED QUESTION GENERATOR DEMO');
console.log('═══════════════════════════════════════════════════════════════\n');

// Show available topics
const topics = getAvailableTopics();
console.log('📚 AVAILABLE TOPICS:');
topics.forEach(t => {
  console.log(`   ✓ ${t.name} (${t.templates} templates)`);
});
console.log('\n');

// Generate one sample question from EACH topic
console.log('─'.repeat(65));
console.log('SAMPLE QUESTIONS - ONE FROM EACH TOPIC');
console.log('─'.repeat(65) + '\n');

topics.forEach((topic, idx) => {
  const q = generateAdvancedQuestion(topic.name);
  console.log(`\n${idx + 1}. ${topic.name.toUpperCase()} [${q.difficultyLabel}]`);
  console.log(`   Concept: ${q.concept}`);
  console.log(`\n   Question: ${q.text}`);
  console.log(`\n   Options: ${q.options.join(' | ')}`);
  console.log(`\n   Explanation: ${q.explanation}`);
  console.log(`\n   Steps:`);
  q.steps.forEach((step, i) => console.log(`      ${i + 1}. ${step}`));
  console.log('\n' + '─'.repeat(65));
});

// Generate 5 random questions with varying difficulty
console.log('\n\n');
console.log('═══════════════════════════════════════════════════════════════');
console.log('        GENERATING 5 RANDOM QUESTIONS (ALL DIFFICULTIES)');
console.log('═══════════════════════════════════════════════════════════════\n');

for (let i = 0; i < 5; i++) {
  const q = generateAdvancedQuestion(); // Random topic and difficulty
  console.log(`${i + 1}. [${q.topic}] [${q.difficultyLabel}]`);
  console.log(`   Q: ${q.text.substring(0, 100)}...`);
  console.log(`   Answer: ${q.correctAnswer}`);
  console.log(`   Concept: ${q.concept}\n`);
}

// Generate full quiz (10 questions from one topic)
console.log('═══════════════════════════════════════════════════════════════');
console.log('        10-QUESTION QUIZ: Profit & Loss (All Difficulties)');
console.log('═══════════════════════════════════════════════════════════════\n');

const quiz = generateAdvancedQuestions(10, 'Profit & Loss');
quiz.forEach((q, idx) => {
  console.log(`${idx + 1}. [${q.difficultyLabel}] ${q.concept}`);
  console.log(`   ${q.text.substring(0, 90)}...`);
  console.log(`   Answer: ${q.correctAnswer}\n`);
});

console.log('\n✅ Demo complete! The generator is working perfectly.\n');
