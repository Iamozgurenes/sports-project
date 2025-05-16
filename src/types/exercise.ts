export interface Exercise {
    id: string;
    name: string;
    target: string;
    equipment: string;
    gifUrl: string;
    bodyPart: string;
  }


 export interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_KEY: string;
    readonly VITE_API_HOST: string;
  }
  
  export interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  