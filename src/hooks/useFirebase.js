import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as firebaseService from '../services/firebaseService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export const useFinancialData = (userId) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      setLoading(true);
      const result = await firebaseService.getAllFinancialData(userId);
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadData();
  }, [userId]);

  const saveData = async (dataType, newData) => {
    const result = await firebaseService.saveFinancialData(userId, dataType, newData);
    if (result.success) {
      setData(prev => ({ ...prev, [dataType]: newData }));
    }
    return result;
  };

  return { data, loading, error, saveData };
};

export const useCreditScore = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      setLoading(true);
      const result = await firebaseService.getCreditScoreData(userId);
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadData();
  }, [userId]);

  const saveData = async (newData) => {
    const result = await firebaseService.saveCreditScoreData(userId, newData);
    if (result.success) {
      setData(newData);
    }
    return result;
  };

  return { data, loading, error, saveData };
};

export const useTaxData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      setLoading(true);
      const result = await firebaseService.getTaxData(userId);
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadData();
  }, [userId]);

  const saveData = async (newData) => {
    const result = await firebaseService.saveTaxData(userId, newData);
    if (result.success) {
      setData(newData);
    }
    return result;
  };

  return { data, loading, error, saveData };
};

export const useReports = (userId) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadReports = async () => {
      setLoading(true);
      const result = await firebaseService.getReports(userId);
      
      if (result.success) {
        setReports(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadReports();
  }, [userId]);

  const saveReport = async (reportData) => {
    const result = await firebaseService.saveReport(userId, reportData);
    if (result.success) {
      setReports(prev => [{ id: result.id, ...reportData }, ...prev]);
    }
    return result;
  };

  return { reports, loading, error, saveReport };
};

export const useAIInsights = (userId) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadInsights = async () => {
      setLoading(true);
      const result = await firebaseService.getAIInsights(userId);
      
      if (result.success) {
        setInsights(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadInsights();
  }, [userId]);

  const saveInsights = async (newInsights) => {
    const result = await firebaseService.saveAIInsights(userId, newInsights);
    if (result.success) {
      setInsights(newInsights);
    }
    return result;
  };

  return { insights, loading, error, saveInsights };
};
