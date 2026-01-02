// Data structure: { id, date, timeTaken, kicks: 10 }
export const storage = {
  async getSessions() {
    try {
      const data = localStorage.getItem('fetal_sessions');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async saveSession(session) {
    try {
      const sessions = await this.getSessions();
      const updated = [session, ...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem('fetal_sessions', JSON.stringify(updated));
    } catch (e) {
      console.error('Save failed:', e);
    }
  }
};
