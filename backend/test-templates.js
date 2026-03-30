const gen = require('./utils/advancedQuestionGenerator');
const topics = gen.getAvailableTopics();
console.log('\n=== AptiSmart Question Generator - Topic Summary ===\n');
topics.forEach(t => {
  console.log(`✓ ${t.name}: ${t.templates} templates`);
});
console.log('\n=== Total Templates ===');
const total = topics.reduce((sum, t) => sum + t.templates, 0);
console.log(`Total: ${total} templates across ${topics.length} topics\n`);
