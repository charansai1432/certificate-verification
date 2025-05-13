import toast from 'react-hot-toast';
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
const API_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const handleApiError = (error: unknown): string => {
  console.error('API Error:', error);
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

export const apiRequest = async <T>(
  endpoint: string,
  method: string = 'GET',
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Request failed');
    }

    return { data: responseData };
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return { error: errorMessage };
  }
};

export const addIntern = async (internData: any) => {
  return apiRequest('/intern/add', 'POST', internData);
};

export const addEmployee = async (employeeData: any) => {
  return apiRequest('/employee/add', 'POST', employeeData);
};

export const getStats = async () => {
  return apiRequest('/admin/stats');
};