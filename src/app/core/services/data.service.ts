import { Injectable } from '@angular/core';
import { Service, Pack, FAQ, Founder } from '../models/manawa.models';

@Injectable({ providedIn: 'root' })
export class DataService {
  getFounder(): Founder {
    return {
      name: 'Nathanael Kouassi', title: 'Expert IT & Fondateur',
      description: 'Licence en Informatique, spécialisé dans l\'assistance technique réelle.',
      skills: ['Odoo ERP','Linux & Windows Server','Windev / Webdev','Imprimerie Numérique','Virtualisation','Graphisme (Adobe)','Intelligence Artificielle','Infrastructure Cloud']
    };
  }
  getServices(): Service[] {
    return [
      { id:1, title:'Odoo & ERP', description:'Déploiement de modules Ventes, Stocks, Comptabilité et CRM.', icon:'fa-project-diagram', category:'erp' },
      { id:2, title:'Admin. Systèmes', description:'Installation et sécurisation de serveurs Windows et Linux.', icon:'fa-server', category:'admin' },
      { id:3, title:'Imprimerie Numérique', description:'Impression grand format Bâche, Vinyle, One-Way.', icon:'fa-print', category:'print' },
      { id:4, title:'Développement Web', description:'Sites vitrines et applications métiers sur mesure.', icon:'fa-code', category:'web' },
      { id:5, title:'Sécurité & Réseaux', description:'VPN, pare-feu et optimisation connectivité.', icon:'fa-shield-alt', category:'security' },
      { id:6, title:'Formation & Coaching', description:'Transfert de compétences sur Odoo et outils digitaux.', icon:'fa-graduation-cap', category:'training' }
    ];
  }
  getPacks(): Pack[] {
    return [
      { id:1, name:'Pack Dépannage Rapid', price:5000, currency:'CFA', features:['Diagnostic à distance','Solution simple','Assistance 30min'], category:'maintenance', categoryName:'🔧 Maintenance & Dépannage' },
      { id:2, name:'Pack Nettoyage PC', price:7500, currency:'CFA', features:['Nettoyage physique','Dépoussiérage interne','Nettoyage logiciel'], category:'maintenance', categoryName:'🔧 Maintenance & Dépannage' },
      { id:3, name:'Pack Suppression Virus', price:12000, currency:'CFA', features:['Scan antivirus','Suppression malwares','Installation antivirus'], category:'maintenance', categoryName:'🔧 Maintenance & Dépannage' },
      { id:10, name:'Pack Installation Office', price:7000, currency:'CFA', features:['Word/Excel/PowerPoint','Activation','Configuration email'], category:'bureautique', categoryName:'💻 Logiciels & Bureautique' },
      { id:20, name:'Pack Rédaction CV', price:5000, currency:'CFA', features:['Modèle CV moderne','Mise en page Word','Export PDF'], category:'etudiants', categoryName:'🎓 Étudiants & Particuliers' },
      { id:30, name:'Pack Odoo Start', price:150000, currency:'CFA', features:['Installation Odoo','2 modules','Formation 2h','Support 1 mois'], category:'odoo', categoryName:'🔄 Solutions Odoo & ERP', popular:true },
      { id:31, name:'Pack Odoo Business', price:450000, currency:'CFA', features:['Audit complet','5 modules','Hébergement 6 mois','Formation 8h'], category:'odoo', categoryName:'🔄 Solutions Odoo & ERP' },
      { id:40, name:'Pack IA Découverte', price:75000, currency:'CFA', features:['Audit potentiel IA','Solutions IA','Workshop 2h'], category:'ia', categoryName:'🤖 Intelligence Artificielle' },
      { id:50, name:'Pack Site Vitrine', price:250000, currency:'CFA', features:['Site 5 pages','Design responsive','Hébergement 1 an','Nom de domaine .ci'], category:'web', categoryName:'🌐 Web & Infrastructure' },
      { id:60, name:'Pack Formation Odoo', price:80000, currency:'FCFA/pers', features:['Formation 8h','Support','Supports pédagogiques'], category:'formation', categoryName:'📚 Formation' }
    ];
  }
  getFAQ(): FAQ[] {
    return [
      { question:"Pourquoi choisir Odoo ?", answer:"Odoo est un ERP tout-en-un qui centralise ventes, stocks et comptabilité sur une seule plateforme." },
      { question:"Quels sont vos délais d'impression ?", answer:"24h à 72h selon la complexité. Service express disponible." },
      { question:"Proposez-vous des solutions IA ?", answer:"Oui : OCR, Chatbots, analyse prédictive adaptés aux entreprises locales." },
      { question:"Comment fonctionne le support ?", answer:"Support WhatsApp, accès à distance ou intervention sur site avec garantie." },
      { question:"Formez-vous les équipes ?", answer:"Oui, formations pratiques sur Odoo, cybersécurité et outils collaboratifs." }
    ];
  }
}
