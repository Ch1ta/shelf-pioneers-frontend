import $api from '../http';

export default class PollService {
  static async getAll() {
    return $api.get('/polls');
  }
  static async createPoll(body) {
    return $api.post('/polls', body);
  }
  static async updatePoll(id, updatedPoll) {
    return $api.patch(`/polls/${id}`, updatedPoll);
  }

  static async deletePoll(pollId) {
    return $api.delete(`/polls/${pollId}`);
  }
}
