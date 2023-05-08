import $api from '../http';

export default class QuizService {
  static async getAll() {
    return $api.get('/quiz');
  }
  static async updateQuiz(quizId, updatedQuiz) {
    return $api.patch(`/quiz/${quizId}`, updatedQuiz);
  }

  static async deleteQuiz(quizId) {
    return $api.delete(`/quiz/${quizId}`);
  }
  static async createQuiz(body) {
    return $api.post(`/quiz`, body);
  }
}
