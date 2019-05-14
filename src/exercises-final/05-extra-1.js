// Fetch data to set status

import React from 'react'
import {Switch} from '../switch'
import mockApi from '../mockApi';

const noop = () => {}

function useToggle({onToggle = noop}) {
  const [on, setOn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    mockApi()
      .then((data) => {
        setOn(data);
        setLoading(false);
      });
  }, [loading]);

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return {
    loading,
    toggle: [on, toggle],
  };
}

function Toggle({onToggle}) {
  const { loading, toggle: [on, setOn] } = useToggle(onToggle);
  return !loading && <Switch on={on} onClick={setOn} />
}

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Set initial state after fetching API data'

export default Usage
