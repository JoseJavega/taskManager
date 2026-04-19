import cors from 'cors';

const ACCEPTED_ORIGINS=[
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {})=> cors({
  origin: (origin, callback)=>{
    if (acceptedOrigins.includes(origin)){
      return callback(null, true);
    }
    // Si la llamada es de nuestro propio sitio NO tendrá origen
    if(!origin){
      return callback(null, true);
    }

    return  callback(new Error('No permitido por CORS'));
  }
});