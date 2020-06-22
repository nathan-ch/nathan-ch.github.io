import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Research  } from '../images/research.svg';



const Jumbo = () => {
    
    return(
        <div className="container jumbo">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h1 className="display-4 text-danger"> <FormattedMessage id="home.title" /></h1>
                </div>
                <div className="col-md-6 col-sm-12 ">
                    <Research width="100%" height="auto" />
                </div>
            </div>
        </div>
    );
};

export default Jumbo