import React, { createContext, useState, useEffect } from 'react';
import {
  doc,
  where,
  query,
  getDocs,
  arrayUnion,
  collection,
  writeBatch,
  getFirestore,
  getDoc,
} from 'firebase/firestore';

export const ListAndCostsContext = createContext({});

//Pending on snapshot for costs, for when submitting a new one update store.

export const ListAndCostsProvider = ({ children }) => {
  const [activeList, setActiveList] = useState(undefined);
  const [activeListID, setActiveListID] = useState(undefined);
  const [activeListCosts, setActiveListCosts] = useState(undefined);

  const [lists, setLists] = useState()
  const [db] = useState(getFirestore());

  useEffect(async () => {
    requestAndStoreActiveList();
  }, [db]);

  const requestAndStoreActiveList = async () => {
    const q = query(collection(db, "lists"), where("active", "==", true));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const list = doc.data();
      setActiveList(list);
      setActiveListID(list.id);
    });
  }

  const batchForNewListAndCosts = async () => {
    const batch = writeBatch(db);
    const listsRef = doc(collection(db, 'lists'));
    const listOfCostsId = listsRef.id;

    batch.set(listsRef, {
      active : true,
      createdAt : Date.now(),
      id: listOfCostsId,
    });

    const costsRef = doc(db, 'costs', listOfCostsId);
    batch.set(costsRef, {});

    await batch.commit();
    setActiveListID(listOfCostsId);
  }

  const createNewListAndAssignID = () => {
    try {
      batchForNewListAndCosts();
    } catch (error) {
      console.log('Something FAILED', error);
    }
  }

  const batchCostAddition = async (cost) => {
    const batch = writeBatch(db);

    const activeListRef = doc(db, 'lists', activeListID);
    batch.update(activeListRef, { lastCost: cost });

    const costRef = doc(db, 'costs', activeListID);
    const newCost = {};
    newCost[cost.owner] = arrayUnion(cost);
    batch.update(costRef, newCost);

    await batch.commit();
  }

  const requestCosts = async () => {
    const costsRef = doc(db, 'costs', activeListID);
    const costsSnap = await getDoc(costsRef);

    if (costsSnap.exists()) setActiveListCosts(costsSnap.data());
  }

  const postCost = async (cost) => {
    try {
      batchCostAddition(cost);
    } catch (error) {
      console.log('Something FAILED', error);
    }
  }

  return (
    <ListAndCostsContext.Provider
      value={{
        postCost,
        activeList,
        createNewListAndAssignID,
        requestCosts,
        activeListCosts
      }}
    >
      {children}
    </ListAndCostsContext.Provider>
  )
};
