import * as React from 'react';
    
const Error = ({ statusCode }) => {
    return (
        <div>
            <h2>에러 발생 시 나오는 페이지</h2>
            <span>{statusCode} 에러</span>
        </div>
    );
};

export const getServerSideProps = async ({ res, req }) => {
    const statusCode = res.statusCode;

    return {
        props: {
            statusCode,
        },
    };
};

export default Error;