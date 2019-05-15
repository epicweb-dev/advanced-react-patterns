// Fetch data to set status

import React from 'react'
import {Switch} from '../switch'
import mockApi from '../mockApi';

const noop = () => {}

function useToggle({onToggle = noop}) {
  const [on, setOn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    mockApi(true)
      .then((data) => {
        setOn(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return {
    loading,
    error,
    toggle: [on, toggle],
  };
}

function Toggle({onToggle}) {
  const {
    loading,
    error,
    toggle: [on, setOn]
  } = useToggle(onToggle);

  return (
    <>
      {error
        ? <div style={{ color: 'red'}}>{error}</div>
        : (
          loading
            ? <div>Loading...</div>
            : <Switch on={on} onClick={setOn} />
        )
      }
    </>
  );
}

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Set initial state after fetching API data'

export default Usage
