import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, push, set, get, remove, query, orderByChild, startAt, endAt, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from "nanoid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const database = getDatabase(app);

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

export async function adminUser(user) {
  return get(ref(database, "admins"))
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
  const id = uuidv4();

  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    image: mainImageUrl,
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
  return get(ref(database, 'products')).then(snapshot => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val())
    }
    return [];
  })
}


export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`))
    .then(snapshot => {
      const items = snapshot.val() || {};
      return Object.values(items);
    })
}


export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`))
}

export async function getBookmark(userId) {
  return get(ref(database, `bookmark/${userId}`))
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
  return set(ref(database, `bookmark/${userId}/${product.id}`), bookmarkData)
}

export async function removeFromBookmark(userId, productId) {
  return remove(ref(database, `bookmark/${userId}/${productId}`))
}

export async function signUp({ email, password, displayName, photoURL }) {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    user.photoURL = photoURL;
    user.displayName = displayName;

    await updateProfilePhoto(auth, user);

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

export async function updateProfilePhoto(auth, user) {
  try {
    const profile = {
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    await updateProfile(auth.currentUser, profile);
    return user;
  } catch (error) {
    console.log("프로필 업데이트 오류:", error)
  }
}

export async function fetchProductsFirebase(search) {
  const productsRef = ref(database, "products");

  if (!search) {
    const response = await get(productsRef);
    const allProducts = [];
    response.forEach((productSnapshot) => {
      const product = productSnapshot.val();
      allProducts.push(product);
    })
    return allProducts;
  }

  const titleQuery = query(productsRef, orderByChild("title"), startAt(search), endAt(search + "\uf8ff"));
  const categoryQuery = query(productsRef, orderByChild("category"), startAt(search), endAt(search + "\uf8ff"));

  const [titleResponse, categoryResponse] = await Promise.all([
    get(titleQuery),
    get(categoryQuery),
  ])

  const titleResults = [];
  titleResponse.forEach((productSnapshot) => {
    const product = productSnapshot.val();
    titleResults.push(product);
  })

  const categoryResults = [];
  categoryResponse.forEach((productSnapshot) => {
    const product = productSnapshot.val();
    categoryResults.push(product);
  })

  const searchResults = [...titleResults, ...categoryResults];

  return searchResults;
}

export function getChatMessages(selectedUser, setChatRooms) {
  let chatRef;

  if (selectedUser) {
    chatRef = ref(database, `chatRooms/${selectedUser}`);
  } else {
    chatRef = ref(database, 'chatRooms');
  }

  const unsubscribe = onValue(chatRef, (snapshot) => {
    const chatData = snapshot.val();
    setChatRooms(chatData);
  });

  return unsubscribe;
}
let nonLoggedInUid;

export async function getNonLoggedInUid() {
  if (!nonLoggedInUid) {
    nonLoggedInUid = nanoid(4)
  }
  return nonLoggedInUid;
}

export async function sendMessage(message, timestamp, uid, customerId, userType) {
  try {
    const messageRef = ref(database, `chatRooms/${customerId}/messages`);
    const newMessageRef = push(messageRef);
    const chatData = {
      message: message,
      timestamp: timestamp,
      uid: uid,
      userType: userType
    }

    await set(newMessageRef, chatData);
    return newMessageRef.key;
  } catch (error) {
    console.error("sendMessage 함수에세 오류 발생:", error);
    return false;
  }
}

export async function startChat(setChatRooms, user) {
  console.log("startChat 호출");
  try {
    const uid = user ? user.displayName : await getNonLoggedInUid();
    const customerId = uid;

    const chatData = {
      room: customerId,
      uid: uid,
      timestamp: Date.now(),
      img: user?.photoURL || ""
    }

    await set(ref(database, `chatRooms/${customerId}`), chatData);

    setChatRooms(chatData);

    console.log("상담 요청");
  } catch (error) {
    console.error(error);
  }
}

export async function endChat(user) {
  console.log("endChat 호출");
  try {
    const uid = user ? user.displayName : await getNonLoggedInUid();
    const customerId = uid;

    const userChatRoomRef = ref(database, `chatRooms/${customerId}`);
    await remove(userChatRoomRef);

    console.log("상담 종료");
  } catch (error) {
    console.error(error);
  }
}
