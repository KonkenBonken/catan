/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from "react"
import { DiceWithAnimation } from "cyber-dice";
import random from 'random'

import { cls } from './utils/utilities'

let Roll = (instant: boolean) => new Promise<number>(() => 0);

export function Dice() {
  const [elems, setElems] = useState<JSX.Element[]>([]),
    [Rolled, setRolled] = useState(false);

  useEffect(() => {
    Roll = (instant = false) => {
      setRolled(false);
      setElems([]);

      const nums = [random.int(1, 6), random.int(1, 6)];

      return new Promise<number>(resolve => {
        setTimeout(() => setElems([
          <DiceWithAnimation randomNumber={nums[0]} isAnimation animationEndHandler={() => 0} />,
          <DiceWithAnimation randomNumber={nums[1]} isAnimation animationEndHandler={() => {
            setRolled(true);
            resolve(nums[0] + nums[1]);
          }} />
        ]));
        if (instant)
          resolve(nums[0] + nums[1]);
      })
    }
  }, []);

  return <div className={cls({ DiceWrapper: !!elems.length, Rolled })}>
    {elems}
  </div>;
}

export default (instant: boolean) => Roll(instant)