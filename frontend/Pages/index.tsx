import * as React from 'react';
import { useSelector } from 'react-redux';
import { setTitle } from '../store/actions';
import wrapper from '../store/configureStore';


export const getStaticProps = wrapper.getStaticProps(store => () => {
  store.dispatch(setTitle('Timothy'))
  const { title } = store.getState()
  return {
    props: { test: title }, // will be passed to the page component as props
  }
});


const Index = ({ test, }) => {
  const state = useSelector<string, string>(state => state);
  console.log(state)

  return (
    <div>
      <h2>index page !!{test}</h2>
    </div>
  );
};

export default Index;