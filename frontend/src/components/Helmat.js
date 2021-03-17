import React from 'react';
import {Helmet} from "react-helmet";


const Meta = ({title, description, keywords}) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
)


Meta.defaultProps = {
    title : 'Welcome to proShop',
    description: 'High Quality Products in Cheap',
    keywords: 'Heigh Quality, cheap price, imported'
}




export default Meta;