const admin = require('firebase-admin');

const serviceAccount = {
  projectId: "manawatechs",
  privateKey: "VOTRE_CLE_PRIVEE",
  clientEmail: "VOTRE_CLIENT_EMAIL"
};

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const packs = [
  {name:'Pack Dépannage Rapid',price:'5 000 CFA',category:'Maintenance & Dépannage'},
  {name:'Pack Nettoyage PC',price:'7 500 CFA',category:'Maintenance & Dépannage'},
  {name:'Pack Suppression Virus',price:'12 000 CFA',category:'Maintenance & Dépannage'},
  {name:'Pack Odoo Start',price:'150 000 CFA',category:'Odoo & ERP'},
  {name:'Pack Odoo Business',price:'450 000 CFA',category:'Odoo & ERP',featured:true},
  {name:'Pack Odoo Enterprise',price:'Sur Devis',category:'Odoo & ERP'},
  {name:'Pack Identité Visuelle',price:'75 000 CFA',category:'Imprimerie'},
  {name:'Pack Signalétique',price:'120 000 CFA',category:'Imprimerie'}
];

async function importData() {
  for (const pack of packs) {
    await db.collection('packs').add({...pack, createdAt: admin.firestore.FieldValue.serverTimestamp()});
    console.log('✅', pack.name);
  }
  
  const formations = [
    {name:'Formation Odoo Complète',price:'80 000 CFA/pers',duration:'8h'},
    {name:'Initiation Informatique',price:'45 000 CFA/pers',duration:'4h'},
    {name:'Suite Microsoft Office',price:'65 000 CFA/pers',duration:'6h'}
  ];
  for (const f of formations) {
    await db.collection('formations').add({...f, createdAt: admin.firestore.FieldValue.serverTimestamp()});
    console.log('✅', f.name);
  }
  
  console.log('🎉 Import terminé !');
  process.exit(0);
}

importData();
