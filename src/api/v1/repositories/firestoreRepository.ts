import { db } from '../../../config/firebaseConfig';

// create
export const createDocument = async <T>(
    collectionName: string,
    data: T
): Promise<T & { id: string }> =>{
    try {
        const docRef = await db.collection(collectionName).add({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const doc = await docRef.get();

        return {
            id: doc.id,
            ...doc.data()
        } as T & {id: string};
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'Unknown error';
        throw new Error(`Failed to create document: ${errorMessage}`);
    }

};
// get all docs
export const getAllDocuments = async <T>(
    collectionName: string
): Promise<(T & { id: string })[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as (T & { id: string })[];
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to get documents: ${errorMessage}`);
    }
};

// get by id
export const getDocumentById = async <T>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> => {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return { 
      id: doc.id, 
      ...doc.data() 
    } as T & { id: string };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to get document: ${errorMessage}`);
  }
};

// delete
export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).delete();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to delete document: ${errorMessage}`);
  }
};