import './ErrorInputBox.css';
import Header from '../header/Header';
import { useSelector } from 'react-redux';

const ErrorInputBox = () => {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData);
    return (
        <section className="input-box-wrapper-error">
            <div className="input-box">
                <Header userData={userData} changeState={false} />
                <div className="input-wrapper">
                    <div className="input">
                        <img src='https://res.cloudinary.com/practicaldev/image/fetch/s--oEn9BS42--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/http://ahimsa.co.za/wp-content/uploads/2018/11/en-construction.gif' width={150} height={140} />
                        <span>This Feature is not Implemented yet.</span>
                        <span>Thanks!</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorInputBox;