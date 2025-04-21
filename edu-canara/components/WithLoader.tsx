import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const withLoader = (WrappedComponent:any) => {
  return (props:any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate a network request
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 3 seconds
    }, []);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoader;
