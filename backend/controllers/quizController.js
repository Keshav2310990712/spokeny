import Quiz from '../models/Quiz.js';

export const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
