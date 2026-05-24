export class AnalyticsService {
  static trackVisit() {
    const visits = JSON.parse(localStorage.getItem('manawa_visits') || '{"total":0,"today":"","count":0,"history":[]}');
    const today = new Date().toLocaleDateString('fr-FR');
    
    visits.total++;
    if (visits.today !== today) { visits.today = today; visits.count = 1; }
    else { visits.count++; }
    
    visits.history.push({ date: today, time: new Date().toLocaleTimeString('fr-FR') });
    if (visits.history.length > 1000) visits.history = visits.history.slice(-500);
    
    localStorage.setItem('manawa_visits', JSON.stringify(visits));
  }
}
