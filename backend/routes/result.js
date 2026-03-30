const express = require('express');
const Result  = require('../models/Result');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');
const { performanceLevel } = require('../utils/advancedQuestionGenerator');

const router = express.Router();

// POST /api/result/submit  — submit a completed quiz
router.post('/submit', protect, async (req, res) => {
  try {
    console.log('[Result] Received quiz submission from user:', req.user._id);
    console.log('[Result] Submission data:', JSON.stringify(req.body, null, 2));

    const {
      topic,
      questions,       // array of { questionText, topic, difficulty, options, correctAnswer, userAnswer, isCorrect, explanation }
      timeTaken = 0,
      startLevel = 'Intermediate',
    } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: 'No questions provided.' });
    }

    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q) => q.isCorrect).length;
    const accuracy       = Math.round((correctAnswers / totalQuestions) * 100);
    console.log(`[Result] Accuracy calculated: ${correctAnswers}/${totalQuestions} = ${accuracy}%`);
    console.log('[Result] Details:');
    questions.forEach((q, idx) => {
      console.log(`  Q${idx+1}: userAnswer="${q.userAnswer}" correctAnswer="${q.correctAnswer}" isCorrect=${q.isCorrect}`);
    });
    
    const endLevel       = performanceLevel(accuracy);
    console.log(`[Result] Performance level set to: ${endLevel}`);

    const result = await Result.create({
      userId:         req.user._id,
      topic:          topic || 'Mixed',
      totalQuestions,
      correctAnswers,
      score:          accuracy,
      accuracy,
      timeTaken,
      startLevel,
      endLevel,
      questions:      questions.map((q) => ({
        questionText:  q.questionText || q.text || '',
        topic:         q.topic,
        difficulty:    q.difficulty,
        correctAnswer: String(q.correctAnswer),
        userAnswer:    q.userAnswer !== undefined ? String(q.userAnswer) : null,
        isCorrect:     !!q.isCorrect,
        options:       q.options || [],
        explanation:   q.explanation || '',
      })),
    });

    console.log('[Result] Result saved successfully:', result._id);

    // Update user aggregate stats
    console.log(`[Result] Before update - User ${req.user._id}: attempts=${req.user.totalAttempts}, score=${req.user.totalScore}, questions=${req.user.totalQuestions}`);
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        totalAttempts:  1,
        totalScore:     correctAnswers,
        totalQuestions: totalQuestions,
      },
      $set: { currentLevel: endLevel },
    }, { new: true });
    console.log(`[Result] After update - User ${req.user._id}: attempts=${updatedUser.totalAttempts}, score=${updatedUser.totalScore}, questions=${updatedUser.totalQuestions}`);

    console.log('[Result] User stats updated');

    res.status(201).json({
      success: true,
      message: 'Quiz result saved!',
      result: {
        _id:            result._id,
        topic:          result.topic,
        totalQuestions,
        correctAnswers,
        accuracy,
        score:          accuracy,
        timeTaken,
        startLevel,
        endLevel,
        createdAt:      result.createdAt,
      },
    });
  } catch (err) {
    console.error('❌ Submit result error:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ success: false, message: 'Failed to save result.', error: err.message });
  }
});

// GET /api/result/history  — paginated attempt history for the logged-in user
router.get('/history', protect, async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(20, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [results, total] = await Promise.all([
      Result.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-questions'),   // exclude question detail for list view
      Result.countDocuments({ userId: req.user._id }),
    ]);

    res.json({
      success: true,
      results,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch history.' });
  }
});

// GET /api/result/stats/summary  — user's aggregate performance (MUST come before /:id route)
router.get('/stats/summary', protect, async (req, res) => {
  try {
    const user = req.user;

    console.log(`[Stats] Fetching stats for user ${user._id}`);
    console.log(`[Stats] User data: attempts=${user.totalAttempts}, score=${user.totalScore}, questions=${user.totalQuestions}, level=${user.currentLevel}`);

    const recentResults = await Result.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('topic accuracy endLevel createdAt timeTaken correctAnswers totalQuestions');

    const topicStats = await Result.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id:         '$topic',
          avgAccuracy: { $avg: '$accuracy' },
          attempts:    { $sum: 1 },
        },
      },
    ]);

    const overallAccuracy = user.totalQuestions > 0
      ? Math.round(user.totalScore / user.totalQuestions * 100)
      : 0;

    console.log(`[Stats] Overall accuracy calculated: ${user.totalScore}/${user.totalQuestions} = ${overallAccuracy}%`);

    res.json({
      success: true,
      stats: {
        totalAttempts:   user.totalAttempts,
        totalQuestions:  user.totalQuestions,
        totalCorrect:    user.totalScore,
        overallAccuracy,
        currentLevel:    user.currentLevel,
        recentResults,
        topicStats,
      },
    });
  } catch (err) {
    console.error('[Stats] Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
});

// GET /api/result/:id  — full detail of one attempt
router.get('/:id', protect, async (req, res) => {
  try {
    const result = await Result.findOne({ _id: req.params.id, userId: req.user._id });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found.' });
    }

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch result.' });
  }
});

module.exports = router;