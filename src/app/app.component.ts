import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {
  isSticky = false; showBackToTop = false; activeFaqIndex: number | null = null;
  services=[{icon:'fas fa-project-diagram',title:'Odoo & ERP',desc:'Déploiement modules Ventes, Stocks, Comptabilité et CRM.'},{icon:'fas fa-server',title:'Admin. Systèmes',desc:'Installation et sécurisation serveurs Windows et Linux.'},{icon:'fas fa-print',title:'Imprimerie Numérique',desc:'Impression grand format Bâche, Vinyle, One-Way.'},{icon:'fas fa-code',title:'Développement Web',desc:'Sites vitrines et applications métiers sur mesure.'},{icon:'fas fa-shield-alt',title:'Sécurité & Réseaux',desc:'VPN, pare-feu et optimisation réseau.'},{icon:'fas fa-graduation-cap',title:'Formation & Coaching',desc:'Transfert compétences IT et design.'}];
  techStack=['Odoo ERP','Linux & Windows Server','Windev / Webdev','Imprimerie Numérique','Virtualisation','Graphisme (Adobe)','IA','Cloud'];
  faqs=[{q:'Pourquoi choisir Odoo ?',a:'Odoo est un ERP tout-en-un.'},{q:'Délais impression ?',a:'24h à 72h.'},{q:'Solutions IA ?',a:'OCR, chatbots.'},{q:'Support technique ?',a:'WhatsApp, accès à distance.'},{q:'Formation ?',a:'Odoo, cybersécurité.'}];
  packCategories=[{icon:'fas fa-tools',title:'Maintenance & Dépannage',packs:[{name:'Pack Dépannage Rapid',price:5000,features:['Diagnostic','Solution simple']},{name:'Pack Nettoyage PC',price:7500,features:['Nettoyage','Dépoussiérage']},{name:'Pack Suppression Virus',price:12000,features:['Scan','Suppression']}]},{icon:'fas fa-project-diagram',title:'Odoo & ERP',packs:[{name:'Pack Odoo Start',price:150000,features:['Installation','2 modules']},{name:'Pack Odoo Business',price:450000,features:['Audit','5 modules'],featured:true,featuredLabel:'POPULAIRE'},{name:'Pack Odoo Enterprise',price:0,features:['Sur mesure','API']}]},{icon:'fas fa-print',title:'Imprimerie',packs:[{name:'Pack Identité Visuelle',price:75000,features:['Logo','Cartes']},{name:'Pack Signalétique',price:120000,features:['2 Bâches','Stickers']}]}];
  
  showOrderModal=false;orderStep=1;selectedPack:any=null;order:any={clientName:'',clientPhone:'',clientEmail:'',quantity:1};orderSuccess=false;
  reviews:any[]=[];showReviewModal=false;review={name:'',rating:5,comment:''};reviewSubmitted=false;
  showBookingModal=false;booking:any={};bookingSuccess=false;
  searchQuery='';showResults=false;darkMode=false;
  showProjectModal=false;selectedProject:any=null;
  portfolioProjects=[{title:'Déploiement Odoo',category:'Odoo',image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',description:'Odoo 17 pour supermarchés.',location:'Abidjan',results:['+30%']}];
  portfolioFilter='Tous';portfolioCategories=['Tous','Odoo'];
  showBlogPost:any=null;blogPosts=[{title:'Pourquoi Odoo ?',date:'15 Mai 2026',image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',excerpt:'Découvrez Odoo...',category:'ERP'}];
  
  // Chatbot
  chatOpen = false;
  chatMessages: {id:number,from:string,text:string}[] = [];

  @HostListener('window:scroll') onScroll(){this.isSticky=window.scrollY>30;this.showBackToTop=window.scrollY>300}
  ngOnInit(){this.darkMode=localStorage.getItem('manawa_darkmode')==='true'}
  ngAfterViewInit(){if(typeof ScrollReveal!=='undefined'){ScrollReveal({origin:'bottom',distance:'40px',duration:1200}).reveal('.hero-content',{origin:'left',delay:200}).reveal('.founder-card',{delay:300}).reveal('.card',{interval:100})}}
  
  toggleFaq(i:number){this.activeFaqIndex=this.activeFaqIndex===i?null:i}
  scrollToTop(){window.scrollTo({top:0,behavior:'smooth'})}
  filterPortfolio(cat:string){this.portfolioFilter=cat}
  openProject(p:any){this.selectedProject=p;this.showProjectModal=true}
  closeProject(){this.showProjectModal=false}
  openBlog(p:any){this.showBlogPost=p}
  closeBlog(){this.showBlogPost=null}
  
  openOrder(pack:any){this.selectedPack=pack;this.order={clientName:'',clientPhone:'',clientEmail:'',quantity:1};this.orderStep=1;this.orderSuccess=false;this.showOrderModal=true}
  closeOrder(){this.showOrderModal=false}
  nextOrderStep(){if(this.orderStep<3)this.orderStep++}
  prevOrderStep(){if(this.orderStep>1)this.orderStep--}
  getTotalPrice(){return this.selectedPack?.price?this.selectedPack.price*this.order.quantity:0}
  
  submitOrder(){
    const orders=JSON.parse(localStorage.getItem('manawa_orders')||'[]');
    orders.unshift({
      ...this.order,id:Date.now(),orderNumber:'CMD-'+Date.now().toString().slice(-6),
      packName:this.selectedPack.name,packPrice:this.getTotalPrice().toLocaleString()+' CFA',
      date:new Date().toLocaleDateString('fr-FR'),heure:new Date().toLocaleTimeString('fr-FR'),status:'Nouveau'
    });
    localStorage.setItem('manawa_orders',JSON.stringify(orders));
    this.orderSuccess=true;this.orderStep=3;
  }

  openReview(){this.showReviewModal=true;this.reviewSubmitted=false}
  closeReview(){this.showReviewModal=false}
  submitReview(){
    const reviews=JSON.parse(localStorage.getItem('manawa_reviews')||'[]');
    reviews.unshift({...this.review,id:Date.now(),date:new Date().toLocaleDateString('fr-FR')});
    localStorage.setItem('manawa_reviews',JSON.stringify(reviews));
    this.reviews=reviews;this.reviewSubmitted=true;
  }

  openBooking(){this.showBookingModal=true;this.bookingSuccess=false}
  closeBooking(){this.showBookingModal=false}
  submitBooking(){
    const bookings=JSON.parse(localStorage.getItem('manawa_bookings')||'[]');
    bookings.unshift({...this.booking,id:Date.now()});
    localStorage.setItem('manawa_bookings',JSON.stringify(bookings));
    this.bookingSuccess=true;
  }

  onSearch(){this.showResults=this.searchQuery.length>0}
  get filteredPacks(){if(!this.searchQuery)return[];const q=this.searchQuery.toLowerCase();let r:any[]=[];this.packCategories.forEach(c=>{c.packs.forEach((p:any)=>{if(p.name.toLowerCase().includes(q))r.push({...p,category:c.title})})});return r}
  toggleDarkMode(){this.darkMode=!this.darkMode;localStorage.setItem('manawa_darkmode',String(this.darkMode));document.body.classList.toggle('dark',this.darkMode)}

  askChatbot(question: string) {
    this.chatMessages.push({id:Date.now(),from:'user',text:question});
    let r='';
    if(question.includes('Prix'))r='Nos packs commencent à 2 000 CFA jusqu\'à 450 000 CFA. 💰';
    else if(question.includes('Délai'))r='Délais de 24h à 72h. Service express dispo ! ⚡';
    else if(question.includes('Où'))r='San-Pedro et Abidjan, Côte d\'Ivoire. 🇨🇮';
    else if(question.includes('Contact'))r='WhatsApp: +225 07 97 96 94 75 📞';
    else r='Je peux vous renseigner sur prix, délais, localisation. 😊';
    this.chatMessages.push({id:Date.now(),from:'bot',text:r});
  }
}
