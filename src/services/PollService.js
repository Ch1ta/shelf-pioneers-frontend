import $api from '../http';

export default class PollService {
  static async getAll() {
    return $api.get('/polls');
  }
}
