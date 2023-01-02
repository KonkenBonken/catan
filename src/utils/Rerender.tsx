/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from 'react'

let rerender = () => console.warn('Rerender not loaded');

export function Rerenderable({ el }: { el: () => JSX.Element }) {
  const [, setState] = useState(0);

  useEffect(() =>
    rerender = () => setState(x => x + 1)
    , [])
  return el();
}

export default () => rerender();
