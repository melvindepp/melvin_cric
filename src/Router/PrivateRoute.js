import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);
    const location = useLocation();
    // console.log("private route" , location)


   if(loading){
        return <Loading></Loading>
   }
   if(user){
        return children
   }

    return <Navigate to="/login" state={{from : location}}></Navigate>
};

export default PrivateRoute;