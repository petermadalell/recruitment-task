import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDaz8XKQMQVfKveB_SKgBp5apZDwhfYSKA",
  authDomain: "recruitment-task-6abc5.firebaseapp.com",
  databaseURL: "https://recruitment-task-6abc5.firebaseio.com",
  projectId: "recruitment-task-6abc5",
  storageBucket: "recruitment-task-6abc5.appspot.com",
  messagingSenderId: "212518018176",
  appId: "1:212518018176:web:cb55c486b0939380605a65",
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
