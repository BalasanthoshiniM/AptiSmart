const mongoose = require('mongoose');

const questionResultSchema = new mongoose.Schema(
  {
    questionText:   { type: String, required: true },
    topic:          { type: String, required: true },
    difficulty:     { type: Number, required: true },   // 1=Easy 2=Medium 3=Hard
    correctAnswer:  { type: String, required: true },
    userAnswer:     { type: String, default: null },
    isCorrect:      { type: Boolean, default: false },
    options:        [{ type: String }],
    explanation:    { type: String },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    topic:          { 
      type: String, 
      required: true, 
      enum: [
        'Profit & Loss', 
        'Percentages', 
        'Time & Work', 
        'Time & Distance', 
        'Ratio & Proportion', 
        'Simple & Compound Interest', 
        'Averages', 
        'Mixed'
      ] 
    },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, default: 0 },
    score:          { type: Number, default: 0 },          // percentage score
    accuracy:       { type: Number, default: 0 },
    timeTaken:      { type: Number, default: 0 },          // seconds
    startLevel:     { type: String, default: 'Intermediate' },
    endLevel:       { type: String, default: 'Intermediate' },
    questions:      [questionResultSchema],
  },
  { timestamps: true }
);

// Compute performance level
resultSchema.methods.getPerformanceLevel = function () {
  if (this.accuracy >= 80) return 'Advanced';
  if (this.accuracy >= 50) return 'Intermediate';
  return 'Beginner';
};

module.exports = mongoose.model('Result', resultSchema);