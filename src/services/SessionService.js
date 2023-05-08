import $api from '../http';

export default class SessionService {
  static async createSession() {
    return $api.post('/sessions');
  }
  static async addEvent(link, type, id) {
    return $api.patch(`/sessions/${link}`, { type, id });
  }
}
