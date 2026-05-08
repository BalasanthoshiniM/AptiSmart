const gen = require('./utils/advancedQuestionGenerator_V2_COMPLETE');

console.log('📊 Available Topics:');
console.log(gen.getAvailableTopics());

console.log('\n✅ Generating Sample Questions:\n');

// Test each implemented topic
const topics = [
  'Profit & Loss',
  'Percentages',
  'Time & Work',
  'Time & Distance'
];

topics.forEach(topic => {
  console.log(`\n🎯 ${topic.toUpperCase()}`);
  const q = gen.generateAdvancedQuestion(topic);
  if (q) {
    console.log(`   Concept: ${q.concept}`);
    console.log(`   Difficulty: ${q.difficulty} (${['Easy', 'Medium', 'Hard'][q.difficulty-1]})`);
    console.log(`   Answer: ${q.answer}`);
    console.log(`   Options: ${q.options.join(' | ')}`);
    console.log(`   ✓ Generated successfully`);
  } else {
    console.log(`   ✗ No templates available`);
  }
});

console.log('\n📈 Batch Generation (10 P&L questions):');
const batch = gen.generateAdvancedQuestions(10, 'Profit & Loss');
console.log(`   Generated: ${batch.length} questions`);
console.log(`   Sample: "${batch[0].text.substring(0, 60)}..."`);
