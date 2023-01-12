import { useState, useEffect } from "react";
import Players, { Player } from "./Player";
import rerender from "./utils/Rerender";
import { cls } from "./utils/utilities";

let plannedSet: (string | Player)[] = [],
  outerSetter = (txt: (string | Player)[]) => { plannedSet = txt };

export default function StatusBar() {
  const [text, innerSetter] = useState<(string | Player)[]>(plannedSet);

  useEffect(() => {
    outerSetter = innerSetter as (txt: (string | Player)[]) => void
  }, [])

  return <div className={cls('statusBar', Players.currentPlayer.name)}>
    {text.flatMap(txt => txt instanceof Player ? ['Player ', <span className={cls(txt.name)}>{txt.name}</span>] : txt)}
  </div>
}

export function setStatus(...txt: (string | Player)[]) {
  outerSetter(txt);
  setTimeout(() => rerender(), 1000);
}