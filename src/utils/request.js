import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class ApiApp {
  constructor() {
    this.url = ''
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.storage = firebase.storage().ref()
    this.db = firebase.firestore()
  }

  async setAuthorization() {
    // const token = await this.firebase.auth().currentUser.getIdToken();
    // this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    // this.secretApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async getImage(imageId) {
    try {
      const url = await this.storage.child(imageId).getDownloadURL()
      return url
    } catch (error) {
      return 'Error'
    }
  }

  async uploadAvatar(file) {
    const id = this.auth.currentUser.uid;
    const ref = this.storage.child(`${id}.${file.name.split('.').pop()}`);
    const f = await ref.put(file)
    const url = await this.getImage(f.ref.location.path)
    return url
  }

  async setProfile() {

  }

  async createWallet(address, name) {
    const batch = this.db.batch()
    const id = this.auth.currentUser.uid
    const walletsRef = this.db.collection('users').doc(id).collection('wallets').doc(address)
    try {
      const res = await fetch(`https://blockchain.info/rawaddr/${address}?cors=true`)
      const json = await res.json()
      console.log(json)
      const data = await walletsRef.set({ address, name,  })

        json.txs.map(t => {
          batch.set(walletsRef.collection('transactions').doc(t.hash), {
            block_height: t.block_height,
            time: t.time
          })
        })
      await batch.commit()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async getWallets() {
    try {
      const id = this.auth.currentUser.uid
      const serialized = []
      const docs = await this.db.collection('users')
        .doc(id)
        .collection('wallets')
        .get()
        console.log(docs)
      docs.forEach(doc => serialized.push({ id: doc.id, ...doc.data() }))
      return serialized
    } catch (error) {
      console.log(error)
    }
  }

  async getWallet(walletId) {
    try {
      const id = this.auth.currentUser.uid
      const doc = await this.db.collection('users')
        .doc(id)
        .collection('wallets')
        .doc(walletId)
        .get()
      const transactions = await doc.ref.collection('transactions').get()
      const t = []
      transactions.forEach(tra => t.push({ id: tra.id, ...tra.data() }))
      return { id: doc.id, ...doc.data(), transactions: t }
    } catch (error) {
      console.log(error)
    }
  }

  async getFeed() {
    try {
      const docs = await this.db.collection('feed').get()
      docs.forEach(doc => doc.data().user.get().then(d => console.log(d.data())))
    } catch (error) {
      console.log(error)
    }
  }
}

let ApiInstance = null;

export const Api = () => {
  if (!ApiInstance) {
    ApiInstance = new ApiApp();
  }
  return ApiInstance;
};
