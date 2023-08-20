import {useEffect, useState} from "react";
import Login from "@/pages/login";
import Settings from "@/pages/settings";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    chrome.action.getBadgeText({}).then(state => {
      setIsRunning(state === 'ON')
    })
  }, [refresh]);

  async function start() {
    await chrome.runtime.sendMessage({type: "OPEN"});
    setRefresh(!refresh);
  }

  async function stop() {
    await chrome.runtime.sendMessage({type: "CLOSE"});
    setRefresh(!refresh);
  }

  return (
    <main
    >
      {isRunning ? <Settings stop={stop}/> : <Login start={start}/>}
    </main>
  )
}
