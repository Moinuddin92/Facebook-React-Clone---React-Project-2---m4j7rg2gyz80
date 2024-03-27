import ErrorInputBox from './ErrorInputBox';
import './ErrorPage.css'

const Error = () => {
    return (
        <section className="error-comp-wrapper">
            <div className="error">
                <div className="container">
                    <ErrorInputBox />
                </div>
            </div>
        </section>
    )
}

export default Error;