import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, push, runTransaction } from 'firebase/database';

export const ListAndCostsContext = createContext({});

export const ListAndCostsProvider = ({ children }) => {
  const [activeList, setActiveList] = useState(undefined);

  useEffect(() => {
    const db =  getDatabase();
    const reference = ref(db, 'lists/');

    onValue(reference, (snapshot) => {
      const activeList = snapshot.val().find((list) => list.active);
      const activeListId = activeList.id;
      setActiveList(activeListId);
    });

  }, []);

  return (
    <ListAndCostsContext.Provider
      value={{
        activeList,
      }}
    >
      {children}
    </ListAndCostsContext.Provider>
  )
};
