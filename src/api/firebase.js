import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as firebaseUpdatedProfile,
  deleteUser
} from "firebase/auth";
import { getDatabase, ref as databaseRef, set, get, remove } from "firebase/database";
// import { uploadImage } from "./uploader";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);


export function login() {
  signInWithPopup(auth, provider.setCustomParameters({
    prompt: "select_account",
  })).then((result) => {
    window.location.href = "/react-nike/";
  }).catch(console.error);
}
export function logout() {
  signOut(auth).then((result) => {
    window.location.href = "/react-nike/";
  }).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(databaseRef(database, "admins"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, mainImageUrl) {
  const id = uuid();

  return set(databaseRef(database, `products/${id}`), {
    ...product,
    id,
    image: mainImageUrl, //main image URL
    price: parseInt(product.price),
    size: product.size ? product.size.split(",") : [],
    colors: product.colors.map(color => ({
      colorName: color.colorName,
      hex: color.hex,
      colorFile: color.colorFile || null
    }))
  });
}


export async function getProducts() {
  return get(databaseRef(database, 'products')).then(snapshot => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val())
    }
    return [];
  })
}


export async function getCart(userId) {
  return get(databaseRef(database, `carts/${userId}`))
    .then(snapshot => {
      const items = snapshot.val() || {};
      return Object.values(items);
    })
}


export async function addOrUpdateToCart(userId, product) {
  return set(databaseRef(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(databaseRef(database, `carts/${userId}/${productId}`))
}

export async function getBookmark(userId) {
  return get(databaseRef(database, `bookmark/${userId}`))
    .then(snapshot => {
      const items = snapshot.val() || {};
      return Object.values(items);
    })
}


export async function addOrUpdatedToBookmark(userId, product) {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`
  const bookmarkData = {
    ...product,
    bookmarkedDate: formattedDate
  }
  return set(databaseRef(database, `bookmark/${userId}/${product.id}`), bookmarkData)
}

export async function removeFromBookmark(userId, productId) {
  return remove(databaseRef(database, `bookmark/${userId}/${productId}`))
}

export async function signUp({ email, password, displayName, photoURL }) {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const profile = { displayName, photoURL };

    await updateProfile(user, profile);

    return userCredential;
  } catch (error) {
    return null;
  }
};


export async function deleteJoinUser() {
  const isSecession = window.confirm("정말로 탈퇴하시겠습니까?");
  if (!isSecession) return;

  try {
    const user = auth.currentUser;
    await deleteUser(user);
    alert('성공적으로 탈퇴되었습니다.');
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      alert("장기간의 로그인으로 회원탈퇴가 되지 않았습니다. 재로그인 후 회원탈퇴 해주세요.")
    } else {
      alert("회원탈퇴가 실패했습니다.")
    }
  }
}


export async function loginWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "/react-nike/";

  } catch (error) {
    console.log("로그인 실패: ", error);
  }
}

export async function updateProfile(photoURL) {
  try {
    await firebaseUpdatedProfile(auth.currentUser, photoURL);
  } catch (error) {
    console.log("프로필 업데이트 오류:", error)
  }
}