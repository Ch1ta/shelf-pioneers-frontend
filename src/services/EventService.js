import $api from '../http';

export default class EventService {
  static async setQuizAnswer({ quizId, index, answer }) {
    return $api.patch(`/events/${quizId}`, { index, answer });
  }
}
