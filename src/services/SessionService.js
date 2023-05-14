import $api from '../http';

export default class SessionService {
  static async createSession() {
    return $api.post('/sessions');
  }

  static async setCurrentEvent(link, type, id) {
    return $api.patch(`/sessions/${link}/current-event`, {
      type,
      id,
    });
  }

  static async getCurrentEvent(link) {
    return $api.get(`/sessions/${link}/current-event`);
  }
  static async getEventStats(eventId) {
    return $api.get(`/events/${eventId}/stats`);
  }
  static async getOpenSessions() {
    return $api.get('/sessions?isOpen=true');
  }
  static async getSession(link) {
    return $api.get(`/sessions/${link}`);
  }

  static async closeCurrentEvent(link) {
    return $api.delete(`/sessions/${link}/current-event`);
  }
  //user
  static async getCurrentEventData(link) {
    return $api.get(`/sessions/${link}/current-event-data`);
  }

  static async closeSession(link) {
    return $api.patch(`/sessions/${link}/close`);
  }
}
