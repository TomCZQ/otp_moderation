import "./Style/loader.css";
import logo from '../../assets/logo_mode_otp.png';


export default function Loader(){
    return (
        <div className= "loader">
          <img src= {logo} className= "rotating"/>
        </div>
      );
}